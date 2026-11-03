import type { ReactNode } from 'react';
import { entityPath } from '@peach/legacy/core';
import { RiExternalLinkLine } from '@remixicon/react';
import { Button, ButtonLink } from '@/components/base/buttons/button';
import { relayoutCovers } from '../../card-art/framing';
import { textLang } from '../../core/text-lang';
import { ArtSlot } from '../components/art-slot';
import { busyProps } from '../settings/use-action';
import { DiscoveryFaces } from './discovery-faces';
import { coverUrl } from '@peach/card-art';
import type { DownloadPrefill } from '../activity/cloud-download-dialog';
import { discoveryArtwork, type Discovery } from './jav';

/** 「查找资源」弹窗的预填：本机有封面用本机那张，否则用来源地址。 */
export const resourcePrefill = (item: Discovery): DownloadPrefill =>
  ({ ...item, cover: item.has_cover ? coverUrl(item, true) : item.cover_url, origin: `${item.asset_id ? 'asset' : 'feed'}:${item.id}` });

/** 「发现」与「新作」共用的库外作品卡：封面、出演、发行日、标签与想要／查找资源。
 *  `badge` 是标签行最前面那一枚（发现分区放推荐分），没有就不占位。 */
export function DiscoveryCard({ item, layout, javImage, readOnly, navigate, tag, onTag, wanting, onWant, onResource, badge }: {
  item: Discovery; layout: 'big' | 'small'; javImage: unknown; readOnly: boolean; navigate(path: string): void;
  tag: string; onTag(tag: string): void; wanting: boolean; onWant(): void; onResource(): void; badge?: ReactNode;
}) {
  const performers = item.performer_refs?.length ? item.performer_refs.map(person => person.name).join('、') : item.performers;
  const artwork = discoveryArtwork(item, layout, javImage);
  const href = item.asset_id ? `/assets/${item.asset_id}` : `/works/${encodeURIComponent(item.code)}`;
  return <article data-media-card="" data-jav-card="" onClick={event => {
    if (!(event.target as HTMLElement).closest('a,button,input')) navigate(href);
  }}>
    <a href={href} aria-label={`查看 ${item.code} 详情`}
      onClick={event => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) { event.preventDefault(); navigate(href) } }}
      data-media-pic="" data-jav-cover-box="" className="relative inline-grid place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default">
      {artwork ? <ArtSlot artwork={{ kind: 'cover', html: artwork }} identity={discoveryArtwork(item, 'small', javImage)}
        relayout={root => relayoutCovers(root, layout)} /> : <span data-media-nopic="">无封面</span>}
    </a>
    <div data-media-meta="">
      <DiscoveryFaces item={item} />
      <div data-media-text="">
        <h3 data-jav-title="" data-media-title="" title={`${item.code} · ${item.title || '标题未取得'}`}><b>{item.code}</b> {item.title ? <span lang={textLang(item.title)}>{item.title}</span> : '标题未取得'}</h3>
        <div data-media-byline="">
          {item.performer_refs?.[0]?.id ? <a data-media-who="" href={entityPath('performer', item.performer_refs[0].name)} title={performers}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-user-round" /></svg><span>{item.performer_refs[0].name}</span></a>
            : <span data-media-who="" title={performers}><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-user-round" /></svg><span>{item.performer_refs?.[0]?.name || performers}</span></span>}
          {(item.performer_refs?.length || 0) > 1 ? <span data-media-who-more="">等 {item.performer_refs!.length} 人</span> : null}
          {item.release_date ? <time data-media-release="" dateTime={item.release_date}><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-calendar" /></svg>{item.release_date}</time> : null}
        </div>
        <div data-jav-tags="" data-media-tags="">
          {badge}
          {(item.tags || []).slice(0, 4).map(name =>
            <button type="button" data-media-tag="" key={name} aria-pressed={tag === name} onClick={() => onTag(tag === name ? '' : name)}>{name}</button>)}
        </div>
      </div>
    </div>
    <div data-jav-actions="" className="flex flex-wrap gap-2">
      {item.link ? <ButtonLink data-button-link="" variant="secondary" trailingIcon={RiExternalLinkLine} href={item.link} target="_blank" rel="noopener noreferrer">作品来源</ButtonLink> : null}
      <Button variant="ghost" disabled={readOnly || item.wanted || !!item.asset_id} {...busyProps(wanting)} onClick={onWant}>
        {item.asset_id ? '已入库' : item.wanted ? '已加入想要' : '想要'}</Button>
      <Button variant="secondary" onClick={onResource}>查找资源</Button>
    </div>
  </article>;
}
