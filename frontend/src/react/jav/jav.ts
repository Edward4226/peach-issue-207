import { apiGet } from '../../api';
import { queryClient } from '../query';
import { fetchWants, WANTS_KEY } from '../wants/wants';
import type { FaceRef, CoverItem } from '@peach/card-art';
import { coverImage, javArtwork, remoteCoverUrl } from '@peach/card-art';
import { esc } from '@peach/legacy/core';
import { peachHistory, shellNavigate } from '@peach/history';
import { RELEASE_SORTS, type DiscoveryDirection, type DiscoverySort, type ReleaseSort } from './discovery-sorts';

export { JAV_TABS, javTab, javPath, javLibraryPath } from './jav-navigation';

/** 分区里的筛选写进地址栏：替换当前记录，不多压一条历史。 */
export function writeJavQuery(patch: Record<string, string>): void {
  const params = new URLSearchParams(location.search);
  for (const [key, value] of Object.entries(patch)) { if (value) params.set(key, value); else params.delete(key) }
  shellNavigate(location.pathname + (params.size ? `?${params}` : ''), { replace: true, state: peachHistory.navigation.location.state });
}

export interface Discovery extends CoverItem {
  id: number; code: string; title: string; performers: string; release_date: string;
  studio: string; link: string; cover_url: string; has_cover: boolean; wanted: boolean;
  performer_refs?: (FaceRef & { name: string; source_actor_id?: string; source_avatar?: boolean })[];
  asset_id?: number | null; tags?: string[]; reasons?: string[]; score?: number;
  taste_score?: number | null; ranking_score?: number | null; rank?: number;
  source_score?: number | null; duration?: number | null;
  metadata_state?: 'pending' | 'ready' | 'partial' | 'unavailable' | 'stale'; metadata_message?: string;
}
export type DiscoveryScope = 'external' | 'library';
export interface DiscoveryMetadataJob {
  job_id: string; status: 'running' | 'complete' | 'stopped' | 'failed'; completed: number; total: number;
  failed: number; requests: number; bytes: number; stop_reason?: string; message?: string;
}
export interface DiscoveryResult {
  items: Discovery[]; candidate_total: number; limited: boolean; ranking_method?: 'mmr' | 'field-sort';
  metadata_job?: DiscoveryMetadataJob | null; poll_after_ms?: number;
}
export const discoveryKey = (scope: DiscoveryScope, sort: DiscoverySort = 'taste', direction: DiscoveryDirection = 'desc') =>
  ['jav-discoveries', scope, sort, direction] as const;
export function fetchDiscoveries(scope: DiscoveryScope, signal: AbortSignal, options: {
  sort?: DiscoverySort; direction?: DiscoveryDirection; jobId?: string; refreshMetadata?: boolean; cancelMetadata?: boolean;
} = {}) {
  const params = new URLSearchParams({ scope, limit: '100', sort: options.sort || 'taste', direction: options.direction || 'desc' });
  if (options.jobId) params.set('metadata_job_id', options.jobId);
  if (options.refreshMetadata) params.set('metadata_refresh', '1');
  if (options.cancelMetadata) params.set('metadata_cancel', '1');
  return apiGet<DiscoveryResult>(`/api/jav/discoveries?${params}`, signal);
}

/** 新作分区的筛选与排序：都写在地址栏里，刷新与返回原样恢复。`seed` 只在换一批时有值。 */
export interface ReleaseFilters {
  page: number; performer: string; studio: string; tag: string; q: string;
  sort: ReleaseSort; dir: DiscoveryDirection; seed: string;
}
export interface ReleaseFacetPerformer extends FaceRef { name: string; count: number; source_actor_id?: string; source_avatar?: boolean }
export interface ReleaseFacetStudio { name: string; count: number; has_logo: boolean; logo_version?: string }
/** `/api/jav/releases`：一页新作，加只取自订阅新作的筛选项。 */
export interface ReleaseResult {
  items: Discovery[]; total: number; candidate_total: number; page: number; size: number;
  facets: { performers: ReleaseFacetPerformer[]; studios: ReleaseFacetStudio[]; tags: { name: string; count: number }[] };
  metadata_job?: DiscoveryMetadataJob | null; poll_after_ms?: number;
}
export const RELEASE_PAGE_SIZE = 24;
export function releaseFilters(search: string): ReleaseFilters {
  const params = new URLSearchParams(search);
  const sort = params.get('sort');
  const seed = params.get('seed') || '';
  return { page: Math.max(1, Math.floor(Number(params.get('page'))) || 1), performer: params.get('performer') || '',
    studio: params.get('studio') || '', tag: params.get('tag') || '', q: (params.get('q') || '').trim(),
    sort: sort === 'random' && seed ? 'random' : RELEASE_SORTS.find(([key]) => key === sort)?.[0] || 'release_date',
    dir: params.get('dir') === 'asc' ? 'asc' : 'desc', seed };
}
export const releaseKey = (filters: ReleaseFilters) =>
  ['jav-releases', filters.page, filters.performer, filters.studio, filters.tag, filters.q, filters.sort, filters.dir, filters.seed] as const;
export function fetchReleases(filters: ReleaseFilters, signal: AbortSignal, jobId = '') {
  const params = new URLSearchParams({ page: String(filters.page), size: String(RELEASE_PAGE_SIZE),
    sort: filters.sort, direction: filters.dir });
  for (const key of ['performer', 'studio', 'tag', 'q', 'seed'] as const) if (filters[key]) params.set(key, filters[key]);
  if (jobId) params.set('metadata_job_id', jobId);
  return apiGet<ReleaseResult>(`/api/jav/releases?${params}`, signal);
}

export function discoveryArtwork(item: Discovery, layout: 'big' | 'small', javImage: unknown): string {
  const local = javArtwork({ ...item, is_jav: true }, layout, false, javImage);
  if (local.html || !item.cover_url || !item.code) return local.html;
  const remote = esc(remoteCoverUrl(item));
  return coverImage(item, layout).replace(/ src="[^"]*"/,
    ` src="${remote}" data-jav-image="${item.id}" data-jav-cover="${remote}" data-jav-thumb="" data-jav-image-layout="${layout}"${layout === 'big' ? ' data-panel-prior="1"' : ''}`)
    .replace('data-drop="self"', 'data-drop="initial" data-initial="封面未取得" data-drop-class="media-nopic"');
}

export async function prefetchJav(tab: string, signal: AbortSignal) {
  if (tab === 'wants') {
    await queryClient.ensureQueryData({ queryKey: WANTS_KEY, queryFn: () => fetchWants(signal),
      staleTime: 30_000, revalidateIfStale: true }); return;
  }
  if (tab === 'discover') {
    await queryClient.ensureQueryData({ queryKey: discoveryKey('external'), queryFn: () => fetchDiscoveries('external', signal),
      staleTime: 30_000, revalidateIfStale: true }); return;
  }
  if (tab === 'releases') {
    const filters = releaseFilters(location.search);
    await queryClient.ensureQueryData({ queryKey: releaseKey(filters), queryFn: () => fetchReleases(filters, signal),
      staleTime: 30_000, revalidateIfStale: true });
  }
}
