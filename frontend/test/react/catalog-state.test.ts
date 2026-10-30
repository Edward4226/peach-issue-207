import { describe, expect, it } from 'vitest';

import {
  defaultCatalogLoc, homeCatalogState, homePath, initialCatalogFilters, onlineDefaultLoc,
  preferredThumb, resetCatalogFilters, resolveSort,
} from '../../src/react/catalog-grid/catalog-state';

const preferences = { defaultSort: 'new', defaultSortDirection: 'asc', thumbPreviewOnly: false };
const seed = () => 'fresh-seed';
const initial = (pathname = '/', search = '', prefs = preferences) =>
  initialCatalogFilters({ pathname, search }, prefs, seed);

describe('目录地址与默认范围', () => {
  it('发行年份多选随分享地址恢复，重置清除年份', () => {
    const filters = initial('/', '?loc=115&year=2024,none&q=作品');
    const address = new URL(homePath(filters), 'https://peach.test');
    expect(initial(address.pathname, address.search).year).toBe('2024,none');
    expect(resetCatalogFilters(filters, preferences, seed).year).toBe('');
    expect(initial('/follow', '?year=2024').year).toBe('');
  });
  it('只在目录地址读取筛选，非目录地址仍可指定来源范围', () => {
    expect(initial('/follow', '?loc=115&tag=blender&owner=none&q=other&sort=rating&seed=foreign')).toMatchObject({
      loc: '115', tag: '', owner: '', q: '', sort: 'new', dir: 'asc', seed: 'fresh-seed',
    });
    expect(initial('/unseen', '?state=later&owner=none&tag=blender&tag_match=any')).toMatchObject({
      state: 'fresh', owner: 'none', tag: 'blender', tag_match: 'any',
    });
    expect(initial('/', '?owner=someone&tag_match=bad')).toMatchObject({ owner: '', tag_match: 'all' });
  });

  it('目录地址覆盖排序偏好，旧排序键与随机方向使用现有解析', () => {
    expect(resolveSort(null, null, preferences)).toEqual({ sort: 'new', dir: 'asc' });
    expect(resolveSort('short', null, preferences)).toEqual({ sort: 'dur', dir: 'asc' });
    expect(resolveSort('short', 'desc', preferences)).toEqual({ sort: 'dur', dir: 'desc' });
    expect(resolveSort('seed', 'asc', preferences)).toEqual({ sort: 'seed', dir: '' });
    expect(resolveSort('unknown', null, preferences, 'rating')).toEqual({ sort: 'rating', dir: 'desc' });
  });

  it('分享地址包含 owner=none 与非默认方向，省略种子和缩略图开关', () => {
    const filters = initial('/watch-later', '?loc=115&owner=none&sort=new&dir=asc&seed=old&thumb=1&tag_match=all');
    const path = homePath(filters);
    const address = new URL(path, 'https://peach.test');
    expect(address.pathname).toBe('/watch-later');
    expect(Object.fromEntries(address.searchParams)).toEqual({ loc: '115', owner: 'none', sort: 'new', dir: 'asc' });
    expect(initial(address.pathname, address.search)).toMatchObject({ ...filters, seed: 'fresh-seed', thumb: '0' });
  });

  it('没有独立路径的状态用查询参数，垃圾文件使用独立路径', () => {
    expect(homePath({ state: 'trash', sort: 'seed', dir: '', seed: 'private' })).toBe('/?sort=seed&state=trash');
    expect(homePath({ state: 'ads', tag_match: 'all' })).toBe('/junk-files');
    expect(homePath({ state: 'fresh', sort: 'new', dir: 'desc', tag_match: 'any' }))
      .toBe('/unseen?tag_match=any&sort=new');
  });

  it('默认范围剔除明确离线来源，全部离线时仍保留原范围', () => {
    expect(onlineDefaultLoc('local,115,pikpak', { local: true, '115': false })).toBe('local,pikpak');
    expect(onlineDefaultLoc('local,115', { local: false, '115': false })).toBe('local,115');
    expect(onlineDefaultLoc('', { local: true })).toBe('');
    expect(defaultCatalogLoc('local,115', '?loc=', { '115': false })).toBe('local,115');
    expect(defaultCatalogLoc('', '?loc=', { '115': false })).toBe('');
    expect(defaultCatalogLoc('local,115', '?q=test', { '115': false })).toBe('local');
  });

  it('地址显式 thumb 优先于「仅显示有预览」偏好，没有时按偏好取开关', () => {
    const on = { ...preferences, thumbPreviewOnly: true };
    expect(preferredThumb('0', on)).toBe('0');
    expect(preferredThumb('1', { ...preferences, thumbPreviewOnly: false })).toBe('1');
    expect(preferredThumb(null, on)).toBe('1');
    expect(preferredThumb(null, { ...preferences, thumbPreviewOnly: false })).toBe('0');
    expect(initial('/', '?thumb=0', on).thumb).toBe('0');
    expect(initial('/', '?thumb=1', { ...preferences, thumbPreviewOnly: false }).thumb).toBe('1');
  });

  it('没有地址参数时 startup 与 reset 沿用「仅显示有预览」偏好', () => {
    const on = { ...preferences, thumbPreviewOnly: true };
    const opened = initial('/', '', on);
    expect(opened.thumb).toBe('1');
    expect(resetCatalogFilters(opened, on, seed).thumb).toBe('1');
    const openedOff = initial('/', '', { ...preferences, thumbPreviewOnly: false });
    expect(openedOff.thumb).toBe('0');
    expect(resetCatalogFilters(openedOff, { ...preferences, thumbPreviewOnly: false }, seed).thumb).toBe('0');
  });

  it('重置保留来源并更新种子，首页筛选条与目录状态共用对象', () => {
    const previous = initial('/flagged', '?loc=pikpak&owner=none&creator=x&region=CN&jav=1&thumb=1');
    const state = resetCatalogFilters(previous, preferences, seed);
    expect(state).toEqual({
      loc: 'pikpak', creator: '', studio: '', owner: '', tag: '', tag_match: 'all', len: '',
      dur_min: '', dur_max: '', orient: '', region: '', year: '', state: '', sort: 'new', dir: 'asc',
      seed: 'fresh-seed', q: '', jav: '', thumb: '0',
      browse: '', folder: '', folder_recursive: '',
    });
    const patch = homeCatalogState(state);
    expect(patch.state).toBe(state);
    expect(patch.barsContext.filters).toBe(state);
    expect(patch.detailReturnBarsContext).toBeNull();
    state.q = 'same-object';
    expect(patch.barsContext.filters.q).toBe('same-object');
    expect(previous.owner).toBe('none');
  });
});
