(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "2b394c67-c255-4732-bae1-ed9db288e232", e._sentryDebugIdIdentifier = "sentry-dbid-2b394c67-c255-4732-bae1-ed9db288e232");
	} catch {}
})();
import { $76d00c5a4edb230a$export$76ccd210b9029917 as e, $76d00c5a4edb230a$export$816b5d811295e6bc as t, $76d00c5a4edb230a$export$b59bdbef9ce70de2 as n, $76d00c5a4edb230a$export$f6f0c3fe4ec306ea as r, $76d00c5a4edb230a$export$f850895b287ef28e as i, $fe21c36db05242bb$export$d7b12c4107be0d61 as a, ArtSlot as o, Button as s, ButtonLink as c, Bx as l, CatalogViewToggle as u, ChevronSortDown as d, Chip as f, CloudDownloadDialog as p, DISCOVERY_SORTS as m, DOWNLOADS_KEY as h, DOWNLOADS_URL as g, DataTableFrame as _, E3 as v, EmptyFocusButton as y, EmptyState as b, FilterGlassRows as x, FilterIconButton as S, FilterPill as C, GlassPill as w, Help as T, IndexSearch as E, Input as ee, JAV_LAYOUTS as te, JAV_RECOMMENDATION_GRID as ne, JavHeader as D, LibraryShortcuts as O, M6 as k, Note as A, PHASES as j, Pagination as M, RELEASE_COLUMN_VISIBILITY_KEY as N, RELEASE_COLUMN_WIDTHS_KEY as P, RELEASE_SORTS as F, RELEASE_SORT_COLUMNS as I, SEGMENT as L, SEGMENTED_TRACK as R, SegmentedRadioGroup as z, Segments as re, Shuffle as B, SortKeys as ie, SourceAvatar as V, Table as ae, TableColumnControls as oe, TableColumnResizer as se, TaskProgress as ce, WANTS_KEY as H, WantMagnets as U, Wt as le, __toESM as ue, addWant as de, apiGet as fe, appSettingsStore as pe, avatarInner as me, busyProps as W, cachedMagnetStates as he, cardClass as ge, cardRatio as _e, catalogListSkeletonCellHtml as ve, coverUrl as ye, discoveryArtwork as be, discoveryKey as xe, discoveryScore as Se, entityDisplayName as G, entityFaceImg as Ce, entityPath as we, errorMessage as K, esc as Te, facePos as Ee, fetchDiscoveries as De, fetchReleases as Oe, fetchWants as ke, firstGrapheme as Ae, fmtDur as je, gridLayout as Me, invalidateWants as q, javContentSkeleton as Ne, javLayout as Pe, javTagSkeleton as Fe, keepPreviousData as Ie, leadingGraphemes as Le, logoUrl as Re, pageWindow as ze, qE as Be, recommendationScore as Ve, relayoutCovers as He, releaseColumns as Ue, releaseFilters as We, releaseKey as Ge, removeWants as Ke, require_jsx_runtime as qe, require_react as Je, resetWants as Ye, searchNote as Xe, spriteGlyph as Ze, storeJavLayout as Qe, textLang as $e, tierPlaceholdersHtml as et, useAction as J, useCatalogView as tt, useEntityNames as nt, useQuery as Y, useTablePreferences as rt, wantName as X, wireHorizontalScroller as it, writeJavQuery as Z } from "./peach-app.js";
import { ErrorLine as at } from "./peach-app.source-view-DalWfDkm.js";
import "./peach-app.source-list-ri5fRK2E.js";
// src/react/wants/want-list.tsx
var Q = /* @__PURE__ */ ue(Je(), 1), $ = qe(), ot = {
	code: "手动添加",
	feed: "订阅新作",
	follow: "关注"
}, st = [
	["all", "全部"],
	["available", "有磁链"],
	["missing", "没磁链"]
], ct = (e) => [
	e.release_date,
	e.studio,
	e.performers,
	ot[e.origin]
].filter(Boolean).join(" · ");
function lt({ want: e }) {
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "relative inline-grid w-card-cover shrink-0 aspect-card-cover place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default max-sm:w-24",
		children: [/* @__PURE__ */ (0, $.jsx)("span", {
			className: "text-caption-1-regular text-text-secondary",
			children: "无封面"
		}), e.cover ? /* @__PURE__ */ (0, $.jsx)("img", {
			src: e.cover,
			alt: "",
			loading: "lazy",
			referrerPolicy: e.remote_cover ? "no-referrer" : void 0,
			onError: (e) => e.currentTarget.remove(),
			className: "absolute inset-0 size-full object-cover"
		}) : null]
	});
}
function ut({ want: e, readOnly: t, busy: n, onReset: r, onRemove: i, onCloudDownload: a, downloads: o, provider: l, toast: u }) {
	let [d, f] = (0, Q.useState)(""), p = e.link || d || (e.code ? `https://javdb.com/search?q=${encodeURIComponent(e.code)}&f=all` : "");
	return /* @__PURE__ */ (0, $.jsxs)("li", {
		"data-want-id": e.id,
		className: ge({ className: "flex flex-col gap-4 max-sm:p-4" }),
		children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 items-start gap-4 max-sm:gap-3",
			children: [/* @__PURE__ */ (0, $.jsx)(lt, { want: e }), /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, $.jsxs)("p", {
						className: "flex min-w-0 flex-wrap items-baseline gap-x-2",
						children: [/* @__PURE__ */ (0, $.jsx)("b", {
							className: "min-w-0 text-headline-medium wrap-anywhere text-text-primary",
							children: X(e)
						}), e.code && e.title ? /* @__PURE__ */ (0, $.jsx)("span", {
							className: "min-w-0 truncate text-body-2-regular text-text-secondary",
							children: e.title
						}) : null]
					}),
					ct(e) ? /* @__PURE__ */ (0, $.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: ct(e)
					}) : null,
					!e.code || e.phase === "unreleased" || e.phase === "acquired" ? /* @__PURE__ */ (0, $.jsx)("p", {
						"data-want-note": "",
						className: "text-caption-1-regular text-text-secondary",
						children: Xe(e)
					}) : null,
					e.scrape_error ? /* @__PURE__ */ (0, $.jsx)(at, {
						text: e.scrape_error,
						prefix: "资料未取得：",
						tone: "muted"
					}) : null,
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "mt-1 flex flex-wrap items-center gap-2",
						children: [
							p ? /* @__PURE__ */ (0, $.jsx)(c, {
								"data-button-link": "",
								variant: "secondary",
								size: "small",
								trailingIcon: le,
								href: p,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "来源页"
							}) : null,
							/* @__PURE__ */ (0, $.jsx)(s, {
								variant: "secondary",
								size: "small",
								leadingIcon: k,
								disabled: t,
								...W(n === `remove:${e.id}`),
								onClick: i,
								children: "移除"
							}),
							e.phase === "given_up" ? /* @__PURE__ */ (0, $.jsx)(s, {
								variant: "secondary",
								size: "small",
								disabled: t,
								...W(n === `reset:${e.id}`),
								onClick: r,
								children: "重新查找"
							}) : null,
							e.phase === "searching" || e.phase === "given_up" ? /* @__PURE__ */ (0, $.jsx)(s, {
								variant: "secondary",
								size: "small",
								onClick: a,
								children: "查找资源"
							}) : null
						]
					})
				]
			})]
		}), e.code && (e.phase === "searching" || e.phase === "given_up") ? /* @__PURE__ */ (0, $.jsx)(U, {
			want: e,
			readOnly: t,
			downloads: o,
			provider: l,
			toast: u,
			onSource: f
		}) : null]
	});
}
function dt({ phase: e, label: t, rows: n, row: r }) {
	let [i, o] = (0, Q.useState)(1), [c, l] = (0, Q.useState)("all"), u = he(n), d = (e) => e.has_magnets ?? u.get(e.code || "") ?? !1, f = n.filter(d), p = e !== "searching" || c === "all" ? n : n.filter((e) => d(e) === (c === "available")), m = ze(p.length, 20, i);
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		"aria-label": t,
		"data-want-phase": e,
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, $.jsxs)("h3", {
					className: "flex items-baseline gap-2 text-title-2-medium text-text-primary",
					children: [t, /* @__PURE__ */ (0, $.jsx)("span", {
						className: "text-body-2-regular tabular-nums text-text-secondary",
						children: n.length.toLocaleString()
					})]
				}), e === "searching" ? /* @__PURE__ */ (0, $.jsx)(z, {
					name: "want-magnet-filter",
					"aria-label": "待找磁链筛选",
					orientation: "horizontal",
					value: c,
					className: R,
					onChange: (e) => {
						l(e), o(1);
					},
					children: st.map(([e, t]) => /* @__PURE__ */ (0, $.jsxs)(a, {
						value: e,
						"aria-label": t,
						className: L,
						children: [t, /* @__PURE__ */ (0, $.jsx)("span", {
							className: "text-caption-1-regular tabular-nums text-text-tertiary",
							children: (e === "all" ? n.length : e === "available" ? f.length : n.length - f.length).toLocaleString()
						})]
					}, e))
				}) : null]
			}),
			p.length ? null : /* @__PURE__ */ (0, $.jsx)(b, {
				size: "compact",
				icon: Be,
				title: "暂无符合条件的作品",
				actions: /* @__PURE__ */ (0, $.jsx)(s, {
					size: "small",
					onClick: () => {
						l("all"), o(1);
					},
					children: "查看全部"
				}),
				children: null
			}),
			/* @__PURE__ */ (0, $.jsx)("ul", {
				className: "flex flex-col gap-4",
				children: p.slice(m.start, m.end).map(r)
			}),
			m.pages > 1 ? /* @__PURE__ */ (0, $.jsxs)("div", {
				"data-want-pager": "",
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-body-2-regular tabular-nums text-text-secondary",
					children: `${(m.start + 1).toLocaleString()}–${m.end.toLocaleString()} / ${m.total.toLocaleString()} 条`
				}), /* @__PURE__ */ (0, $.jsx)(M, {
					label: `${t}分页`,
					page: m.page,
					pages: m.pages,
					onPage: o
				})]
			}) : null
		]
	});
}
function ft({ readOnly: e, toast: t, query: n = "", clearQuery: r }) {
	let [i, a] = (0, Q.useState)(""), [o, c] = (0, Q.useState)(null), l = J(), u = Y({
		queryKey: H,
		queryFn: ({ signal: e }) => ke(e),
		staleTime: 3e4,
		refetchInterval: (e) => e.state.data?.scraping ? 3e3 : !1
	}), d = () => {
		let n = i.trim();
		n && !e && l.run("add", (e) => de({ code: n }, e), (e) => {
			t(e.created ? `已加入想要：${X(e.want)}` : `${X(e.want)} 已经在想要里`), a(""), q();
		});
	}, f = (e) => {
		e.key === "Enter" && !e.nativeEvent.isComposing && (e.preventDefault(), d());
	}, m = (e) => {
		l.run(`remove:${e.id}`, (t) => Ke([e.id], t), () => {
			t(`已移除：${X(e)}`), q();
		});
	}, _ = (e) => {
		l.run(`reset:${e.id}`, (t) => Ye([e.id], t), () => {
			t(`${X(e)} 回到待找`), q();
		});
	}, v = u.data, x = (v?.items || []).filter((e) => !n || [
		e.code,
		e.title,
		e.performers
	].join(" ").toLocaleLowerCase().includes(n.toLocaleLowerCase())), S = Y({
		queryKey: h,
		queryFn: ({ signal: e }) => fe(`${g}?limit=100`, e),
		enabled: x.some((e) => e.code && (e.phase === "searching" || e.phase === "given_up"))
	}), C = S.data?.providers.filter((e) => e.configured) || [], w = C[0]?.key || "";
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"aria-busy": u.isPending,
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: ge({
					padding: "none",
					className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
				}),
				children: [
					/* @__PURE__ */ (0, $.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: "按番号添加"
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "flex flex-wrap items-end gap-2",
						children: [/* @__PURE__ */ (0, $.jsx)("div", {
							className: "min-w-64 grow max-sm:min-w-0",
							children: /* @__PURE__ */ (0, $.jsx)(ee, {
								"aria-label": "番号",
								placeholder: "输入番号，例如 SSIS-950",
								value: i,
								isDisabled: e,
								onChange: a,
								onKeyDown: f
							})
						}), /* @__PURE__ */ (0, $.jsx)(s, {
							variant: "primary",
							disabled: e || !i.trim(),
							...W(l.busy === "add"),
							onClick: d,
							children: "添加"
						})]
					}),
					l.error ? /* @__PURE__ */ (0, $.jsx)(A, {
						tone: "error",
						title: "这一次没有完成",
						children: l.error
					}) : null
				]
			}),
			u.error ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "error",
				title: "想要清单读取失败",
				children: K(u.error)
			}) : null,
			u.isPending ? /* @__PURE__ */ (0, $.jsx)("div", {
				role: "status",
				"aria-label": "正在读取想要",
				dangerouslySetInnerHTML: { __html: Ne("wants") }
			}) : null,
			v?.scraping ? /* @__PURE__ */ (0, $.jsx)(T, {
				role: "status",
				children: "正在给刚加入的番号取资料与封面。"
			}) : null,
			S.error ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "error",
				title: "下载配置未取得",
				children: K(S.error)
			}) : null,
			S.data && !C.length ? /* @__PURE__ */ (0, $.jsxs)(A, {
				tone: "neutral",
				children: ["尚未配置下载渠道。", /* @__PURE__ */ (0, $.jsx)("a", {
					href: "/settings/library?section=%E4%B8%8B%E8%BD%BD%E6%B8%A0%E9%81%93",
					children: "下载渠道设置"
				})]
			}) : null,
			S.data && !S.data.available ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "neutral",
				children: "云下载只在允许修改数据库的设备上可用。"
			}) : null,
			v && !x.length ? /* @__PURE__ */ (0, $.jsx)(b, {
				size: "compact",
				icon: Be,
				title: n ? "没有符合条件的作品" : "还没有想要的作品",
				actions: n && r ? /* @__PURE__ */ (0, $.jsx)(s, {
					size: "small",
					onClick: r,
					children: "清除搜索"
				}) : !n && !e ? /* @__PURE__ */ (0, $.jsx)(y, {
					target: "input[aria-label=\"番号\"]",
					children: "添加作品"
				}) : void 0,
				children: n ? "试试其他番号、女优或标题。" : "输入番号，添加想看的作品。"
			}) : null,
			j.map(([n, r]) => {
				let i = x.filter((e) => e.phase === n);
				return i.length ? /* @__PURE__ */ (0, $.jsx)(dt, {
					phase: n,
					label: r,
					rows: i,
					row: (n) => /* @__PURE__ */ (0, $.jsx)(ut, {
						want: n,
						readOnly: e,
						busy: l.busy,
						downloads: S.data,
						provider: w,
						toast: t,
						onReset: () => _(n),
						onRemove: () => m(n),
						onCloudDownload: () => c({
							code: n.code || "",
							title: n.title || "",
							origin: `wishlist:${n.id}`,
							cover: n.cover || "",
							performers: n.performers || "",
							release_date: n.release_date || "",
							studio: n.studio || ""
						})
					}, n.id)
				}, n) : null;
			}),
			/* @__PURE__ */ (0, $.jsx)(p, {
				prefill: o,
				close: () => c(null),
				receipt: t,
				provider: w
			})
		]
	});
}
// src/react/jav/discovery-faces.tsx
function pt({ item: e }) {
	nt();
	let t = e.performer_refs?.length ? e.performer_refs : [...new Set(e.performers.split(/[,，、;/]/).filter(Boolean))].map((e) => ({ name: e })), n = t.slice(0, 5).map((t, n) => {
		let r = { "--media-avatar-index": n }, i = t.source_avatar && t.source_actor_id && !t.has_image ? { children: /* @__PURE__ */ (0, $.jsx)(V, {
			code: e.code,
			person: t
		}) } : { dangerouslySetInnerHTML: { __html: me(t.name, t, null) } };
		return t.id ? /* @__PURE__ */ (0, $.jsx)("a", {
			"data-media-avatar": "",
			style: r,
			href: we("performer", t.name, t.id),
			"aria-label": `打开女优页：${G("performer", t.name, t.id)}`,
			...i
		}, t.name) : /* @__PURE__ */ (0, $.jsx)("span", {
			"data-media-avatar": "",
			style: r,
			title: G("performer", t.name),
			...i
		}, t.name);
	});
	return t.length > 1 ? /* @__PURE__ */ (0, $.jsx)("div", {
		"data-media-avatars": "",
		style: { "--media-avatar-count": Math.min(5, t.length) },
		children: n
	}) : n[0] || null;
}
// src/react/jav/discovery-card.tsx
var mt = (e) => ({
	...e,
	cover: e.has_cover ? ye(e, !0) : e.cover_url,
	origin: `${e.asset_id ? "asset" : "feed"}:${e.id}`
});
function ht({ item: e, layout: t, javImage: n, readOnly: r, navigate: i, tag: a, onTag: l, wanting: u, onWant: d, onResource: f, badge: p }) {
	let m = e.performer_refs?.length ? e.performer_refs.map((e) => e.name).join("、") : e.performers, h = be(e, t, n), g = e.asset_id ? `/assets/${e.asset_id}` : `/works/${encodeURIComponent(e.code)}`;
	return /* @__PURE__ */ (0, $.jsxs)("article", {
		"data-media-card": "",
		"data-jav-card": "",
		onClick: (e) => {
			e.target.closest("a,button,input") || i(g);
		},
		children: [
			/* @__PURE__ */ (0, $.jsx)("a", {
				href: g,
				"aria-label": `查看 ${e.code} 详情`,
				onClick: (e) => {
					e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0 || (e.preventDefault(), i(g));
				},
				"data-media-pic": "",
				"data-jav-cover-box": "",
				className: "relative inline-grid place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default",
				children: h ? /* @__PURE__ */ (0, $.jsx)(o, {
					artwork: {
						kind: "cover",
						html: h
					},
					identity: be(e, "small", n),
					relayout: (e) => He(e, t)
				}) : /* @__PURE__ */ (0, $.jsx)("span", {
					"data-media-nopic": "",
					children: "无封面"
				})
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				"data-media-meta": "",
				children: [/* @__PURE__ */ (0, $.jsx)(pt, { item: e }), /* @__PURE__ */ (0, $.jsxs)("div", {
					"data-media-text": "",
					children: [
						/* @__PURE__ */ (0, $.jsxs)("h3", {
							"data-jav-title": "",
							"data-media-title": "",
							title: `${e.code} · ${e.title || "标题未取得"}`,
							children: [
								/* @__PURE__ */ (0, $.jsx)("b", { children: e.code }),
								" ",
								e.title ? /* @__PURE__ */ (0, $.jsx)("span", {
									lang: $e(e.title),
									children: e.title
								}) : "标题未取得"
							]
						}),
						/* @__PURE__ */ (0, $.jsxs)("div", {
							"data-media-byline": "",
							children: [
								e.performer_refs?.[0]?.id ? /* @__PURE__ */ (0, $.jsxs)("a", {
									"data-media-who": "",
									href: we("performer", e.performer_refs[0].name),
									title: m,
									children: [/* @__PURE__ */ (0, $.jsx)("svg", {
										viewBox: "0 0 24 24",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, $.jsx)("use", { href: "#i-user-round" })
									}), /* @__PURE__ */ (0, $.jsx)("span", { children: e.performer_refs[0].name })]
								}) : /* @__PURE__ */ (0, $.jsxs)("span", {
									"data-media-who": "",
									title: m,
									children: [/* @__PURE__ */ (0, $.jsx)("svg", {
										viewBox: "0 0 24 24",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, $.jsx)("use", { href: "#i-user-round" })
									}), /* @__PURE__ */ (0, $.jsx)("span", { children: e.performer_refs?.[0]?.name || m })]
								}),
								(e.performer_refs?.length || 0) > 1 ? /* @__PURE__ */ (0, $.jsxs)("span", {
									"data-media-who-more": "",
									children: [
										"等 ",
										e.performer_refs.length,
										" 人"
									]
								}) : null,
								e.release_date ? /* @__PURE__ */ (0, $.jsxs)("time", {
									"data-media-release": "",
									dateTime: e.release_date,
									children: [/* @__PURE__ */ (0, $.jsx)("svg", {
										viewBox: "0 0 24 24",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, $.jsx)("use", { href: "#i-calendar" })
									}), e.release_date]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, $.jsxs)("div", {
							"data-jav-tags": "",
							"data-media-tags": "",
							children: [p, (e.tags || []).slice(0, 4).map((e) => /* @__PURE__ */ (0, $.jsx)("button", {
								type: "button",
								"data-media-tag": "",
								"aria-pressed": a === e,
								onClick: () => l(a === e ? "" : e),
								children: e
							}, e))]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				"data-jav-actions": "",
				className: "flex flex-wrap gap-2",
				children: [
					e.link ? /* @__PURE__ */ (0, $.jsx)(c, {
						"data-button-link": "",
						variant: "secondary",
						trailingIcon: le,
						href: e.link,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "作品来源"
					}) : null,
					/* @__PURE__ */ (0, $.jsx)(s, {
						variant: "ghost",
						disabled: r || e.wanted || !!e.asset_id,
						...W(u),
						onClick: d,
						children: e.asset_id ? "已入库" : e.wanted ? "已加入想要" : "想要"
					}),
					/* @__PURE__ */ (0, $.jsx)(s, {
						variant: "secondary",
						onClick: f,
						children: "查找资源"
					})
				]
			})
		]
	});
}
// src/react/jav/jav-release-table.tsx
var gt = {
	widths: P,
	visibility: N
};
function _t({ studio: e }) {
	let [t, n] = (0, Q.useState)(!1);
	return e?.has_logo && !t ? /* @__PURE__ */ (0, $.jsx)("img", {
		"data-list-studio-mark": "",
		src: Re(e.name, "icon", e.logo_version),
		alt: "",
		width: 16,
		height: 16,
		loading: "lazy",
		decoding: "async",
		onError: () => n(!0)
	}) : /* @__PURE__ */ (0, $.jsx)("span", {
		"data-list-studio-mark": "",
		"aria-hidden": "true",
		children: Le(e?.name || "", 1)
	});
}
function vt({ items: a, waiting: c, filters: l, studios: u, javImage: f, readOnly: p, navigate: m, onTag: h, onSort: g, wanting: v, onWant: y, onResource: b }) {
	let x = rt("jav-releases", Ue, gt), S = Ue.filter((e) => e.required || x.visibility[e.id] !== !1), C = Object.entries(I).find(([, e]) => e === l.sort)?.[0], w = new Map(u.map((e) => [e.name, e])), T = (e) => (t) => {
		t.preventDefault(), m(`/works/${encodeURIComponent(e.code)}`);
	}, E = (e, t) => {
		let n = t.performer_refs?.[0]?.name || t.performers.split(/[,，、;/]/)[0] || "";
		switch (e) {
			case "name": {
				let e = be(t, "small", f);
				return /* @__PURE__ */ (0, $.jsxs)("div", {
					"data-list-identity": "",
					children: [/* @__PURE__ */ (0, $.jsx)("button", {
						type: "button",
						"data-list-open": "",
						tabIndex: -1,
						"aria-hidden": "true",
						onClick: T(t),
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-list-picture": "",
							children: e ? /* @__PURE__ */ (0, $.jsx)(o, {
								artwork: {
									kind: "cover",
									html: e
								},
								relayout: (e) => He(e, "small")
							}) : /* @__PURE__ */ (0, $.jsx)("span", { children: "无封面" })
						})
					}), /* @__PURE__ */ (0, $.jsx)("span", {
						"data-list-text": "",
						children: /* @__PURE__ */ (0, $.jsxs)("button", {
							type: "button",
							"data-list-name": "",
							title: `${t.code} · ${t.title || "标题未取得"}`,
							"aria-label": `查看 ${t.code} 详情`,
							onClick: T(t),
							children: [
								/* @__PURE__ */ (0, $.jsx)("b", { children: t.code }),
								" ",
								t.title ? /* @__PURE__ */ (0, $.jsx)("span", {
									lang: $e(t.title),
									children: t.title
								}) : "标题未取得"
							]
						})
					})]
				});
			}
			case "people": return n ? /* @__PURE__ */ (0, $.jsxs)("div", {
				"data-list-people": "",
				children: [
					/* @__PURE__ */ (0, $.jsx)(pt, { item: t }),
					t.performer_refs?.[0]?.id ? /* @__PURE__ */ (0, $.jsx)("a", {
						"data-media-who": "",
						href: we("performer", n),
						children: /* @__PURE__ */ (0, $.jsx)("span", { children: n })
					}) : /* @__PURE__ */ (0, $.jsx)("span", {
						"data-media-who": "",
						children: /* @__PURE__ */ (0, $.jsx)("span", { children: n })
					}),
					(t.performer_refs?.length || 0) > 1 ? /* @__PURE__ */ (0, $.jsxs)("span", {
						"data-media-who-more": "",
						children: [
							"等 ",
							t.performer_refs.length,
							" 人"
						]
					}) : null
				]
			}) : "—";
			case "studio": return t.studio ? /* @__PURE__ */ (0, $.jsxs)("span", {
				"data-list-library": "",
				title: t.studio,
				children: [/* @__PURE__ */ (0, $.jsx)(_t, { studio: w.get(t.studio) }), /* @__PURE__ */ (0, $.jsx)("span", { children: t.studio })]
			}) : "—";
			case "tags": return t.tags?.length ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-media-tags": "",
				"data-list-tags": "",
				children: t.tags.map((e) => /* @__PURE__ */ (0, $.jsx)("button", {
					type: "button",
					"data-media-tag": "",
					"aria-pressed": l.tag === e,
					onClick: () => h(l.tag === e ? "" : e),
					children: e
				}, e))
			}) : "—";
			case "code": return t.code;
			case "dur": return je(t.duration) || "—";
			case "score": return t.source_score == null ? "—" : `${t.source_score.toFixed(2)} / 5`;
			case "release": return t.release_date || "—";
			default: return /* @__PURE__ */ (0, $.jsxs)("div", {
				"data-release-actions": "",
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)(s, {
					size: "small",
					variant: "ghost",
					disabled: p || t.wanted || !!t.asset_id,
					...W(v(t)),
					onClick: () => y(t),
					children: t.wanted ? "已想要" : "想要"
				}), /* @__PURE__ */ (0, $.jsx)(s, {
					size: "small",
					variant: "secondary",
					onClick: () => b(t),
					children: "查找资源"
				})]
			});
		}
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"data-catalog-table": "",
		"data-release-table": "",
		className: "flex min-w-0 flex-col gap-4",
		children: [/* @__PURE__ */ (0, $.jsx)("div", {
			className: "flex flex-wrap justify-end gap-2",
			role: "toolbar",
			"aria-label": "新作列表工具栏",
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				"data-toolbar-actions": "",
				children: /* @__PURE__ */ (0, $.jsx)(oe, {
					preferences: x,
					label: "新作列表"
				})
			})
		}), /* @__PURE__ */ (0, $.jsx)(_, {
			follow: !0,
			preferences: x,
			children: /* @__PURE__ */ (0, $.jsxs)(ae, {
				"aria-label": "新作列表",
				size: "sm",
				sortDescriptor: C ? {
					column: C,
					direction: l.dir === "asc" ? "ascending" : "descending"
				} : void 0,
				onSortChange: (e) => {
					let t = I[String(e.column)];
					t && g(t, e.direction === "ascending" ? "asc" : "desc");
				},
				children: [/* @__PURE__ */ (0, $.jsxs)(i, { children: [S.map((e) => /* @__PURE__ */ (0, $.jsx)(t, {
					id: e.id,
					isRowHeader: e.id === "name",
					allowsSorting: e.id in I,
					...x.columnProps(e.id),
					children: ({ sortDirection: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("span", {
						className: "flex items-center gap-0.5",
						children: [e.label, e.id in I ? /* @__PURE__ */ (0, $.jsx)("span", {
							"data-sort-indicator": !0,
							"data-direction": t || void 0,
							children: /* @__PURE__ */ (0, $.jsx)(d, {})
						}) : null]
					}), /* @__PURE__ */ (0, $.jsx)(se, {
						preferences: x,
						id: e.id
					})] })
				}, e.id)), /* @__PURE__ */ (0, $.jsx)(t, {
					id: "remaining-space",
					"aria-label": "行空白区域",
					"data-table-space": "",
					width: x.spaceWidth,
					minWidth: 0
				})] }), /* @__PURE__ */ (0, $.jsx)(e, {
					renderEmptyState: () => "没有符合条件的新作",
					children: c ? Array.from({ length: 6 }, (e, t) => /* @__PURE__ */ (0, $.jsxs)(n, {
						id: `skeleton-${t}`,
						"data-list-skeleton-row": "",
						"aria-hidden": "true",
						children: [S.map((e) => /* @__PURE__ */ (0, $.jsx)(r, { children: /* @__PURE__ */ (0, $.jsx)("span", { dangerouslySetInnerHTML: { __html: ve(e.id) } }) }, e.id)), /* @__PURE__ */ (0, $.jsx)(r, { "data-table-space": "" })]
					}, `skeleton-${t}`)) : a.map((e) => /* @__PURE__ */ (0, $.jsxs)(n, {
						id: String(e.id),
						"data-catalog-row": "",
						"data-release-row": "",
						children: [S.map((t) => /* @__PURE__ */ (0, $.jsx)(r, { children: E(t.id, e) }, t.id)), /* @__PURE__ */ (0, $.jsx)(r, { "data-table-space": "" })]
					}, e.id))
				})]
			})
		})]
	});
}
// src/react/jav/jav-releases.tsx
var yt = `<div data-catalog-tier="performers" data-skeleton="tiers">${et("performer")}</div><div data-catalog-tier="studios">${et("studio")}</div>`, bt = (e) => `<span data-tier-initial>${Te(Ae(G("performer", e.name, e.id)))}</span>${Ce({
	id: e.id,
	hasImage: e.has_image,
	version: e.image_version,
	style: Ee(e.avatar_focus),
	focus: e.avatar_focus,
	standIn: e.avatar_stand_in
})}`;
function xt({ value: e }) {
	let t = Ve(e);
	return /* @__PURE__ */ (0, $.jsx)("span", {
		"data-jav-taste-score": "",
		title: `口味 ${t.score}`,
		children: /* @__PURE__ */ (0, $.jsx)(f, {
			color: t.color,
			children: t.label
		})
	});
}
function St({ studio: e }) {
	let [t, n] = (0, Q.useState)(!1);
	return /* @__PURE__ */ (0, $.jsx)("span", {
		"data-tier-mark": "",
		children: e.has_logo && !t ? /* @__PURE__ */ (0, $.jsx)("img", {
			src: Re(e.name, "icon", e.logo_version),
			alt: "",
			width: 28,
			height: 28,
			loading: "lazy",
			decoding: "async",
			onError: () => n(!0)
		}) : Le(e.name, 2)
	});
}
function Ct({ readOnly: e, receipt: t, resource: n, query: r, navigate: i, clearText: a }) {
	nt();
	let [o, d] = (0, Q.useState)(() => We(location.search));
	(0, Q.useEffect)(() => {
		r !== o.q && (d((e) => ({
			...e,
			q: r,
			page: 1
		})), Z({ page: "" }));
	}, [r, o.q]);
	let f = (e, t) => {
		let n = o[e] === t ? "" : t;
		d((t) => ({
			...t,
			[e]: n,
			page: 1
		})), Z({
			[e]: n,
			page: ""
		});
	}, p = (0, Q.useRef)(null), m = (e) => {
		d((t) => ({
			...t,
			page: e
		})), Z({ page: e > 1 ? String(e) : "" }), p.current?.scrollIntoView({ block: "start" });
	}, h = () => {
		d((e) => ({
			...e,
			performer: "",
			studio: "",
			tag: "",
			q: "",
			page: 1
		})), Z({
			performer: "",
			studio: "",
			tag: "",
			page: ""
		}), a();
	}, g = (e) => _(e, e === o.sort ? o.dir === "asc" ? "desc" : "asc" : e === "code" ? "asc" : "desc"), _ = (e, t) => {
		d((n) => ({
			...n,
			sort: e,
			dir: t,
			seed: "",
			page: 1
		})), Z({
			sort: e === "release_date" ? "" : e,
			dir: t === "asc" ? "asc" : "",
			seed: "",
			page: ""
		});
	}, v = () => {
		let e = Math.random().toString(36).slice(2, 10);
		d((t) => ({
			...t,
			sort: "random",
			dir: "desc",
			seed: e,
			page: 1
		})), Z({
			sort: "random",
			dir: "",
			seed: e,
			page: ""
		});
	};
	(0, Q.useEffect)(() => {
		let e = [...p.current?.querySelectorAll("[data-catalog-tier],[data-catalog-tags],[data-filter-row=\"bottom\"]") || []].map((e) => it(e, { drag: !0 }));
		return () => e.forEach((e) => e.destroy());
	}, []);
	let y = pe();
	(0, Q.useSyncExternalStore)(y.subscribe, y.version, y.version);
	let S = Pe(), T = tt(), E = _e(Me({
		active: !0,
		home: !1,
		portrait: !1
	})), ee = (0, Q.useRef)(""), D = Y({
		queryKey: Ge(o),
		queryFn: ({ signal: e }) => Oe(o, e, ee.current),
		placeholderData: Ie,
		retry: !1,
		refetchOnWindowFocus: !1,
		refetchInterval: (e) => e.state.data?.metadata_job?.status === "running" && Math.max(1e3, e.state.data.poll_after_ms || 3e3)
	}), O = D.data?.metadata_job, k = O?.status === "running", j = (0, Q.useRef)(!1);
	(0, Q.useEffect)(() => {
		O?.job_id && (ee.current = O.job_id);
	}, [O?.job_id]), (0, Q.useEffect)(() => {
		j.current && !k && D.refetch(), j.current = k;
	}, [k, D]);
	let N = J(), P = (e) => {
		N.run(String(e.id), (t) => de({ code: e.code }, t), () => {
			t("已加入想要"), q(), D.refetch();
		});
	}, I = D.data, L = D.isPending, R = !!(o.performer || o.studio || o.tag || o.q), z = Math.max(1, Math.ceil((I?.total || 0) / 24));
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		ref: p,
		"aria-label": "订阅新作",
		"aria-busy": L || D.isFetching,
		className: "flex min-w-0 scroll-mt-24 flex-col gap-4",
		children: [
			L ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-catalog-tiers": "",
				"aria-busy": "true",
				dangerouslySetInnerHTML: { __html: yt }
			}) : null,
			I && (I.facets.performers.length || I.facets.studios.length) ? /* @__PURE__ */ (0, $.jsxs)("div", {
				"data-catalog-tiers": "",
				"data-release-tiers": "",
				children: [I.facets.performers.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					"data-catalog-tier": "performers",
					role: "group",
					"aria-label": "按女优筛选",
					children: I.facets.performers.map((e) => /* @__PURE__ */ (0, $.jsxs)("button", {
						type: "button",
						"data-tier-performer": "",
						"aria-pressed": o.performer === e.name,
						title: `${G("performer", e.name, e.id)} · ${e.count} 部`,
						onClick: () => f("performer", e.name),
						children: [/* @__PURE__ */ (0, $.jsx)("span", {
							"data-tier-ring": "",
							dangerouslySetInnerHTML: { __html: bt(e) }
						}), /* @__PURE__ */ (0, $.jsx)("span", {
							"data-tier-name": "",
							children: G("performer", e.name, e.id)
						})]
					}, e.name))
				}) : null, I.facets.studios.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					"data-catalog-tier": "studios",
					role: "group",
					"aria-label": "按厂牌筛选",
					children: I.facets.studios.map((e) => /* @__PURE__ */ (0, $.jsxs)("button", {
						type: "button",
						"data-tier-studio": "",
						"aria-pressed": o.studio === e.name,
						title: `${e.name} · ${e.count} 部`,
						onClick: () => f("studio", e.name),
						children: [
							/* @__PURE__ */ (0, $.jsx)(St, { studio: e }),
							e.name,
							/* @__PURE__ */ (0, $.jsx)("span", {
								"data-count-badge": "",
								children: e.count
							})
						]
					}, e.name))
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(x, {
				label: "新作筛选",
				topLabel: "新作标签",
				attrs: {
					"data-filter-frame": "",
					"data-jav-filter": "",
					"data-catalog-frame": ""
				},
				busy: L,
				topClassName: "gap-1.5 overflow-visible",
				bottomClassName: "min-h-12",
				top: /* @__PURE__ */ (0, $.jsx)("div", {
					"data-catalog-scroll": "",
					children: /* @__PURE__ */ (0, $.jsx)("div", {
						"data-catalog-tags": "",
						dangerouslySetInnerHTML: L ? { __html: Fe() } : void 0,
						children: L ? null : I?.facets.tags.map((e) => /* @__PURE__ */ (0, $.jsxs)(C, {
							"data-catalog-tag": e.name,
							"data-entity-press": "",
							pressed: o.tag === e.name,
							onPress: () => f("tag", e.name),
							children: [e.name, /* @__PURE__ */ (0, $.jsx)("span", {
								"data-count-badge": "",
								children: e.count
							})]
						}, e.name))
					})
				}),
				bottom: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
					/* @__PURE__ */ (0, $.jsx)("span", {
						"data-catalog-readout": "",
						children: L ? /* @__PURE__ */ (0, $.jsx)("span", {
							"data-skeleton": "count",
							"aria-hidden": !0,
							className: "relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen"
						}) : R ? `${I?.total || 0} / ${I?.candidate_total || 0} 部` : `${I?.total || 0} 部`
					}),
					R ? /* @__PURE__ */ (0, $.jsx)(w, {
						onPress: h,
						children: "清除筛选"
					}) : null,
					/* @__PURE__ */ (0, $.jsxs)("span", {
						"data-entity-sorts": "",
						children: [
							/* @__PURE__ */ (0, $.jsx)(B, {
								onPress: v,
								busy: o.sort === "random" && D.isFetching
							}),
							T === "cards" ? /* @__PURE__ */ (0, $.jsx)(re, {
								label: "JAV 卡片版式",
								value: S,
								options: te,
								onChange: Qe
							}) : null,
							/* @__PURE__ */ (0, $.jsx)(u, {}),
							/* @__PURE__ */ (0, $.jsx)(ie, {
								sorts: F.map(([e, t, n]) => ({
									key: e,
									label: t,
									ariaLabel: n,
									pressed: e === o.sort,
									dir: o.dir
								})),
								onSort: (e) => g(e)
							})
						]
					})
				] })
			}),
			L && T === "cards" ? /* @__PURE__ */ (0, $.jsx)("div", {
				role: "status",
				"aria-label": "正在读取新作",
				dangerouslySetInnerHTML: { __html: Ne("discover", S) }
			}) : null,
			D.error ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "error",
				title: "新作未取得",
				children: K(D.error)
			}) : null,
			k && O ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-jav-metadata": "",
				className: "min-w-0",
				children: /* @__PURE__ */ (0, $.jsx)(ce, {
					label: `正在读取作品资料 · ${O.completed} / ${O.total} 部`,
					value: O.completed,
					total: O.total
				})
			}) : null,
			!L && !D.error && !I?.items.length ? /* @__PURE__ */ (0, $.jsx)(b, {
				icon: l,
				title: R ? "没有符合条件的新作" : "暂无未入库的新作",
				actions: R ? /* @__PURE__ */ (0, $.jsx)(s, {
					size: "small",
					onClick: h,
					children: "清除筛选"
				}) : /* @__PURE__ */ (0, $.jsx)(c, {
					size: "small",
					href: "/subscriptions?tab=add",
					children: "添加订阅"
				}),
				children: R ? "清除筛选后查看全部新作。" : "订阅女优或厂牌后，还没入库的新作会出现在这里。"
			}) : null,
			N.error ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "error",
				children: N.error
			}) : null,
			T === "list" ? L || I?.items.length ? /* @__PURE__ */ (0, $.jsx)(vt, {
				items: I?.items || [],
				waiting: L,
				filters: o,
				studios: I?.facets.studios || [],
				javImage: y.value.javImage,
				readOnly: e,
				navigate: i,
				onTag: (e) => f("tag", e || o.tag),
				onSort: _,
				wanting: (e) => N.busy === String(e.id),
				onWant: P,
				onResource: (e) => n(mt(e))
			}) : null : /* @__PURE__ */ (0, $.jsx)("div", {
				"data-media-grid": "",
				className: ne,
				style: { "--card-ratio": E },
				children: (I?.items || []).map((t) => /* @__PURE__ */ (0, $.jsx)(ht, {
					item: t,
					layout: S,
					javImage: y.value.javImage,
					readOnly: e,
					navigate: i,
					tag: o.tag,
					onTag: (e) => f("tag", e || o.tag),
					wanting: N.busy === String(t.id),
					onWant: () => P(t),
					onResource: () => n(mt(t)),
					badge: o.sort === "taste" ? /* @__PURE__ */ (0, $.jsx)(xt, { value: t.taste_score }) : void 0
				}, t.id))
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex justify-center",
				children: /* @__PURE__ */ (0, $.jsx)(M, {
					page: o.page,
					pages: z,
					onPage: m,
					label: "新作分页"
				})
			})
		]
	});
}
// src/react/jav/jav-page.tsx
var wt = Ze("x"), Tt = Ze("refresh-cw"), Et = {
	releases: "筛选新作",
	discover: "筛选推荐",
	wants: "筛选想要"
};
function Dt({ tab: e, readOnly: t, navigate: n, receipt: r }) {
	let [i, a] = (0, Q.useState)(null), [o, s] = (0, Q.useState)(() => new URLSearchParams(location.search).get("q") || ""), c = (e) => {
		s(e), Z({ q: e });
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex w-full flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, $.jsx)(D, {
				tab: e,
				navigate: n,
				find: () => a({}),
				search: /* @__PURE__ */ (0, $.jsx)(E, {
					label: Et[e] || "筛选",
					value: o,
					onQuery: c
				})
			}),
			e === "releases" ? /* @__PURE__ */ (0, $.jsx)(Ct, {
				readOnly: t,
				receipt: r,
				resource: a,
				query: o.trim(),
				navigate: n,
				clearText: () => c("")
			}) : e === "discover" ? /* @__PURE__ */ (0, $.jsx)(Ot, {
				readOnly: t,
				receipt: r,
				resource: a,
				query: o.trim(),
				navigate: n,
				clearText: () => c("")
			}) : /* @__PURE__ */ (0, $.jsx)(ft, {
				readOnly: t,
				toast: r,
				query: o.trim(),
				clearQuery: () => c("")
			}),
			/* @__PURE__ */ (0, $.jsx)(p, {
				prefill: i,
				close: () => a(null),
				receipt: r
			})
		]
	});
}
function Ot({ readOnly: e, receipt: t, resource: n, query: r, navigate: i, clearText: a }) {
	let o = new URLSearchParams(location.search), [l, u] = (0, Q.useState)(() => o.get("scope") === "library" ? "library" : "external"), [d, p] = (0, Q.useState)(() => o.get("tag") || ""), [h, g] = (0, Q.useState)(() => m.some(([e]) => e === o.get("sort")) ? o.get("sort") : "taste"), [_, y] = (0, Q.useState)(() => o.get("dir") === "asc"), T = (e) => {
		u(e), Z({ scope: e === "external" ? "" : e });
	}, E = (e) => {
		p(e), Z({ tag: e });
	}, ee = (e) => {
		g(e), Z({ sort: e === "taste" ? "" : e });
	}, D = (e) => {
		y(e), Z({ dir: e ? "asc" : "" });
	}, k = (0, Q.useRef)(null);
	(0, Q.useEffect)(() => {
		let e = [...k.current?.querySelectorAll("[data-catalog-scroll],[data-catalog-tags],[data-filter-row=\"bottom\"]") || []].map((e) => it(e, { drag: !0 }));
		return () => e.forEach((e) => e.destroy());
	}, []);
	let j = pe();
	(0, Q.useSyncExternalStore)(j.subscribe, j.version, j.version);
	let M = Pe(), N = _e(Me({
		active: !0,
		home: !1,
		portrait: !1
	})), P = (0, Q.useRef)({}), F = (0, Q.useRef)(!1), I = (0, Q.useRef)(!1), L = _ ? "asc" : "desc", R = Y({
		queryKey: xe(l, h, L),
		retry: !1,
		refetchOnWindowFocus: !1,
		queryFn: ({ signal: e }) => {
			let t = F.current, n = I.current;
			return F.current = !1, I.current = !1, De(l, e, {
				sort: h,
				direction: L,
				jobId: t ? void 0 : P.current[l],
				refreshMetadata: t,
				cancelMetadata: n
			});
		},
		refetchInterval: (e) => e.state.data?.metadata_job?.status === "running" && Math.max(1e3, e.state.data.poll_after_ms || 3e3)
	}), z = R.data?.metadata_job;
	(0, Q.useEffect)(() => {
		z?.job_id && (P.current[l] = z.job_id);
	}, [l, z?.job_id]);
	let B = J(), V = J(), ae = (e) => {
		V.run(e, async () => (I.current = e === "stop", F.current = e !== "stop", R.refetch({
			cancelRefetch: !0,
			throwOnError: !0
		})), () => {});
	}, oe = R.data?.items || [], se = [...new Set(oe.flatMap((e) => e.tags || []))], H = oe.filter((e) => (!d || e.tags?.includes(d)) && (!r || [
		e.code,
		e.title,
		e.performers,
		e.studio,
		...e.tags || [],
		...(e.performer_refs || []).map((e) => e.name)
	].join(" ").toLocaleLowerCase().includes(r.toLocaleLowerCase()))), U = R.isPending;
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		ref: k,
		"aria-label": "为你推荐",
		"aria-busy": U,
		className: "flex min-w-0 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, $.jsx)(x, {
				label: "发现筛选与排序",
				topLabel: "发现范围与标签",
				attrs: {
					"data-filter-frame": "",
					"data-jav-filter": "",
					"data-catalog-frame": ""
				},
				busy: U,
				topClassName: "gap-1.5 overflow-visible",
				bottomClassName: "min-h-12",
				top: /* @__PURE__ */ (0, $.jsxs)("div", {
					"data-catalog-scroll": "",
					children: [/* @__PURE__ */ (0, $.jsxs)("div", {
						"data-catalog-views": "",
						children: [[["external", "库外发现"], ["library", "馆藏探索"]].map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(C, {
							"data-entity-tag": e,
							"data-entity-press": "",
							pressed: l === e,
							onPress: () => {
								T(e), E("");
							},
							children: t
						}, e)), /* @__PURE__ */ (0, $.jsx)("span", {
							"data-entity-sep": "",
							"aria-hidden": "true"
						})]
					}), /* @__PURE__ */ (0, $.jsx)("div", {
						"data-catalog-tags": "",
						dangerouslySetInnerHTML: U ? { __html: Fe() } : void 0,
						children: U ? null : se.map((e) => /* @__PURE__ */ (0, $.jsxs)(C, {
							"data-catalog-tag": e,
							"data-entity-press": "",
							pressed: d === e,
							onPress: () => E(d === e ? "" : e),
							children: [e, /* @__PURE__ */ (0, $.jsx)("span", {
								"data-count-badge": "",
								children: oe.filter((t) => t.tags?.includes(e)).length
							})]
						}, e))
					})]
				}),
				bottom: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
					/* @__PURE__ */ (0, $.jsx)("span", {
						"data-catalog-readout": "",
						children: U ? /* @__PURE__ */ (0, $.jsx)("span", {
							"data-skeleton": "count",
							"aria-hidden": !0,
							className: "relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen"
						}) : `${H.length} 部`
					}),
					/* @__PURE__ */ (0, $.jsx)(O, { currentHref: () => location.pathname + location.search }),
					r || d ? /* @__PURE__ */ (0, $.jsx)(w, {
						onPress: () => {
							E(""), a();
						},
						children: "清除筛选"
					}) : null,
					/* @__PURE__ */ (0, $.jsxs)("span", {
						"data-entity-sorts": "",
						children: [
							l === "external" ? /* @__PURE__ */ (0, $.jsx)(S, {
								"data-entity-batch": "",
								"data-jav-metadata-update": "",
								label: z?.status === "running" ? "停止读取" : "更新资料",
								disabled: U,
								"data-skeleton-action": U ? "" : void 0,
								busy: !!V.busy,
								icon: z?.status === "running" ? wt : Tt,
								onPress: () => ae(z?.status === "running" ? "stop" : "update")
							}) : null,
							/* @__PURE__ */ (0, $.jsx)(re, {
								label: "JAV 卡片版式",
								value: M,
								options: te,
								onChange: Qe
							}),
							/* @__PURE__ */ (0, $.jsx)(ie, {
								sorts: m.map(([e, t, n]) => ({
									key: e,
									label: t,
									ariaLabel: n,
									pressed: e === h,
									dir: L
								})),
								onSort: (e) => {
									e === h ? D(!_) : (ee(e), D(e === "code"));
								}
							})
						]
					})
				] })
			}),
			U ? /* @__PURE__ */ (0, $.jsx)("div", {
				role: "status",
				"aria-label": "正在读取推荐",
				dangerouslySetInnerHTML: { __html: Ne("discover", M) }
			}) : null,
			R.error ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "error",
				title: "推荐未取得",
				children: K(R.error)
			}) : null,
			l === "external" && z?.status === "running" ? /* @__PURE__ */ (0, $.jsx)("div", {
				"data-jav-metadata": "",
				className: "min-w-0",
				children: /* @__PURE__ */ (0, $.jsx)(ce, {
					label: `正在读取作品资料 · ${z.completed} / ${z.total} 部`,
					value: z.completed,
					total: z.total
				})
			}) : null,
			z && z.status !== "running" && (z.status !== "complete" || z.failed > 0) ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "neutral",
				action: /* @__PURE__ */ (0, $.jsx)(s, {
					variant: "secondary",
					...W(V.busy === "retry"),
					"aria-label": "立即重试读取作品资料",
					onClick: () => ae("retry"),
					children: "立即重试"
				}),
				children: z.message || `作品资料 ${z.completed} / ${z.total} 部`
			}) : null,
			V.error ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "error",
				children: V.error
			}) : null,
			!U && !R.error && !H.length ? /* @__PURE__ */ (0, $.jsx)(b, {
				icon: v,
				title: r || d ? "没有符合条件的推荐" : "暂无匹配口味的作品",
				actions: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(c, {
					size: "small",
					href: "/taste",
					variant: "secondary",
					children: "查看口味"
				}), r || d ? /* @__PURE__ */ (0, $.jsx)(s, {
					variant: "primary",
					size: "small",
					onClick: () => {
						a(), p(""), Z({
							q: "",
							tag: ""
						});
					},
					children: "清除筛选"
				}) : l === "library" ? /* @__PURE__ */ (0, $.jsx)(c, {
					variant: "primary",
					size: "small",
					href: "/",
					children: "浏览馆藏"
				}) : /* @__PURE__ */ (0, $.jsx)(s, {
					variant: "primary",
					size: "small",
					onClick: () => n({}),
					children: "查找作品"
				})] }),
				children: r || d ? "清除筛选后查看其他作品。" : l === "library" ? "观看或标记作品后，可以探索少看的馆藏。" : "可以查找番号，或更新关注来源。"
			}) : null,
			B.error ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "error",
				children: B.error
			}) : null,
			/* @__PURE__ */ (0, $.jsx)("div", {
				"data-media-grid": "",
				className: ne,
				style: { "--card-ratio": N },
				children: H.map((r) => {
					let a = Ve(r.taste_score ?? r.score), o = [
						a.label,
						`口味 ${Se(r.taste_score ?? r.score)}`,
						R.data?.ranking_method === "mmr" && r.ranking_score != null ? `排序 ${Se(r.ranking_score)}` : "",
						r.source_score == null ? "" : `来源评分 ${r.source_score.toFixed(1)} / 5`,
						...r.reasons || []
					].filter(Boolean).join(" · ");
					return /* @__PURE__ */ (0, $.jsx)(ht, {
						item: r,
						layout: M,
						javImage: j.value.javImage,
						readOnly: e,
						navigate: i,
						tag: d,
						onTag: E,
						wanting: B.busy === String(r.id),
						onWant: () => {
							B.run(String(r.id), (e) => de({ code: r.code }, e), () => {
								t("已加入想要"), q(), R.refetch();
							});
						},
						onResource: () => n(mt(r)),
						badge: /* @__PURE__ */ (0, $.jsx)("button", {
							"data-jav-taste-score": "",
							type: "button",
							title: o,
							"aria-label": `推荐分 ${a.score}，${a.label}`,
							className: "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
							children: /* @__PURE__ */ (0, $.jsx)(f, {
								color: a.color,
								children: a.label
							})
						})
					}, r.id);
				})
			})
		]
	});
}
export { Dt as JavPage };

//# debugId=2b394c67-c255-4732-bae1-ed9db288e232