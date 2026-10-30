(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "8c2da805-2186-4e20-84b6-f2e355c884b0", e._sentryDebugIdIdentifier = "sentry-dbid-8c2da805-2186-4e20-84b6-f2e355c884b0");
	} catch {}
})();
import { MotionConfigContext as e, WithPromise as t, __commonJSMin as n, __exportAll as r, __toESM as i, asNumber as a, calcGeneratorVelocity as o, cancelFrame as s, cardClass as c, clsx as l, collectMotionValues as u, cx as d, frame as f, interpolate as p, isMotionValue as m, motion as h, motionValue as g, require_jsx_runtime as _, require_react as v, require_react_dom as y, require_with_selector as b, resolveStartTime as x, spring as S, time as C, useConstant as w, useIsomorphicLayoutEffect as T, useReducedMotion as E } from "./peach-app.js";
// node_modules/.pnpm/motion-dom@14.7.1/node_modules/motion-dom/dist/es/utils/transform.mjs
function D(...e) {
	let t = !Array.isArray(e[0]), n = t ? 0 : -1, r = e[0 + n], i = e[1 + n], a = e[2 + n], o = e[3 + n], s = p(i, a, o);
	return t ? s(r) : s;
}
// node_modules/.pnpm/motion-dom@14.7.1/node_modules/motion-dom/dist/es/animation/FollowAnimation.mjs
var O = /* @__PURE__ */ new Set(), k = ({ timestamp: e }) => {
	O.forEach((t) => t.tick(e));
}, A = class extends t {
	constructor(e) {
		super(), this.state = "idle", this.startTime = 0, this.currentTime = 0, this.started = !1, this.hasNextTarget = !1, this.nextTarget = 0, this.stop = () => {
			this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.factory = e.type, this.generator = this.factory(e);
		let { driver: t } = e;
		t && (this.driver = t((e) => this.tick(e))), this.startTime = this.now(), this.state = "running", this.driver ? this.driver.start() : (O.size || f.update(k, !0), O.add(this));
	}
	setTarget(e, t) {
		this.nextTarget = e, this.nextVelocity = t, this.hasNextTarget = !0;
	}
	retarget(e, t) {
		let { options: n, generator: r } = this;
		n.keyframes = e, n.velocity = t, this.startTime = this.now(), this.currentTime = 0, r.retarget ? r.retarget(e, t) : this.generator = this.factory(n);
	}
	tick(e) {
		let { options: t, hasNextTarget: n } = this, { delay: r = 0, onUpdate: i, onPlay: a } = t;
		this.started || (this.startTime = x(this.startTime, e));
		let o = Math.round(e - this.startTime) - r, s = this.currentTime = Math.max(0, o), c = this.generator.next(s), l = o < 0 ? t.keyframes[0] : c.value;
		if (n) {
			this.hasNextTarget = !1;
			let { keyframes: e } = t;
			e[0] = l, e[1] = this.nextTarget, this.retarget(e, this.nextVelocity ?? this.getGeneratorVelocity());
		}
		(n || !this.started) && (this.started = !0, a?.()), this.state === "running" && (i?.(l), c.done && o >= 0 && !n && !this.hasNextTarget && this.state === "running" && (this.notifyFinished(), this.teardown(), this.state = "finished", t.onComplete?.()));
	}
	getGeneratorVelocity() {
		return o(this.generator, this.currentTime, this.options.velocity);
	}
	now() {
		return this.driver ? this.driver.now() : C.now();
	}
	teardown() {
		this.state = "idle", this.driver ? this.driver.stop() : (O.delete(this), O.size || s(k));
	}
};
// node_modules/.pnpm/motion-dom@14.7.1/node_modules/motion-dom/dist/es/value/utils/follow.mjs
function j(e, t, n) {
	let r = e.get(), i = null, o, s = typeof r == "string" ? r.replace(/[\d.-]/g, "") : void 0, c = (e) => o(s ? e + s : e), l = () => e.events.animationStart?.notify(), u = () => {
		i &&= (i.stop(), null), e.animation = void 0;
	};
	if (e.attach((t, r) => {
		o = r;
		let s = a(t);
		if (i?.state === "running") {
			i.setTarget(s, n.velocity);
			return;
		}
		let d = a(e.get()), f = i ? i.getGeneratorVelocity() : e.getVelocity();
		if (u(), d === s) return;
		let p = i = new A({
			keyframes: [d, s],
			velocity: f,
			restDelta: .001,
			restSpeed: .01,
			...n,
			onUpdate: c,
			onPlay: l
		});
		e.animation = p, p.then(() => {
			i === p && (i = null, e.animation = void 0, e.events.animationComplete?.notify());
		});
	}, u), m(t)) {
		let r = n.skipInitialAnimation === !0, i = (t) => {
			r ? (r = !1, e.jump(M(t, s), !1)) : e.set(M(t, s));
		}, o = t.on("change", i), c = t.get();
		a(c) - a(e.get()) && i(c);
		let l = e.on("destroy", o);
		return () => {
			o(), l(), u();
		};
	}
	return u;
}
function M(e, t) {
	return t ? e + t : e;
}
// node_modules/.pnpm/motion-dom@14.7.1/node_modules/motion-dom/dist/es/value/spring-value.mjs
function N(e, t, n) {
	return j(e, t, {
		...n,
		type: S
	});
}
// node_modules/.pnpm/framer-motion@14.7.1_react-_61d517a298ca21f0e642d6faab862d3f/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs
var P = /* @__PURE__ */ i(v(), 1);
function ee(e, t, n) {
	(0, P.useInsertionEffect)(() => e.on(t, n), [
		e,
		t,
		n
	]);
}
// node_modules/.pnpm/framer-motion@14.7.1_react-_61d517a298ca21f0e642d6faab862d3f/node_modules/framer-motion/dist/es/value/use-motion-value.mjs
function te(t) {
	let n = w(() => g(t)), { isStatic: r } = (0, P.useContext)(e);
	if (r) {
		let [, e] = (0, P.useState)(t);
		(0, P.useEffect)(() => n.on("change", e), []);
	}
	return n;
}
// node_modules/.pnpm/framer-motion@14.7.1_react-_61d517a298ca21f0e642d6faab862d3f/node_modules/framer-motion/dist/es/value/use-combine-values.mjs
function ne(e, t) {
	let n = te(t()), r = () => n.set(t());
	return r(), T(() => {
		let t = () => f.preRender(r, !1, !0), n = e.map((e) => e.on("change", t));
		return r(), () => {
			n.forEach((e) => e()), s(r);
		};
	}), n;
}
// node_modules/.pnpm/framer-motion@14.7.1_react-_61d517a298ca21f0e642d6faab862d3f/node_modules/framer-motion/dist/es/value/use-computed.mjs
function re(e) {
	u.current = [], e();
	let t = ne(u.current, e);
	return u.current = void 0, t;
}
// node_modules/.pnpm/framer-motion@14.7.1_react-_61d517a298ca21f0e642d6faab862d3f/node_modules/framer-motion/dist/es/value/use-follow-value.mjs
function ie(t, n, r) {
	let { isStatic: i } = (0, P.useContext)(e), a = () => m(t) ? t.get() : t;
	if (i) return re(a);
	let o = te(a());
	return (0, P.useInsertionEffect)(() => r(o, t, n), [o, JSON.stringify(n)]), o;
}
// node_modules/.pnpm/framer-motion@14.7.1_react-_61d517a298ca21f0e642d6faab862d3f/node_modules/framer-motion/dist/es/value/use-spring.mjs
function ae(e, t = {}) {
	return ie(e, t, N);
}
// node_modules/.pnpm/framer-motion@14.7.1_react-_61d517a298ca21f0e642d6faab862d3f/node_modules/framer-motion/dist/es/value/use-transform.mjs
function oe(e, t, n, r) {
	if (typeof e == "function") return re(e);
	if (n !== void 0 && !Array.isArray(n) && typeof t != "function") return ce(e, t, n, r);
	let i = typeof t == "function" ? t : D(t, n, r), a = Array.isArray(e) ? se(e, i) : se([e], ([e]) => i(e)), o = Array.isArray(e) ? void 0 : e.accelerate;
	if (o && !o.isTransformed && typeof t != "function" && Array.isArray(n) && r?.clamp !== !1) {
		let e = r?.ease;
		a.accelerate = {
			...o,
			times: [
				0,
				...t,
				1
			],
			keyframes: [
				n[0],
				...n,
				n[n.length - 1]
			],
			isTransformed: !0,
			...e ? { ease: Array.isArray(e) ? [e[0], ...e] : e } : {}
		};
	}
	return a;
}
function se(e, t) {
	let n = w(() => []);
	return ne(e, () => {
		n.length = 0;
		let r = e.length;
		for (let t = 0; t < r; t++) n[t] = e[t].get();
		return t(n);
	});
}
function ce(e, t, n, r) {
	let i = w(() => Object.keys(n)), a = w(() => ({}));
	for (let o of i) a[o] = oe(e, t, n[o], r);
	return a;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/excludeEventProps.js
var le = /* @__PURE__ */ i(y()), ue = /* @__PURE__ */ "dangerouslySetInnerHTML.onCopy.onCopyCapture.onCut.onCutCapture.onPaste.onPasteCapture.onCompositionEnd.onCompositionEndCapture.onCompositionStart.onCompositionStartCapture.onCompositionUpdate.onCompositionUpdateCapture.onFocus.onFocusCapture.onBlur.onBlurCapture.onChange.onChangeCapture.onBeforeInput.onBeforeInputCapture.onInput.onInputCapture.onReset.onResetCapture.onSubmit.onSubmitCapture.onInvalid.onInvalidCapture.onLoad.onLoadCapture.onError.onErrorCapture.onKeyDown.onKeyDownCapture.onKeyPress.onKeyPressCapture.onKeyUp.onKeyUpCapture.onAbort.onAbortCapture.onCanPlay.onCanPlayCapture.onCanPlayThrough.onCanPlayThroughCapture.onDurationChange.onDurationChangeCapture.onEmptied.onEmptiedCapture.onEncrypted.onEncryptedCapture.onEnded.onEndedCapture.onLoadedData.onLoadedDataCapture.onLoadedMetadata.onLoadedMetadataCapture.onLoadStart.onLoadStartCapture.onPause.onPauseCapture.onPlay.onPlayCapture.onPlaying.onPlayingCapture.onProgress.onProgressCapture.onRateChange.onRateChangeCapture.onSeeked.onSeekedCapture.onSeeking.onSeekingCapture.onStalled.onStalledCapture.onSuspend.onSuspendCapture.onTimeUpdate.onTimeUpdateCapture.onVolumeChange.onVolumeChangeCapture.onWaiting.onWaitingCapture.onAuxClick.onAuxClickCapture.onClick.onClickCapture.onContextMenu.onContextMenuCapture.onDoubleClick.onDoubleClickCapture.onDrag.onDragCapture.onDragEnd.onDragEndCapture.onDragEnter.onDragEnterCapture.onDragExit.onDragExitCapture.onDragLeave.onDragLeaveCapture.onDragOver.onDragOverCapture.onDragStart.onDragStartCapture.onDrop.onDropCapture.onMouseDown.onMouseDownCapture.onMouseEnter.onMouseLeave.onMouseMove.onMouseMoveCapture.onMouseOut.onMouseOutCapture.onMouseOver.onMouseOverCapture.onMouseUp.onMouseUpCapture.onSelect.onSelectCapture.onTouchCancel.onTouchCancelCapture.onTouchEnd.onTouchEndCapture.onTouchMove.onTouchMoveCapture.onTouchStart.onTouchStartCapture.onPointerDown.onPointerDownCapture.onPointerMove.onPointerMoveCapture.onPointerUp.onPointerUpCapture.onPointerCancel.onPointerCancelCapture.onPointerEnter.onPointerEnterCapture.onPointerLeave.onPointerLeaveCapture.onPointerOver.onPointerOverCapture.onPointerOut.onPointerOutCapture.onGotPointerCapture.onGotPointerCaptureCapture.onLostPointerCapture.onLostPointerCaptureCapture.onScroll.onScrollCapture.onWheel.onWheelCapture.onAnimationStart.onAnimationStartCapture.onAnimationEnd.onAnimationEndCapture.onAnimationIteration.onAnimationIterationCapture.onTransitionEnd.onTransitionEndCapture".split(".");
function de(e) {
	return typeof e == "string" && ue.includes(e);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/svgPropertiesNoEvents.js
var fe = /* @__PURE__ */ new Set(/* @__PURE__ */ "aria-activedescendant.aria-atomic.aria-autocomplete.aria-busy.aria-checked.aria-colcount.aria-colindex.aria-colspan.aria-controls.aria-current.aria-describedby.aria-details.aria-disabled.aria-errormessage.aria-expanded.aria-flowto.aria-haspopup.aria-hidden.aria-invalid.aria-keyshortcuts.aria-label.aria-labelledby.aria-level.aria-live.aria-modal.aria-multiline.aria-multiselectable.aria-orientation.aria-owns.aria-placeholder.aria-posinset.aria-pressed.aria-readonly.aria-relevant.aria-required.aria-roledescription.aria-rowcount.aria-rowindex.aria-rowspan.aria-selected.aria-setsize.aria-sort.aria-valuemax.aria-valuemin.aria-valuenow.aria-valuetext.className.color.height.id.lang.max.media.method.min.name.style.target.width.role.tabIndex.accentHeight.accumulate.additive.alignmentBaseline.allowReorder.alphabetic.amplitude.arabicForm.ascent.attributeName.attributeType.autoReverse.azimuth.baseFrequency.baselineShift.baseProfile.bbox.begin.bias.by.calcMode.capHeight.clip.clipPath.clipPathUnits.clipRule.colorInterpolation.colorInterpolationFilters.colorProfile.colorRendering.contentScriptType.contentStyleType.cursor.cx.cy.d.decelerate.descent.diffuseConstant.direction.display.divisor.dominantBaseline.dur.dx.dy.edgeMode.elevation.enableBackground.end.exponent.externalResourcesRequired.fill.fillOpacity.fillRule.filter.filterRes.filterUnits.floodColor.floodOpacity.focusable.fontFamily.fontSize.fontSizeAdjust.fontStretch.fontStyle.fontVariant.fontWeight.format.from.fx.fy.g1.g2.glyphName.glyphOrientationHorizontal.glyphOrientationVertical.glyphRef.gradientTransform.gradientUnits.hanging.horizAdvX.horizOriginX.href.ideographic.imageRendering.in2.in.intercept.k1.k2.k3.k4.k.kernelMatrix.kernelUnitLength.kerning.keyPoints.keySplines.keyTimes.lengthAdjust.letterSpacing.lightingColor.limitingConeAngle.local.markerEnd.markerHeight.markerMid.markerStart.markerUnits.markerWidth.mask.maskContentUnits.maskUnits.mathematical.mode.numOctaves.offset.opacity.operator.order.orient.orientation.origin.overflow.overlinePosition.overlineThickness.paintOrder.panose1.pathLength.patternContentUnits.patternTransform.patternUnits.pointerEvents.pointsAtX.pointsAtY.pointsAtZ.preserveAlpha.preserveAspectRatio.primitiveUnits.r.radius.refX.refY.renderingIntent.repeatCount.repeatDur.requiredExtensions.requiredFeatures.restart.result.rotate.rx.ry.seed.shapeRendering.slope.spacing.specularConstant.specularExponent.speed.spreadMethod.startOffset.stdDeviation.stemh.stemv.stitchTiles.stopColor.stopOpacity.strikethroughPosition.strikethroughThickness.string.stroke.strokeDasharray.strokeDashoffset.strokeLinecap.strokeLinejoin.strokeMiterlimit.strokeOpacity.strokeWidth.surfaceScale.systemLanguage.tableValues.targetX.targetY.textAnchor.textDecoration.textLength.textRendering.to.transform.u1.u2.underlinePosition.underlineThickness.unicode.unicodeBidi.unicodeRange.unitsPerEm.vAlphabetic.values.vectorEffect.version.vertAdvY.vertOriginX.vertOriginY.vHanging.vIdeographic.viewTarget.visibility.vMathematical.widths.wordSpacing.writingMode.x1.x2.x.xChannelSelector.xHeight.xlinkActuate.xlinkArcrole.xlinkHref.xlinkRole.xlinkShow.xlinkTitle.xlinkType.xmlBase.xmlLang.xmlns.xmlnsXlink.xmlSpace.y1.y2.y.yChannelSelector.z.zoomAndPan.ref.key.angle".split("."));
function pe(e) {
	return typeof e == "string" && fe.has(e);
}
function me(e) {
	return typeof e == "string" && e.startsWith("data-");
}
function he(e) {
	if (typeof e != "object" || !e) return {};
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (pe(n) || me(n)) && (t[n] = e[n]);
	return t;
}
function ge(e) {
	if (e == null) return null;
	if (/*#__PURE__*/ (0, P.isValidElement)(e) && typeof e.props == "object" && e.props !== null) {
		var t = e.props;
		return he(t);
	}
	return typeof e == "object" && !Array.isArray(e) ? he(e) : null;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/svgPropertiesAndEvents.js
function _e(e) {
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (pe(n) || me(n) || de(n)) && (t[n] = e[n]);
	return t;
}
function ve(e) {
	return e == null ? null : /*#__PURE__*/ (0, P.isValidElement)(e) ? _e(e.props) : typeof e == "object" && !Array.isArray(e) ? _e(e) : null;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/container/Surface.js
var ye = [
	"children",
	"width",
	"height",
	"viewBox",
	"className",
	"style",
	"title",
	"desc"
];
function be() {
	return be = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, be.apply(null, arguments);
}
function xe(e, t) {
	if (e == null) return {};
	var n, r, i = Se(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Se(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Ce = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.children, r = e.width, i = e.height, a = e.viewBox, o = e.className, s = e.style, c = e.title, u = e.desc, d = xe(e, ye), f = a || {
		width: r,
		height: i,
		x: 0,
		y: 0
	}, p = l("recharts-surface", o);
	return /*#__PURE__*/ P.createElement("svg", be({}, _e(d), {
		className: p,
		width: r,
		height: i,
		style: s,
		viewBox: `${f.x} ${f.y} ${f.width} ${f.height}`,
		ref: t
	}), /*#__PURE__*/ P.createElement("title", null, c), /*#__PURE__*/ P.createElement("desc", null, u), n);
}), we = b(), Te = ["children", "className"];
function Ee() {
	return Ee = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ee.apply(null, arguments);
}
function De(e, t) {
	if (e == null) return {};
	var n, r, i = Oe(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Oe(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var ke = /*#__PURE__*/ P.forwardRef((e, t) => {
	var n = e.children, r = e.className, i = De(e, Te), a = l("recharts-layer", r);
	return /*#__PURE__*/ P.createElement("g", Ee({ className: a }, _e(i), { ref: t }), n);
});
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
function Ae(e) {
	return e === "__proto__";
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/hasOwn.mjs
var je = Object.prototype.hasOwnProperty;
function Me(e, t) {
	return je.call(e, t);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/isDeepKey.mjs
var Ne = /\.|(\[(?:[^[\]]*|(["'])(?:(?!\2)[^\\]|\\.)*?\2)\])/;
function Pe(e) {
	switch (typeof e) {
		case "number":
		case "symbol": return !1;
		case "string": return e === "" || e.startsWith(".") || e.endsWith(".") ? !1 : Ne.test(e);
		default: return !1;
	}
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/toKey.mjs
function Fe(e) {
	var t;
	return typeof e == "string" || typeof e == "symbol" ? e : Object.is(e == null || (t = e.valueOf) == null ? void 0 : t.call(e), -0) ? "-0" : String(e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/isSymbol.mjs
function Ie(e) {
	return typeof e == "symbol" || e instanceof Symbol;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/baseToString.mjs
function Le(e) {
	if (typeof e == "string") return e;
	if (Array.isArray(e)) {
		let t = "";
		for (let n = 0; n < e.length; n++) n > 0 && (t += ","), t += Le(e[n]);
		return t;
	}
	if (Ie(e)) return e.toString();
	let t = e + "";
	return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/util/toString.mjs
function Re(e) {
	return e == null ? "" : Le(e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/util/toPath.mjs
function ze(e) {
	if (Array.isArray(e)) return e.map(Fe);
	if (typeof e == "symbol") return [e];
	e = Re(e);
	let t = [], n = e.length;
	if (n === 0) return t;
	let r = 0, i = "", a = "", o = !1, s = !1, c = /^-?\d+(?:\.\d+)?$/;
	for (e.charCodeAt(0) === 46 && t.push(""); r < n;) {
		let l = e[r];
		if (a) l === "\\" && r + 1 < n ? (r++, i += e[r]) : l === a ? a = "" : i += l;
		else if (o) {
			if (l === "\"" || l === "'") a = l, s = !0;
			else if (l === "]") {
				if (o = !1, !s && i.includes(".") && !c.test(i)) {
					let e = i.split(".");
					for (let n = 0; n < e.length; n++) e[n] !== "" && t.push(e[n]);
				} else t.push(i);
				i = "";
			} else i += l;
		} else if (l === "[") o = !0, s = !1, i &&= (t.push(i), "");
		else if (l === ".") {
			i &&= (t.push(i), "");
			let n = e[r + 1];
			(n === void 0 || n === ".") && t.push("");
		} else i += l;
		r++;
	}
	return i && t.push(i), t;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/object/get.mjs
function Be(e, t, n) {
	if (e == null) return n;
	switch (typeof t) {
		case "string": {
			if (Ae(t)) return n;
			let r = e[t];
			return r === void 0 ? Pe(t) && !Me(e, t) ? Be(e, ze(t), n) : n : r;
		}
		case "number":
		case "symbol": {
			typeof t == "number" && (t = Fe(t));
			let r = e[t];
			return r === void 0 ? n : r;
		}
		default: {
			if (Array.isArray(t)) return Ve(e, t, n);
			if (t = Object.is(t?.valueOf(), -0) ? "-0" : String(t), Ae(t)) return n;
			let r = e[t];
			return r === void 0 ? n : r;
		}
	}
}
function Ve(e, t, n) {
	if (t.length === 0) return n;
	let r = e;
	for (let e = 0; e < t.length; e++) {
		if (r == null || Ae(t[e])) return n;
		r = r[t[e]];
	}
	return r === void 0 ? n : r;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/round.js
var He = 4;
function Ue(e) {
	var t = 10 ** (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : He), n = Math.round(e * t) / t;
	return Object.is(n, -0) ? 0 : n;
}
function We(e) {
	var t = [...arguments].slice(1);
	return e.reduce((e, n, r) => {
		var i = t[r - 1];
		return typeof i == "string" ? e + i + n : i === void 0 ? e + n : e + Ue(i) + n;
	}, "");
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/DataUtils.js
var Ge = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, Ke = (e) => typeof e == "number" && e != +e, qe = (e) => typeof e == "string" && e.length > 1 && e.indexOf("%") === e.length - 1, F = (e) => (typeof e == "number" || e instanceof Number) && !Ke(e), Je = (e) => F(e) || typeof e == "string", Ye = 0, Xe = (e) => {
	var t = ++Ye;
	return `${e || ""}${t}`;
}, Ze = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, r = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
	if (!F(e) && typeof e != "string") return n;
	var i;
	if (qe(e)) {
		if (t == null) return n;
		var a = e.indexOf("%");
		i = t * parseFloat(e.slice(0, a)) / 100;
	} else i = +e;
	return Ke(i) && (i = n), r && t != null && i > t && (i = t), i;
}, Qe = (e) => {
	if (!Array.isArray(e)) return !1;
	for (var t = e.length, n = {}, r = 0; r < t; r++) if (!n[String(e[r])]) n[String(e[r])] = !0;
	else return !0;
	return !1;
};
function I(e, t, n) {
	return F(e) && F(t) ? Ue(e + n * (t - e)) : t;
}
function $e(e, t, n) {
	if (e && e.length) return e.find((e) => e && (typeof t == "function" ? t(e) : Be(e, t)) === n);
}
var L = (e) => e == null, et = (e) => L(e) ? e : `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
function tt(e) {
	return e != null;
}
function nt() {}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/cartesianViewBoxToTrapezoid.js
function rt(e) {
	if (e) return {
		x: e.x,
		y: e.y,
		upperWidth: "upperWidth" in e ? e.upperWidth : e.width,
		lowerWidth: "lowerWidth" in e ? e.lowerWidth : e.width,
		width: e.width,
		height: e.height
	};
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/getCartesianPosition.js
function it(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function at(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? it(Object(n), !0).forEach(function(t) {
			ot(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : it(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ot(e, t, n) {
	return (t = st(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function st(e) {
	var t = ct(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ct(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var lt = (e) => {
	var t = e.viewBox, n = e.position, r = e.offset, i = r === void 0 ? 0 : r, a = e.parentViewBox, o = e.clamp, s = rt(t), c = s.x, l = s.y, u = s.height, d = s.upperWidth, f = s.lowerWidth, p = c, m = c + (d - f) / 2, h = (p + m) / 2, g = (d + f) / 2, _ = p + d / 2, v = u >= 0 ? 1 : -1, y = v * i, b = v > 0 ? "end" : "start", x = v > 0 ? "start" : "end", S = d >= 0 ? 1 : -1, C = S * i, w = S > 0 ? "end" : "start", T = S > 0 ? "start" : "end", E = a;
	if (n === "top") {
		var D = {
			x: p + d / 2,
			y: l - y,
			horizontalAnchor: "middle",
			verticalAnchor: b
		};
		return o && E && (D.height = Math.max(l - E.y, 0), D.width = d), D;
	}
	if (n === "bottom") {
		var O = {
			x: m + f / 2,
			y: l + u + y,
			horizontalAnchor: "middle",
			verticalAnchor: x
		};
		return o && E && (O.height = Math.max(E.y + E.height - (l + u), 0), O.width = f), O;
	}
	if (n === "left") {
		var k = {
			x: h - C,
			y: l + u / 2,
			horizontalAnchor: w,
			verticalAnchor: "middle"
		};
		return o && E && (k.width = Math.max(k.x - E.x, 0), k.height = u), k;
	}
	if (n === "right") {
		var A = {
			x: h + g + C,
			y: l + u / 2,
			horizontalAnchor: T,
			verticalAnchor: "middle"
		};
		return o && E && (A.width = Math.max(E.x + E.width - A.x, 0), A.height = u), A;
	}
	var j = o && E ? {
		width: g,
		height: u
	} : {};
	return n === "insideLeft" ? at({
		x: h + C,
		y: l + u / 2,
		horizontalAnchor: T,
		verticalAnchor: "middle"
	}, j) : n === "insideRight" ? at({
		x: h + g - C,
		y: l + u / 2,
		horizontalAnchor: w,
		verticalAnchor: "middle"
	}, j) : n === "insideTop" ? at({
		x: p + d / 2,
		y: l + y,
		horizontalAnchor: "middle",
		verticalAnchor: x
	}, j) : n === "insideBottom" ? at({
		x: m + f / 2,
		y: l + u - y,
		horizontalAnchor: "middle",
		verticalAnchor: b
	}, j) : n === "insideTopLeft" ? at({
		x: p + C,
		y: l + y,
		horizontalAnchor: T,
		verticalAnchor: x
	}, j) : n === "insideTopRight" ? at({
		x: p + d - C,
		y: l + y,
		horizontalAnchor: w,
		verticalAnchor: x
	}, j) : n === "insideBottomLeft" ? at({
		x: m + C,
		y: l + u - y,
		horizontalAnchor: T,
		verticalAnchor: b
	}, j) : n === "insideBottomRight" ? at({
		x: m + f - C,
		y: l + u - y,
		horizontalAnchor: w,
		verticalAnchor: b
	}, j) : n && typeof n == "object" && (F(n.x) || qe(n.x)) && (F(n.y) || qe(n.y)) ? at({
		x: c + Ze(n.x, g),
		y: l + Ze(n.y, u),
		horizontalAnchor: "end",
		verticalAnchor: "end"
	}, j) : at({
		x: _,
		y: l + u / 2,
		horizontalAnchor: "middle",
		verticalAnchor: "middle"
	}, j);
}, ut = [
	"top",
	"left",
	"right",
	"bottom"
];
function dt(e) {
	return e == null ? !1 : typeof e == "object" || ut.includes(e);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/context/legendPortalContext.js
var ft = /*#__PURE__*/ (0, P.createContext)(null), pt = () => (0, P.useContext)(ft);
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/constant.js
function R(e) {
	return function() {
		return e;
	};
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/math.js
var mt = Math.cos, ht = Math.sin, gt = Math.sqrt, _t = Math.PI;
_t / 2;
var vt = 2 * _t, yt = Math.PI, bt = 2 * yt, xt = 1e-6, St = bt - xt;
function Ct(e) {
	this._ += e[0];
	for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function wt(e) {
	let t = Math.floor(e);
	if (!(t >= 0)) throw Error(`invalid digits: ${e}`);
	if (t > 15) return Ct;
	let n = 10 ** t;
	return function(e) {
		this._ += e[0];
		for (let t = 1, r = e.length; t < r; ++t) this._ += Math.round(arguments[t] * n) / n + e[t];
	};
}
var Tt = class {
	constructor(e) {
		this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Ct : wt(e);
	}
	moveTo(e, t) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}`;
	}
	closePath() {
		this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
	}
	lineTo(e, t) {
		this._append`L${this._x1 = +e},${this._y1 = +t}`;
	}
	quadraticCurveTo(e, t, n, r) {
		this._append`Q${+e},${+t},${this._x1 = +n},${this._y1 = +r}`;
	}
	bezierCurveTo(e, t, n, r, i, a) {
		this._append`C${+e},${+t},${+n},${+r},${this._x1 = +i},${this._y1 = +a}`;
	}
	arcTo(e, t, n, r, i) {
		if (e = +e, t = +t, n = +n, r = +r, i = +i, i < 0) throw Error(`negative radius: ${i}`);
		let a = this._x1, o = this._y1, s = n - e, c = r - t, l = a - e, u = o - t, d = l * l + u * u;
		if (this._x1 === null) this._append`M${this._x1 = e},${this._y1 = t}`;
		else if (d > xt) {
			if (!(Math.abs(u * s - c * l) > xt) || !i) this._append`L${this._x1 = e},${this._y1 = t}`;
			else {
				let f = n - a, p = r - o, m = s * s + c * c, h = f * f + p * p, g = Math.sqrt(m), _ = Math.sqrt(d), v = i * Math.tan((yt - Math.acos((m + d - h) / (2 * g * _))) / 2), y = v / _, b = v / g;
				Math.abs(y - 1) > xt && this._append`L${e + y * l},${t + y * u}`, this._append`A${i},${i},0,0,${+(u * f > l * p)},${this._x1 = e + b * s},${this._y1 = t + b * c}`;
			}
		}
	}
	arc(e, t, n, r, i, a) {
		if (e = +e, t = +t, n = +n, a = !!a, n < 0) throw Error(`negative radius: ${n}`);
		let o = n * Math.cos(r), s = n * Math.sin(r), c = e + o, l = t + s, u = 1 ^ a, d = a ? r - i : i - r;
		this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > xt || Math.abs(this._y1 - l) > xt) && this._append`L${c},${l}`, n && (d < 0 && (d = d % bt + bt), d > St ? this._append`A${n},${n},0,1,${u},${e - o},${t - s}A${n},${n},0,1,${u},${this._x1 = c},${this._y1 = l}` : d > xt && this._append`A${n},${n},0,${+(d >= yt)},${u},${this._x1 = e + n * Math.cos(i)},${this._y1 = t + n * Math.sin(i)}`);
	}
	rect(e, t, n, r) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}h${n = +n}v${+r}h${-n}Z`;
	}
	toString() {
		return this._;
	}
};
Tt.prototype;
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/path.js
function Et(e) {
	let t = 3;
	return e.digits = function(n) {
		if (!arguments.length) return t;
		if (n == null) t = null;
		else {
			let e = Math.floor(n);
			if (!(e >= 0)) throw RangeError(`invalid digits: ${n}`);
			t = e;
		}
		return e;
	}, () => new Tt(t);
}
Array.prototype.slice;
function Dt(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/linear.js
function Ot(e) {
	this._context = e;
}
Ot.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._context.lineTo(e, t);
		}
	}
};
function kt(e) {
	return new Ot(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/point.js
function At(e) {
	return e[0];
}
function jt(e) {
	return e[1];
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/line.js
function Mt(e, t) {
	var n = R(!0), r = null, i = kt, a = null, o = Et(s);
	e = typeof e == "function" ? e : e === void 0 ? At : R(e), t = typeof t == "function" ? t : t === void 0 ? jt : R(t);
	function s(s) {
		var c, l = (s = Dt(s)).length, u, d = !1, f;
		for (r ?? (a = i(f = o())), c = 0; c <= l; ++c) !(c < l && n(u = s[c], c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(u, c, s), +t(u, c, s));
		if (f) return a = null, f + "" || null;
	}
	return s.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(+t), s) : e;
	}, s.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : R(+e), s) : t;
	}, s.defined = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : R(!!e), s) : n;
	}, s.curve = function(e) {
		return arguments.length ? (i = e, r != null && (a = i(r)), s) : i;
	}, s.context = function(e) {
		return arguments.length ? (e == null ? r = a = null : a = i(r = e), s) : r;
	}, s;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/area.js
function Nt(e, t, n) {
	var r = null, i = R(!0), a = null, o = kt, s = null, c = Et(l);
	e = typeof e == "function" ? e : e === void 0 ? At : R(+e), t = typeof t == "function" ? t : R(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? jt : R(+n);
	function l(l) {
		var u, d, f, p = (l = Dt(l)).length, m, h = !1, g, _ = Array(p), v = Array(p);
		for (a ?? (s = o(g = c())), u = 0; u <= p; ++u) {
			if (!(u < p && i(m = l[u], u, l)) === h) {
				if (h = !h) d = u, s.areaStart(), s.lineStart();
				else {
					for (s.lineEnd(), s.lineStart(), f = u - 1; f >= d; --f) s.point(_[f], v[f]);
					s.lineEnd(), s.areaEnd();
				}
			}
			h && (_[u] = +e(m, u, l), v[u] = +t(m, u, l), s.point(r ? +r(m, u, l) : _[u], n ? +n(m, u, l) : v[u]));
		}
		if (g) return s = null, g + "" || null;
	}
	function u() {
		return Mt().defined(i).curve(o).context(a);
	}
	return l.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(+t), r = null, l) : e;
	}, l.x0 = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(+t), l) : e;
	}, l.x1 = function(e) {
		return arguments.length ? (r = e == null ? null : typeof e == "function" ? e : R(+e), l) : r;
	}, l.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : R(+e), n = null, l) : t;
	}, l.y0 = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : R(+e), l) : t;
	}, l.y1 = function(e) {
		return arguments.length ? (n = e == null ? null : typeof e == "function" ? e : R(+e), l) : n;
	}, l.lineX0 = l.lineY0 = function() {
		return u().x(e).y(t);
	}, l.lineY1 = function() {
		return u().x(e).y(n);
	}, l.lineX1 = function() {
		return u().x(r).y(t);
	}, l.defined = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : R(!!e), l) : i;
	}, l.curve = function(e) {
		return arguments.length ? (o = e, a != null && (s = o(a)), l) : o;
	}, l.context = function(e) {
		return arguments.length ? (e == null ? a = s = null : s = o(a = e), l) : a;
	}, l;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/bump.js
var Pt = class {
	constructor(e, t) {
		this._context = e, this._x = t;
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	}
	point(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, t, e, t) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + t) / 2, e, this._y0, e, t);
		}
		this._x0 = e, this._y0 = t;
	}
};
function Ft(e) {
	return new Pt(e, !0);
}
function It(e) {
	return new Pt(e, !1);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/symbol/circle.js
var Lt = { draw(e, t) {
	let n = gt(t / _t);
	e.moveTo(n, 0), e.arc(0, 0, n, 0, vt);
} }, Rt = { draw(e, t) {
	let n = gt(t / 5) / 2;
	e.moveTo(-3 * n, -n), e.lineTo(-n, -n), e.lineTo(-n, -3 * n), e.lineTo(n, -3 * n), e.lineTo(n, -n), e.lineTo(3 * n, -n), e.lineTo(3 * n, n), e.lineTo(n, n), e.lineTo(n, 3 * n), e.lineTo(-n, 3 * n), e.lineTo(-n, n), e.lineTo(-3 * n, n), e.closePath();
} }, zt = gt(1 / 3), Bt = zt * 2, Vt = { draw(e, t) {
	let n = gt(t / Bt), r = n * zt;
	e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath();
} }, Ht = { draw(e, t) {
	let n = gt(t), r = -n / 2;
	e.rect(r, r, n, n);
} }, Ut = .8908130915292852, Wt = ht(_t / 10) / ht(7 * _t / 10), Gt = ht(vt / 10) * Wt, Kt = -mt(vt / 10) * Wt, qt = { draw(e, t) {
	let n = gt(t * Ut), r = Gt * n, i = Kt * n;
	e.moveTo(0, -n), e.lineTo(r, i);
	for (let t = 1; t < 5; ++t) {
		let a = vt * t / 5, o = mt(a), s = ht(a);
		e.lineTo(s * n, -o * n), e.lineTo(o * r - s * i, s * r + o * i);
	}
	e.closePath();
} }, Jt = gt(3), Yt = { draw(e, t) {
	let n = -gt(t / (Jt * 3));
	e.moveTo(0, n * 2), e.lineTo(-Jt * n, -n), e.lineTo(Jt * n, -n), e.closePath();
} }, Xt = -.5, Zt = gt(3) / 2, Qt = 1 / gt(12), $t = (Qt / 2 + 1) * 3, en = { draw(e, t) {
	let n = gt(t / $t), r = n / 2, i = n * Qt, a = r, o = n * Qt + n, s = -a, c = o;
	e.moveTo(r, i), e.lineTo(a, o), e.lineTo(s, c), e.lineTo(Xt * r - Zt * i, Zt * r + Xt * i), e.lineTo(Xt * a - Zt * o, Zt * a + Xt * o), e.lineTo(Xt * s - Zt * c, Zt * s + Xt * c), e.lineTo(Xt * r + Zt * i, Xt * i - Zt * r), e.lineTo(Xt * a + Zt * o, Xt * o - Zt * a), e.lineTo(Xt * s + Zt * c, Xt * c - Zt * s), e.closePath();
} };
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/symbol.js
function tn(e, t) {
	let n = null, r = Et(i);
	e = typeof e == "function" ? e : R(e || Lt), t = typeof t == "function" ? t : R(t === void 0 ? 64 : +t);
	function i() {
		let i;
		if (n ||= i = r(), e.apply(this, arguments).draw(n, +t.apply(this, arguments)), i) return n = null, i + "" || null;
	}
	return i.type = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(t), i) : e;
	}, i.size = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : R(+e), i) : t;
	}, i.context = function(e) {
		return arguments.length ? (n = e ?? null, i) : n;
	}, i;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/noop.js
function nn() {}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basis.js
function rn(e, t, n) {
	e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + n) / 6);
}
function an(e) {
	this._context = e;
}
an.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 3: rn(this, this._x1, this._y1);
			case 2: this._context.lineTo(this._x1, this._y1);
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
				break;
			case 2: this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
			default: rn(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function on(e) {
	return new an(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basisClosed.js
function sn(e) {
	this._context = e;
}
sn.prototype = {
	areaStart: nn,
	areaEnd: nn,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x2, this._y2), this._context.closePath();
				break;
			case 2:
				this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
				break;
			case 3: this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
		}
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._x2 = e, this._y2 = t;
				break;
			case 1:
				this._point = 2, this._x3 = e, this._y3 = t;
				break;
			case 2:
				this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
				break;
			default: rn(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function cn(e) {
	return new sn(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basisOpen.js
function ln(e) {
	this._context = e;
}
ln.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var n = (this._x0 + 4 * this._x1 + e) / 6, r = (this._y0 + 4 * this._y1 + t) / 6;
				this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
				break;
			case 3: this._point = 4;
			default: rn(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function un(e) {
	return new ln(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/linearClosed.js
function dn(e) {
	this._context = e;
}
dn.prototype = {
	areaStart: nn,
	areaEnd: nn,
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		this._point && this._context.closePath();
	},
	point: function(e, t) {
		e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
	}
};
function fn(e) {
	return new dn(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/monotone.js
function pn(e) {
	return e < 0 ? -1 : 1;
}
function mn(e, t, n) {
	var r = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (r || i < 0 && -0), o = (n - e._y1) / (i || r < 0 && -0), s = (a * i + o * r) / (r + i);
	return (pn(a) + pn(o)) * Math.min(Math.abs(a), Math.abs(o), .5 * Math.abs(s)) || 0;
}
function hn(e, t) {
	var n = e._x1 - e._x0;
	return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t;
}
function gn(e, t, n) {
	var r = e._x0, i = e._y0, a = e._x1, o = e._y1, s = (a - r) / 3;
	e._context.bezierCurveTo(r + s, i + s * t, a - s, o - s * n, a, o);
}
function _n(e) {
	this._context = e;
}
_n.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3: gn(this, this._t0, hn(this, this._t0));
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		var n = NaN;
		if (e = +e, t = +t, e !== this._x1 || t !== this._y1) {
			switch (this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3, gn(this, hn(this, n = mn(this, e, t)), n);
					break;
				default: gn(this, this._t0, n = mn(this, e, t));
			}
			this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n;
		}
	}
};
function vn(e) {
	this._context = new yn(e);
}
(vn.prototype = Object.create(_n.prototype)).point = function(e, t) {
	_n.prototype.point.call(this, t, e);
};
function yn(e) {
	this._context = e;
}
yn.prototype = {
	moveTo: function(e, t) {
		this._context.moveTo(t, e);
	},
	closePath: function() {
		this._context.closePath();
	},
	lineTo: function(e, t) {
		this._context.lineTo(t, e);
	},
	bezierCurveTo: function(e, t, n, r, i, a) {
		this._context.bezierCurveTo(t, e, r, n, a, i);
	}
};
function bn(e) {
	return new _n(e);
}
function xn(e) {
	return new vn(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/natural.js
function Sn(e) {
	this._context = e;
}
Sn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = [], this._y = [];
	},
	lineEnd: function() {
		var e = this._x, t = this._y, n = e.length;
		if (n) {
			if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2) this._context.lineTo(e[1], t[1]);
			else for (var r = Cn(e), i = Cn(t), a = 0, o = 1; o < n; ++a, ++o) this._context.bezierCurveTo(r[0][a], i[0][a], r[1][a], i[1][a], e[o], t[o]);
		}
		(this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
	},
	point: function(e, t) {
		this._x.push(+e), this._y.push(+t);
	}
};
function Cn(e) {
	var t, n = e.length - 1, r, i = Array(n), a = Array(n), o = Array(n);
	for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
	for (i[n - 1] = 2, a[n - 1] = 7, o[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t) r = i[t] / a[t - 1], a[t] -= r, o[t] -= r * o[t - 1];
	for (i[n - 1] = o[n - 1] / a[n - 1], t = n - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
	for (a[n - 1] = (e[n] + i[n - 1]) / 2, t = 0; t < n - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
	return [i, a];
}
function wn(e) {
	return new Sn(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/step.js
function Tn(e, t) {
	this._context = e, this._t = t;
}
Tn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = this._y = NaN, this._point = 0;
	},
	lineEnd: function() {
		0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
			else {
				var n = this._x * (1 - this._t) + e * this._t;
				this._context.lineTo(n, this._y), this._context.lineTo(n, t);
			}
		}
		this._x = e, this._y = t;
	}
};
function En(e) {
	return new Tn(e, .5);
}
function Dn(e) {
	return new Tn(e, 0);
}
function On(e) {
	return new Tn(e, 1);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/offset/none.js
function kn(e, t) {
	if ((o = e.length) > 1) for (var n = 1, r, i, a = e[t[0]], o, s = a.length; n < o; ++n) for (i = a, a = e[t[n]], r = 0; r < s; ++r) a[r][1] += a[r][0] = isNaN(i[r][1]) ? i[r][0] : i[r][1];
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/order/none.js
function An(e) {
	for (var t = e.length, n = Array(t); --t >= 0;) n[t] = t;
	return n;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/stack.js
function jn(e, t) {
	return e[t];
}
function Mn(e) {
	let t = [];
	return t.key = e, t;
}
function Nn() {
	var e = R([]), t = An, n = kn, r = jn;
	function i(i) {
		var a = Array.from(e.apply(this, arguments), Mn), o, s = a.length, c = -1, l;
		for (let e of i) for (o = 0, ++c; o < s; ++o) (a[o][c] = [0, +r(e, a[o].key, c, i)]).data = e;
		for (o = 0, l = Dt(t(a)); o < s; ++o) a[l[o]].index = o;
		return n(a, l), a;
	}
	return i.keys = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(Array.from(t)), i) : e;
	}, i.value = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : R(+e), i) : r;
	}, i.order = function(e) {
		return arguments.length ? (t = e == null ? An : typeof e == "function" ? e : R(Array.from(e)), i) : t;
	}, i.offset = function(e) {
		return arguments.length ? (n = e ?? kn, i) : n;
	}, i;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/offset/expand.js
function Pn(e, t) {
	if ((r = e.length) > 0) {
		for (var n, r, i = 0, a = e[0].length, o; i < a; ++i) {
			for (o = n = 0; n < r; ++n) o += e[n][i][1] || 0;
			if (o) for (n = 0; n < r; ++n) e[n][i][1] /= o;
		}
		kn(e, t);
	}
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/offset/silhouette.js
function Fn(e, t) {
	if ((i = e.length) > 0) {
		for (var n = 0, r = e[t[0]], i, a = r.length; n < a; ++n) {
			for (var o = 0, s = 0; o < i; ++o) s += e[o][n][1] || 0;
			r[n][1] += r[n][0] = -s / 2;
		}
		kn(e, t);
	}
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/offset/wiggle.js
function In(e, t) {
	if ((o = e.length) > 0 && (a = (i = e[t[0]]).length) > 0) {
		for (var n = 0, r = 1, i, a, o; r < a; ++r) {
			for (var s = 0, c = 0, l = 0; s < o; ++s) {
				for (var u = e[t[s]], d = u[r][1] || 0, f = (d - (u[r - 1][1] || 0)) / 2, p = 0; p < s; ++p) {
					var m = e[t[p]], h = m[r][1] || 0, g = m[r - 1][1] || 0;
					f += h - g;
				}
				c += d, l += f * d;
			}
			i[r - 1][1] += i[r - 1][0] = n, c && (n -= l / c);
		}
		i[r - 1][1] += i[r - 1][0] = n, kn(e, t);
	}
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/shape/Symbols.js
var Ln = [
	"type",
	"size",
	"sizeType"
];
function Rn() {
	return Rn = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Rn.apply(null, arguments);
}
function zn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Bn(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? zn(Object(n), !0).forEach(function(t) {
			Vn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Vn(e, t, n) {
	return (t = Hn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Hn(e) {
	var t = Un(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Un(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Wn(e, t) {
	if (e == null) return {};
	var n, r, i = Gn(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Gn(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Kn = {
	symbolCircle: Lt,
	symbolCross: Rt,
	symbolDiamond: Vt,
	symbolSquare: Ht,
	symbolStar: qt,
	symbolTriangle: Yt,
	symbolWye: en
}, qn = Math.PI / 180, Jn = (e) => Kn[`symbol${et(e)}`] || Lt, Yn = (e, t, n) => {
	if (t === "area") return e;
	switch (n) {
		case "cross": return 5 * e * e / 9;
		case "diamond": return .5 * e * e / Math.sqrt(3);
		case "square": return e * e;
		case "star":
			var r = 18 * qn;
			return 1.25 * e * e * (Math.tan(r) - Math.tan(r * 2) * Math.tan(r) ** 2);
		case "triangle": return Math.sqrt(3) * e * e / 4;
		case "wye": return (21 - 10 * Math.sqrt(3)) * e * e / 8;
		default: return Math.PI * e * e / 4;
	}
}, Xn = (e, t) => {
	Kn[`symbol${et(e)}`] = t;
}, Zn = (e) => {
	var t = e.type, n = t === void 0 ? "circle" : t, r = e.size, i = r === void 0 ? 64 : r, a = e.sizeType, o = a === void 0 ? "area" : a, s = Bn(Bn({}, Wn(e, Ln)), {}, {
		type: n,
		size: i,
		sizeType: o
	}), c = "circle";
	typeof n == "string" && (c = n);
	var u = () => {
		var e = Jn(c), t = tn().type(e).size(Yn(i, o, c))();
		if (t !== null) return t;
	}, d = s.className, f = s.cx, p = s.cy, m = _e(s);
	return F(f) && F(p) && F(i) ? /*#__PURE__*/ P.createElement("path", Rn({}, m, {
		className: l("recharts-symbols", d),
		transform: `translate(${f}, ${p})`,
		d: u()
	})) : null;
};
Zn.registerSymbol = Xn;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/types.js
var Qn = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, $n = (e, t) => {
	if (!e || typeof e == "function" || typeof e == "boolean") return null;
	var n = e;
	if (/*#__PURE__*/ (0, P.isValidElement)(e) && (n = e.props), typeof n != "object" && typeof n != "function") return null;
	var r = {};
	return Object.keys(n).forEach((e) => {
		de(e) && typeof n[e] == "function" && (r[e] = t || ((t) => n[e](n, t)));
	}), r;
}, er = (e, t, n) => (r) => (e(t, n, r), null), tr = (e, t, n) => {
	if (e === null || typeof e != "object" && typeof e != "function") return null;
	var r = null;
	return Object.keys(e).forEach((i) => {
		var a = e[i];
		de(i) && typeof a == "function" && (r ||= {}, r[i] = er(a, t, n));
	}), r;
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/resolveDefaultProps.js
function nr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function rr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? nr(Object(n), !0).forEach(function(t) {
			ir(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : nr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ir(e, t, n) {
	return (t = ar(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ar(e) {
	var t = or(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function or(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function sr(e, t) {
	var n = rr({}, e), r = t;
	return Object.keys(t).reduce((e, t) => (e[t] === void 0 && r[t] !== void 0 && (e[t] = r[t]), e), n);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/DefaultLegendContent.js
function cr() {
	return cr = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, cr.apply(null, arguments);
}
function lr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ur(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? lr(Object(n), !0).forEach(function(t) {
			dr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : lr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function dr(e, t, n) {
	return (t = fr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function fr(e) {
	var t = pr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function pr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var mr = 32, hr = {
	align: "center",
	iconSize: 14,
	inactiveColor: "#ccc",
	layout: "horizontal",
	verticalAlign: "middle",
	labelStyle: {}
};
function gr(e) {
	if (typeof e == "object" && e && "strokeDasharray" in e) return String(e.strokeDasharray);
}
function _r(e) {
	var t = e.data, n = e.iconType, r = e.inactiveColor, i = mr / 2, a = mr / 6, o = mr / 3, s = t.inactive ? r : t.color, c = n ?? t.type;
	if (c === "none") return null;
	if (c === "plainline") return /*#__PURE__*/ P.createElement("line", {
		strokeWidth: 4,
		fill: "none",
		stroke: s,
		strokeDasharray: gr(t.payload),
		x1: 0,
		y1: i,
		x2: mr,
		y2: i,
		className: "recharts-legend-icon"
	});
	if (c === "line") return /*#__PURE__*/ P.createElement("path", {
		strokeWidth: 4,
		fill: "none",
		stroke: s,
		d: `M0,${i}h${o}
            A${a},${a},0,1,1,${2 * o},${i}
            H${mr}M${2 * o},${i}
            A${a},${a},0,1,1,${o},${i}`,
		className: "recharts-legend-icon"
	});
	if (c === "rect") return /*#__PURE__*/ P.createElement("path", {
		stroke: "none",
		fill: s,
		d: `M0,${mr / 8}h${mr}v${mr * 3 / 4}h${-mr}z`,
		className: "recharts-legend-icon"
	});
	if (/*#__PURE__*/ P.isValidElement(t.legendIcon)) {
		var l = ur({}, t);
		return delete l.legendIcon, /*#__PURE__*/ P.cloneElement(t.legendIcon, l);
	}
	return /*#__PURE__*/ P.createElement(Zn, {
		fill: s,
		cx: i,
		cy: i,
		size: mr,
		sizeType: "diameter",
		type: c
	});
}
function vr(e) {
	var t = e.payload, n = e.iconSize, r = e.layout, i = e.formatter, a = e.inactiveColor, o = e.iconType, s = e.labelStyle, c = {
		x: 0,
		y: 0,
		width: mr,
		height: mr
	}, u = {
		display: r === "horizontal" ? "inline-block" : "block",
		marginRight: 10,
		whiteSpace: "nowrap"
	}, d = {
		display: "inline-block",
		verticalAlign: "middle",
		marginRight: 4
	};
	return t.map((t, r) => {
		var f = t.formatter || i, p = l({
			"recharts-legend-item": !0,
			[`legend-item-${r}`]: !0,
			inactive: t.inactive
		});
		if (t.type === "none") return null;
		var m = typeof s == "object" ? ur({}, s) : {};
		m.color = t.inactive ? a : m.color || t.color, m.whiteSpace ??= "normal", m.overflowWrap ??= "break-word";
		var h = f ? f(t.value, t, r) : t.value;
		return /*#__PURE__*/ P.createElement("li", cr({
			className: p,
			style: u,
			key: `legend-item-${r}`
		}, tr(e, t, r)), /*#__PURE__*/ P.createElement(Ce, {
			width: n,
			height: n,
			viewBox: c,
			style: d,
			"aria-label": t.value == null ? "legend icon" : `${t.value} legend icon`
		}, /*#__PURE__*/ P.createElement(_r, {
			data: t,
			iconType: o,
			inactiveColor: a
		})), /*#__PURE__*/ P.createElement("span", {
			className: "recharts-legend-item-text",
			style: m
		}, h));
	});
}
var yr = (e) => {
	var t = sr(e, hr), n = t.payload, r = t.layout, i = t.align;
	if (!n || !n.length) return null;
	var a = {
		padding: 0,
		margin: 0,
		textAlign: r === "horizontal" ? i : "left"
	};
	return /*#__PURE__*/ P.createElement("ul", {
		className: "recharts-default-legend",
		style: a
	}, /*#__PURE__*/ P.createElement(vr, cr({}, t, { payload: n })));
};
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/array/uniqBy.mjs
function br(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r = 0; r < e.length; r++) {
		let i = e[r], a = t(i, r, e);
		n.has(a) || n.set(a, i);
	}
	return Array.from(n.values());
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/function/ary.mjs
function xr(e, t) {
	return function(...n) {
		return e.apply(this, n.slice(0, t));
	};
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/function/identity.mjs
function Sr(e) {
	return e;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/predicate/isLength.mjs
function Cr(e) {
	return Number.isSafeInteger(e) && e >= 0;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/isArrayLike.mjs
function wr(e) {
	return e != null && typeof e != "function" && Cr(e.length);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/object/property.mjs
function Tr(e) {
	return function(t) {
		return Be(t, e);
	};
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function Er(e) {
	return e == null || typeof e != "object" && typeof e != "function";
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function Dr(e) {
	return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var Or = "[object RegExp]", kr = "[object String]", Ar = "[object Number]", jr = "[object Boolean]", Mr = "[object Arguments]", Nr = "[object Symbol]", Pr = "[object Date]", Fr = "[object Map]", Ir = "[object Set]", Lr = "[object Array]", Rr = "[object Function]", zr = "[object ArrayBuffer]", Br = "[object Object]", Vr = "[object Error]", Hr = "[object DataView]", Ur = "[object Uint8Array]", Wr = "[object Uint8ClampedArray]", Gr = "[object Uint16Array]", Kr = "[object Uint32Array]", qr = "[object BigUint64Array]", Jr = "[object Int8Array]", Yr = "[object Int16Array]", Xr = "[object Int32Array]", Zr = "[object BigInt64Array]", Qr = "[object Float32Array]", $r = "[object Float64Array]";
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/util/eq.mjs
function ei(e, t) {
	return e === t || Number.isNaN(e) && Number.isNaN(t);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/isObject.mjs
function ti(e) {
	return e !== null && (typeof e == "object" || typeof e == "function");
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/isMatchWith.mjs
function ni(e, t, n) {
	return typeof n == "function" ? ri(e, t, function e(t, r, i, a, o, s) {
		let c = n(t, r, i, a, o, s);
		return c === void 0 ? ri(t, r, e, s, !1) : !!c;
	}, /* @__PURE__ */ new Map(), !0) : ni(e, t, () => void 0);
}
function ri(e, t, n, r, i = !1) {
	if (t === e) return !0;
	switch (typeof t) {
		case "object": return ii(e, t, n, r, i);
		case "function": return Object.keys(t).length > 0 ? ri(e, Object.assign({}, t), n, r, i) : ei(e, t);
		default: return ti(e) && i ? typeof t != "string" || t === "" : ei(e, t);
	}
}
function ii(e, t, n, r, i = !1) {
	if (t == null) return !0;
	if (Array.isArray(t)) return oi(e, t, n, r);
	if (t instanceof Map) return ai(e, t, n, r);
	if (t instanceof Set) return si(e, t, n, r);
	let a = Object.keys(t);
	if (e == null) return i && a.length === 0;
	if (i) Er(e) && (e = Object(e));
	else {
		if (Dr(t) === "[object Error]") return Dr(e) === "[object Error]" && e.name === t.name && e.message === t.message;
		let n = Dr(e);
		if (n !== "[object Object]" && n !== "[object Arguments]") return !1;
	}
	if (a.length === 0) return !0;
	if (r?.has(t)) return r.get(t) === e;
	r?.set(t, e);
	try {
		for (let i = 0; i < a.length; i++) {
			let o = a[i];
			if (!(o in e) || t[o] === void 0 && e[o] !== void 0 || t[o] === null && e[o] !== null || !n(e[o], t[o], o, e, t, r)) return !1;
		}
		return !0;
	} finally {
		r?.delete(t);
	}
}
function ai(e, t, n, r) {
	if (t.size === 0) return !0;
	if (!(e instanceof Map)) return !1;
	for (let [i, a] of t.entries()) if (n(e.get(i), a, i, e, t, r) === !1) return !1;
	return !0;
}
function oi(e, t, n, r) {
	if (t.length === 0) return !0;
	if (!Array.isArray(e)) return !1;
	let i = /* @__PURE__ */ new Set();
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = !1;
		for (let c = 0; c < e.length; c++) {
			if (i.has(c)) continue;
			let l = e[c], u = !1;
			if (n(l, o, a, e, t, r) && (u = !0), u) {
				i.add(c), s = !0;
				break;
			}
		}
		if (!s) return !1;
	}
	return !0;
}
function si(e, t, n, r) {
	return t.size === 0 || e instanceof Set && oi([...e], [...t], n, r);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/isMatch.mjs
function ci(e, t) {
	return ni(e, t, () => void 0);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function li(e) {
	return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/_internal/globalThis.mjs
var ui = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || (function() {
	return this;
})();
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/predicate/isBuffer.mjs
function di(e) {
	return ui.Buffer !== void 0 && ui.Buffer.isBuffer(e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/isBuffer.mjs
function fi(e) {
	return di(e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function pi(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/isTypedArray.mjs
function mi(e) {
	return pi(e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/object/cloneDeepWith.mjs
function hi(e, t) {
	return gi(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function gi(e, t, n, r, i) {
	if (i != null) {
		let a = i(e, t, n, r);
		if (a !== void 0) return a;
	}
	if (Er(e)) return e;
	if (r.has(e)) return r.get(e);
	if (Array.isArray(e)) {
		let t = Array(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = gi(e[a], a, n, r, i);
		return Me(e, "index") && (t.index = e.index), Me(e, "input") && (t.input = e.input), t;
	}
	if (e instanceof Date) return new Date(e.getTime());
	if (e instanceof RegExp) {
		let t = new RegExp(e.source, e.flags);
		return t.lastIndex = e.lastIndex, t;
	}
	if (e instanceof Map) {
		let t = /* @__PURE__ */ new Map();
		return r.set(e, t), e.forEach((e, a) => {
			t.set(a, gi(e, a, n, r, i));
		}), t;
	}
	if (e instanceof Set) {
		let t = /* @__PURE__ */ new Set();
		return r.set(e, t), e.forEach((e) => {
			t.add(gi(e, void 0, n, r, i));
		}), t;
	}
	if (fi(e)) return e.subarray();
	if (mi(e)) {
		let t = new (Object.getPrototypeOf(e)).constructor(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = gi(e[a], a, n, r, i);
		return t;
	}
	if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
	if (e instanceof DataView) {
		let t = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
		return r.set(e, t), _i(t, e, n, r, i), t;
	}
	if (typeof File < "u" && e instanceof File) {
		let t = new File([e], e.name, { type: e.type });
		return r.set(e, t), _i(t, e, n, r, i), t;
	}
	if (typeof Blob < "u" && e instanceof Blob) {
		let t = new Blob([e], { type: e.type });
		return r.set(e, t), _i(t, e, n, r, i), t;
	}
	let a = Dr(e);
	if (a === "[object Error]") return e === n ? {} : e;
	switch (a) {
		case Ar:
		case kr:
		case jr: {
			let t = new e.constructor(e.valueOf());
			return r.set(e, t), _i(t, e, n, r, i), t;
		}
		case Mr: {
			let t = {};
			return r.set(e, t), _i(t, e, n, r, i), t.length = e.length, t[Symbol.iterator] = e[Symbol.iterator], t;
		}
	}
	if (typeof e == "object" && vi(a)) {
		let t = a === "[object Object]" && typeof e.constructor != "function" ? {} : Object.create(Object.getPrototypeOf(e));
		return r.set(e, t), _i(t, e, n, r, i), t;
	}
	return e;
}
function _i(e, t, n, r, i) {
	let a = [...Object.keys(t), ...li(t)];
	for (let o = 0; o < a.length; o++) {
		let s = a[o], c = Object.getOwnPropertyDescriptor(e, s);
		(c == null || c.writable) && (e[s] = gi(t[s], s, n, r, i));
	}
}
function vi(e) {
	switch (e) {
		case Mr:
		case Lr:
		case zr:
		case Hr:
		case jr:
		case Pr:
		case Qr:
		case $r:
		case Jr:
		case Yr:
		case Xr:
		case Fr:
		case Ar:
		case Br:
		case Or:
		case Ir:
		case kr:
		case Nr:
		case Ur:
		case Wr:
		case Gr:
		case Kr: return !0;
		default: return !1;
	}
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/object/cloneDeep.mjs
function yi(e) {
	return hi(e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/matches.mjs
function bi(e) {
	return e = yi(e), (t) => ci(t, e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/isIndex.mjs
var xi = /^(?:0|[1-9]\d*)$/;
function Si(e, t = 2 ** 53 - 1) {
	switch (typeof e) {
		case "number": return Number.isInteger(e) && e >= 0 && e < t;
		case "symbol": return !1;
		case "string": return xi.test(e);
	}
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/isArguments.mjs
function Ci(e) {
	return typeof e == "object" && !!e && Dr(e) === "[object Arguments]";
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/object/has.mjs
function wi(e, t) {
	let n;
	if (n = Array.isArray(t) ? t : typeof t == "string" && Pe(t) && !(t in Object(e)) ? ze(t) : [t], n.length === 0) return !1;
	let r = e;
	for (let e = 0; e < n.length; e++) {
		let t = Fe(n[e]);
		if ((r == null || !Me(r, t)) && !((Array.isArray(r) || Ci(r)) && Si(t) && Number(t) < r.length)) return !1;
		r = r[t];
	}
	return !0;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/matchesProperty.mjs
function Ti(e, t) {
	switch (typeof e) {
		case "object":
			Object.is(e?.valueOf(), -0) && (e = "-0");
			break;
		case "number": e = Fe(e);
	}
	return t = yi(t), function(n) {
		let r = Be(n, e);
		return r === void 0 ? wi(n, e) : t === void 0 ? r === void 0 : ci(r, t);
	};
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/util/iteratee.mjs
function Ei(e) {
	if (e == null) return Sr;
	switch (typeof e) {
		case "function": return e;
		case "object": return Array.isArray(e) && e.length === 2 ? Ti(e[0], e[1]) : bi(e);
		default: return Tr(e);
	}
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/normalizeZero.mjs
function Di(e) {
	return e === 0 ? 0 : e;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/array/uniqBy.mjs
function Oi(e, t = Sr) {
	return wr(e) ? br(Array.from(e), xr(Ei(t), 1)).map(Di) : [];
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/payload/getUniqPayload.js
function ki(e, t, n) {
	return t === !0 ? Oi(e, n) : typeof t == "function" ? Oi(e, t) : e;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/RechartsReduxContext.js
var Ai = /*#__PURE__*/ (0, P.createContext)(null), ji = (e) => e, z = () => {
	var e = (0, P.useContext)(Ai);
	return e ? e.store.dispatch : ji;
}, Mi = () => {}, Ni = () => Mi, Pi = (e, t) => e === t;
function B(e) {
	var t = (0, P.useContext)(Ai), n = (0, P.useMemo)(() => t ? (t) => {
		if (t != null) return e(t);
	} : Mi, [t, e]);
	return (0, we.useSyncExternalStoreWithSelector)(t ? t.subscription.addNestedSub : Ni, t ? t.store.getState : Mi, t ? t.store.getState : Mi, n, Pi);
}
// node_modules/.pnpm/reselect@5.2.0/node_modules/reselect/dist/reselect.mjs
function Fi(e, t = `expected a function, instead received ${typeof e}`) {
	if (typeof e != "function") throw TypeError(t);
}
function Ii(e, t = "expected all items to be functions, instead received the following types: ") {
	if (!e.every((e) => typeof e == "function")) {
		let n = e.map((e) => typeof e == "function" ? `function ${e.name || "unnamed"}()` : typeof e).join(", ");
		throw TypeError(`${t}[${n}]`);
	}
}
var Li = (e) => Array.isArray(e) ? e : [e];
function Ri(e) {
	let t = Array.isArray(e[0]) ? e[0] : e;
	return Ii(t, "createSelector expects all input-selectors to be functions, but received the following types: "), t;
}
function zi(e, t) {
	let n = [], { length: r } = e;
	for (let i = 0; i < r; i++) n.push(e[i].apply(null, t));
	return n;
}
var Bi = class {
	constructor(e) {
		this.value = e;
	}
	deref() {
		return this.value;
	}
}, Vi = typeof WeakRef > "u" ? Bi : WeakRef, Hi = 0, Ui = 1;
function Wi() {
	return {
		s: Hi,
		v: void 0,
		o: null,
		p: null
	};
}
function Gi(e) {
	return e instanceof Vi ? e.deref() : e;
}
function Ki(e, t = {}) {
	let n = Wi(), { resultEqualityCheck: r } = t, i, a = 0;
	function o() {
		let t = n, { length: o } = arguments;
		for (let e = 0, n = o; e < n; e++) {
			let n = arguments[e];
			if (typeof n == "function" || typeof n == "object" && n) {
				let e = t.o;
				e === null && (t.o = e = /* @__PURE__ */ new WeakMap());
				let r = e.get(n);
				r === void 0 ? (t = Wi(), e.set(n, t)) : t = r;
			} else {
				let e = t.p;
				e === null && (t.p = e = /* @__PURE__ */ new Map());
				let r = e.get(n);
				r === void 0 ? (t = Wi(), e.set(n, t)) : t = r;
			}
		}
		let s = t, c;
		if (t.s === Ui) c = t.v;
		else if (c = e.apply(null, arguments), a++, r) {
			let e = Gi(i);
			e != null && r(e, c) && (c = e, a !== 0 && a--), i = typeof c == "object" && c || typeof c == "function" ? /* @__PURE__ */ new Vi(c) : c;
		}
		return s.s = Ui, s.v = c, c;
	}
	return o.clearCache = () => {
		n = Wi(), o.resetResultsCount();
	}, o.resultsCount = () => a, o.resetResultsCount = () => {
		a = 0;
	}, o;
}
function qi(e, ...t) {
	let n = typeof e == "function" ? {
		memoize: e,
		memoizeOptions: t
	} : e, r = (...e) => {
		let t = 0, r = 0, i, a = {}, o = e.pop();
		typeof o == "object" && (a = o, o = e.pop()), Fi(o, `createSelector expects an output function after the inputs, but received: [${typeof o}]`);
		let { memoize: s, memoizeOptions: c = [], argsMemoize: l = Ki, argsMemoizeOptions: u = [] } = {
			...n,
			...a
		}, d = Li(c), f = Li(u), p = Ri(e), m = s(function() {
			return t++, o.apply(null, arguments);
		}, ...d), h = l(function() {
			r++;
			let e = zi(p, arguments);
			return i = m.apply(null, e), i;
		}, ...f);
		return Object.assign(h, {
			resultFunc: o,
			memoizedResultFunc: m,
			dependencies: p,
			dependencyRecomputations: () => r,
			resetDependencyRecomputations: () => {
				r = 0;
			},
			lastResult: () => i,
			recomputations: () => t,
			resetRecomputations: () => {
				t = 0;
			},
			memoize: s,
			argsMemoize: l
		});
	};
	return Object.assign(r, { withTypes: () => r }), r;
}
var V = /* @__PURE__ */ qi(Ki);
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/array/flatten.mjs
function Ji(e, t = 1) {
	let n = [], r = Math.floor(t), i = (e, t) => {
		for (let a = 0; a < e.length; a++) {
			let o = e[a];
			Array.isArray(o) && t < r ? i(o, t + 1) : n.push(o);
		}
	};
	return i(e, 0), n;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/isIterateeCall.mjs
function Yi(e, t, n) {
	return ti(n) && (typeof t == "number" && wr(n) && Si(t) && t < n.length || typeof t == "string" && t in n) ? ei(n[t], e) : !1;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/objectValues.mjs
function Xi(e) {
	let t = Object.keys(e), n = Array(t.length);
	for (let r = 0; r < t.length; r++) n[r] = e[t[r]];
	return n;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/compareValues.mjs
function Zi(e) {
	return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e === e ? 0 : 4;
}
var Qi = (e, t, n) => {
	if (e !== t) {
		let r = Zi(e), i = Zi(t);
		if (r === i && r === 0) {
			if (e < t) return n === "desc" ? 1 : -1;
			if (e > t) return n === "desc" ? -1 : 1;
		}
		return n === "desc" ? i - r : r - i;
	}
	return 0;
}, $i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ea = /^\w*$/;
function ta(e, t) {
	return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || Ie(e) ? !0 : typeof e == "string" && (ea.test(e) || !$i.test(e)) || t != null && Me(t, e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/array/orderBy.mjs
function na(e, t, n, r) {
	if (e == null) return [];
	n = r ? void 0 : n, Array.isArray(e) || (e = wr(e) ? Array.from(e) : Xi(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(n) || (n = n == null ? [] : [n]), n = n.map((e) => String(e));
	let i = (e, t) => {
		let n = e, r = 0;
		for (; r < t.length && n != null; ++r) n = n[t[r]];
		return r > 0 && r === t.length ? n : void 0;
	}, a = (e, t) => {
		if (e == null) return t;
		if (t != null) return typeof e == "object" && "key" in e ? Me(t, e.key) ? t[e.key] : i(t, e.path) : typeof e == "function" ? e(t) : Array.isArray(e) ? i(t, e) : t[e];
	}, o = t.map((e) => (Array.isArray(e) && e.length === 1 && (e = e[0]), e == null || typeof e == "function" || Array.isArray(e) || ta(e) ? e : {
		key: e,
		path: ze(e)
	}));
	return e.map((e) => ({
		original: e,
		criteria: o.map((t) => a(t, e))
	})).slice().sort((e, t) => {
		for (let r = 0; r < o.length; r++) {
			let i = Qi(e.criteria[r], t.criteria[r], n[r]);
			if (i !== 0) return i;
		}
		return 0;
	}).map((e) => e.original);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/array/sortBy.mjs
function ra(e, ...t) {
	let n = t.length;
	return n > 1 && Yi(e, t[0], t[1]) ? t = [] : n > 2 && Yi(t[0], t[1], t[2]) && (t = [t[0]]), na(e, Ji(t), ["asc"]);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/legendSelectors.js
var ia = (e) => e.legend.settings, aa = (e) => e.legend.size, oa = V([(e) => e.legend.payload, ia], (e, t) => {
	var n = t.itemSorter, r = e.flat(1);
	return n ? ra(r, n) : r;
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/context/legendPayloadContext.js
function sa() {
	return B(oa);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/useElementOffset.js
function ca(e, t) {
	return pa(e) || fa(e, t) || ua(e, t) || la();
}
function la() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ua(e, t) {
	if (e) {
		if (typeof e == "string") return da(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? da(e, t) : void 0;
	}
}
function da(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function fa(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function pa(e) {
	if (Array.isArray(e)) return e;
}
var ma = 1;
function ha(e, t) {
	return Math.abs(e.height - t.height) > ma || Math.abs(e.left - t.left) > ma || Math.abs(e.top - t.top) > ma || Math.abs(e.width - t.width) > ma;
}
function ga(e) {
	var t = e.getBoundingClientRect();
	return {
		height: t.height,
		left: t.left,
		top: t.top,
		width: t.width
	};
}
function _a() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = ca((0, P.useState)({
		height: 0,
		left: 0,
		top: 0,
		width: 0
	}), 2), n = t[0], r = t[1], i = (0, P.useRef)(null), a = (0, P.useRef)(n);
	a.current = n;
	var o = (0, P.useCallback)((e) => {
		if (i.current != null && (i.current.disconnect(), i.current = null), e != null) {
			var t = ga(e);
			if (ha(t, a.current) && r(t), typeof ResizeObserver < "u") {
				var n = new ResizeObserver(() => {
					var t = ga(e);
					ha(t, a.current) && r(t);
				});
				n.observe(e), i.current = n;
			}
		}
	}, [...e]);
	return (0, P.useEffect)(() => () => {
		var e;
		(e = i.current) == null || e.disconnect();
	}, []), [n, o];
}
// node_modules/.pnpm/redux@5.0.1/node_modules/redux/dist/redux.mjs
function va(e) {
	return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var ya = typeof Symbol == "function" && Symbol.observable || "@@observable", ba = () => Math.random().toString(36).substring(7).split("").join("."), xa = {
	INIT: `@@redux/INIT${/* @__PURE__ */ ba()}`,
	REPLACE: `@@redux/REPLACE${/* @__PURE__ */ ba()}`,
	PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${ba()}`
};
function Sa(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Ca(e, t, n) {
	if (typeof e != "function") throw Error(va(2));
	if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function") throw Error(va(0));
	if (typeof t == "function" && n === void 0 && (n = t, t = void 0), n !== void 0) {
		if (typeof n != "function") throw Error(va(1));
		return n(Ca)(e, t);
	}
	let r = e, i = t, a = /* @__PURE__ */ new Map(), o = a, s = 0, c = !1;
	function l() {
		o === a && (o = /* @__PURE__ */ new Map(), a.forEach((e, t) => {
			o.set(t, e);
		}));
	}
	function u() {
		if (c) throw Error(va(3));
		return i;
	}
	function d(e) {
		if (typeof e != "function") throw Error(va(4));
		if (c) throw Error(va(5));
		let t = !0;
		l();
		let n = s++;
		return o.set(n, e), function() {
			if (t) {
				if (c) throw Error(va(6));
				t = !1, l(), o.delete(n), a = null;
			}
		};
	}
	function f(e) {
		if (!Sa(e)) throw Error(va(7));
		if (e.type === void 0) throw Error(va(8));
		if (typeof e.type != "string") throw Error(va(17));
		if (c) throw Error(va(9));
		try {
			c = !0, i = r(i, e);
		} finally {
			c = !1;
		}
		return (a = o).forEach((e) => {
			e();
		}), e;
	}
	function p(e) {
		if (typeof e != "function") throw Error(va(10));
		r = e, f({ type: xa.REPLACE });
	}
	function m() {
		let e = d;
		return {
			subscribe(t) {
				if (typeof t != "object" || !t) throw Error(va(11));
				function n() {
					let e = t;
					e.next && e.next(u());
				}
				return n(), { unsubscribe: e(n) };
			},
			[ya]() {
				return this;
			}
		};
	}
	return f({ type: xa.INIT }), {
		dispatch: f,
		subscribe: d,
		getState: u,
		replaceReducer: p,
		[ya]: m
	};
}
function wa(e) {
	Object.keys(e).forEach((t) => {
		let n = e[t];
		if (n(void 0, { type: xa.INIT }) === void 0) throw Error(va(12));
		if (n(void 0, { type: xa.PROBE_UNKNOWN_ACTION() }) === void 0) throw Error(va(13));
	});
}
function Ta(e) {
	let t = Object.keys(e), n = {};
	for (let r = 0; r < t.length; r++) {
		let i = t[r];
		typeof e[i] == "function" && (n[i] = e[i]);
	}
	let r = Object.keys(n), i;
	try {
		wa(n);
	} catch (e) {
		i = e;
	}
	return function(e = {}, t) {
		if (i) throw i;
		let a = !1, o = {};
		for (let i = 0; i < r.length; i++) {
			let s = r[i], c = n[s], l = e[s], u = c(l, t);
			if (u === void 0) throw t && t.type, Error(va(14));
			o[s] = u, a ||= u !== l;
		}
		return a ||= r.length !== Object.keys(e).length, a ? o : e;
	};
}
function Ea(...e) {
	return e.length === 0 ? (e) => e : e.length === 1 ? e[0] : e.reduce((e, t) => (...n) => e(t(...n)));
}
function Da(...e) {
	return (t) => (n, r) => {
		let i = t(n, r), a = () => {
			throw Error(va(15));
		}, o = {
			getState: i.getState,
			dispatch: (e, ...t) => a(e, ...t)
		};
		return a = Ea(...e.map((e) => e(o)))(i.dispatch), {
			...i,
			dispatch: a
		};
	};
}
function Oa(e) {
	return Sa(e) && "type" in e && typeof e.type == "string";
}
// node_modules/.pnpm/immer@11.2.9/node_modules/immer/dist/immer.mjs
var ka = Symbol.for("immer-nothing"), Aa = Symbol.for("immer-draftable"), ja = Symbol.for("immer-state");
function Ma(e, ...t) {
	throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`);
}
var Na = Object, Pa = Na.getPrototypeOf, Fa = "constructor", Ia = "prototype", La = "configurable", Ra = "enumerable", za = "writable", Ba = "value", Va = (e) => !!e && !!e[ja];
function Ha(e) {
	return e ? Ga(e) || Qa(e) || !!e[Aa] || !!e[Fa]?.[Aa] || $a(e) || eo(e) : !1;
}
var Ua = Na[Ia][Fa].toString(), Wa = /* @__PURE__ */ new WeakMap();
function Ga(e) {
	if (!e || !to(e)) return !1;
	let t = Pa(e);
	if (t === null || t === Na[Ia]) return !0;
	let n = Na.hasOwnProperty.call(t, Fa) && t[Fa];
	if (n === Object) return !0;
	if (!no(n)) return !1;
	let r = Wa.get(n);
	return r === void 0 && (r = Function.toString.call(n), Wa.set(n, r)), r === Ua;
}
function Ka(e, t, n = !0) {
	qa(e) === 0 ? (n ? Reflect.ownKeys(e) : Na.keys(e)).forEach((n) => {
		t(n, e[n], e);
	}) : e.forEach((n, r) => t(r, n, e));
}
function qa(e) {
	let t = e[ja];
	return t ? t.type_ : Qa(e) ? 1 : $a(e) ? 2 : eo(e) ? 3 : 0;
}
var Ja = (e, t, n = qa(e)) => n === 2 ? e.has(t) : Na[Ia].hasOwnProperty.call(e, t), Ya = (e, t, n = qa(e)) => n === 2 ? e.get(t) : e[t], Xa = (e, t, n, r = qa(e)) => {
	r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
};
function Za(e, t) {
	return e === t ? e !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
var Qa = Array.isArray, $a = (e) => e instanceof Map, eo = (e) => e instanceof Set, to = (e) => typeof e == "object", no = (e) => typeof e == "function", ro = (e) => typeof e == "boolean";
function io(e) {
	let t = +e;
	return Number.isInteger(t) && String(t) === e;
}
var ao = (e) => e.copy_ || e.base_, oo = (e) => e.modified_ ? e.copy_ : e.base_;
function so(e, t) {
	if ($a(e)) return new Map(e);
	if (eo(e)) return new Set(e);
	if (Qa(e)) return Array[Ia].slice.call(e);
	let n = Ga(e);
	if (t === !0 || t === "class_only" && !n) {
		let t = Na.getOwnPropertyDescriptors(e);
		delete t[ja];
		let n = Reflect.ownKeys(t);
		for (let r = 0; r < n.length; r++) {
			let i = n[r], a = t[i];
			a[za] === !1 && (a[za] = !0, a[La] = !0), (a.get || a.set) && (t[i] = {
				[La]: !0,
				[za]: !0,
				[Ra]: a[Ra],
				[Ba]: e[i]
			});
		}
		return Na.create(Pa(e), t);
	}
	{
		let t = Pa(e);
		if (t !== null && n) return { ...e };
		let r = Na.create(t);
		return Na.assign(r, e);
	}
}
function co(e, t = !1) {
	return fo(e) || Va(e) || !Ha(e) || (qa(e) > 1 && Na.defineProperties(e, {
		set: uo,
		add: uo,
		clear: uo,
		delete: uo
	}), Na.freeze(e), t && Ka(e, (e, t) => {
		co(t, !0);
	}, !1)), e;
}
function lo() {
	Ma(2);
}
var uo = { [Ba]: lo };
function fo(e) {
	return e === null || !to(e) || Na.isFrozen(e);
}
var po = "MapSet", mo = "Patches", ho = "ArrayMethods", go = {};
function _o(e) {
	let t = go[e];
	return t || Ma(0, e), t;
}
var vo = (e) => !!go[e], yo, bo = () => yo, xo = (e, t) => ({
	drafts_: [],
	parent_: e,
	immer_: t,
	canAutoFreeze_: !0,
	unfinalizedDrafts_: 0,
	handledSet_: /* @__PURE__ */ new Set(),
	processedForPatches_: /* @__PURE__ */ new Set(),
	mapSetPlugin_: vo(po) ? _o(po) : void 0,
	arrayMethodsPlugin_: vo(ho) ? _o(ho) : void 0
});
function So(e, t) {
	t && (e.patchPlugin_ = _o(mo), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function Co(e) {
	wo(e), e.drafts_.forEach(Eo), e.drafts_ = null;
}
function wo(e) {
	e === yo && (yo = e.parent_);
}
var To = (e) => yo = xo(yo, e);
function Eo(e) {
	let t = e[ja];
	t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Do(e, t) {
	t.unfinalizedDrafts_ = t.drafts_.length;
	let n = t.drafts_[0];
	if (e !== void 0 && e !== n) {
		n[ja].modified_ && (Co(t), Ma(4)), Ha(e) && (e = Oo(t, e));
		let { patchPlugin_: r } = t;
		r && r.generateReplacementPatches_(n[ja].base_, e, t);
	} else e = Oo(t, n);
	return ko(t, e, !0), Co(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e === ka ? void 0 : e;
}
function Oo(e, t) {
	if (fo(t)) return t;
	let n = t[ja];
	if (!n) return Lo(t, e.handledSet_, e);
	if (!jo(n, e)) return t;
	if (!n.modified_) return n.base_;
	if (!n.finalized_) {
		let { callbacks_: t } = n;
		if (t) for (; t.length > 0;) t.pop()(e);
		Fo(n, e);
	}
	return n.copy_;
}
function ko(e, t, n = !1) {
	!e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && co(t, n);
}
function Ao(e) {
	e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var jo = (e, t) => e.scope_ === t, Mo = [];
function No(e, t, n, r) {
	let i = ao(e), a = e.type_;
	if (r !== void 0 && Ya(i, r, a) === t) {
		Xa(i, r, n, a);
		return;
	}
	if (!e.draftLocations_) {
		let t = e.draftLocations_ = /* @__PURE__ */ new Map();
		Ka(i, (e, n) => {
			if (Va(n)) {
				let r = t.get(n) || [];
				r.push(e), t.set(n, r);
			}
		});
	}
	let o = e.draftLocations_.get(t) ?? Mo;
	for (let e of o) Xa(i, e, n, a);
}
function Po(e, t, n) {
	e.callbacks_.push(function(r) {
		let i = t;
		if (!i || !jo(i, r)) return;
		r.mapSetPlugin_?.fixSetContents(i);
		let a = oo(i);
		No(e, i.draft_ ?? i, a, n), Fo(i, r);
	});
}
function Fo(e, t) {
	if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
		let { patchPlugin_: n } = t;
		if (n) {
			let r = n.getPath(e);
			r && n.generatePatches_(e, r, t);
		}
		Ao(e);
	}
}
function Io(e, t, n) {
	let { scope_: r } = e;
	if (Va(n)) {
		let i = n[ja];
		jo(i, r) && i.callbacks_.push(function() {
			Ko(e), No(e, n, oo(i), t);
		});
	} else Ha(n) && e.callbacks_.push(function() {
		let i = ao(e);
		e.type_ === 3 ? i.has(n) && Lo(n, r.handledSet_, r) : Ya(i, t, e.type_) === n && r.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && Lo(Ya(e.copy_, t, e.type_), r.handledSet_, r);
	});
}
function Lo(e, t, n) {
	return !n.immer_.autoFreeze_ && n.unfinalizedDrafts_ < 1 || Va(e) || t.has(e) || !Ha(e) || fo(e) || (t.add(e), Ka(e, (r, i) => {
		if (Va(i)) {
			let t = i[ja];
			jo(t, n) && (Xa(e, r, oo(t), e.type_), Ao(t));
		} else Ha(i) && Lo(i, t, n);
	})), e;
}
function Ro(e, t) {
	let n = Qa(e), r = {
		type_: +!!n,
		scope_: t ? t.scope_ : bo(),
		modified_: !1,
		finalized_: !1,
		assigned_: void 0,
		parent_: t,
		base_: e,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: !1,
		callbacks_: void 0
	}, i = r, a = zo;
	n && (i = [r], a = Bo);
	let { revoke: o, proxy: s } = Proxy.revocable(i, a);
	return r.draft_ = s, r.revoke_ = o, [s, r];
}
var zo = {
	get(e, t) {
		if (t === ja) return e;
		let n = e.scope_.arrayMethodsPlugin_, r = e.type_ === 1 && typeof t == "string";
		if (r && n?.isArrayOperationMethod(t)) return n.createMethodInterceptor(e, t);
		let i = ao(e);
		if (!Ja(i, t, e.type_)) return Uo(e, i, t);
		let a = i[t];
		if (e.finalized_ || !Ha(a) || r && e.operationMethod && n?.isMutatingArrayMethod(e.operationMethod) && io(t)) return a;
		if (a === Vo(e.base_, t) || Ho(e, t, a)) {
			Ko(e);
			let n = e.type_ === 1 ? +t : t, r = Jo(e.scope_, a, e, n);
			return e.copy_[n] = r;
		}
		return a;
	},
	has(e, t) {
		return t in ao(e);
	},
	ownKeys(e) {
		return Reflect.ownKeys(ao(e));
	},
	set(e, t, n) {
		let r = Wo(ao(e), t);
		if (r?.set) return r.set.call(e.draft_, n), !0;
		if (!e.modified_) {
			let r = Vo(ao(e), t), i = r?.[ja];
			if (i && i.base_ === n) return e.copy_[t] = n, e.assigned_.delete(t), !0;
			if (Za(n, r) && (n !== void 0 || Ja(e.base_, t, e.type_))) return !0;
			Ko(e), Go(e);
		}
		return e.copy_[t] === n && (n !== void 0 || Ja(e.copy_, t, e.type_)) || Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_.set(t, !0), Io(e, t, n)), !0;
	},
	deleteProperty(e, t) {
		return Ko(e), Vo(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), Go(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = ao(e), r = Reflect.getOwnPropertyDescriptor(n, t);
		return r && {
			[za]: !0,
			[La]: e.type_ !== 1 || t !== "length",
			[Ra]: r[Ra],
			[Ba]: n[t]
		};
	},
	defineProperty() {
		Ma(11);
	},
	getPrototypeOf(e) {
		return Pa(e.base_);
	},
	setPrototypeOf() {
		Ma(12);
	}
}, Bo = {};
for (let e in zo) {
	let t = zo[e];
	Bo[e] = function() {
		let e = arguments;
		return e[0] = e[0][0], t.apply(this, e);
	};
}
Bo.deleteProperty = function(e, t) {
	return Bo.set.call(this, e, t, void 0);
}, Bo.set = function(e, t, n) {
	return zo.set.call(this, e[0], t, n, e[0]);
};
function Vo(e, t) {
	let n = e[ja];
	return (n ? ao(n) : e)[t];
}
function Ho(e, t, n) {
	return e.type_ !== 1 || !e.allIndicesReassigned_ || !Ha(n) || n[ja] ? !1 : e.baseRefs_.has(n);
}
function Uo(e, t, n) {
	let r = Wo(t, n);
	return r ? Ba in r ? r[Ba] : r.get?.call(e.draft_) : void 0;
}
function Wo(e, t) {
	if (!(t in e)) return;
	let n = Pa(e);
	for (; n;) {
		let e = Object.getOwnPropertyDescriptor(n, t);
		if (e) return e;
		n = Pa(n);
	}
}
function Go(e) {
	e.modified_ || (e.modified_ = !0, e.parent_ && Go(e.parent_));
}
function Ko(e) {
	e.copy_ ||= (e.assigned_ = /* @__PURE__ */ new Map(), so(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var qo = class {
	constructor(e) {
		this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (e, t, n) => {
			if (no(e) && !no(t)) {
				let n = t;
				t = e;
				let r = this;
				return function(e = n, ...i) {
					return r.produce(e, (e) => t.call(this, e, ...i));
				};
			}
			no(t) || Ma(6), n !== void 0 && !no(n) && Ma(7);
			let r;
			if (Ha(e)) {
				let i = To(this), a = Jo(i, e, void 0), o = !0;
				try {
					r = t(a), o = !1;
				} finally {
					o ? Co(i) : wo(i);
				}
				return So(i, n), Do(r, i);
			}
			if (!e || !to(e)) {
				if (r = t(e), r === void 0 && (r = e), r === ka && (r = void 0), this.autoFreeze_ && co(r, !0), n) {
					let t = [], i = [];
					_o(mo).generateReplacementPatches_(e, r, {
						patches_: t,
						inversePatches_: i
					}), n(t, i);
				}
				return r;
			}
			Ma(1, e);
		}, this.produceWithPatches = (e, t) => {
			if (no(e)) return (t, ...n) => this.produceWithPatches(t, (t) => e(t, ...n));
			let n, r;
			return [
				this.produce(e, t, (e, t) => {
					n = e, r = t;
				}),
				n,
				r
			];
		}, ro(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze), ro(e?.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy), ro(e?.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
	}
	createDraft(e) {
		Ha(e) || Ma(8), Va(e) && (e = Yo(e));
		let t = To(this), n = Jo(t, e, void 0);
		return n[ja].isManual_ = !0, wo(t), n;
	}
	finishDraft(e, t) {
		let n = e && e[ja];
		n && n.isManual_ || Ma(9);
		let { scope_: r } = n;
		return So(r, t), Do(void 0, r);
	}
	setAutoFreeze(e) {
		this.autoFreeze_ = e;
	}
	setUseStrictShallowCopy(e) {
		this.useStrictShallowCopy_ = e;
	}
	setUseStrictIteration(e) {
		this.useStrictIteration_ = e;
	}
	shouldUseStrictIteration() {
		return this.useStrictIteration_;
	}
	applyPatches(e, t) {
		let n;
		for (n = t.length - 1; n >= 0; n--) {
			let r = t[n];
			if (r.path.length === 0 && r.op === "replace") {
				e = r.value;
				break;
			}
		}
		n > -1 && (t = t.slice(n + 1));
		let r = _o(mo).applyPatches_;
		return Va(e) ? r(e, t) : this.produce(e, (e) => r(e, t));
	}
};
function Jo(e, t, n, r) {
	let [i, a] = $a(t) ? _o(po).proxyMap_(t, n) : eo(t) ? _o(po).proxySet_(t, n) : Ro(t, n);
	return (n?.scope_ ?? bo()).drafts_.push(i), a.callbacks_ = n?.callbacks_ ?? [], a.key_ = r, n && r !== void 0 ? Po(n, a, r) : a.callbacks_.push(function(e) {
		e.mapSetPlugin_?.fixSetContents(a);
		let { patchPlugin_: t } = e;
		a.modified_ && t && t.generatePatches_(a, [], e);
	}), i;
}
function Yo(e) {
	return Va(e) || Ma(10, e), Xo(e);
}
function Xo(e) {
	if (!Ha(e) || fo(e)) return e;
	let t = e[ja], n, r = !0;
	if (t) {
		if (!t.modified_) return t.base_;
		t.finalized_ = !0, n = so(e, t.scope_.immer_.useStrictShallowCopy_), r = t.scope_.immer_.shouldUseStrictIteration();
	} else n = so(e, !0);
	let i = n;
	return eo(n) && (n = /* @__PURE__ */ new Set()), Ka(i, (e, t) => {
		Xa(n, e, Xo(t));
	}, r), t && (t.finalized_ = !1), n;
}
globalThis.Iterator?.from;
var Zo = new qo().produce, H = (e) => e;
// node_modules/.pnpm/redux-thunk@3.1.0_redux@5.0.1/node_modules/redux-thunk/dist/redux-thunk.mjs
function Qo(e) {
	return ({ dispatch: t, getState: n }) => (r) => (i) => typeof i == "function" ? i(t, n, e) : r(i);
}
var $o = Qo(), es = Qo, ts = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
	if (arguments.length !== 0) return typeof arguments[0] == "object" ? Ea : Ea.apply(null, arguments);
};
typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function ns(e, t) {
	function n(...n) {
		if (t) {
			let r = t(...n);
			if (!r) throw Error(uc(0));
			return {
				type: e,
				payload: r.payload,
				..."meta" in r && { meta: r.meta },
				..."error" in r && { error: r.error }
			};
		}
		return {
			type: e,
			payload: n[0]
		};
	}
	return n.toString = () => `${e}`, n.type = e, n.match = (t) => Oa(t) && t.type === e, n;
}
var rs = class e extends Array {
	constructor(...t) {
		super(...t), Object.setPrototypeOf(this, e.prototype);
	}
	static get [Symbol.species]() {
		return e;
	}
	concat(...e) {
		return super.concat.apply(this, e);
	}
	prepend(...t) {
		return t.length === 1 && Array.isArray(t[0]) ? new e(...t[0].concat(this)) : new e(...t.concat(this));
	}
};
function is(e) {
	return Ha(e) ? Zo(e, () => {}) : e;
}
function as(e, t, n) {
	return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function os(e) {
	return typeof e == "boolean";
}
var ss = () => function(e) {
	let { thunk: t = !0, immutableCheck: n = !0, serializableCheck: r = !0, actionCreatorCheck: i = !0 } = e ?? {}, a = new rs();
	return t && (os(t) ? a.push($o) : a.push(es(t.extraArgument))), a;
}, cs = "RTK_autoBatch", U = () => (e) => ({
	payload: e,
	meta: { [cs]: !0 }
}), ls = (e) => (t) => {
	setTimeout(t, e);
}, us = (e, t) => (n) => {
	let r = !1, i, a, o = () => {
		r || (r = !0, cancelAnimationFrame(i), clearTimeout(a), n());
	};
	i = e(o), a = setTimeout(o, t);
}, ds = (e = { type: "raf" }) => (t) => (...n) => {
	let r = t(...n), i = !0, a = !1, o = !1, s = /* @__PURE__ */ new Set(), c = e.type === "tick" ? queueMicrotask : e.type === "raf" ? typeof window < "u" && window.requestAnimationFrame ? us(window.requestAnimationFrame, 100) : ls(10) : e.type === "callback" ? e.queueNotification : ls(e.timeout), l = () => {
		o = !1, a && (a = !1, s.forEach((e) => e()));
	};
	return Object.assign({}, r, {
		subscribe(e) {
			let t = r.subscribe(() => i && e());
			return s.add(e), () => {
				t(), s.delete(e);
			};
		},
		dispatch(e) {
			try {
				return i = !e?.meta?.[cs], a = !i, a && (o || (o = !0, c(l))), r.dispatch(e);
			} finally {
				i = !0;
			}
		}
	});
}, fs = (e) => function(t) {
	let { autoBatch: n = !0 } = t ?? {}, r = new rs(e);
	return n && r.push(ds(typeof n == "object" ? n : void 0)), r;
};
function ps(e) {
	let t = ss(), { reducer: n = void 0, middleware: r, devTools: i = !0, duplicateMiddlewareCheck: a = !0, preloadedState: o = void 0, enhancers: s = void 0 } = e || {}, c;
	if (typeof n == "function") c = n;
	else if (Sa(n)) c = Ta(n);
	else throw Error(uc(1));
	let l;
	l = typeof r == "function" ? r(t) : t();
	let u = Ea;
	i && (u = ts({
		trace: !1,
		...typeof i == "object" && i
	}));
	let d = fs(Da(...l)), f = typeof s == "function" ? s(d) : d(), p = u(...f);
	return Ca(c, o, p);
}
function ms(e) {
	let t = {}, n = [], r, i = {
		addCase(e, n) {
			let r = typeof e == "string" ? e : e.type;
			if (!r) throw Error(uc(28));
			if (r in t) throw Error(uc(29));
			return t[r] = n, i;
		},
		addAsyncThunk(e, r) {
			return r.pending && (t[e.pending.type] = r.pending), r.rejected && (t[e.rejected.type] = r.rejected), r.fulfilled && (t[e.fulfilled.type] = r.fulfilled), r.settled && n.push({
				matcher: e.settled,
				reducer: r.settled
			}), i;
		},
		addMatcher(e, t) {
			return n.push({
				matcher: e,
				reducer: t
			}), i;
		},
		addDefaultCase(e) {
			return r = e, i;
		}
	};
	return e(i), [
		t,
		n,
		r
	];
}
function hs(e) {
	return typeof e == "function";
}
function gs(e, t) {
	let [n, r, i] = ms(t), a;
	if (hs(e)) a = () => is(e());
	else {
		let t = is(e);
		a = () => t;
	}
	function o(e = a(), t) {
		let o = [n[t.type], ...r.filter(({ matcher: e }) => e(t)).map(({ reducer: e }) => e)];
		return o.filter((e) => !!e).length === 0 && (o = [i]), o.reduce((e, n) => {
			if (n) {
				if (Va(e)) {
					let r = n(e, t);
					return r === void 0 ? e : r;
				}
				if (Ha(e)) return Zo(e, (e) => n(e, t));
				{
					let r = n(e, t);
					if (r === void 0) {
						if (e === null) return e;
						throw Error(uc(9));
					}
					return r;
				}
			}
			return e;
		}, e);
	}
	return o.getInitialState = a, o;
}
var _s = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", vs = (e = 21) => {
	let t = "", n = e;
	for (; n--;) t += _s[Math.random() * 64 | 0];
	return t;
}, ys = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function bs(e, t) {
	return `${e}/${t}`;
}
function xs({ creators: e } = {}) {
	let t = e?.asyncThunk?.[ys];
	return function(e) {
		let { name: n, reducerPath: r = n } = e;
		if (!n) throw Error(uc(11));
		let i = (typeof e.reducers == "function" ? e.reducers(ws()) : e.reducers) || {}, a = Object.keys(i), o = {
			sliceCaseReducersByName: {},
			sliceCaseReducersByType: {},
			actionCreators: {},
			sliceMatchers: []
		}, s = {
			addCase(e, t) {
				let n = typeof e == "string" ? e : e.type;
				if (!n) throw Error(uc(12));
				if (n in o.sliceCaseReducersByType) throw Error(uc(13));
				return o.sliceCaseReducersByType[n] = t, s;
			},
			addMatcher(e, t) {
				return o.sliceMatchers.push({
					matcher: e,
					reducer: t
				}), s;
			},
			exposeAction(e, t) {
				return o.actionCreators[e] = t, s;
			},
			exposeCaseReducer(e, t) {
				return o.sliceCaseReducersByName[e] = t, s;
			}
		};
		a.forEach((r) => {
			let a = i[r], o = {
				reducerName: r,
				type: bs(n, r),
				createNotation: typeof e.reducers == "function"
			};
			Es(a) ? Os(o, a, s, t) : Ts(o, a, s);
		});
		function c() {
			let [t = {}, n = [], r = void 0] = typeof e.extraReducers == "function" ? ms(e.extraReducers) : [e.extraReducers], i = {
				...t,
				...o.sliceCaseReducersByType
			};
			return gs(e.initialState, (e) => {
				for (let t in i) e.addCase(t, i[t]);
				for (let t of o.sliceMatchers) e.addMatcher(t.matcher, t.reducer);
				for (let t of n) e.addMatcher(t.matcher, t.reducer);
				r && e.addDefaultCase(r);
			});
		}
		let l = (e) => e, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new WeakMap(), f;
		function p(e, t) {
			return f ||= c(), f(e, t);
		}
		function m() {
			return f ||= c(), f.getInitialState();
		}
		function h(t, n = !1) {
			function r(e) {
				let i = e[t];
				return i === void 0 && n && (i = as(d, r, m)), i;
			}
			function i(t = l) {
				return as(as(u, n, () => /* @__PURE__ */ new WeakMap()), t, () => {
					let r = {};
					for (let [i, a] of Object.entries(e.selectors ?? {})) r[i] = Ss(a, t, () => as(d, t, m), n);
					return r;
				});
			}
			return {
				reducerPath: t,
				getSelectors: i,
				get selectors() {
					return i(r);
				},
				selectSlice: r
			};
		}
		let g = {
			name: n,
			reducer: p,
			actions: o.actionCreators,
			caseReducers: o.sliceCaseReducersByName,
			getInitialState: m,
			...h(r),
			injectInto(e, { reducerPath: t, ...n } = {}) {
				let i = t ?? r;
				return e.inject({
					reducerPath: i,
					reducer: p
				}, n), {
					...g,
					...h(i, !0)
				};
			}
		};
		return g;
	};
}
function Ss(e, t, n, r) {
	function i(i, ...a) {
		let o = t(i);
		return o === void 0 && r && (o = n()), e(o, ...a);
	}
	return i.unwrapped = e, i;
}
var Cs = /* @__PURE__ */ xs();
function ws() {
	function e(e, t) {
		return {
			_reducerDefinitionType: "asyncThunk",
			payloadCreator: e,
			...t
		};
	}
	return e.withTypes = () => e, {
		reducer(e) {
			return Object.assign({ [e.name](...t) {
				return e(...t);
			} }[e.name], { _reducerDefinitionType: "reducer" });
		},
		preparedReducer(e, t) {
			return {
				_reducerDefinitionType: "reducerWithPrepare",
				prepare: e,
				reducer: t
			};
		},
		asyncThunk: e
	};
}
function Ts({ type: e, reducerName: t, createNotation: n }, r, i) {
	let a, o;
	if ("reducer" in r) {
		if (n && !Ds(r)) throw Error(uc(17));
		a = r.reducer, o = r.prepare;
	} else a = r;
	i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? ns(e, o) : ns(e));
}
function Es(e) {
	return e._reducerDefinitionType === "asyncThunk";
}
function Ds(e) {
	return e._reducerDefinitionType === "reducerWithPrepare";
}
function Os({ type: e, reducerName: t }, n, r, i) {
	if (!i) throw Error(uc(18));
	let { payloadCreator: a, fulfilled: o, pending: s, rejected: c, settled: l, options: u } = n, d = i(e, a, u);
	r.exposeAction(t, d), o && r.addCase(d.fulfilled, o), s && r.addCase(d.pending, s), c && r.addCase(d.rejected, c), l && r.addMatcher(d.settled, l), r.exposeCaseReducer(t, {
		fulfilled: o || ks,
		pending: s || ks,
		rejected: c || ks,
		settled: l || ks
	});
}
function ks() {}
var As = "task", js = "listener", Ms = "completed", Ns = "cancelled", Ps = `task-${Ns}`, Fs = `task-${Ms}`, Is = `${js}-${Ns}`, Ls = `${js}-${Ms}`, Rs = class {
	code;
	name = "TaskAbortError";
	message;
	constructor(e) {
		this.code = e, this.message = `${As} ${Ns} (reason: ${e})`;
	}
}, zs = (e, t) => {
	if (typeof e != "function") throw TypeError(uc(32));
}, Bs = () => {}, Vs = (e, t = Bs) => (e.catch(t), e), Hs = (e, t) => (e.addEventListener("abort", t, { once: !0 }), () => e.removeEventListener("abort", t)), Us = (e) => {
	if (e.aborted) throw new Rs(e.reason);
};
function Ws(e, t) {
	let n = Bs;
	return new Promise((r, i) => {
		let a = () => i(new Rs(e.reason));
		e.aborted ? a() : (n = Hs(e, a), t.finally(() => n()).then(r, i));
	}).finally(() => {
		n = Bs;
	});
}
var Gs = async (e, t) => {
	try {
		return await Promise.resolve(), {
			status: "ok",
			value: await e()
		};
	} catch (e) {
		return {
			status: e instanceof Rs ? "cancelled" : "rejected",
			error: e
		};
	} finally {
		t?.();
	}
}, Ks = (e) => (t) => Vs(Ws(e, t).then((t) => (Us(e), t))), qs = (e) => {
	let t = Ks(e);
	return (e) => t(new Promise((t) => setTimeout(t, e)));
}, { assign: Js } = Object, Ys = {}, Xs = "listenerMiddleware", Zs = (e, t) => {
	let n = (t) => Hs(e, () => t.abort(e.reason));
	return (r, i) => {
		zs(r, "taskExecutor");
		let a = new AbortController();
		n(a);
		let o = Gs(async () => {
			Us(e), Us(a.signal);
			let t = await r({
				pause: Ks(a.signal),
				delay: qs(a.signal),
				signal: a.signal
			});
			return Us(a.signal), t;
		}, () => a.abort(Fs));
		return i?.autoJoin && t.push(o.catch(Bs)), {
			result: Ks(e)(o),
			cancel() {
				a.abort(Ps);
			}
		};
	};
}, Qs = (e, t) => {
	let n = async (n, r) => {
		Us(t);
		let i = () => {}, a = [new Promise((t, r) => {
			let a = e({
				predicate: n,
				effect: (e, n) => {
					n.unsubscribe(), t([
						e,
						n.getState(),
						n.getOriginalState()
					]);
				}
			});
			i = () => {
				a(), r();
			};
		})];
		r != null && a.push(new Promise((e) => setTimeout(e, r, null)));
		try {
			let e = await Ws(t, Promise.race(a));
			return Us(t), e;
		} finally {
			i();
		}
	};
	return ((e, t) => Vs(n(e, t)));
}, $s = (e) => {
	let { type: t, actionCreator: n, matcher: r, predicate: i, effect: a } = e;
	if (t) i = ns(t).match;
	else if (n) t = n.type, i = n.match;
	else if (r) i = r;
	else if (!i) throw Error(uc(21));
	return zs(a, "options.listener"), {
		predicate: i,
		type: t,
		effect: a
	};
}, ec = /* @__PURE__ */ Js((e) => {
	let { type: t, predicate: n, effect: r } = $s(e);
	return {
		id: vs(),
		effect: r,
		type: t,
		predicate: n,
		pending: /* @__PURE__ */ new Set(),
		unsubscribe: () => {
			throw Error(uc(22));
		}
	};
}, { withTypes: () => ec }), tc = (e, t) => {
	let { type: n, effect: r, predicate: i } = $s(t);
	return Array.from(e.values()).find((e) => (typeof n == "string" ? e.type === n : e.predicate === i) && e.effect === r);
}, nc = (e) => {
	e.pending.forEach((e) => {
		e.abort(Is);
	});
}, rc = (e, t) => () => {
	for (let e of t.keys()) nc(e);
	e.clear();
}, ic = (e, t, n) => {
	try {
		e(t, n);
	} catch (e) {
		setTimeout(() => {
			throw e;
		}, 0);
	}
}, ac = /* @__PURE__ */ Js(/* @__PURE__ */ ns(`${Xs}/add`), { withTypes: () => ac }), oc = /* @__PURE__ */ ns(`${Xs}/removeAll`), sc = /* @__PURE__ */ Js(/* @__PURE__ */ ns(`${Xs}/remove`), { withTypes: () => sc }), cc = (...e) => {
	console.error(`${Xs}/error`, ...e);
}, lc = (e = {}) => {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = (e) => {
		let t = n.get(e) ?? 0;
		n.set(e, t + 1);
	}, i = (e) => {
		let t = n.get(e) ?? 1;
		t === 1 ? n.delete(e) : n.set(e, t - 1);
	}, { extra: a, onError: o = cc } = e;
	zs(o, "onError");
	let s = (e) => (e.unsubscribe = () => t.delete(e.id), t.set(e.id, e), (t) => {
		e.unsubscribe(), t?.cancelActive && nc(e);
	}), c = ((e) => {
		let n = tc(t, e) ?? ec(e);
		return s(n);
	});
	Js(c, { withTypes: () => c });
	let l = (e) => {
		let n = tc(t, e);
		return n && (n.unsubscribe(), e.cancelActive && nc(n)), !!n;
	};
	Js(l, { withTypes: () => l });
	let u = async (e, n, s, l) => {
		let u = new AbortController(), d = Qs(c, u.signal), f = [];
		try {
			e.pending.add(u), r(e), await Promise.resolve(e.effect(n, Js({}, s, {
				getOriginalState: l,
				condition: (e, t) => d(e, t).then(Boolean),
				take: d,
				delay: qs(u.signal),
				pause: Ks(u.signal),
				extra: a,
				signal: u.signal,
				fork: Zs(u.signal, f),
				unsubscribe: e.unsubscribe,
				subscribe: () => {
					t.set(e.id, e);
				},
				cancelActiveListeners: () => {
					e.pending.forEach((e, t, n) => {
						e !== u && (e.abort(Is), n.delete(e));
					});
				},
				cancel: () => {
					u.abort(Is), e.pending.delete(u);
				},
				throwIfCancelled: () => {
					Us(u.signal);
				}
			})));
		} catch (e) {
			e instanceof Rs || ic(o, e, { raisedBy: "effect" });
		} finally {
			await Promise.all(f), u.abort(Ls), i(e), e.pending.delete(u);
		}
	}, d = rc(t, n);
	return {
		middleware: (e) => (n) => (r) => {
			if (!Oa(r)) return n(r);
			if (ac.match(r)) return c(r.payload);
			if (oc.match(r)) {
				d();
				return;
			}
			if (sc.match(r)) return l(r.payload);
			let i = e.getState(), a = () => {
				if (i === Ys) throw Error(uc(23));
				return i;
			}, s;
			try {
				if (s = n(r), t.size > 0) {
					let n = e.getState(), s = Array.from(t.values());
					for (let t of s) {
						let s = !1;
						try {
							s = t.predicate(r, n, i);
						} catch (e) {
							s = !1, ic(o, e, { raisedBy: "predicate" });
						}
						s && u(t, r, e, a);
					}
				}
			} finally {
				i = Ys;
			}
			return s;
		},
		startListening: c,
		stopListening: l,
		clearListeners: d
	};
};
function uc(e) {
	return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/layoutSlice.js
var dc = Cs({
	name: "chartLayout",
	initialState: {
		layoutType: "horizontal",
		width: 0,
		height: 0,
		margin: {
			top: 5,
			right: 5,
			bottom: 5,
			left: 5
		},
		scale: 1
	},
	reducers: {
		setLayout(e, t) {
			e.layoutType = t.payload;
		},
		setChartSize(e, t) {
			e.width = t.payload.width, e.height = t.payload.height;
		},
		setMargin(e, t) {
			e.margin.top = t.payload.top ?? 0, e.margin.right = t.payload.right ?? 0, e.margin.bottom = t.payload.bottom ?? 0, e.margin.left = t.payload.left ?? 0;
		},
		setScale(e, t) {
			e.scale = t.payload;
		}
	}
}), fc = dc.actions, pc = fc.setMargin, mc = fc.setLayout, hc = fc.setChartSize, gc = fc.setScale, _c = dc.reducer;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/getSliced.js
function vc(e, t, n) {
	return Array.isArray(e) && e && t + n !== 0 ? e.slice(t, n + 1) : e;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/isWellBehavedNumber.js
function W(e) {
	return Number.isFinite(e);
}
function yc(e) {
	return typeof e == "number" && e > 0 && Number.isFinite(e);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/ChartUtils.js
function bc(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function xc(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? bc(Object(n), !0).forEach(function(t) {
			Sc(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bc(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Sc(e, t, n) {
	return (t = Cc(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Cc(e) {
	var t = wc(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function wc(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function G(e, t, n) {
	return L(e) || L(t) ? n : Je(t) ? Be(e, t, n) : typeof t == "function" ? t(e) : n;
}
var Tc = (e, t, n) => {
	if (t && n) {
		var r = n.width, i = n.height, a = t.align, o = t.verticalAlign, s = t.layout, c = t.position, l = t.offset, u = l === void 0 ? 0 : l;
		if (c != null) {
			if (dt(c)) {
				if (c === "top" && F(e.top)) return xc(xc({}, e), {}, { top: e.top + (i || 0) + u });
				if (c === "bottom" && F(e.bottom)) return xc(xc({}, e), {}, { bottom: e.bottom + (i || 0) + u });
				if (c === "left" && F(e.left)) return xc(xc({}, e), {}, { left: e.left + (r || 0) + u });
				if (c === "right" && F(e.right)) return xc(xc({}, e), {}, { right: e.right + (r || 0) + u });
			}
			return e;
		}
		if ((s === "vertical" || s === "horizontal" && o === "middle") && a !== "center" && F(e[a])) return xc(xc({}, e), {}, { [a]: e[a] + (r || 0) });
		if ((s === "horizontal" || s === "vertical" && a === "center") && o !== "middle" && F(e[o])) return xc(xc({}, e), {}, { [o]: e[o] + (i || 0) });
	}
	return e;
}, Ec = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", Dc = (e, t, n, r) => {
	if (r) return e.map((e) => e.coordinate);
	var i, a, o = e.map((e) => (e.coordinate === t && (i = !0), e.coordinate === n && (a = !0), e.coordinate));
	return i || o.push(t), a || o.push(n), o;
}, Oc = (e, t, n) => {
	if (!e) return null;
	var r = e.duplicateDomain, i = e.type, a = e.range, o = e.scale, s = e.realScaleType, c = e.isCategorical, l = e.categoricalDomain, u = e.tickCount, d = e.ticks, f = e.niceTicks, p = e.axisType;
	if (!o) return null;
	var m = s === "scaleBand" && o.bandwidth ? o.bandwidth() / 2 : 2, h = (t || n) && i === "category" && o.bandwidth ? o.bandwidth() / m : 0;
	return h = p === "angleAxis" && a && a.length >= 2 ? Ge(a[0] - a[1]) * 2 * h : h, t && (d || f) ? (d || f || []).map((e, t) => {
		var n = r ? r.indexOf(e) : e, i = o.map(n);
		return W(i) ? {
			coordinate: i + h,
			value: e,
			offset: h,
			index: t
		} : null;
	}).filter(tt) : c && l ? l.map((e, t) => {
		var n = o.map(e);
		return W(n) ? {
			coordinate: n + h,
			value: e,
			index: t,
			offset: h
		} : null;
	}).filter(tt) : o.ticks && !n && u != null ? o.ticks(u).map((e, t) => {
		var n = o.map(e);
		return W(n) ? {
			coordinate: n + h,
			value: e,
			index: t,
			offset: h
		} : null;
	}).filter(tt) : o.domain().map((e, t) => {
		var n = o.map(e);
		return W(n) ? {
			coordinate: n + h,
			value: r ? r[e] : e,
			index: t,
			offset: h
		} : null;
	}).filter(tt);
}, kc = (e, t) => {
	if (!t || t.length !== 2 || !F(t[0]) || !F(t[1])) return e;
	var n = Math.min(t[0], t[1]), r = Math.max(t[0], t[1]), i = [e[0], e[1]];
	return (!F(e[0]) || e[0] < n) && (i[0] = n), (!F(e[1]) || e[1] > r) && (i[1] = r), i[0] > r && (i[0] = r), i[1] < n && (i[1] = n), i;
}, Ac = {
	sign: (e) => {
		var t = e.length;
		if (!(t <= 0)) {
			var n = e[0]?.length;
			if (!(n == null || n <= 0)) for (var r = 0; r < n; ++r) for (var i = 0, a = 0, o = 0; o < t; ++o) {
				var s = e[o]?.[r];
				if (s != null) {
					var c = s[1], l = s[0], u = Ke(c) ? l : c;
					u >= 0 ? (s[0] = i, i += u, s[1] = i) : (s[0] = a, a += u, s[1] = a);
				}
			}
		}
	},
	expand: Pn,
	none: kn,
	silhouette: Fn,
	wiggle: In,
	positive: (e) => {
		var t = e.length;
		if (!(t <= 0)) {
			var n = e[0]?.length;
			if (!(n == null || n <= 0)) for (var r = 0; r < n; ++r) for (var i = 0, a = 0; a < t; ++a) {
				var o = e[a]?.[r];
				if (o != null) {
					var s = Ke(o[1]) ? o[0] : o[1];
					s >= 0 ? (o[0] = i, i += s, o[1] = i) : (o[0] = 0, o[1] = 0);
				}
			}
		}
	}
}, jc = (e, t, n) => {
	var r = Ac[n] ?? kn, i = Nn().keys(t).value((e, t) => Number(G(e, t, 0))).order(An).offset(r)(e);
	return i.forEach((n, r) => {
		n.forEach((n, i) => {
			var a = G(e[i], t[r], 0);
			Array.isArray(a) && a.length === 2 && F(a[0]) && F(a[1]) && (n[0] = a[0], n[1] = a[1]);
		});
	}), i;
};
function Mc(e) {
	return e == null ? void 0 : String(e);
}
function Nc(e) {
	var t = e.axis, n = e.ticks, r = e.bandSize, i = e.entry, a = e.index, o = e.dataKey;
	if (t.type === "category") {
		if (!t.allowDuplicatedCategory && t.dataKey && !L(i[t.dataKey])) {
			var s = $e(n, "value", i[t.dataKey]);
			if (s) return s.coordinate + r / 2;
		}
		return n != null && n[a] ? n[a].coordinate + r / 2 : null;
	}
	var c = G(i, L(o) ? t.dataKey : o), l = t.scale.map(c);
	return F(l) ? l : null;
}
var Pc = (e) => {
	var t = e.axis, n = e.ticks, r = e.offset, i = e.bandSize, a = e.entry, o = e.index;
	if (t.type === "category") return n[o] ? n[o].coordinate + r : null;
	var s = G(a, t.dataKey, t.scale.domain()[o]);
	if (L(s)) return null;
	var c = t.scale.map(s);
	return F(c) ? c - i / 2 + r : null;
}, Fc = (e) => {
	var t = e.numericAxis, n = t.scale.domain();
	if (t.type === "number") {
		var r = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
		return r <= 0 && i >= 0 ? 0 : i < 0 ? i : r;
	}
	return n[0];
}, Ic = (e) => {
	var t = e.flat(2).filter(F);
	return [Math.min(...t), Math.max(...t)];
}, Lc = (e) => [e[0] === Infinity ? 0 : e[0], e[1] === -Infinity ? 0 : e[1]], Rc = (e, t, n) => {
	if (e != null && Object.keys(e).length !== 0) return Lc(Object.keys(e).reduce((r, i) => {
		var a = e[i];
		if (!a) return r;
		var o = a.stackedData.reduce((e, r) => {
			var i = Ic(vc(r, t, n));
			return !W(i[0]) || !W(i[1]) ? e : [Math.min(e[0], i[0]), Math.max(e[1], i[1])];
		}, [Infinity, -Infinity]);
		return [Math.min(o[0], r[0]), Math.max(o[1], r[1])];
	}, [Infinity, -Infinity]));
}, zc = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Bc = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Vc = (e, t, n) => {
	if (e && e.scale && e.scale.bandwidth) {
		var r = e.scale.bandwidth();
		if (!n || r > 0) return r;
	}
	if (e && t && t.length >= 2) {
		for (var i = ra(t, (e) => e.coordinate), a = [], o = 0, s = 1, c = i.length; s < c; s++) {
			var l = (i[s]?.coordinate || 0) - (i[s - 1]?.coordinate || 0);
			a.push(l), o = Math.max(l, o);
		}
		var u = o * 1e-4, d = Infinity;
		for (var f of a) f > u && (d = Math.min(f, d));
		return d === Infinity ? 0 : d;
	}
	return n ? void 0 : 0;
};
function Hc(e) {
	var t = e.tooltipEntrySettings, n = e.dataKey, r = e.payload, i = e.value, a = e.name;
	return xc(xc({}, t), {}, {
		dataKey: n,
		payload: r,
		value: i,
		name: a
	});
}
function Uc(e, t) {
	if (e != null) return String(e);
	if (typeof t == "string") return t;
}
var Wc = (e, t) => {
	if (t === "horizontal") return e.relativeX;
	if (t === "vertical") return e.relativeY;
}, Gc = (e, t) => t === "centric" ? e.angle : e.radius, Kc = (e) => e.layout.width, qc = (e) => e.layout.height, Jc = (e) => e.layout.scale, Yc = (e) => e.layout.margin, Xc = V((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Zc = V((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), Qc = "data-recharts-item-index", $c = "data-recharts-item-id";
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/selectChartOffsetInternal.js
function el(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function tl(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? el(Object(n), !0).forEach(function(t) {
			nl(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : el(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function nl(e, t, n) {
	return (t = rl(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function rl(e) {
	var t = il(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function il(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var al = (e) => e.brush.height;
function ol(e) {
	return Zc(e).reduce((e, t) => t.orientation === "left" && !t.mirror && !t.hide ? e + (typeof t.width == "number" ? t.width : 60) : e, 0);
}
function sl(e) {
	return Zc(e).reduce((e, t) => t.orientation === "right" && !t.mirror && !t.hide ? e + (typeof t.width == "number" ? t.width : 60) : e, 0);
}
function cl(e) {
	return Xc(e).reduce((e, t) => t.orientation === "top" && !t.mirror && !t.hide ? e + (typeof t.height == "number" ? t.height : 30) : e, 0);
}
function ll(e) {
	return Xc(e).reduce((e, t) => t.orientation === "bottom" && !t.mirror && !t.hide ? e + (typeof t.height == "number" ? t.height : 30) : e, 0);
}
var ul = V([
	Kc,
	qc,
	Yc,
	al,
	ol,
	sl,
	cl,
	ll,
	ia,
	aa
], (e, t, n, r, i, a, o, s, c, l) => {
	var u = {
		left: (n.left || 0) + i,
		right: (n.right || 0) + a
	}, d = tl(tl({}, {
		top: (n.top || 0) + o,
		bottom: (n.bottom || 0) + s
	}), u), f = d.bottom;
	d.bottom += r, d = Tc(d, c, l);
	var p = e - d.left - d.right, m = t - d.top - d.bottom;
	return tl(tl({ brushBottom: f }, d), {}, {
		width: Math.max(p, 0),
		height: Math.max(m, 0)
	});
}), dl = V(ul, (e) => ({
	x: e.left,
	y: e.top,
	width: e.width,
	height: e.height
})), fl = V(Kc, qc, (e, t) => ({
	x: 0,
	y: 0,
	width: e,
	height: t
})), pl = /*#__PURE__*/ (0, P.createContext)(null), ml = () => (0, P.useContext)(pl) != null, hl = (e) => e.brush, gl = V([
	hl,
	ul,
	Yc
], (e, t, n) => ({
	height: e.height,
	x: F(e.x) ? e.x : t.left,
	y: F(e.y) ? e.y : t.top + t.height + t.brushBottom - (n?.bottom || 0),
	width: F(e.width) ? e.width : t.width
}));
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/function/debounce.mjs
function _l(e, t, { signal: n, edges: r } = {}) {
	let i, a = null, o = r != null && r.includes("leading"), s = r == null || r.includes("trailing"), c = () => {
		a !== null && (e.apply(i, a), i = void 0, a = null);
	}, l = () => {
		s && c(), p();
	}, u = null, d = () => {
		u != null && clearTimeout(u), u = setTimeout(() => {
			u = null, l();
		}, t);
	}, f = () => {
		u !== null && (clearTimeout(u), u = null);
	}, p = () => {
		f(), i = void 0, a = null;
	}, m = () => {
		c();
	}, h = function(...e) {
		if (n?.aborted) return;
		i = this, a = e;
		let t = u == null;
		d(), o && t && c();
	};
	return h.schedule = d, h.cancel = p, h.flush = m, n?.addEventListener("abort", p, { once: !0 }), h;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/function/debounce.mjs
function vl(e, t = 0, n = {}) {
	typeof n != "object" && (n = {});
	let { leading: r = !1, trailing: i = !0, maxWait: a } = n, o = [, ,];
	r && (o[0] = "leading"), i && (o[1] = "trailing");
	let s, c = null, l = _l(function(...t) {
		s = e.apply(this, t), c = null;
	}, t, { edges: o }), u = function(...t) {
		return a != null && (c === null && (c = Date.now()), Date.now() - c >= a) ? ((r || i) && (s = e.apply(this, t)), c = Date.now(), l.cancel(), l.schedule(), s) : (l.apply(this, t), s);
	};
	return u.cancel = l.cancel, u.flush = () => (l.flush(), s), u;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/function/throttle.mjs
function yl(e, t = 0, n = {}) {
	let { leading: r = !0, trailing: i = !0 } = n;
	return vl(e, t, {
		leading: r,
		maxWait: t,
		trailing: i
	});
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/LogUtils.js
var bl = function(e, t) {
	var n = [...arguments].slice(2);
	if (typeof console < "u" && console.warn && (t === void 0 && console.warn("LogUtils requires an error message argument"), !e)) {
		if (t === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
		else {
			var r = 0;
			console.warn(t.replace(/%s/g, () => n[r++]));
		}
	}
}, xl = {
	width: "100%",
	height: "100%",
	debounce: 0,
	minWidth: 0,
	initialDimension: {
		width: -1,
		height: -1
	}
}, Sl = (e, t, n) => {
	var r = n.width, i = r === void 0 ? xl.width : r, a = n.height, o = a === void 0 ? xl.height : a, s = n.aspect, c = n.maxHeight, l = qe(i) ? e : Number(i), u = qe(o) ? t : Number(o);
	return s && s > 0 && (l ? u = l / s : u && (l = u * s), c && u != null && u > c && (u = c)), {
		calculatedWidth: l,
		calculatedHeight: u
	};
}, Cl = {
	width: 0,
	height: 0,
	overflow: "visible"
}, wl = {
	width: 0,
	overflowX: "visible"
}, Tl = {
	height: 0,
	overflowY: "visible"
}, El = {}, Dl = (e) => {
	var t = e.width, n = e.height, r = qe(t), i = qe(n);
	return r && i ? Cl : r ? wl : i ? Tl : El;
};
function Ol(e) {
	var t = e.width, n = e.height, r = e.aspect, i = t, a = n;
	return i === void 0 && a === void 0 ? (i = xl.width, a = xl.height) : i === void 0 ? i = r && r > 0 ? void 0 : xl.width : a === void 0 && (a = r && r > 0 ? void 0 : xl.height), {
		width: i,
		height: a
	};
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/ResponsiveContainer.js
var kl = [
	"aspect",
	"initialDimension",
	"width",
	"height",
	"minWidth",
	"minHeight",
	"maxHeight",
	"children",
	"debounce",
	"id",
	"className",
	"onResize",
	"style"
];
function Al() {
	return Al = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Al.apply(null, arguments);
}
function jl(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ml(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? jl(Object(n), !0).forEach(function(t) {
			Nl(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : jl(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Nl(e, t, n) {
	return (t = Pl(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Pl(e) {
	var t = Fl(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Fl(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Il(e, t) {
	return Vl(e) || Bl(e, t) || Rl(e, t) || Ll();
}
function Ll() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Rl(e, t) {
	if (e) {
		if (typeof e == "string") return zl(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? zl(e, t) : void 0;
	}
}
function zl(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Bl(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Vl(e) {
	if (Array.isArray(e)) return e;
}
function Hl(e, t) {
	if (e == null) return {};
	var n, r, i = Ul(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Ul(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Wl = /*#__PURE__*/ (0, P.createContext)(xl.initialDimension);
function Gl(e) {
	return yc(e.width) && yc(e.height);
}
function Kl(e) {
	var t = e.children, n = e.width, r = e.height, i = (0, P.useMemo)(() => ({
		width: n,
		height: r
	}), [n, r]);
	return Gl(i) ? /*#__PURE__*/ P.createElement(Wl.Provider, { value: i }, t) : null;
}
var ql = () => (0, P.useContext)(Wl), Jl = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.aspect, r = e.initialDimension, i = r === void 0 ? xl.initialDimension : r, a = e.width, o = e.height, s = e.minWidth, c = s === void 0 ? xl.minWidth : s, u = e.minHeight, d = e.maxHeight, f = e.children, p = e.debounce, m = p === void 0 ? xl.debounce : p, h = e.id, g = e.className, _ = e.onResize, v = e.style, y = v === void 0 ? {} : v, b = Hl(e, kl), x = (0, P.useRef)(null), S = (0, P.useRef)();
	S.current = _, (0, P.useImperativeHandle)(t, () => x.current);
	var C = Il((0, P.useState)({
		containerWidth: i.width,
		containerHeight: i.height
	}), 2), w = C[0], T = C[1], E = (0, P.useCallback)((e, t) => {
		T((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []);
	(0, P.useEffect)(() => {
		if (x.current == null || typeof ResizeObserver > "u") return nt;
		var e = (e) => {
			var t, n = e[0];
			if (n != null) {
				var r = n.contentRect, i = r.width, a = r.height;
				E(i, a), (t = S.current) == null || t.call(S, i, a);
			}
		};
		m > 0 && (e = yl(e, m, {
			trailing: !0,
			leading: !1
		}));
		var t = new ResizeObserver(e), n = x.current.getBoundingClientRect(), r = n.width, i = n.height;
		return E(r, i), t.observe(x.current), () => {
			t.disconnect();
		};
	}, [E, m]);
	var D = w.containerWidth, O = w.containerHeight;
	bl(!n || n > 0, "The aspect(%s) must be greater than zero.", n);
	var k = Sl(D, O, {
		width: a,
		height: o,
		aspect: n,
		maxHeight: d
	}), A = k.calculatedWidth, j = k.calculatedHeight;
	return bl(D < 0 || O < 0 || A != null && A > 0 || j != null && j > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", A, j, a, o, c, u, n), /*#__PURE__*/ P.createElement("div", Al({
		id: h ? `${h}` : void 0,
		className: l("recharts-responsive-container", g),
		style: Ml(Ml({}, y), {}, {
			width: a,
			height: o,
			minWidth: c,
			minHeight: u,
			maxHeight: d
		}),
		ref: x
	}, b), /*#__PURE__*/ P.createElement("div", { style: Dl({
		width: a,
		height: o
	}) }, /*#__PURE__*/ P.createElement(Kl, {
		width: A,
		height: j
	}, f)));
}), Yl = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = ql();
	if (yc(n.width) && yc(n.height)) return e.children;
	var r = Ol({
		width: e.width,
		height: e.height,
		aspect: e.aspect
	}), i = r.width, a = r.height, o = Sl(void 0, void 0, {
		width: i,
		height: a,
		aspect: e.aspect,
		maxHeight: e.maxHeight
	}), s = o.calculatedWidth, c = o.calculatedHeight;
	return F(s) && F(c) ? /*#__PURE__*/ P.createElement(Kl, {
		width: s,
		height: c
	}, e.children) : /*#__PURE__*/ P.createElement(Jl, Al({}, e, {
		width: i,
		height: a,
		ref: t
	}));
}), Xl = () => {
	var e = ml(), t = B(dl), n = B(gl), r = B(hl)?.padding;
	return !e || !n || !r ? t : {
		width: n.width - r.left - r.right,
		height: n.height - r.top - r.bottom,
		x: r.left,
		y: r.top
	};
}, Zl = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	width: 0,
	height: 0,
	brushBottom: 0
}, Ql = () => B(ul) ?? Zl, $l = () => B(Kc), eu = () => B(qc), tu = () => B((e) => e.layout.margin), K = (e) => e.layout.layoutType, nu = () => B(K), ru = () => {
	var e = nu();
	if (e === "horizontal" || e === "vertical") return e;
}, iu = (e) => {
	var t = e.layout.layoutType;
	if (t === "centric" || t === "radial") return t;
}, au = () => B(iu), ou = () => nu() !== void 0, su = (e) => {
	var t = z(), n = ml(), r = e.width, i = e.height, a = ql(), o = r, s = i;
	return a && (o = a.width > 0 ? a.width : r, s = a.height > 0 ? a.height : i), (0, P.useEffect)(() => {
		!n && yc(o) && yc(s) && t(hc({
			width: o,
			height: s
		}));
	}, [
		t,
		n,
		o,
		s
	]), null;
}, cu = Cs({
	name: "legend",
	initialState: {
		settings: {
			layout: "horizontal",
			align: "center",
			verticalAlign: "bottom",
			itemSorter: "value",
			position: void 0,
			offset: 0
		},
		size: {
			width: 0,
			height: 0
		},
		payload: []
	},
	reducers: {
		setLegendSize(e, t) {
			e.size.width = t.payload.width, e.size.height = t.payload.height;
		},
		setLegendSettings(e, t) {
			e.settings.align = t.payload.align, e.settings.layout = t.payload.layout, e.settings.verticalAlign = t.payload.verticalAlign, e.settings.itemSorter = t.payload.itemSorter, e.settings.position = t.payload.position, e.settings.offset = t.payload.offset;
		},
		addLegendPayload: {
			reducer(e, t) {
				e.payload.push(H(t.payload));
			},
			prepare: U()
		},
		replaceLegendPayload: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = Yo(e).payload.indexOf(H(r));
				a > -1 && (e.payload[a] = H(i));
			},
			prepare: U()
		},
		removeLegendPayload: {
			reducer(e, t) {
				var n = Yo(e).payload.indexOf(H(t.payload));
				n > -1 && e.payload.splice(n, 1);
			},
			prepare: U()
		}
	}
}), lu = cu.actions, uu = lu.setLegendSize, du = lu.setLegendSettings, fu = lu.addLegendPayload, pu = lu.replaceLegendPayload, mu = lu.removeLegendPayload, hu = cu.reducer, gu = /* @__PURE__ */ n(((e) => {
	var t = v();
	t.useSyncExternalStore, t.useRef, t.useEffect, t.useMemo, t.useDebugValue;
}));
(/* @__PURE__ */ n(((e, t) => {
	t.exports = gu();
})))();
function _u(e) {
	e();
}
function vu() {
	let e = null, t = null;
	return {
		clear() {
			e = null, t = null;
		},
		notify() {
			_u(() => {
				let t = e;
				for (; t;) t.callback(), t = t.next;
			});
		},
		get() {
			let t = [], n = e;
			for (; n;) t.push(n), n = n.next;
			return t;
		},
		subscribe(n) {
			let r = !0, i = t = {
				callback: n,
				next: null,
				prev: t
			};
			return i.prev ? i.prev.next = i : e = i, function() {
				r && e !== null && (r = !1, i.next ? i.next.prev = i.prev : t = i.prev, i.prev ? i.prev.next = i.next : e = i.next);
			};
		}
	};
}
var yu = {
	notify() {},
	get: () => []
};
function bu(e, t) {
	let n, r = yu, i = 0, a = !1;
	function o(e) {
		u();
		let t = r.subscribe(e), n = !1;
		return () => {
			n || (n = !0, t(), d());
		};
	}
	function s() {
		r.notify();
	}
	function c() {
		m.onStateChange && m.onStateChange();
	}
	function l() {
		return a;
	}
	function u() {
		i++, n || (n = t ? t.addNestedSub(c) : e.subscribe(c), r = vu());
	}
	function d() {
		i--, n && i === 0 && (n(), n = void 0, r.clear(), r = yu);
	}
	function f() {
		a || (a = !0, u());
	}
	function p() {
		a && (a = !1, d());
	}
	let m = {
		addNestedSub: o,
		notifyNestedSubs: s,
		handleChangeWrapper: c,
		isSubscribed: l,
		trySubscribe: f,
		tryUnsubscribe: p,
		getListeners: () => r
	};
	return m;
}
var xu = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Su = typeof navigator < "u" && navigator.product === "ReactNative", Cu = xu || Su ? P.useLayoutEffect : P.useEffect;
function wu(e, t) {
	return e === t ? e !== 0 || t !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
function Tu(e, t) {
	if (wu(e, t)) return !0;
	if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !wu(e[n[r]], t[n[r]])) return !1;
	return !0;
}
var Eu = /* @__PURE__ */ Symbol.for("react-redux-context"), Du = typeof globalThis < "u" ? globalThis : {};
function Ou() {
	if (!P.createContext) return {};
	let e = Du[Eu] ??= /* @__PURE__ */ new Map(), t = e.get(P.createContext);
	return t || (t = P.createContext(null), e.set(P.createContext, t)), t;
}
var ku = /*#__PURE__*/ Ou();
function Au(e) {
	let { children: t, context: n, serverState: r, store: i } = e, a = P.useMemo(() => {
		let e = bu(i);
		return {
			store: i,
			subscription: e,
			getServerState: r == null ? void 0 : () => r
		};
	}, [i, r]), o = P.useMemo(() => i.getState(), [i]);
	Cu(() => {
		let { subscription: e } = a;
		return e.onStateChange = e.notifyNestedSubs, e.trySubscribe(), o !== i.getState() && e.notifyNestedSubs(), () => {
			e.tryUnsubscribe(), e.onStateChange = void 0;
		};
	}, [a, o]);
	let s = n || ku;
	return /* @__PURE__ */ P.createElement(s.Provider, { value: a }, t);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/propsAreEqual.js
var ju = /* @__PURE__ */ new Set([
	"axisLine",
	"tickLine",
	"activeBar",
	"activeDot",
	"activeLabel",
	"activeShape",
	"allowEscapeViewBox",
	"background",
	"cursor",
	"dot",
	"label",
	"line",
	"margin",
	"padding",
	"position",
	"shape",
	"style",
	"tick",
	"wrapperStyle",
	"radius",
	"throttledEvents"
]);
function Mu(e, t) {
	return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function Nu(e, t) {
	for (var n of /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)])) if (ju.has(n)) {
		if (e[n] == null && t[n] == null) continue;
		if (!Tu(e[n], t[n])) return !1;
	} else if (!Mu(e[n], t[n])) return !1;
	return !0;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/selectLegendArea.js
var Pu = V([
	Kc,
	qc,
	Yc
], (e, t, n) => ({
	x: n.left || 0,
	y: n.top || 0,
	width: Math.max(e - (n.left || 0) - (n.right || 0), 0),
	height: Math.max(t - (n.top || 0) - (n.bottom || 0), 0)
}));
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/cartesianPositionToCSSTranslate.js
function Fu(e, t) {
	return e === "start" && t === "start" ? "" : `translate(${e === "inherit" ? "0" : {
		start: "0",
		middle: "-50%",
		end: "-100%"
	}[e]}, ${{
		start: "0",
		middle: "-50%",
		end: "-100%"
	}[t] ?? "0"})`;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/Legend.js
var Iu = ["contextPayload"];
function Lu() {
	return Lu = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Lu.apply(null, arguments);
}
function Ru(e, t) {
	return Uu(e) || Hu(e, t) || Bu(e, t) || zu();
}
function zu() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Bu(e, t) {
	if (e) {
		if (typeof e == "string") return Vu(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Vu(e, t) : void 0;
	}
}
function Vu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Hu(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Uu(e) {
	if (Array.isArray(e)) return e;
}
function Wu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Gu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Wu(Object(n), !0).forEach(function(t) {
			Ku(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Wu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ku(e, t, n) {
	return (t = qu(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function qu(e) {
	var t = Ju(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ju(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Yu(e, t) {
	if (e == null) return {};
	var n, r, i = Xu(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Xu(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Zu(e) {
	return e.value;
}
function Qu(e) {
	var t = e.contextPayload, n = Yu(e, Iu), r = ki(t, e.payloadUniqBy, Zu), i = Gu(Gu({}, n), {}, { payload: r });
	return /*#__PURE__*/ P.isValidElement(e.content) ? /*#__PURE__*/ P.cloneElement(e.content, i) : typeof e.content == "function" ? /*#__PURE__*/ P.createElement(e.content, i) : /*#__PURE__*/ P.createElement(yr, i);
}
function $u(e) {
	return e === "left" || e === "right" || e === "insideLeft" || e === "insideRight" ? "vertical" : "horizontal";
}
function ed(e, t) {
	return t == null ? null : dt(t) ? Pu(e) : dl(e);
}
function td(e, t, n) {
	return e === "top" ? { top: n.height + t } : e === "bottom" ? { top: -n.height - t } : e === "left" ? { left: n.width + t } : e === "right" ? { left: -n.width - t } : {};
}
function nd(e, t, n, r, i, a) {
	var o = t.layout, s = t.align, c = t.verticalAlign, l, u;
	return e && (e.left !== void 0 && e.left !== null || e.right !== void 0 && e.right !== null) || (l = s === "center" && o === "vertical" ? { left: ((r || 0) - a.width) / 2 } : s === "right" ? { right: n && n.right || 0 } : { left: n && n.left || 0 }), e && (e.top !== void 0 && e.top !== null || e.bottom !== void 0 && e.bottom !== null) || (u = c === "middle" ? { top: ((i || 0) - a.height) / 2 } : c === "bottom" ? { bottom: n && n.bottom || 0 } : { top: n && n.top || 0 }), Gu(Gu({}, l), u);
}
function rd(e) {
	var t = e.align, n = e.layout, r = e.verticalAlign, i = e.itemSorter, a = e.position, o = e.offset, s = z();
	return (0, P.useLayoutEffect)(() => {
		s(du({
			align: t,
			layout: n,
			verticalAlign: r,
			itemSorter: i,
			position: a,
			offset: o
		}));
	}, [
		s,
		t,
		n,
		r,
		i,
		a,
		o
	]), null;
}
function id(e) {
	var t = e.width, n = e.height, r = z();
	return (0, P.useLayoutEffect)(() => {
		r(uu({
			width: t,
			height: n
		}));
	}, [
		r,
		t,
		n
	]), (0, P.useLayoutEffect)(() => () => {
		r(uu({
			width: 0,
			height: 0
		}));
	}, [r]), null;
}
function ad(e, t, n, r) {
	return e === "vertical" && t != null ? { height: t } : e === "horizontal" ? { width: n || r } : null;
}
var od = {
	align: "center",
	iconSize: 14,
	inactiveColor: "#ccc",
	itemSorter: "value",
	labelStyle: {},
	layout: "auto",
	verticalAlign: "bottom",
	offset: 0
};
function sd(e) {
	var t = sr(e, od), n = e.layout && e.layout !== "auto" ? e.layout : $u(t.position), r = sa(), i = pt(), a = tu(), o = B((e) => ed(e, t.position)), s = t.width, c = t.height, l = t.wrapperStyle, u = t.portal, d = u == null && (t.position == null || dt(t.position)), f = Ru(_a([r]), 2), p = f[0], m = f[1], h = $l(), g = eu();
	if (h == null || g == null || t.position != null && o == null) return null;
	var _ = ad(n, c, s, h - (a?.left || 0) - (a?.right || 0)), v = t.position == null ? null : lt({
		viewBox: o ?? {
			x: 0,
			y: 0,
			width: h,
			height: g
		},
		position: t.position,
		offset: t.offset ?? 0
	}), y = td(t.position, t.offset ?? 0, p), b = n === "vertical" ? (o?.width ?? 0) / 2 : o?.width ?? 0, x = n === "horizontal" ? (o?.height ?? 0) / 2 : o?.height ?? 0, S = v ? {
		width: "max-content",
		height: "max-content",
		maxWidth: b,
		maxHeight: x,
		overflowY: "auto",
		top: v.y + (y.top ?? 0),
		left: v.x + (y.left ?? 0),
		transform: Fu(v.horizontalAnchor, v.verticalAnchor)
	} : nd(l, t, a, h, g, p), C = u ? l : Gu(Gu({
		position: "absolute",
		width: _?.width || s || "auto",
		height: _?.height || c || "auto"
	}, S), l), w = u ?? i;
	if (w == null || r == null) return null;
	var T = /*#__PURE__*/ P.createElement("div", {
		className: "recharts-legend-wrapper",
		style: C,
		ref: m
	}, /*#__PURE__*/ P.createElement(rd, {
		layout: n,
		align: t.align,
		verticalAlign: t.verticalAlign,
		itemSorter: t.itemSorter,
		position: t.position,
		offset: t.offset
	}), d && /*#__PURE__*/ P.createElement(id, p), /*#__PURE__*/ P.createElement(Qu, Lu({}, t, { layout: n }, _, {
		margin: a,
		chartWidth: h,
		chartHeight: g,
		contextPayload: r
	})));
	return /*#__PURE__*/ (0, le.createPortal)(T, w);
}
var cd = /*#__PURE__*/ P.memo(sd, Nu);
cd.displayName = "Legend";
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/DefaultTooltipContent.js
function ld() {
	return ld = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ld.apply(null, arguments);
}
function ud(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function dd(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ud(Object(n), !0).forEach(function(t) {
			fd(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ud(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function fd(e, t, n) {
	return (t = pd(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function pd(e) {
	var t = md(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function md(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function hd(e, t) {
	return bd(e) || yd(e, t) || _d(e, t) || gd();
}
function gd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _d(e, t) {
	if (e) {
		if (typeof e == "string") return vd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? vd(e, t) : void 0;
	}
}
function vd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function yd(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function bd(e) {
	if (Array.isArray(e)) return e;
}
function xd(e) {
	return Array.isArray(e) && Je(e[0]) && Je(e[1]) ? e.join(" ~ ") : e;
}
var Sd = {
	separator: " : ",
	contentStyle: {
		margin: 0,
		padding: 10,
		backgroundColor: "#fff",
		border: "1px solid #ccc",
		whiteSpace: "nowrap"
	},
	itemStyle: {
		display: "block",
		paddingTop: 4,
		paddingBottom: 4,
		color: "#000"
	},
	labelStyle: {},
	accessibilityLayer: !1
};
function Cd(e, t) {
	return t == null ? e : ra(e, t);
}
var wd = (e) => {
	var t = e.separator, n = t === void 0 ? Sd.separator : t, r = e.contentStyle, i = e.itemStyle, a = e.labelStyle, o = a === void 0 ? Sd.labelStyle : a, s = e.payload, c = e.formatter, u = e.itemSorter, d = e.wrapperClassName, f = e.labelClassName, p = e.label, m = e.labelFormatter, h = e.accessibilityLayer, g = h === void 0 ? Sd.accessibilityLayer : h, _ = () => {
		if (s && s.length) {
			var e = {
				padding: 0,
				margin: 0
			}, t = Cd(s, u).map((e, t) => {
				if (!e || e.type === "none") return null;
				var r = e.formatter || c || xd, a = e.value, o = e.name, l = a, u = o;
				if (r) {
					var d = r(a, o, e, t, s);
					if (Array.isArray(d)) {
						var f = hd(d, 2);
						l = f[0], u = f[1];
					} else if (d != null) l = d;
					else return null;
				}
				var p = dd(dd({}, Sd.itemStyle), {}, { color: e.color || Sd.itemStyle.color }, i);
				return /*#__PURE__*/ P.createElement("li", {
					className: "recharts-tooltip-item",
					key: `tooltip-item-${t}`,
					style: p
				}, Je(u) ? /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-name" }, u) : null, Je(u) ? /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-separator" }, n) : null, /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-value" }, l), /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-unit" }, e.unit || ""));
			});
			return /*#__PURE__*/ P.createElement("ul", {
				className: "recharts-tooltip-item-list",
				style: e
			}, t);
		}
		return null;
	}, v = dd(dd({}, Sd.contentStyle), r), y = dd({ margin: 0 }, o), b = !L(p), x = b ? p : "", S = l("recharts-default-tooltip", d), C = l("recharts-tooltip-label", f);
	b && m && s != null && (x = m(p, s));
	var w = g ? {
		role: "status",
		"aria-live": "assertive"
	} : {};
	return /*#__PURE__*/ P.createElement("div", ld({
		className: S,
		style: v
	}, w), /*#__PURE__*/ P.createElement("p", {
		className: C,
		style: y
	}, /*#__PURE__*/ P.isValidElement(x) ? x : `${x}`), _());
}, Td = "recharts-tooltip-wrapper", Ed = { visibility: "hidden" };
function Dd(e) {
	var t = e.coordinate, n = e.translateX, r = e.translateY;
	return l(Td, {
		[`${Td}-right`]: F(n) && t && F(t.x) && n >= t.x,
		[`${Td}-left`]: F(n) && t && F(t.x) && n < t.x,
		[`${Td}-bottom`]: F(r) && t && F(t.y) && r >= t.y,
		[`${Td}-top`]: F(r) && t && F(t.y) && r < t.y
	});
}
function Od(e) {
	var t = e.allowEscapeViewBox, n = e.coordinate, r = e.key, i = e.offset, a = e.position, o = e.reverseDirection, s = e.tooltipDimension, c = e.viewBox, l = e.viewBoxDimension;
	if (a && F(a[r])) return a[r];
	var u = n[r] - s - (i > 0 ? i : 0), d = n[r] + i;
	if (t[r]) return o[r] ? u : d;
	var f = c[r];
	return f == null ? 0 : o[r] ? Math.max(u < f ? d : u, f) : l == null ? 0 : d + s > f + l ? Math.max(u, f) : Math.max(d, f);
}
function kd(e) {
	var t = e.translateX, n = e.translateY;
	return { transform: e.useTranslate3d ? `translate3d(${t}px, ${n}px, 0)` : `translate(${t}px, ${n}px)` };
}
function Ad(e) {
	var t = e.allowEscapeViewBox, n = e.coordinate, r = e.offsetTop, i = e.offsetLeft, a = e.position, o = e.reverseDirection, s = e.tooltipBox, c = e.useTranslate3d, l = e.viewBox, u, d, f;
	return s && s.height > 0 && s.width > 0 && n ? (d = Od({
		allowEscapeViewBox: t,
		coordinate: n,
		key: "x",
		offset: i,
		position: a,
		reverseDirection: o,
		tooltipDimension: s.width,
		viewBox: l,
		viewBoxDimension: l.width
	}), f = Od({
		allowEscapeViewBox: t,
		coordinate: n,
		key: "y",
		offset: r,
		position: a,
		reverseDirection: o,
		tooltipDimension: s.height,
		viewBox: l,
		viewBoxDimension: l.height
	}), u = kd({
		translateX: d,
		translateY: f,
		useTranslate3d: c
	})) : u = Ed, {
		cssProperties: u,
		cssClasses: Dd({
			translateX: d,
			translateY: f,
			coordinate: n
		})
	};
}
var jd = {
	devToolsEnabled: !0,
	isSsr: !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/usePrefersReducedMotion.js
function Md(e, t) {
	return Ld(e) || Id(e, t) || Pd(e, t) || Nd();
}
function Nd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Pd(e, t) {
	if (e) {
		if (typeof e == "string") return Fd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Fd(e, t) : void 0;
	}
}
function Fd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Id(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Ld(e) {
	if (Array.isArray(e)) return e;
}
function Rd() {
	var e = Md((0, P.useState)(() => jd.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches), 2), t = e[0], n = e[1];
	return (0, P.useEffect)(() => {
		if (window.matchMedia) {
			var e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => {
				n(e.matches);
			};
			return e.addEventListener("change", t), () => {
				e.removeEventListener("change", t);
			};
		}
	}, []), t;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/TooltipBoundingBox.js
function zd(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Bd(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? zd(Object(n), !0).forEach(function(t) {
			Vd(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zd(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Vd(e, t, n) {
	return (t = Hd(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Hd(e) {
	var t = Ud(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ud(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Wd(e, t) {
	return Yd(e) || Jd(e, t) || Kd(e, t) || Gd();
}
function Gd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Kd(e, t) {
	if (e) {
		if (typeof e == "string") return qd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? qd(e, t) : void 0;
	}
}
function qd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Jd(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Yd(e) {
	if (Array.isArray(e)) return e;
}
function Xd(e) {
	if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active) {
		var t = typeof e.animationEasing == "string" ? e.animationEasing : "ease";
		return `transform ${e.animationDuration}ms ${t}`;
	}
}
function Zd(e) {
	var t = Rd(), n = Wd(P.useState(() => ({
		dismissed: !1,
		dismissedAtCoordinate: {
			x: 0,
			y: 0
		}
	})), 2), r = n[0], i = n[1];
	P.useEffect(() => {
		var t = (t) => {
			t.key === "Escape" && i({
				dismissed: !0,
				dismissedAtCoordinate: {
					x: e.coordinate?.x ?? 0,
					y: e.coordinate?.y ?? 0
				}
			});
		};
		return document.addEventListener("keydown", t), () => {
			document.removeEventListener("keydown", t);
		};
	}, [e.coordinate?.x, e.coordinate?.y]), r.dismissed && ((e.coordinate?.x ?? 0) !== r.dismissedAtCoordinate.x || (e.coordinate?.y ?? 0) !== r.dismissedAtCoordinate.y) && i(Bd(Bd({}, r), {}, { dismissed: !1 }));
	var a = Ad({
		allowEscapeViewBox: e.allowEscapeViewBox,
		coordinate: e.coordinate,
		offsetLeft: typeof e.offset == "number" ? e.offset : e.offset.x,
		offsetTop: typeof e.offset == "number" ? e.offset : e.offset.y,
		position: e.position,
		reverseDirection: e.reverseDirection,
		tooltipBox: e.lastBoundingBox,
		useTranslate3d: e.useTranslate3d,
		viewBox: e.viewBox
	}), o = a.cssClasses, s = a.cssProperties, c = Bd(Bd({}, e.hasPortalFromProps ? {} : Bd(Bd({ transition: Xd({
		prefersReducedMotion: t,
		isAnimationActive: e.isAnimationActive,
		active: e.active,
		animationDuration: e.animationDuration,
		animationEasing: e.animationEasing
	}) }, s), {}, {
		pointerEvents: "none",
		position: "absolute",
		top: 0,
		left: 0
	})), {}, { visibility: !r.dismissed && e.active && e.hasPayload ? "visible" : "hidden" }, e.wrapperStyle);
	return /*#__PURE__*/ P.createElement("div", {
		xmlns: "http://www.w3.org/1999/xhtml",
		tabIndex: -1,
		className: o,
		style: c,
		ref: e.innerRef
	}, e.children);
}
var Qd = /*#__PURE__*/ P.memo(Zd), $d = () => B((e) => e.rootProps.accessibilityLayer) ?? !0;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/shape/Curve.js
function ef() {
	return ef = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ef.apply(null, arguments);
}
function tf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function nf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? tf(Object(n), !0).forEach(function(t) {
			rf(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : tf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function rf(e, t, n) {
	return (t = af(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function af(e) {
	var t = of(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function of(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var sf = {
	curveBasisClosed: cn,
	curveBasisOpen: un,
	curveBasis: on,
	curveBumpX: Ft,
	curveBumpY: It,
	curveLinearClosed: fn,
	curveLinear: kt,
	curveMonotoneX: bn,
	curveMonotoneY: xn,
	curveNatural: wn,
	curveStep: En,
	curveStepAfter: On,
	curveStepBefore: Dn
}, cf = (e) => W(e.x) && W(e.y), lf = (e) => e.base != null && cf(e.base) && cf(e), uf = (e) => e.x, df = (e) => e.y, ff = (e, t) => {
	if (typeof e == "function") return e;
	var n = `curve${et(e)}`;
	if ((n === "curveMonotone" || n === "curveBump") && t) {
		var r = sf[`${n}${t === "vertical" ? "Y" : "X"}`];
		if (r) return r;
	}
	return sf[n] || kt;
}, pf = {
	connectNulls: !1,
	type: "linear"
}, mf = (e) => {
	var t = e.type, n = t === void 0 ? pf.type : t, r = e.points, i = r === void 0 ? [] : r, a = e.baseLine, o = e.layout, s = e.connectNulls, c = s === void 0 ? pf.connectNulls : s, l = ff(n, o), u = c ? i.filter(cf) : i;
	if (Array.isArray(a)) {
		var d, f = i.map((e, t) => nf(nf({}, e), {}, { base: a[t] }));
		return d = o === "vertical" ? Nt().y(df).x1(uf).x0((e) => e.base.x) : Nt().x(uf).y1(df).y0((e) => e.base.y), d.defined(lf).curve(l)(c ? f.filter(lf) : f);
	}
	return (o === "vertical" && F(a) ? Nt().y(df).x1(uf).x0(a) : F(a) ? Nt().x(uf).y1(df).y0(a) : Mt().x(uf).y(df)).defined(cf).curve(l)(u);
}, hf = (e) => {
	var t = e.className, n = e.points, r = e.path, i = e.pathRef, a = nu();
	if ((!n || !n.length) && !r) return null;
	var o = {
		type: e.type,
		points: e.points,
		baseLine: e.baseLine,
		layout: e.layout || a,
		connectNulls: e.connectNulls
	}, s = n && n.length ? mf(o) : r;
	return /*#__PURE__*/ P.createElement("path", ef({}, he(e), $n(e), {
		className: l("recharts-curve", t),
		d: s === null ? void 0 : s,
		ref: i
	}));
}, gf = [
	"x",
	"y",
	"top",
	"left",
	"width",
	"height",
	"className"
];
function _f() {
	return _f = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, _f.apply(null, arguments);
}
function vf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function yf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? vf(Object(n), !0).forEach(function(t) {
			bf(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function bf(e, t, n) {
	return (t = xf(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function xf(e) {
	var t = Sf(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Sf(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Cf(e, t) {
	if (e == null) return {};
	var n, r, i = wf(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function wf(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Tf = (e, t, n, r, i, a) => `M${e},${i}v${r}M${a},${t}h${n}`, Ef = (e) => {
	var t = e.x, n = t === void 0 ? 0 : t, r = e.y, i = r === void 0 ? 0 : r, a = e.top, o = a === void 0 ? 0 : a, s = e.left, c = s === void 0 ? 0 : s, u = e.width, d = u === void 0 ? 0 : u, f = e.height, p = f === void 0 ? 0 : f, m = e.className, h = Cf(e, gf), g = yf({
		x: n,
		y: i,
		top: o,
		left: c,
		width: d,
		height: p
	}, h);
	return !F(n) || !F(i) || !F(d) || !F(p) || !F(o) || !F(c) ? null : /*#__PURE__*/ P.createElement("path", _f({}, _e(g), {
		className: l("recharts-cross", m),
		d: Tf(n, i, d, p, o, c)
	}));
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/cursor/getCursorRectangle.js
function Df(e, t, n, r) {
	var i = r / 2;
	return {
		stroke: "none",
		fill: "#ccc",
		x: e === "horizontal" ? t.x - i : n.left + .5,
		y: e === "horizontal" ? n.top + .5 : t.y - i,
		width: e === "horizontal" ? r : n.width - 1,
		height: e === "horizontal" ? n.height - 1 : r
	};
}
var Of = (e, t) => [
	0,
	3 * e,
	3 * t - 6 * e,
	3 * e - 3 * t + 1
], kf = (e, t) => e.map((e, n) => e * t ** n).reduce((e, t) => e + t), Af = (e, t) => (n) => kf(Of(e, t), n), jf = (e, t) => (n) => kf([...Of(e, t).map((e, t) => e * t).slice(1), 0], n), Mf = (e) => {
	var t, n = e.split("(");
	if (n.length !== 2 || n[0] !== "cubic-bezier") return null;
	var r = (t = n[1]) == null || (t = t.split(")")[0]) == null ? void 0 : t.split(",");
	if (r == null || r.length !== 4) return null;
	var i = r.map((e) => parseFloat(e));
	return [
		i[0],
		i[1],
		i[2],
		i[3]
	];
}, Nf = function() {
	var e = [...arguments];
	if (e.length === 1) switch (e[0]) {
		case "linear": return [
			0,
			0,
			1,
			1
		];
		case "ease": return [
			.25,
			.1,
			.25,
			1
		];
		case "ease-in": return [
			.42,
			0,
			1,
			1
		];
		case "ease-out": return [
			.42,
			0,
			.58,
			1
		];
		case "ease-in-out": return [
			0,
			0,
			.58,
			1
		];
		default:
			var t = Mf(e[0]);
			if (t) return t;
	}
	return e.length === 4 ? e : [
		0,
		0,
		1,
		1
	];
}, Pf = (e, t, n, r) => {
	var i = Af(e, n), a = Af(t, r), o = jf(e, n), s = (e) => e > 1 ? 1 : e < 0 ? 0 : e, c = (e) => {
		for (var t = e > 1 ? 1 : e, n = t, r = 0; r < 8; ++r) {
			var c = i(n) - t, l = o(n);
			if (Math.abs(c - t) < 1e-4 || l < 1e-4) return a(n);
			n = s(n - c / l);
		}
		return a(n);
	};
	return c.isStepper = !1, c;
}, Ff = function() {
	return Pf(...Nf(...arguments));
}, If = function() {
	for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.stiff, n = t === void 0 ? 100 : t, r = e.damping, i = r === void 0 ? 8 : r, a = e.dt, o = a === void 0 ? 16.67 : a, s = 1, c = [0], l = 0, u = 0, d = 1e4, f = 0; f < d;) {
		var p = -(l - s) * n, m = u * i;
		if (u += (p - m) * o / 1e3, l += u * o / 1e3, c.push(l), Math.abs(l - s) < 1e-4 && Math.abs(u) < 1e-4) break;
		f++;
	}
	c[c.length - 1] = s;
	var h = c.length - 1;
	return (e) => {
		if (e <= 0) return 0;
		if (e >= 1) return s;
		var t = e * h, n = Math.floor(t), r = t - n;
		return (c[n] ?? 0) + ((c[n + 1] ?? 0) - (c[n] ?? 0)) * r;
	};
}, Lf = (e) => {
	if (typeof e == "string") switch (e) {
		case "ease":
		case "ease-in-out":
		case "ease-out":
		case "ease-in":
		case "linear": return Ff(e);
		case "spring": return If();
		default: if (e.split("(")[0] === "cubic-bezier") return Ff(e);
	}
	return typeof e == "function" ? e : null;
}, Rf = /*#__PURE__*/ (0, P.createContext)((e, t, n) => {
	var r, i = (a) => {
		var o = t.tick(a);
		if (t.getState() === "active") {
			if (n(t.getInterpolated()), t.getProgress() === 1) {
				t.complete(), r = void 0;
				return;
			}
			r = e.setTimeout(i, o);
		} else r = e.setTimeout(i, o);
	};
	return r = e.setTimeout(i, 0), () => r?.();
});
Rf.Provider;
function zf(e) {
	var t = (0, P.useContext)(Rf);
	return (0, P.useMemo)(() => e ?? t, [e, t]);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/animation/AnimationHandle.js
function Bf(e, t, n) {
	return (t = Vf(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Vf(e) {
	var t = Hf(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Hf(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Uf = "init", Wf = "pending", Gf = "active", Kf = "completed";
function qf(e) {
	return Math.max(0, e);
}
var Jf = class {
	getAnimationStartedTime() {
		return this.animationStartedTime;
	}
	getBeginStartedTime() {
		return this.beginStartedTime;
	}
	constructor(e) {
		var t;
		Bf(this, "state", Uf), this.animationId = e.animationId, this.onAnimationEnd = e.onAnimationEnd, this.animationDuration = qf(e.animationDuration), this.animationBegin = qf(e.animationBegin), this.progress = 0, this.from = e.from, this.to = e.to, this.easing = e.easing, (t = e.onAnimationStart) == null || t.call(e);
	}
	getState() {
		return this.state;
	}
	getEasing() {
		return this.easing;
	}
	getAnimationDuration() {
		return this.animationDuration;
	}
	tick(e) {
		if (this.getState() === Uf) return this.state = Wf, this.beginStartedTime = e, this.animationBegin;
		if (this.getState() === Wf) {
			if (this.beginStartedTime == null) throw Error();
			var t = e - this.beginStartedTime;
			return t >= this.animationBegin ? (this.state = Gf, this.animationStartedTime = e, this.nextAnimationUpdate(0)) : qf(this.animationBegin - t);
		}
		if (this.getState() === Gf) {
			if (this.animationStartedTime == null) throw Error();
			var n = e - this.animationStartedTime;
			return this.setProgress(n / this.animationDuration), this.nextAnimationUpdate(n);
		}
		return 0;
	}
	setProgress(e) {
		this.progress = Math.min(1, Math.max(0, e));
	}
	getProgress() {
		return this.progress;
	}
	complete() {
		if (this.progress = 1, this.state === "active") {
			var e;
			(e = this.onAnimationEnd) == null || e.call(this);
		}
		this.state = Kf;
	}
	getFrom() {
		return this.from;
	}
	getTo() {
		return this.to;
	}
	getAnimationId() {
		return this.animationId;
	}
	getAnimationBegin() {
		return this.animationBegin;
	}
}, Yf = class extends Jf {
	nextAnimationUpdate() {
		return 0;
	}
	getInterpolated() {
		return this.easing(I(this.getFrom(), this.getTo(), this.getProgress()));
	}
}, Xf = class {
	setTimeout(e) {
		var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), r = null, i = (a) => {
			a - n >= t ? e(a) : r = requestAnimationFrame(i);
		};
		return r = requestAnimationFrame(i), () => {
			r != null && cancelAnimationFrame(r);
		};
	}
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/animation/JavascriptAnimate.js
function Zf(e, t) {
	return np(e) || tp(e, t) || $f(e, t) || Qf();
}
function Qf() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $f(e, t) {
	if (e) {
		if (typeof e == "string") return ep(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ep(e, t) : void 0;
	}
}
function ep(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function tp(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function np(e) {
	if (Array.isArray(e)) return e;
}
var rp = {
	begin: 0,
	duration: 1e3,
	easing: "ease",
	isActive: !0,
	canBegin: !0,
	onAnimationEnd: () => {},
	onAnimationStart: () => {}
}, ip = 0, ap = 1;
function op(e) {
	var t = sr(e, rp), n = t.animationId, r = t.isActive, i = t.canBegin, a = t.duration, o = t.easing, s = t.begin, c = t.onAnimationEnd, l = t.onAnimationStart, u = t.children, d = Rd(), f = r === "auto" ? !jd.isSsr && !d : r, p = zf(t.animationController), m = Zf((0, P.useState)(f ? ip : ap), 2), h = m[0], g = m[1];
	return (0, P.useEffect)(() => {
		f || g(ap);
	}, [f]), (0, P.useEffect)(() => {
		var e = Lf(o);
		return !f || !i || e == null ? nt : p(new Xf(), new Yf({
			animationId: n,
			easing: e,
			animationDuration: a,
			animationBegin: s,
			onAnimationStart: l,
			onAnimationEnd: c,
			from: ip,
			to: ap
		}), g);
	}, [
		p,
		n,
		f,
		i,
		a,
		o,
		s,
		l,
		c
	]), u(Number(h));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/useAnimationId.js
function sp(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", n = (0, P.useRef)(Xe(t)), r = (0, P.useRef)(e);
	return r.current !== e && (n.current = Xe(t), r.current = e), n.current;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/animation/util.js
var cp = (e) => e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`), lp = (e, t, n) => e.map((e) => `${cp(e)} ${t}ms ${n}`).join(","), up = ["radius"], dp = ["radius"], fp, pp, mp, hp, gp, _p, vp, yp, bp, xp;
function Sp(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Cp(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Sp(Object(n), !0).forEach(function(t) {
			wp(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Sp(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function wp(e, t, n) {
	return (t = Tp(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Tp(e) {
	var t = Ep(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ep(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Dp() {
	return Dp = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Dp.apply(null, arguments);
}
function Op(e, t) {
	if (e == null) return {};
	var n, r, i = kp(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function kp(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Ap(e, t) {
	return Fp(e) || Pp(e, t) || Mp(e, t) || jp();
}
function jp() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Mp(e, t) {
	if (e) {
		if (typeof e == "string") return Np(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Np(e, t) : void 0;
	}
}
function Np(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Pp(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Fp(e) {
	if (Array.isArray(e)) return e;
}
function Ip(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Lp = (e, t, n, r, i) => {
	var a = Ue(n), o = Ue(r), s = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), c = o >= 0 ? 1 : -1, l = a >= 0 ? 1 : -1, u = +(o >= 0 && a >= 0 || o < 0 && a < 0), d;
	if (s > 0 && Array.isArray(i)) {
		for (var f = [
			0,
			0,
			0,
			0
		], p = 0, m = 4; p < m; p++) {
			var h = i[p] ?? 0;
			f[p] = h > s ? s : h;
		}
		d = We(fp ||= Ip([
			"M",
			",",
			""
		]), e, t + c * f[0]), f[0] > 0 && (d += We(pp ||= Ip([
			"A ",
			",",
			",0,0,",
			",",
			",",
			""
		]), f[0], f[0], u, e + l * f[0], t)), d += We(mp ||= Ip([
			"L ",
			",",
			""
		]), e + n - l * f[1], t), f[1] > 0 && (d += We(hp ||= Ip([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[1], f[1], u, e + n, t + c * f[1])), d += We(gp ||= Ip([
			"L ",
			",",
			""
		]), e + n, t + r - c * f[2]), f[2] > 0 && (d += We(_p ||= Ip([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[2], f[2], u, e + n - l * f[2], t + r)), d += We(vp ||= Ip([
			"L ",
			",",
			""
		]), e + l * f[3], t + r), f[3] > 0 && (d += We(yp ||= Ip([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[3], f[3], u, e, t + r - c * f[3])), d += "Z";
	} else if (s > 0 && i === +i && i > 0) {
		var g = Math.min(s, i);
		d = We(bp ||= Ip(/* @__PURE__ */ "M .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,. Z".split(".")), e, t + c * g, g, g, u, e + l * g, t, e + n - l * g, t, g, g, u, e + n, t + c * g, e + n, t + r - c * g, g, g, u, e + n - l * g, t + r, e + l * g, t + r, g, g, u, e, t + r - c * g);
	} else d = We(xp ||= Ip([
		"M ",
		",",
		" h ",
		" v ",
		" h ",
		" Z"
	]), e, t, n, r, -n);
	return d;
}, Rp = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	radius: 0,
	isAnimationActive: !1,
	isUpdateAnimationActive: !1,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease"
}, zp = (e) => {
	var t = sr(e, Rp), n = (0, P.useRef)(null), r = Ap((0, P.useState)(-1), 2), i = r[0], a = r[1];
	(0, P.useEffect)(() => {
		if (n.current && n.current.getTotalLength) try {
			var e = n.current.getTotalLength();
			e && a(e);
		} catch {}
	}, []);
	var o = t.x, s = t.y, c = t.width, u = t.height, d = t.radius, f = t.className, p = t.animationEasing, m = t.animationDuration, h = t.animationBegin, g = t.isAnimationActive, _ = t.isUpdateAnimationActive, v = (0, P.useRef)(c), y = (0, P.useRef)(u), b = (0, P.useRef)(o), x = (0, P.useRef)(s), S = sp((0, P.useMemo)(() => ({
		x: o,
		y: s,
		width: c,
		height: u,
		radius: d
	}), [
		o,
		s,
		c,
		u,
		d
	]), "rectangle-");
	if (o !== +o || s !== +s || c !== +c || u !== +u || c === 0 || u === 0) return null;
	var C = l("recharts-rectangle", f);
	if (!_) {
		var w = _e(t);
		w.radius;
		var T = Op(w, up);
		return /*#__PURE__*/ P.createElement("path", Dp({}, T, {
			x: Ue(o),
			y: Ue(s),
			width: Ue(c),
			height: Ue(u),
			radius: typeof d == "number" ? d : void 0,
			className: C,
			d: Lp(o, s, c, u, d)
		}));
	}
	var E = v.current, D = y.current, O = b.current, k = x.current, A = `0px ${i === -1 ? 1 : i}px`, j = `${i}px ${i}px`, M = lp(["strokeDasharray"], m, typeof p == "string" ? p : Rp.animationEasing);
	return /*#__PURE__*/ P.createElement(op, {
		animationId: S,
		key: S,
		canBegin: i > 0,
		duration: m,
		easing: p,
		isActive: _,
		begin: h
	}, (e) => {
		var r = I(E, c, e), i = I(D, u, e), a = I(O, o, e), l = I(k, s, e);
		n.current && (v.current = r, y.current = i, b.current = a, x.current = l);
		var f = g ? e > 0 ? {
			transition: M,
			strokeDasharray: j
		} : { strokeDasharray: A } : { strokeDasharray: j }, p = _e(t);
		p.radius;
		var m = Op(p, dp);
		return /*#__PURE__*/ P.createElement("path", Dp({}, m, {
			radius: typeof d == "number" ? d : void 0,
			className: C,
			d: Lp(a, l, r, i, d),
			ref: n,
			style: Cp(Cp({}, f), t.style)
		}));
	});
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/PolarUtils.js
function Bp(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Vp(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Bp(Object(n), !0).forEach(function(t) {
			Hp(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Bp(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Hp(e, t, n) {
	return (t = Up(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Up(e) {
	var t = Wp(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Wp(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Gp = Math.PI / 180, Kp = (e) => e * Math.PI / 180, qp = (e) => e * 180 / Math.PI, Jp = (e, t, n, r) => ({
	x: e + Math.cos(-Gp * r) * n,
	y: t + Math.sin(-Gp * r) * n
}), Yp = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: 0,
		height: 0,
		brushBottom: 0
	};
	return Math.min(Math.abs(e - (n.left || 0) - (n.right || 0)), Math.abs(t - (n.top || 0) - (n.bottom || 0))) / 2;
}, Xp = (e, t) => {
	var n = e.x, r = e.y, i = t.x, a = t.y;
	return Math.sqrt((n - i) ** 2 + (r - a) ** 2);
}, Zp = (e, t) => {
	var n = e.x, r = e.y, i = t.cx, a = t.cy, o = Xp({
		x: n,
		y: r
	}, {
		x: i,
		y: a
	});
	if (o <= 0) return {
		radius: o,
		angle: 0
	};
	var s = (n - i) / o, c = Math.acos(s);
	return r > a && (c = 2 * Math.PI - c), {
		radius: o,
		angle: qp(c),
		angleInRadian: c
	};
}, Qp = (e) => {
	var t = e.startAngle, n = e.endAngle, r = Math.floor(t / 360), i = Math.floor(n / 360), a = Math.min(r, i);
	return {
		startAngle: t - a * 360,
		endAngle: n - a * 360
	};
}, $p = (e, t) => {
	var n = t.startAngle, r = t.endAngle, i = Math.floor(n / 360), a = Math.floor(r / 360);
	return e + Math.min(i, a) * 360;
}, em = (e, t) => {
	var n = e.relativeX, r = e.relativeY, i = Zp({
		x: n,
		y: r
	}, t), a = i.radius, o = i.angle, s = t.innerRadius, c = t.outerRadius;
	if (a < s || a > c || a === 0) return null;
	var l = Qp(t), u = l.startAngle, d = l.endAngle, f = o, p;
	if (u <= d) {
		for (; f > d;) f -= 360;
		for (; f < u;) f += 360;
		p = f >= u && f <= d;
	} else {
		for (; f > u;) f -= 360;
		for (; f < d;) f += 360;
		p = f >= d && f <= u;
	}
	return p ? Vp(Vp({}, t), {}, {
		radius: a,
		angle: $p(f, t)
	}) : null;
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/cursor/getRadialCursorPoints.js
function tm(e) {
	var t = e.cx, n = e.cy, r = e.radius, i = e.startAngle, a = e.endAngle;
	return {
		points: [Jp(t, n, r, i), Jp(t, n, r, a)],
		cx: t,
		cy: n,
		radius: r,
		startAngle: i,
		endAngle: a
	};
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/shape/Sector.js
var nm, rm, im, am, om, sm, cm;
function lm() {
	return lm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, lm.apply(null, arguments);
}
function um(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var dm = (e, t) => Ge(t - e) * Math.min(Math.abs(t - e), 359.999), fm = (e) => {
	var t = e.cx, n = e.cy, r = e.radius, i = e.angle, a = e.sign, o = e.isExternal, s = e.cornerRadius, c = e.cornerIsExternal, l = s * (o ? 1 : -1) + r, u = Math.asin(s / l) / Gp, d = c ? i : i + a * u, f = Jp(t, n, l, d), p = Jp(t, n, r, d), m = c ? i - a * u : i;
	return {
		center: f,
		circleTangency: p,
		lineTangency: Jp(t, n, l * Math.cos(u * Gp), m),
		theta: u
	};
}, pm = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, s = dm(a, o), c = a + s, l = Jp(t, n, i, a), u = Jp(t, n, i, c), d = We(nm ||= um([
		"M ",
		",",
		"\n    A ",
		",",
		",0,\n    ",
		",",
		",\n    ",
		",",
		"\n  "
	]), l.x, l.y, i, i, +(Math.abs(s) > 180), +(a > c), u.x, u.y);
	if (r > 0) {
		var f = Jp(t, n, r, a), p = Jp(t, n, r, c);
		d += We(rm ||= um([
			"L ",
			",",
			"\n            A ",
			",",
			",0,\n            ",
			",",
			",\n            ",
			",",
			" Z"
		]), p.x, p.y, r, r, +(Math.abs(s) > 180), +(a <= c), f.x, f.y);
	} else d += We(im ||= um([
		"L ",
		",",
		" Z"
	]), t, n);
	return d;
}, mm = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.cornerRadius, o = e.forceCornerRadius, s = e.cornerIsExternal, c = e.startAngle, l = e.endAngle, u = Ge(l - c), d = fm({
		cx: t,
		cy: n,
		radius: i,
		angle: c,
		sign: u,
		cornerRadius: a,
		cornerIsExternal: s
	}), f = d.circleTangency, p = d.lineTangency, m = d.theta, h = fm({
		cx: t,
		cy: n,
		radius: i,
		angle: l,
		sign: -u,
		cornerRadius: a,
		cornerIsExternal: s
	}), g = h.circleTangency, _ = h.lineTangency, v = h.theta, y = s ? Math.abs(c - l) : Math.abs(c - l) - m - v;
	if (y < 0) return o ? We(am ||= um([
		"M ",
		",",
		"\n        a",
		",",
		",0,0,1,",
		",0\n        a",
		",",
		",0,0,1,",
		",0\n      "
	]), p.x, p.y, a, a, a * 2, a, a, -a * 2) : pm({
		cx: t,
		cy: n,
		innerRadius: r,
		outerRadius: i,
		startAngle: c,
		endAngle: l
	});
	var b = We(om ||= um([
		"M ",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n    A",
		",",
		",0,",
		",",
		",",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n  "
	]), p.x, p.y, a, a, +(u < 0), f.x, f.y, i, i, +(y > 180), +(u < 0), g.x, g.y, a, a, +(u < 0), _.x, _.y);
	if (r > 0) {
		var x = fm({
			cx: t,
			cy: n,
			radius: r,
			angle: c,
			sign: u,
			isExternal: !0,
			cornerRadius: a,
			cornerIsExternal: s
		}), S = x.circleTangency, C = x.lineTangency, w = x.theta, T = fm({
			cx: t,
			cy: n,
			radius: r,
			angle: l,
			sign: -u,
			isExternal: !0,
			cornerRadius: a,
			cornerIsExternal: s
		}), E = T.circleTangency, D = T.lineTangency, O = T.theta, k = s ? Math.abs(c - l) : Math.abs(c - l) - w - O;
		if (k < 0 && a === 0) return `${b}L${t},${n}Z`;
		b += We(sm ||= um([
			"L",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"\n      A",
			",",
			",0,",
			",",
			",",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"Z"
		]), D.x, D.y, a, a, +(u < 0), E.x, E.y, r, r, +(k > 180), +(u > 0), S.x, S.y, a, a, +(u < 0), C.x, C.y);
	} else b += We(cm ||= um([
		"L",
		",",
		"Z"
	]), t, n);
	return b;
}, hm = {
	cx: 0,
	cy: 0,
	innerRadius: 0,
	outerRadius: 0,
	startAngle: 0,
	endAngle: 0,
	cornerRadius: 0,
	forceCornerRadius: !1,
	cornerIsExternal: !1
}, gm = (e) => {
	var t = sr(e, hm), n = t.cx, r = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.cornerRadius, s = t.forceCornerRadius, c = t.cornerIsExternal, u = t.startAngle, d = t.endAngle, f = t.className;
	if (a < i || u === d) return null;
	var p = l("recharts-sector", f), m = a - i, h = Ze(o, m, 0, !0), g = h > 0 && Math.abs(u - d) < 360 ? mm({
		cx: n,
		cy: r,
		innerRadius: i,
		outerRadius: a,
		cornerRadius: Math.min(h, m / 2),
		forceCornerRadius: s,
		cornerIsExternal: c,
		startAngle: u,
		endAngle: d
	}) : pm({
		cx: n,
		cy: r,
		innerRadius: i,
		outerRadius: a,
		startAngle: u,
		endAngle: d
	});
	return /*#__PURE__*/ P.createElement("path", lm({}, _e(t), {
		className: p,
		d: g
	}));
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/cursor/getCursorPoints.js
function _m(e, t, n) {
	if (e === "horizontal") return [{
		x: t.x,
		y: n.top
	}, {
		x: t.x,
		y: n.top + n.height
	}];
	if (e === "vertical") return [{
		x: n.left,
		y: t.y
	}, {
		x: n.left + n.width,
		y: t.y
	}];
	if (Qn(t)) {
		if (e === "centric") {
			var r = t.cx, i = t.cy, a = t.innerRadius, o = t.outerRadius, s = t.angle, c = Jp(r, i, a, s), l = Jp(r, i, o, s);
			return [{
				x: c.x,
				y: c.y
			}, {
				x: l.x,
				y: l.y
			}];
		}
		return tm(t);
	}
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/util/toNumber.mjs
function vm(e) {
	return Ie(e) ? NaN : Number(e);
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/util/toFinite.mjs
function ym(e) {
	return e ? (e = vm(e), e === Infinity || e === -Infinity ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/math/range.mjs
function bm(e, t, n) {
	n && typeof n != "number" && Yi(e, t, n) && (t = n = void 0), e = ym(e), t === void 0 ? (t = e, e = 0) : t = ym(t), n = n === void 0 ? e < t ? 1 : -1 : ym(n);
	let r = Math.max(Math.ceil((t - e) / (n || 1)), 0), i = Array(r);
	for (let t = 0; t < r; t++) i[t] = e, e += n;
	return i;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/dataSelectors.js
var xm = (e) => e.chartData, Sm = V([xm], (e) => {
	var t = e.chartData == null ? 0 : e.chartData.length - 1;
	return {
		chartData: e.chartData,
		computedData: e.computedData,
		dataEndIndex: t,
		dataStartIndex: 0
	};
}), Cm = (e, t, n, r) => r ? Sm(e) : xm(e), wm = (e, t, n) => n ? Sm(e) : xm(e), Tm = V([Cm], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
}), Em = V([Sm], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
}), Dm = V([xm], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/isDomainSpecifiedByUser.js
function Om(e, t) {
	return Nm(e) || Mm(e, t) || Am(e, t) || km();
}
function km() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Am(e, t) {
	if (e) {
		if (typeof e == "string") return jm(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? jm(e, t) : void 0;
	}
}
function jm(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Mm(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Nm(e) {
	if (Array.isArray(e)) return e;
}
function Pm(e) {
	if (Array.isArray(e) && e.length === 2) {
		var t = Om(e, 2), n = t[0], r = t[1];
		if (W(n) && W(r)) return !0;
	}
	return !1;
}
function Fm(e, t, n) {
	return n ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function Im(e, t) {
	if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
		var n = Om(e, 2), r = n[0], i = n[1], a, o;
		if (W(r)) a = r;
		else if (typeof r == "function") return;
		if (W(i)) o = i;
		else if (typeof i == "function") return;
		var s = [a, o];
		if (Pm(s)) return s;
	}
}
function Lm(e, t, n) {
	if (n || t != null) {
		if (typeof e == "function" && t != null) try {
			var r = e(t, n);
			if (Pm(r)) return Fm(r, t, n);
		} catch {}
		if (Array.isArray(e) && e.length === 2) {
			var i = Om(e, 2), a = i[0], o = i[1], s, c;
			if (a === "auto") t != null && (s = Math.min(...t));
			else if (F(a)) s = a;
			else if (typeof a == "function") try {
				t != null && (s = a(t?.[0]));
			} catch {}
			else if (typeof a == "string" && zc.test(a)) {
				var l = zc.exec(a);
				if (l == null || l[1] == null || t == null) s = void 0;
				else {
					var u = +l[1];
					s = t[0] - u;
				}
			} else s = t?.[0];
			if (o === "auto") t != null && (c = Math.max(...t));
			else if (F(o)) c = o;
			else if (typeof o == "function") try {
				t != null && (c = o(t?.[1]));
			} catch {}
			else if (typeof o == "string" && Bc.test(o)) {
				var d = Bc.exec(o);
				if (d == null || d[1] == null || t == null) c = void 0;
				else {
					var f = +d[1];
					c = t[1] + f;
				}
			} else c = t?.[1];
			var p = [s, c];
			if (Pm(p)) return t == null ? p : Fm(p, t, n);
		}
	}
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/scale/util/arithmetic.js
var q = /* @__PURE__ */ i((/* @__PURE__ */ n(((e, t, n) => {
	(function(e) {
		var n = 1e9, r = {
			precision: 20,
			rounding: 4,
			toExpNeg: -7,
			toExpPos: 21,
			LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
		}, i = !0, a = "[DecimalError] ", o = a + "Invalid argument: ", s = a + "Exponent out of range: ", c = Math.floor, l = Math.pow, u = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, d, f = 1e7, p = 7, m = 9007199254740991, h = c(m / p), g = {};
		g.absoluteValue = g.abs = function() {
			var e = new this.constructor(this);
			return e.s &&= 1, e;
		}, g.comparedTo = g.cmp = function(e) {
			var t, n, r, i, a = this;
			if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
			if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
			for (r = a.d.length, i = e.d.length, t = 0, n = r < i ? r : i; t < n; ++t) if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
			return r === i ? 0 : r > i ^ a.s < 0 ? 1 : -1;
		}, g.decimalPlaces = g.dp = function() {
			var e = this, t = e.d.length - 1, n = (t - e.e) * p;
			if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) n--;
			return n < 0 ? 0 : n;
		}, g.dividedBy = g.div = function(e) {
			return b(this, new this.constructor(e));
		}, g.dividedToIntegerBy = g.idiv = function(e) {
			var t = this, n = t.constructor;
			return D(b(t, new n(e), 0, 1), n.precision);
		}, g.equals = g.eq = function(e) {
			return !this.cmp(e);
		}, g.exponent = function() {
			return S(this);
		}, g.greaterThan = g.gt = function(e) {
			return this.cmp(e) > 0;
		}, g.greaterThanOrEqualTo = g.gte = function(e) {
			return this.cmp(e) >= 0;
		}, g.isInteger = g.isint = function() {
			return this.e > this.d.length - 2;
		}, g.isNegative = g.isneg = function() {
			return this.s < 0;
		}, g.isPositive = g.ispos = function() {
			return this.s > 0;
		}, g.isZero = function() {
			return this.s === 0;
		}, g.lessThan = g.lt = function(e) {
			return this.cmp(e) < 0;
		}, g.lessThanOrEqualTo = g.lte = function(e) {
			return this.cmp(e) < 1;
		}, g.logarithm = g.log = function(e) {
			var t, n = this, r = n.constructor, o = r.precision, s = o + 5;
			if (e === void 0) e = new r(10);
			else if (e = new r(e), e.s < 1 || e.eq(d)) throw Error(a + "NaN");
			if (n.s < 1) throw Error(a + (n.s ? "NaN" : "-Infinity"));
			return n.eq(d) ? new r(0) : (i = !1, t = b(T(n, s), T(e, s), s), i = !0, D(t, o));
		}, g.minus = g.sub = function(e) {
			var t = this;
			return e = new t.constructor(e), t.s == e.s ? O(t, e) : _(t, (e.s = -e.s, e));
		}, g.modulo = g.mod = function(e) {
			var t, n = this, r = n.constructor, o = r.precision;
			if (e = new r(e), !e.s) throw Error(a + "NaN");
			return n.s ? (i = !1, t = b(n, e, 0, 1).times(e), i = !0, n.minus(t)) : D(new r(n), o);
		}, g.naturalExponential = g.exp = function() {
			return x(this);
		}, g.naturalLogarithm = g.ln = function() {
			return T(this);
		}, g.negated = g.neg = function() {
			var e = new this.constructor(this);
			return e.s = -e.s || 0, e;
		}, g.plus = g.add = function(e) {
			var t = this;
			return e = new t.constructor(e), t.s == e.s ? _(t, e) : O(t, (e.s = -e.s, e));
		}, g.precision = g.sd = function(e) {
			var t, n, r, i = this;
			if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(o + e);
			if (t = S(i) + 1, r = i.d.length - 1, n = r * p + 1, r = i.d[r], r) {
				for (; r % 10 == 0; r /= 10) n--;
				for (r = i.d[0]; r >= 10; r /= 10) n++;
			}
			return e && t > n ? t : n;
		}, g.squareRoot = g.sqrt = function() {
			var e, t, n, r, o, s, l, u = this, d = u.constructor;
			if (u.s < 1) {
				if (!u.s) return new d(0);
				throw Error(a + "NaN");
			}
			for (e = S(u), i = !1, o = Math.sqrt(+u), o == 0 || o == 1 / 0 ? (t = y(u.d), (t.length + e) % 2 == 0 && (t += "0"), o = Math.sqrt(t), e = c((e + 1) / 2) - (e < 0 || e % 2), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), r = new d(t)) : r = new d(o.toString()), n = d.precision, o = l = n + 3;;) if (s = r, r = s.plus(b(u, s, l + 2)).times(.5), y(s.d).slice(0, l) === (t = y(r.d)).slice(0, l)) {
				if (t = t.slice(l - 3, l + 1), o == l && t == "4999") {
					if (D(s, n + 1, 0), s.times(s).eq(u)) {
						r = s;
						break;
					}
				} else if (t != "9999") break;
				l += 4;
			}
			return i = !0, D(r, n);
		}, g.times = g.mul = function(e) {
			var t, n, r, a, o, s, c, l, u, d = this, p = d.constructor, m = d.d, h = (e = new p(e)).d;
			if (!d.s || !e.s) return new p(0);
			for (e.s *= d.s, n = d.e + e.e, l = m.length, u = h.length, l < u && (o = m, m = h, h = o, s = l, l = u, u = s), o = [], s = l + u, r = s; r--;) o.push(0);
			for (r = u; --r >= 0;) {
				for (t = 0, a = l + r; a > r;) c = o[a] + h[r] * m[a - r - 1] + t, o[a--] = c % f | 0, t = c / f | 0;
				o[a] = (o[a] + t) % f | 0;
			}
			for (; !o[--s];) o.pop();
			return t ? ++n : o.shift(), e.d = o, e.e = n, i ? D(e, p.precision) : e;
		}, g.toDecimalPlaces = g.todp = function(e, t) {
			var r = this, i = r.constructor;
			return r = new i(r), e === void 0 ? r : (v(e, 0, n), t === void 0 ? t = i.rounding : v(t, 0, 8), D(r, e + S(r) + 1, t));
		}, g.toExponential = function(e, t) {
			var r, i = this, a = i.constructor;
			return e === void 0 ? r = k(i, !0) : (v(e, 0, n), t === void 0 ? t = a.rounding : v(t, 0, 8), i = D(new a(i), e + 1, t), r = k(i, !0, e + 1)), r;
		}, g.toFixed = function(e, t) {
			var r, i, a = this, o = a.constructor;
			return e === void 0 ? k(a) : (v(e, 0, n), t === void 0 ? t = o.rounding : v(t, 0, 8), i = D(new o(a), e + S(a) + 1, t), r = k(i.abs(), !1, e + S(i) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
		}, g.toInteger = g.toint = function() {
			var e = this, t = e.constructor;
			return D(new t(e), S(e) + 1, t.rounding);
		}, g.toNumber = function() {
			return +this;
		}, g.toPower = g.pow = function(e) {
			var t, n, r, o, s, l, u = this, f = u.constructor, h = 12, g = +(e = new f(e));
			if (!e.s) return new f(d);
			if (u = new f(u), !u.s) {
				if (e.s < 1) throw Error(a + "Infinity");
				return u;
			}
			if (u.eq(d)) return u;
			if (r = f.precision, e.eq(d)) return D(u, r);
			if (t = e.e, n = e.d.length - 1, l = t >= n, s = u.s, !l) {
				if (s < 0) throw Error(a + "NaN");
			} else if ((n = g < 0 ? -g : g) <= m) {
				for (o = new f(d), t = Math.ceil(r / p + 4), i = !1; n % 2 && (o = o.times(u), A(o.d, t)), n = c(n / 2), n !== 0;) u = u.times(u), A(u.d, t);
				return i = !0, e.s < 0 ? new f(d).div(o) : D(o, r);
			}
			return s = s < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1, u.s = 1, i = !1, o = e.times(T(u, r + h)), i = !0, o = x(o), o.s = s, o;
		}, g.toPrecision = function(e, t) {
			var r, i, a = this, o = a.constructor;
			return e === void 0 ? (r = S(a), i = k(a, r <= o.toExpNeg || r >= o.toExpPos)) : (v(e, 1, n), t === void 0 ? t = o.rounding : v(t, 0, 8), a = D(new o(a), e, t), r = S(a), i = k(a, e <= r || r <= o.toExpNeg, e)), i;
		}, g.toSignificantDigits = g.tosd = function(e, t) {
			var r = this, i = r.constructor;
			return e === void 0 ? (e = i.precision, t = i.rounding) : (v(e, 1, n), t === void 0 ? t = i.rounding : v(t, 0, 8)), D(new i(r), e, t);
		}, g.toString = g.valueOf = g.val = g.toJSON = function() {
			var e = this, t = S(e), n = e.constructor;
			return k(e, t <= n.toExpNeg || t >= n.toExpPos);
		};
		function _(e, t) {
			var n, r, a, o, s, c, l, u, d = e.constructor, m = d.precision;
			if (!e.s || !t.s) return t.s || (t = new d(e)), i ? D(t, m) : t;
			if (l = e.d, u = t.d, s = e.e, a = t.e, l = l.slice(), o = s - a, o) {
				for (o < 0 ? (r = l, o = -o, c = u.length) : (r = u, a = s, c = l.length), s = Math.ceil(m / p), c = s > c ? s + 1 : c + 1, o > c && (o = c, r.length = 1), r.reverse(); o--;) r.push(0);
				r.reverse();
			}
			for (c = l.length, o = u.length, c - o < 0 && (o = c, r = u, u = l, l = r), n = 0; o;) n = (l[--o] = l[o] + u[o] + n) / f | 0, l[o] %= f;
			for (n && (l.unshift(n), ++a), c = l.length; l[--c] == 0;) l.pop();
			return t.d = l, t.e = a, i ? D(t, m) : t;
		}
		function v(e, t, n) {
			if (e !== ~~e || e < t || e > n) throw Error(o + e);
		}
		function y(e) {
			var t, n, r, i = e.length - 1, a = "", o = e[0];
			if (i > 0) {
				for (a += o, t = 1; t < i; t++) r = e[t] + "", n = p - r.length, n && (a += w(n)), a += r;
				o = e[t], r = o + "", n = p - r.length, n && (a += w(n));
			} else if (o === 0) return "0";
			for (; o % 10 == 0;) o /= 10;
			return a + o;
		}
		var b = (function() {
			function e(e, t) {
				var n, r = 0, i = e.length;
				for (e = e.slice(); i--;) n = e[i] * t + r, e[i] = n % f | 0, r = n / f | 0;
				return r && e.unshift(r), e;
			}
			function t(e, t, n, r) {
				var i, a;
				if (n != r) a = n > r ? 1 : -1;
				else for (i = a = 0; i < n; i++) if (e[i] != t[i]) {
					a = e[i] > t[i] ? 1 : -1;
					break;
				}
				return a;
			}
			function n(e, t, n) {
				for (var r = 0; n--;) e[n] -= r, r = +(e[n] < t[n]), e[n] = r * f + e[n] - t[n];
				for (; !e[0] && e.length > 1;) e.shift();
			}
			return function(r, i, o, s) {
				var c, l, u, d, m, h, g, _, v, y, b, x, C, w, T, E, O, k, A = r.constructor, j = r.s == i.s ? 1 : -1, M = r.d, N = i.d;
				if (!r.s) return new A(r);
				if (!i.s) throw Error(a + "Division by zero");
				for (l = r.e - i.e, O = N.length, T = M.length, g = new A(j), _ = g.d = [], u = 0; N[u] == (M[u] || 0);) ++u;
				if (N[u] > (M[u] || 0) && --l, x = o == null ? o = A.precision : s ? o + (S(r) - S(i)) + 1 : o, x < 0) return new A(0);
				if (x = x / p + 2 | 0, u = 0, O == 1) for (d = 0, N = N[0], x++; (u < T || d) && x--; u++) C = d * f + (M[u] || 0), _[u] = C / N | 0, d = C % N | 0;
				else {
					for (d = f / (N[0] + 1) | 0, d > 1 && (N = e(N, d), M = e(M, d), O = N.length, T = M.length), w = O, v = M.slice(0, O), y = v.length; y < O;) v[y++] = 0;
					k = N.slice(), k.unshift(0), E = N[0], N[1] >= f / 2 && ++E;
					do
						d = 0, c = t(N, v, O, y), c < 0 ? (b = v[0], O != y && (b = b * f + (v[1] || 0)), d = b / E | 0, d > 1 ? (d >= f && (d = f - 1), m = e(N, d), h = m.length, y = v.length, c = t(m, v, h, y), c == 1 && (d--, n(m, O < h ? k : N, h))) : (d == 0 && (c = d = 1), m = N.slice()), h = m.length, h < y && m.unshift(0), n(v, m, y), c == -1 && (y = v.length, c = t(N, v, O, y), c < 1 && (d++, n(v, O < y ? k : N, y))), y = v.length) : c === 0 && (d++, v = [0]), _[u++] = d, c && v[0] ? v[y++] = M[w] || 0 : (v = [M[w]], y = 1);
					while ((w++ < T || v[0] !== void 0) && x--);
				}
				return _[0] || _.shift(), g.e = l, D(g, s ? o + S(g) + 1 : o);
			};
		})();
		function x(e, t) {
			var n, r, a, o, c, u, f = 0, p = 0, m = e.constructor, h = m.precision;
			if (S(e) > 16) throw Error(s + S(e));
			if (!e.s) return new m(d);
			for (t == null ? (i = !1, u = h) : u = t, c = new m(.03125); e.abs().gte(.1);) e = e.times(c), p += 5;
			for (r = Math.log(l(2, p)) / Math.LN10 * 2 + 5 | 0, u += r, n = a = o = new m(d), m.precision = u;;) {
				if (a = D(a.times(e), u), n = n.times(++f), c = o.plus(b(a, n, u)), y(c.d).slice(0, u) === y(o.d).slice(0, u)) {
					for (; p--;) o = D(o.times(o), u);
					return m.precision = h, t == null ? (i = !0, D(o, h)) : o;
				}
				o = c;
			}
		}
		function S(e) {
			for (var t = e.e * p, n = e.d[0]; n >= 10; n /= 10) t++;
			return t;
		}
		function C(e, t, n) {
			if (t > e.LN10.sd()) throw i = !0, n && (e.precision = n), Error(a + "LN10 precision limit exceeded");
			return D(new e(e.LN10), t);
		}
		function w(e) {
			for (var t = ""; e--;) t += "0";
			return t;
		}
		function T(e, t) {
			var n, r, o, s, c, l, u, f, p, m = 1, h = 10, g = e, _ = g.d, v = g.constructor, x = v.precision;
			if (g.s < 1) throw Error(a + (g.s ? "NaN" : "-Infinity"));
			if (g.eq(d)) return new v(0);
			if (t == null ? (i = !1, f = x) : f = t, g.eq(10)) return t ?? (i = !0), C(v, f);
			if (f += h, v.precision = f, n = y(_), r = n.charAt(0), s = S(g), Math.abs(s) < 0x5543df729c000) {
				for (; r < 7 && r != 1 || r == 1 && n.charAt(1) > 3;) g = g.times(e), n = y(g.d), r = n.charAt(0), m++;
				s = S(g), r > 1 ? (g = new v("0." + n), s++) : g = new v(r + "." + n.slice(1));
			} else return u = C(v, f + 2, x).times(s + ""), g = T(new v(r + "." + n.slice(1)), f - h).plus(u), v.precision = x, t == null ? (i = !0, D(g, x)) : g;
			for (l = c = g = b(g.minus(d), g.plus(d), f), p = D(g.times(g), f), o = 3;;) {
				if (c = D(c.times(p), f), u = l.plus(b(c, new v(o), f)), y(u.d).slice(0, f) === y(l.d).slice(0, f)) return l = l.times(2), s !== 0 && (l = l.plus(C(v, f + 2, x).times(s + ""))), l = b(l, new v(m), f), v.precision = x, t == null ? (i = !0, D(l, x)) : l;
				l = u, o += 2;
			}
		}
		function E(e, t) {
			var n, r, a;
			for ((n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), r = 0; t.charCodeAt(r) === 48;) ++r;
			for (a = t.length; t.charCodeAt(a - 1) === 48;) --a;
			if (t = t.slice(r, a), t) {
				if (a -= r, n = n - r - 1, e.e = c(n / p), e.d = [], r = (n + 1) % p, n < 0 && (r += p), r < a) {
					for (r && e.d.push(+t.slice(0, r)), a -= p; r < a;) e.d.push(+t.slice(r, r += p));
					t = t.slice(r), r = p - t.length;
				} else r -= a;
				for (; r--;) t += "0";
				if (e.d.push(+t), i && (e.e > h || e.e < -h)) throw Error(s + n);
			} else e.s = 0, e.e = 0, e.d = [0];
			return e;
		}
		function D(e, t, n) {
			var r, a, o, u, d, m, g, _, v = e.d;
			for (u = 1, o = v[0]; o >= 10; o /= 10) u++;
			if (r = t - u, r < 0) r += p, a = t, g = v[_ = 0];
			else {
				if (_ = Math.ceil((r + 1) / p), o = v.length, _ >= o) return e;
				for (g = o = v[_], u = 1; o >= 10; o /= 10) u++;
				r %= p, a = r - p + u;
			}
			if (n !== void 0 && (o = l(10, u - a - 1), d = g / o % 10 | 0, m = t < 0 || v[_ + 1] !== void 0 || g % o, m = n < 4 ? (d || m) && (n == 0 || n == (e.s < 0 ? 3 : 2)) : d > 5 || d == 5 && (n == 4 || m || n == 6 && (r > 0 ? a > 0 ? g / l(10, u - a) : 0 : v[_ - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7))), t < 1 || !v[0]) return m ? (o = S(e), v.length = 1, t = t - o - 1, v[0] = l(10, (p - t % p) % p), e.e = c(-t / p) || 0) : (v.length = 1, v[0] = e.e = e.s = 0), e;
			if (r == 0 ? (v.length = _, o = 1, _--) : (v.length = _ + 1, o = l(10, p - r), v[_] = a > 0 ? (g / l(10, u - a) % l(10, a) | 0) * o : 0), m) for (;;) if (_ == 0) {
				(v[0] += o) == f && (v[0] = 1, ++e.e);
				break;
			} else {
				if (v[_] += o, v[_] != f) break;
				v[_--] = 0, o = 1;
			}
			for (r = v.length; v[--r] === 0;) v.pop();
			if (i && (e.e > h || e.e < -h)) throw Error(s + S(e));
			return e;
		}
		function O(e, t) {
			var n, r, a, o, s, c, l, u, d, m, h = e.constructor, g = h.precision;
			if (!e.s || !t.s) return t.s ? t.s = -t.s : t = new h(e), i ? D(t, g) : t;
			if (l = e.d, m = t.d, r = t.e, u = e.e, l = l.slice(), s = u - r, s) {
				for (d = s < 0, d ? (n = l, s = -s, c = m.length) : (n = m, r = u, c = l.length), a = Math.max(Math.ceil(g / p), c) + 2, s > a && (s = a, n.length = 1), n.reverse(), a = s; a--;) n.push(0);
				n.reverse();
			} else {
				for (a = l.length, c = m.length, d = a < c, d && (c = a), a = 0; a < c; a++) if (l[a] != m[a]) {
					d = l[a] < m[a];
					break;
				}
				s = 0;
			}
			for (d && (n = l, l = m, m = n, t.s = -t.s), c = l.length, a = m.length - c; a > 0; --a) l[c++] = 0;
			for (a = m.length; a > s;) {
				if (l[--a] < m[a]) {
					for (o = a; o && l[--o] === 0;) l[o] = f - 1;
					--l[o], l[a] += f;
				}
				l[a] -= m[a];
			}
			for (; l[--c] === 0;) l.pop();
			for (; l[0] === 0; l.shift()) --r;
			return l[0] ? (t.d = l, t.e = r, i ? D(t, g) : t) : new h(0);
		}
		function k(e, t, n) {
			var r, i = S(e), a = y(e.d), o = a.length;
			return t ? (n && (r = n - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + w(r) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + w(-i - 1) + a, n && (r = n - o) > 0 && (a += w(r))) : i >= o ? (a += w(i + 1 - o), n && (r = n - i - 1) > 0 && (a = a + "." + w(r))) : ((r = i + 1) < o && (a = a.slice(0, r) + "." + a.slice(r)), n && (r = n - o) > 0 && (i + 1 === o && (a += "."), a += w(r))), e.s < 0 ? "-" + a : a;
		}
		function A(e, t) {
			if (e.length > t) return e.length = t, !0;
		}
		function j(e) {
			var t, n, r;
			function i(e) {
				var t = this;
				if (!(t instanceof i)) return new i(e);
				if (t.constructor = i, e instanceof i) t.s = e.s, t.e = e.e, t.d = (e = e.d) ? e.slice() : e;
				else {
					if (typeof e == "number") {
						if (e * 0 != 0) throw Error(o + e);
						if (e > 0) t.s = 1;
						else if (e < 0) e = -e, t.s = -1;
						else {
							t.s = 0, t.e = 0, t.d = [0];
							return;
						}
						if (e === ~~e && e < 1e7) {
							t.e = 0, t.d = [e];
							return;
						}
						return E(t, e.toString());
					}
					if (typeof e != "string") throw Error(o + e);
					if (e.charCodeAt(0) === 45 ? (e = e.slice(1), t.s = -1) : t.s = 1, u.test(e)) E(t, e);
					else throw Error(o + e);
				}
			}
			if (i.prototype = g, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = j, i.config = i.set = M, e === void 0 && (e = {}), e) for (r = [
				"precision",
				"rounding",
				"toExpNeg",
				"toExpPos",
				"LN10"
			], t = 0; t < r.length;) e.hasOwnProperty(n = r[t++]) || (e[n] = this[n]);
			return i.config(e), i;
		}
		function M(e) {
			if (!e || typeof e != "object") throw Error(a + "Object expected");
			var t, r, i, s = [
				"precision",
				1,
				n,
				"rounding",
				0,
				8,
				"toExpNeg",
				-1 / 0,
				0,
				"toExpPos",
				0,
				1 / 0
			];
			for (t = 0; t < s.length; t += 3) if ((i = e[r = s[t]]) !== void 0) {
				if (c(i) === i && i >= s[t + 1] && i <= s[t + 2]) this[r] = i;
				else throw Error(o + r + ": " + i);
			}
			if ((i = e[r = "LN10"]) !== void 0) {
				if (i == Math.LN10) this[r] = new this(i);
				else throw Error(o + r + ": " + i);
			}
			return this;
		}
		r = j(r), r.default = r.Decimal = r, d = new r(1), typeof define == "function" && define.amd ? define(function() {
			return r;
		}) : t !== void 0 && t.exports ? t.exports = r : (e ||= typeof self < "u" && self && self.self == self ? self : Function("return this")(), e.Decimal = r);
	})(n);
})))());
function Rm(e) {
	return e === 0 ? 1 : Math.floor(new q.default(e).abs().log(10).toNumber()) + 1;
}
function zm(e, t, n) {
	for (var r = new q.default(e), i = 0, a = []; r.lt(t) && i < 1e5;) a.push(r.toNumber()), r = r.add(n), i++;
	return a;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/scale/getNiceTickValues.js
function Bm(e, t) {
	return Gm(e) || Wm(e, t) || Hm(e, t) || Vm();
}
function Vm() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Hm(e, t) {
	if (e) {
		if (typeof e == "string") return Um(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Um(e, t) : void 0;
	}
}
function Um(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Wm(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Gm(e) {
	if (Array.isArray(e)) return e;
}
var Km = (e) => {
	var t = Bm(e, 2), n = t[0], r = t[1], i = n, a = r;
	return n > r && (i = r, a = n), [i, a];
}, qm = (e, t, n) => {
	if (e.lte(0)) return new q.default(0);
	var r = Rm(e.toNumber()), i = new q.default(10).pow(r), a = e.div(i), o = r === 1 ? .1 : .05, s = new q.default(Math.ceil(a.div(o).toNumber())).add(n).mul(o).mul(i);
	return t ? new q.default(s.toNumber()) : new q.default(Math.ceil(s.toNumber()));
}, Jm = (e, t, n) => {
	if (e.lte(0)) return new q.default(0);
	var r = [
		1,
		2,
		2.5,
		5
	], i = e.toNumber(), a = Math.floor(new q.default(i).abs().log(10).toNumber()), o = new q.default(10).pow(a), s = e.div(o).toNumber(), c = r.findIndex((e) => e >= s - 1e-10);
	if (c === -1 && (o = o.mul(10), c = 0), c += n, c >= r.length) {
		var l = Math.floor(c / r.length);
		c %= r.length, o = o.mul(new q.default(10).pow(l));
	}
	var u = r[c] ?? 1, d = new q.default(u).mul(o);
	return t ? d : new q.default(Math.ceil(d.toNumber()));
}, Ym = (e, t, n) => {
	var r = new q.default(1), i = new q.default(e);
	if (!i.isint() && n) {
		var a = Math.abs(e);
		a < 1 ? (r = new q.default(10).pow(Rm(e) - 1), i = new q.default(Math.floor(i.div(r).toNumber())).mul(r)) : a > 1 && (i = new q.default(Math.floor(e)));
	} else e === 0 ? i = new q.default(Math.floor((t - 1) / 2)) : n || (i = new q.default(Math.floor(e)));
	for (var o = Math.floor((t - 1) / 2), s = [], c = 0; c < t; c++) s.push(i.add(new q.default(c - o).mul(r)).toNumber());
	return s;
}, Xm = function(e, t, n, r) {
	var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : qm;
	if (!Number.isFinite((t - e) / (n - 1))) return {
		step: new q.default(0),
		tickMin: new q.default(0),
		tickMax: new q.default(0)
	};
	var o = a(new q.default(t).sub(e).div(n - 1), r, i), s;
	e <= 0 && t >= 0 ? s = new q.default(0) : (s = new q.default(e).add(t).div(2), s = s.sub(new q.default(s).mod(o)));
	var c = Math.ceil(s.sub(e).div(o).toNumber()), l = Math.ceil(new q.default(t).sub(s).div(o).toNumber()), u = c + l + 1;
	return u > n ? Xm(e, t, n, r, i + 1, a) : (u < n && (l = t > 0 ? l + (n - u) : l, c = t > 0 ? c : c + (n - u)), {
		step: o,
		tickMin: s.sub(new q.default(c).mul(o)),
		tickMax: s.add(new q.default(l).mul(o))
	});
}, Zm = function(e) {
	var t = Bm(e, 2), n = t[0], r = t[1], i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = Math.max(i, 2), c = Bm(Km([n, r]), 2), l = c[0], u = c[1];
	if (l === -Infinity || u === Infinity) {
		var d = u === Infinity ? [l, ...Array(i - 1).fill(Infinity)] : [...Array(i - 1).fill(-Infinity), u];
		return n > r ? d.reverse() : d;
	}
	if (l === u) return Ym(l, i, a);
	var f = Xm(l, u, s, a, 0, o === "snap125" ? Jm : qm), p = f.step, m = f.tickMin, h = f.tickMax, g = zm(m, h.add(new q.default(.1).mul(p)), p);
	return n > r ? g.reverse() : g;
}, Qm = function(e, t) {
	var n = Bm(e, 2), r = n[0], i = n[1], a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = Bm(Km([r, i]), 2), c = s[0], l = s[1];
	if (c === -Infinity || l === Infinity) return [r, i];
	if (c === l) return [c];
	var u = o === "snap125" ? Jm : qm, d = Math.max(t, 2), f = u(new q.default(l).sub(c).div(d - 1), a, 0), p = [...zm(new q.default(c), new q.default(l), f), l];
	if (a === !1) {
		p = p.map((e) => Math.round(e));
		var m = p.length - 1;
		m > 0 && p[m] === p[m - 1] && (p = p.slice(0, m));
	}
	return r > i ? p.reverse() : p;
}, $m = (e) => e.rootProps.maxBarSize, eh = (e) => e.rootProps.barGap, th = (e) => e.rootProps.barCategoryGap, nh = (e) => e.rootProps.barSize, rh = (e) => e.rootProps.stackOffset, ih = (e) => e.rootProps.reverseStackOrder, ah = (e) => e.options.chartName, oh = (e) => e.rootProps.syncId, sh = (e) => e.rootProps.syncMethod, ch = (e) => e.options.eventEmitter, lh = (e) => e.rootProps.baseValue, J = {
	grid: -100,
	barBackground: -50,
	area: 100,
	cursorRectangle: 200,
	bar: 300,
	line: 400,
	axis: 500,
	scatter: 600,
	activeBar: 1e3,
	cursorLine: 1100,
	activeDot: 1200,
	label: 2e3
}, uh = {
	allowDecimals: !1,
	allowDuplicatedCategory: !0,
	allowDataOverflow: !1,
	angle: 0,
	angleAxisId: 0,
	axisLine: !0,
	axisLineType: "polygon",
	cx: 0,
	cy: 0,
	hide: !1,
	includeHidden: !1,
	label: !1,
	niceTicks: "auto",
	orientation: "outer",
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickLine: !0,
	tickSize: 8,
	type: "auto",
	zIndex: J.axis
}, dh = {
	allowDataOverflow: !1,
	allowDecimals: !1,
	allowDuplicatedCategory: !0,
	angle: 0,
	axisLine: !0,
	includeHidden: !1,
	hide: !1,
	niceTicks: "auto",
	label: !1,
	orientation: "right",
	radiusAxisId: 0,
	reversed: !1,
	scale: "auto",
	stroke: "#ccc",
	tick: !0,
	tickCount: 5,
	tickLine: !0,
	type: "auto",
	zIndex: J.axis
}, fh = (e, t) => {
	if (e && t) return e != null && e.reversed ? [t[1], t[0]] : t;
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/getAxisTypeBasedOnLayout.js
function ph(e, t, n) {
	if (n !== "auto") return n;
	if (e != null) return Ec(e, t) ? "category" : "number";
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/polarAxisSelectors.js
function mh(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function hh(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? mh(Object(n), !0).forEach(function(t) {
			gh(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : mh(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function gh(e, t, n) {
	return (t = _h(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function _h(e) {
	var t = vh(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function vh(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var yh = {
	allowDataOverflow: uh.allowDataOverflow,
	allowDecimals: uh.allowDecimals,
	allowDuplicatedCategory: !1,
	dataKey: void 0,
	domain: void 0,
	id: uh.angleAxisId,
	includeHidden: !1,
	name: void 0,
	reversed: uh.reversed,
	scale: uh.scale,
	tick: uh.tick,
	tickCount: void 0,
	ticks: void 0,
	type: uh.type,
	unit: void 0,
	niceTicks: "auto"
}, bh = {
	allowDataOverflow: dh.allowDataOverflow,
	allowDecimals: dh.allowDecimals,
	allowDuplicatedCategory: dh.allowDuplicatedCategory,
	dataKey: void 0,
	domain: void 0,
	id: dh.radiusAxisId,
	includeHidden: dh.includeHidden,
	name: void 0,
	reversed: dh.reversed,
	scale: dh.scale,
	tick: dh.tick,
	tickCount: dh.tickCount,
	ticks: void 0,
	type: dh.type,
	unit: void 0,
	niceTicks: "auto"
}, xh = V([(e, t) => {
	if (t != null) return e.polarAxis.angleAxis[t];
}, iu], (e, t) => {
	if (e != null) return e;
	var n = ph(t, "angleAxis", yh.type) ?? "category";
	return hh(hh({}, yh), {}, { type: n });
}), Sh = V([(e, t) => e.polarAxis.radiusAxis[t], iu], (e, t) => {
	if (e != null) return e;
	var n = ph(t, "radiusAxis", bh.type) ?? "category";
	return hh(hh({}, bh), {}, { type: n });
}), Ch = (e) => e.polarOptions, wh = V([
	Kc,
	qc,
	ul
], Yp), Th = V([Ch, wh], (e, t) => {
	if (e != null) return Ze(e.innerRadius, t, 0);
}), Eh = V([Ch, wh], (e, t) => {
	if (e != null) return Ze(e.outerRadius, t, t * .8);
}), Dh = V([Ch], (e) => e == null ? [0, 0] : [e.startAngle, e.endAngle]), Oh = V([xh, Dh], fh), kh = V([
	wh,
	Th,
	Eh
], (e, t, n) => {
	if (e != null && t != null && n != null) return [t, n];
}), Ah = V([Sh, kh], fh), jh = V([
	K,
	Ch,
	Th,
	Eh,
	Kc,
	qc
], (e, t, n, r, i, a) => {
	if (!(e !== "centric" && e !== "radial" || t == null || n == null || r == null)) {
		var o = t.cx, s = t.cy, c = t.startAngle, l = t.endAngle;
		return {
			cx: Ze(o, i, i / 2),
			cy: Ze(s, a, a / 2),
			innerRadius: n,
			outerRadius: r,
			startAngle: c,
			endAngle: l,
			clockWise: !1
		};
	}
}), Y = (e, t) => t, Mh = (e, t, n) => n;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/stacks/getStackSeriesIdentifier.js
function Nh(e) {
	return e?.id;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineDisplayedStackedData.js
function Ph(e, t, n) {
	var r = t.chartData, i = r === void 0 ? [] : r, a = n.allowDuplicatedCategory, o = n.dataKey, s = /* @__PURE__ */ new Map();
	return e.forEach((e) => {
		var t = e.data ?? i;
		if (t != null && t.length !== 0) {
			var n = Nh(e);
			t.forEach((t, r) => {
				var i = o == null || a ? r : String(G(t, o, null)), c = G(t, e.dataKey, 0), l = s.has(i) ? s.get(i) : {};
				Object.assign(l, { [n]: c }), s.set(i, l);
			});
		}
	}), Array.from(s.values());
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/types/StackedGraphicalItem.js
function Fh(e) {
	return "stackId" in e && e.stackId != null && e.dataKey != null;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/numberDomainEqualityCheck.js
var Ih = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/arrayEqualityCheck.js
function Lh(e, t) {
	return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function Rh(e, t) {
	if (e.length === t.length) {
		for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}
	return !1;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/selectTooltipAxisType.js
var zh = (e) => {
	var t = K(e);
	return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, Bh = (e) => e.tooltip.settings.axisId;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/scale/RechartsScale.js
function Vh(e) {
	if (e != null) {
		var t = e.ticks, n = e.bandwidth, r = e.range(), i = [Math.min(...r), Math.max(...r)];
		return {
			domain: () => e.domain(),
			range: function(e) {
				function t() {
					return e.apply(this, arguments);
				}
				return t.toString = function() {
					return e.toString();
				}, t;
			}(() => i),
			rangeMin: () => i[0],
			rangeMax: () => i[1],
			isInRange(e) {
				var t = i[0], n = i[1];
				return t <= n ? e >= t && e <= n : e >= n && e <= t;
			},
			bandwidth: n ? () => n.call(e) : void 0,
			ticks: t ? (n) => t.call(e, n) : void 0,
			map: (t, n) => {
				var r = e(t);
				if (r != null) {
					if (e.bandwidth && n != null && n.position) {
						var i = e.bandwidth();
						switch (n.position) {
							case "middle":
								r += i / 2;
								break;
							case "end": r += i;
						}
					}
					return r;
				}
			}
		};
	}
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineCheckedDomain.js
var Hh = (e, t) => {
	if (t != null) switch (e) {
		case "linear":
			if (!Pm(t)) {
				for (var n, r, i = 0; i < t.length; i++) {
					var a = t[i];
					W(a) && ((n === void 0 || a < n) && (n = a), (r === void 0 || a > r) && (r = a));
				}
				return n !== void 0 && r !== void 0 ? [n, r] : void 0;
			}
			return t;
		default: return t;
	}
};
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/ascending.js
function Uh(e, t) {
	return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/descending.js
function Wh(e, t) {
	return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/bisector.js
function Gh(e) {
	let t, n, r;
	e.length === 2 ? (t = e === Uh || e === Wh ? e : Kh, n = e, r = e) : (t = Uh, n = (t, n) => Uh(e(t), n), r = (t, n) => e(t) - n);
	function i(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) < 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function a(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) <= 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function o(e, t, n = 0, a = e.length) {
		let o = i(e, t, n, a - 1);
		return o > n && r(e[o - 1], t) > -r(e[o], t) ? o - 1 : o;
	}
	return {
		left: i,
		center: o,
		right: a
	};
}
function Kh() {
	return 0;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/number.js
function qh(e) {
	return e === null ? NaN : +e;
}
function* Jh(e, t) {
	if (t === void 0) for (let t of e) t != null && (t = +t) >= t && (yield t);
	else {
		let n = -1;
		for (let r of e) (r = t(r, ++n, e)) != null && (r = +r) >= r && (yield r);
	}
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/bisect.js
var Yh = Gh(Uh), Xh = Yh.right;
Yh.left, Gh(qh).center;
// node_modules/.pnpm/internmap@2.0.3/node_modules/internmap/src/index.js
var Zh = class extends Map {
	constructor(e, t = tg) {
		if (super(), Object.defineProperties(this, {
			_intern: { value: /* @__PURE__ */ new Map() },
			_key: { value: t }
		}), e != null) for (let [t, n] of e) this.set(t, n);
	}
	get(e) {
		return super.get(Qh(this, e));
	}
	has(e) {
		return super.has(Qh(this, e));
	}
	set(e, t) {
		return super.set($h(this, e), t);
	}
	delete(e) {
		return super.delete(eg(this, e));
	}
};
function Qh({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) ? e.get(r) : n;
}
function $h({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function eg({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) && (n = e.get(r), e.delete(r)), n;
}
function tg(e) {
	return typeof e == "object" && e ? e.valueOf() : e;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/sort.js
function ng(e = Uh) {
	if (e === Uh) return rg;
	if (typeof e != "function") throw TypeError("compare is not a function");
	return (t, n) => {
		let r = e(t, n);
		return r || r === 0 ? r : (e(n, n) === 0) - (e(t, t) === 0);
	};
}
function rg(e, t) {
	return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : +(e > t));
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/ticks.js
var ig = Math.sqrt(50), ag = Math.sqrt(10), og = Math.sqrt(2);
function sg(e, t, n) {
	let r = (t - e) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / 10 ** i, o = a >= ig ? 10 : a >= ag ? 5 : a >= og ? 2 : 1, s, c, l;
	return i < 0 ? (l = 10 ** -i / o, s = Math.round(e * l), c = Math.round(t * l), s / l < e && ++s, c / l > t && --c, l = -l) : (l = 10 ** i * o, s = Math.round(e / l), c = Math.round(t / l), s * l < e && ++s, c * l > t && --c), c < s && .5 <= n && n < 2 ? sg(e, t, n * 2) : [
		s,
		c,
		l
	];
}
function cg(e, t, n) {
	if (t = +t, e = +e, n = +n, !(n > 0)) return [];
	if (e === t) return [e];
	let r = t < e, [i, a, o] = r ? sg(t, e, n) : sg(e, t, n);
	if (!(a >= i)) return [];
	let s = a - i + 1, c = Array(s);
	if (r) {
		if (o < 0) for (let e = 0; e < s; ++e) c[e] = (a - e) / -o;
		else for (let e = 0; e < s; ++e) c[e] = (a - e) * o;
	} else if (o < 0) for (let e = 0; e < s; ++e) c[e] = (i + e) / -o;
	else for (let e = 0; e < s; ++e) c[e] = (i + e) * o;
	return c;
}
function lg(e, t, n) {
	return t = +t, e = +e, n = +n, sg(e, t, n)[2];
}
function ug(e, t, n) {
	t = +t, e = +e, n = +n;
	let r = t < e, i = r ? lg(t, e, n) : lg(e, t, n);
	return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/max.js
function dg(e, t) {
	let n;
	if (t === void 0) for (let t of e) t != null && (n < t || n === void 0 && t >= t) && (n = t);
	else {
		let r = -1;
		for (let i of e) (i = t(i, ++r, e)) != null && (n < i || n === void 0 && i >= i) && (n = i);
	}
	return n;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/min.js
function fg(e, t) {
	let n;
	if (t === void 0) for (let t of e) t != null && (n > t || n === void 0 && t >= t) && (n = t);
	else {
		let r = -1;
		for (let i of e) (i = t(i, ++r, e)) != null && (n > i || n === void 0 && i >= i) && (n = i);
	}
	return n;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/quickselect.js
function pg(e, t, n = 0, r = Infinity, i) {
	if (t = Math.floor(t), n = Math.floor(Math.max(0, n)), r = Math.floor(Math.min(e.length - 1, r)), !(n <= t && t <= r)) return e;
	for (i = i === void 0 ? rg : ng(i); r > n;) {
		if (r - n > 600) {
			let a = r - n + 1, o = t - n + 1, s = Math.log(a), c = .5 * Math.exp(2 * s / 3), l = .5 * Math.sqrt(s * c * (a - c) / a) * (o - a / 2 < 0 ? -1 : 1), u = Math.max(n, Math.floor(t - o * c / a + l)), d = Math.min(r, Math.floor(t + (a - o) * c / a + l));
			pg(e, t, u, d, i);
		}
		let a = e[t], o = n, s = r;
		for (mg(e, n, t), i(e[r], a) > 0 && mg(e, n, r); o < s;) {
			for (mg(e, o, s), ++o, --s; i(e[o], a) < 0;) ++o;
			for (; i(e[s], a) > 0;) --s;
		}
		i(e[n], a) === 0 ? mg(e, n, s) : (++s, mg(e, s, r)), s <= t && (n = s + 1), t <= s && (r = s - 1);
	}
	return e;
}
function mg(e, t, n) {
	let r = e[t];
	e[t] = e[n], e[n] = r;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/quantile.js
function hg(e, t, n) {
	if (e = Float64Array.from(Jh(e, n)), (r = e.length) && !isNaN(t = +t)) {
		if (t <= 0 || r < 2) return fg(e);
		if (t >= 1) return dg(e);
		var r, i = (r - 1) * t, a = Math.floor(i), o = dg(pg(e, a).subarray(0, a + 1));
		return o + (fg(e.subarray(a + 1)) - o) * (i - a);
	}
}
function gg(e, t, n = qh) {
	if ((r = e.length) && !isNaN(t = +t)) {
		if (t <= 0 || r < 2) return +n(e[0], 0, e);
		if (t >= 1) return +n(e[r - 1], r - 1, e);
		var r, i = (r - 1) * t, a = Math.floor(i), o = +n(e[a], a, e);
		return o + (+n(e[a + 1], a + 1, e) - o) * (i - a);
	}
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/range.js
function _g(e, t, n) {
	e = +e, t = +t, n = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +n;
	for (var r = -1, i = Math.max(0, Math.ceil((t - e) / n)) | 0, a = Array(i); ++r < i;) a[r] = e + r * n;
	return a;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/init.js
function vg(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			this.range(e);
			break;
		default: this.range(t).domain(e);
	}
	return this;
}
function yg(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			typeof e == "function" ? this.interpolator(e) : this.range(e);
			break;
		default: this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
	}
	return this;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/ordinal.js
var bg = Symbol("implicit");
function xg() {
	var e = new Zh(), t = [], n = [], r = bg;
	function i(i) {
		let a = e.get(i);
		if (a === void 0) {
			if (r !== bg) return r;
			e.set(i, a = t.push(i) - 1);
		}
		return n[a % n.length];
	}
	return i.domain = function(n) {
		if (!arguments.length) return t.slice();
		t = [], e = new Zh();
		for (let r of n) e.has(r) || e.set(r, t.push(r) - 1);
		return i;
	}, i.range = function(e) {
		return arguments.length ? (n = Array.from(e), i) : n.slice();
	}, i.unknown = function(e) {
		return arguments.length ? (r = e, i) : r;
	}, i.copy = function() {
		return xg(t, n).unknown(r);
	}, vg.apply(i, arguments), i;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/band.js
function Sg() {
	var e = xg().unknown(void 0), t = e.domain, n = e.range, r = 0, i = 1, a, o, s = !1, c = 0, l = 0, u = .5;
	delete e.unknown;
	function d() {
		var e = t().length, d = i < r, f = d ? i : r, p = d ? r : i;
		a = (p - f) / Math.max(1, e - c + l * 2), s && (a = Math.floor(a)), f += (p - f - a * (e - c)) * u, o = a * (1 - c), s && (f = Math.round(f), o = Math.round(o));
		var m = _g(e).map(function(e) {
			return f + a * e;
		});
		return n(d ? m.reverse() : m);
	}
	return e.domain = function(e) {
		return arguments.length ? (t(e), d()) : t();
	}, e.range = function(e) {
		return arguments.length ? ([r, i] = e, r = +r, i = +i, d()) : [r, i];
	}, e.rangeRound = function(e) {
		return [r, i] = e, r = +r, i = +i, s = !0, d();
	}, e.bandwidth = function() {
		return o;
	}, e.step = function() {
		return a;
	}, e.round = function(e) {
		return arguments.length ? (s = !!e, d()) : s;
	}, e.padding = function(e) {
		return arguments.length ? (c = Math.min(1, l = +e), d()) : c;
	}, e.paddingInner = function(e) {
		return arguments.length ? (c = Math.min(1, e), d()) : c;
	}, e.paddingOuter = function(e) {
		return arguments.length ? (l = +e, d()) : l;
	}, e.align = function(e) {
		return arguments.length ? (u = Math.max(0, Math.min(1, e)), d()) : u;
	}, e.copy = function() {
		return Sg(t(), [r, i]).round(s).paddingInner(c).paddingOuter(l).align(u);
	}, vg.apply(d(), arguments);
}
function Cg(e) {
	var t = e.copy;
	return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
		return Cg(t());
	}, e;
}
function wg() {
	return Cg(Sg.apply(null, arguments).paddingInner(1));
}
// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
function Tg(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Eg(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js
function Dg() {}
var Og = .7, kg = 1 / Og, Ag = "\\s*([+-]?\\d+)\\s*", jg = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Mg = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ng = /^#([0-9a-f]{3,8})$/, Pg = RegExp(`^rgb\\(${Ag},${Ag},${Ag}\\)$`), Fg = RegExp(`^rgb\\(${Mg},${Mg},${Mg}\\)$`), Ig = RegExp(`^rgba\\(${Ag},${Ag},${Ag},${jg}\\)$`), Lg = RegExp(`^rgba\\(${Mg},${Mg},${Mg},${jg}\\)$`), Rg = RegExp(`^hsl\\(${jg},${Mg},${Mg}\\)$`), zg = RegExp(`^hsla\\(${jg},${Mg},${Mg},${jg}\\)$`), Bg = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
Tg(Dg, Gg, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: Vg,
	formatHex: Vg,
	formatHex8: Hg,
	formatHsl: Ug,
	formatRgb: Wg,
	toString: Wg
});
function Vg() {
	return this.rgb().formatHex();
}
function Hg() {
	return this.rgb().formatHex8();
}
function Ug() {
	return i_(this).formatHsl();
}
function Wg() {
	return this.rgb().formatRgb();
}
function Gg(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = Ng.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Kg(t) : n === 3 ? new Xg(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? qg(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? qg(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Pg.exec(e)) ? new Xg(t[1], t[2], t[3], 1) : (t = Fg.exec(e)) ? new Xg(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Ig.exec(e)) ? qg(t[1], t[2], t[3], t[4]) : (t = Lg.exec(e)) ? qg(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Rg.exec(e)) ? r_(t[1], t[2] / 100, t[3] / 100, 1) : (t = zg.exec(e)) ? r_(t[1], t[2] / 100, t[3] / 100, t[4]) : Bg.hasOwnProperty(e) ? Kg(Bg[e]) : e === "transparent" ? new Xg(NaN, NaN, NaN, 0) : null;
}
function Kg(e) {
	return new Xg(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function qg(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new Xg(e, t, n, r);
}
function Jg(e) {
	return e instanceof Dg || (e = Gg(e)), e ? (e = e.rgb(), new Xg(e.r, e.g, e.b, e.opacity)) : new Xg();
}
function Yg(e, t, n, r) {
	return arguments.length === 1 ? Jg(e) : new Xg(e, t, n, r ?? 1);
}
function Xg(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Tg(Xg, Yg, Eg(Dg, {
	brighter(e) {
		return e = e == null ? kg : kg ** +e, new Xg(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Og : Og ** +e, new Xg(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new Xg(t_(this.r), t_(this.g), t_(this.b), e_(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: Zg,
	formatHex: Zg,
	formatHex8: Qg,
	formatRgb: $g,
	toString: $g
}));
function Zg() {
	return `#${n_(this.r)}${n_(this.g)}${n_(this.b)}`;
}
function Qg() {
	return `#${n_(this.r)}${n_(this.g)}${n_(this.b)}${n_((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function $g() {
	let e = e_(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${t_(this.r)}, ${t_(this.g)}, ${t_(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function e_(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function t_(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function n_(e) {
	return e = t_(e), (e < 16 ? "0" : "") + e.toString(16);
}
function r_(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new o_(e, t, n, r);
}
function i_(e) {
	if (e instanceof o_) return new o_(e.h, e.s, e.l, e.opacity);
	if (e instanceof Dg || (e = Gg(e)), !e) return new o_();
	if (e instanceof o_) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new o_(o, s, c, e.opacity);
}
function a_(e, t, n, r) {
	return arguments.length === 1 ? i_(e) : new o_(e, t, n, r ?? 1);
}
function o_(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Tg(o_, a_, Eg(Dg, {
	brighter(e) {
		return e = e == null ? kg : kg ** +e, new o_(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Og : Og ** +e, new o_(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new Xg(l_(e >= 240 ? e - 240 : e + 120, i, r), l_(e, i, r), l_(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new o_(s_(this.h), c_(this.s), c_(this.l), e_(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = e_(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${s_(this.h)}, ${c_(this.s) * 100}%, ${c_(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function s_(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function c_(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function l_(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
var u_ = (e) => () => e;
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js
function d_(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function f_(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function p_(e) {
	return (e = +e) == 1 ? m_ : function(t, n) {
		return n - t ? f_(t, n, e) : u_(isNaN(t) ? n : t);
	};
}
function m_(e, t) {
	var n = t - e;
	return n ? d_(e, n) : u_(isNaN(e) ? t : e);
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js
var h_ = (function e(t) {
	var n = p_(t);
	function r(e, t) {
		var r = n((e = Yg(e)).r, (t = Yg(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = m_(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/numberArray.js
function g_(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function __(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/array.js
function v_(e, t) {
	for (var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o = 0; o < r; ++o) i[o] = D_(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/date.js
function y_(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
function b_(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/object.js
function x_(e, t) {
	var n = {}, r = {}, i;
	for (i in typeof e == "object" && e || (e = {}), typeof t == "object" && t || (t = {}), t) i in e ? n[i] = D_(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js
var S_ = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, C_ = new RegExp(S_.source, "g");
function w_(e) {
	return function() {
		return e;
	};
}
function T_(e) {
	return function(t) {
		return e(t) + "";
	};
}
function E_(e, t) {
	var n = S_.lastIndex = C_.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = S_.exec(e)) && (i = C_.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: b_(r, i)
	})), n = C_.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? T_(c[0].x) : w_(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/value.js
function D_(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? u_(t) : (n === "number" ? b_ : n === "string" ? (r = Gg(t)) ? (t = r, h_) : E_ : t instanceof Gg ? h_ : t instanceof Date ? y_ : __(t) ? g_ : Array.isArray(t) ? v_ : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? x_ : b_)(e, t);
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/round.js
function O_(e, t) {
	return e = +e, t = +t, function(n) {
		return Math.round(e * (1 - n) + t * n);
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/piecewise.js
function k_(e, t) {
	t === void 0 && (t = e, e = D_);
	for (var n = 0, r = t.length - 1, i = t[0], a = Array(r < 0 ? 0 : r); n < r;) a[n] = e(i, i = t[++n]);
	return function(e) {
		var t = Math.max(0, Math.min(r - 1, Math.floor(e *= r)));
		return a[t](e - t);
	};
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/constant.js
function A_(e) {
	return function() {
		return e;
	};
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/number.js
function j_(e) {
	return +e;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/continuous.js
var M_ = [0, 1];
function N_(e) {
	return e;
}
function P_(e, t) {
	return (t -= e = +e) ? function(n) {
		return (n - e) / t;
	} : A_(isNaN(t) ? NaN : .5);
}
function F_(e, t) {
	var n;
	return e > t && (n = e, e = t, t = n), function(n) {
		return Math.max(e, Math.min(t, n));
	};
}
function I_(e, t, n) {
	var r = e[0], i = e[1], a = t[0], o = t[1];
	return i < r ? (r = P_(i, r), a = n(o, a)) : (r = P_(r, i), a = n(a, o)), function(e) {
		return a(r(e));
	};
}
function L_(e, t, n) {
	var r = Math.min(e.length, t.length) - 1, i = Array(r), a = Array(r), o = -1;
	for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < r;) i[o] = P_(e[o], e[o + 1]), a[o] = n(t[o], t[o + 1]);
	return function(t) {
		var n = Xh(e, t, 1, r) - 1;
		return a[n](i[n](t));
	};
}
function R_(e, t) {
	return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function z_() {
	var e = M_, t = M_, n = D_, r, i, a, o = N_, s, c, l;
	function u() {
		var n = Math.min(e.length, t.length);
		return o !== N_ && (o = F_(e[0], e[n - 1])), s = n > 2 ? L_ : I_, c = l = null, d;
	}
	function d(i) {
		return i == null || isNaN(i = +i) ? a : (c ||= s(e.map(r), t, n))(r(o(i)));
	}
	return d.invert = function(n) {
		return o(i((l ||= s(t, e.map(r), b_))(n)));
	}, d.domain = function(t) {
		return arguments.length ? (e = Array.from(t, j_), u()) : e.slice();
	}, d.range = function(e) {
		return arguments.length ? (t = Array.from(e), u()) : t.slice();
	}, d.rangeRound = function(e) {
		return t = Array.from(e), n = O_, u();
	}, d.clamp = function(e) {
		return arguments.length ? (o = e ? !0 : N_, u()) : o !== N_;
	}, d.interpolate = function(e) {
		return arguments.length ? (n = e, u()) : n;
	}, d.unknown = function(e) {
		return arguments.length ? (a = e, d) : a;
	}, function(e, t) {
		return r = e, i = t, u();
	};
}
function B_() {
	return z_()(N_, N_);
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/formatDecimal.js
function V_(e) {
	return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function H_(e, t) {
	if (!isFinite(e) || e === 0) return null;
	var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
	return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/exponent.js
function U_(e) {
	return e = H_(Math.abs(e)), e ? e[1] : NaN;
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/formatGroup.js
function W_(e, t) {
	return function(n, r) {
		for (var i = n.length, a = [], o = 0, s = e[0], c = 0; i > 0 && s > 0 && (c + s + 1 > r && (s = Math.max(1, r - c)), a.push(n.substring(i -= s, i + s)), !((c += s + 1) > r));) s = e[o = (o + 1) % e.length];
		return a.reverse().join(t);
	};
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/formatNumerals.js
function G_(e) {
	return function(t) {
		return t.replace(/[0-9]/g, function(t) {
			return e[+t];
		});
	};
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/formatSpecifier.js
var K_ = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function q_(e) {
	if (!(t = K_.exec(e))) throw Error("invalid format: " + e);
	var t;
	return new J_({
		fill: t[1],
		align: t[2],
		sign: t[3],
		symbol: t[4],
		zero: t[5],
		width: t[6],
		comma: t[7],
		precision: t[8] && t[8].slice(1),
		trim: t[9],
		type: t[10]
	});
}
q_.prototype = J_.prototype;
function J_(e) {
	this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
J_.prototype.toString = function() {
	return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/formatTrim.js
function Y_(e) {
	out: for (var t = e.length, n = 1, r = -1, i; n < t; ++n) switch (e[n]) {
		case ".":
			r = i = n;
			break;
		case "0":
			r === 0 && (r = n), i = n;
			break;
		default:
			if (!+e[n]) break out;
			r > 0 && (r = 0);
	}
	return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/formatPrefixAuto.js
var X_;
function Z_(e, t) {
	var n = H_(e, t);
	if (!n) return X_ = void 0, e.toPrecision(t);
	var r = n[0], i = n[1], a = i - (X_ = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
	return a === o ? r : a > o ? r + Array(a - o + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + Array(1 - a).join("0") + H_(e, Math.max(0, t + a - 1))[0];
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/formatRounded.js
function Q_(e, t) {
	var n = H_(e, t);
	if (!n) return e + "";
	var r = n[0], i = n[1];
	return i < 0 ? "0." + Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + Array(i - r.length + 2).join("0");
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/formatTypes.js
var $_ = {
	"%": (e, t) => (e * 100).toFixed(t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + "",
	d: V_,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => e.toFixed(t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => Q_(e * 100, t),
	r: Q_,
	s: Z_,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16)
};
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/identity.js
function ev(e) {
	return e;
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/locale.js
var tv = Array.prototype.map, nv = [
	"y",
	"z",
	"a",
	"f",
	"p",
	"n",
	"µ",
	"m",
	"",
	"k",
	"M",
	"G",
	"T",
	"P",
	"E",
	"Z",
	"Y"
];
function rv(e) {
	var t = e.grouping === void 0 || e.thousands === void 0 ? ev : W_(tv.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? ev : G_(tv.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", s = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
	function l(e, l) {
		e = q_(e);
		var u = e.fill, d = e.align, f = e.sign, p = e.symbol, m = e.zero, h = e.width, g = e.comma, _ = e.precision, v = e.trim, y = e.type;
		y === "n" ? (g = !0, y = "g") : $_[y] || (_ === void 0 && (_ = 12), v = !0, y = "g"), (m || u === "0" && d === "=") && (m = !0, u = "0", d = "=");
		var b = (l && l.prefix !== void 0 ? l.prefix : "") + (p === "$" ? n : p === "#" && /[boxX]/.test(y) ? "0" + y.toLowerCase() : ""), x = (p === "$" ? r : /[%p]/.test(y) ? o : "") + (l && l.suffix !== void 0 ? l.suffix : ""), S = $_[y], C = /[defgprs%]/.test(y);
		_ = _ === void 0 ? 6 : /[gprs]/.test(y) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
		function w(e) {
			var n = b, r = x, o, l, p;
			if (y === "c") r = S(e) + r, e = "";
			else {
				e = +e;
				var w = e < 0 || 1 / e < 0;
				if (e = isNaN(e) ? c : S(Math.abs(e), _), v && (e = Y_(e)), w && +e == 0 && f !== "+" && (w = !1), n = (w ? f === "(" ? f : s : f === "-" || f === "(" ? "" : f) + n, r = (y === "s" && !isNaN(e) && X_ !== void 0 ? nv[8 + X_ / 3] : "") + r + (w && f === "(" ? ")" : ""), C) {
					for (o = -1, l = e.length; ++o < l;) if (p = e.charCodeAt(o), 48 > p || p > 57) {
						r = (p === 46 ? i + e.slice(o + 1) : e.slice(o)) + r, e = e.slice(0, o);
						break;
					}
				}
			}
			g && !m && (e = t(e, Infinity));
			var T = n.length + e.length + r.length, E = T < h ? Array(h - T + 1).join(u) : "";
			switch (g && m && (e = t(E + e, E.length ? h - r.length : Infinity), E = ""), d) {
				case "<":
					e = n + e + r + E;
					break;
				case "=":
					e = n + E + e + r;
					break;
				case "^":
					e = E.slice(0, T = E.length >> 1) + n + e + r + E.slice(T);
					break;
				default: e = E + n + e + r;
			}
			return a(e);
		}
		return w.toString = function() {
			return e + "";
		}, w;
	}
	function u(e, t) {
		var n = Math.max(-8, Math.min(8, Math.floor(U_(t) / 3))) * 3, r = 10 ** -n, i = l((e = q_(e), e.type = "f", e), { suffix: nv[8 + n / 3] });
		return function(e) {
			return i(r * e);
		};
	}
	return {
		format: l,
		formatPrefix: u
	};
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/defaultLocale.js
var iv, av, ov;
sv({
	thousands: ",",
	grouping: [3],
	currency: ["$", ""]
});
function sv(e) {
	return iv = rv(e), av = iv.format, ov = iv.formatPrefix, iv;
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/precisionFixed.js
function cv(e) {
	return Math.max(0, -U_(Math.abs(e)));
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/precisionPrefix.js
function lv(e, t) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(U_(t) / 3))) * 3 - U_(Math.abs(e)));
}
// node_modules/.pnpm/d3-format@3.1.2/node_modules/d3-format/src/precisionRound.js
function uv(e, t) {
	return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, U_(t) - U_(e)) + 1;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/tickFormat.js
function dv(e, t, n, r) {
	var i = ug(e, t, n), a;
	switch (r = q_(r ?? ",f"), r.type) {
		case "s":
			var o = Math.max(Math.abs(e), Math.abs(t));
			return r.precision == null && !isNaN(a = lv(i, o)) && (r.precision = a), ov(r, o);
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			r.precision == null && !isNaN(a = uv(i, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = a - (r.type === "e"));
			break;
		case "f":
		case "%": r.precision == null && !isNaN(a = cv(i)) && (r.precision = a - (r.type === "%") * 2);
	}
	return av(r);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/linear.js
function fv(e) {
	var t = e.domain;
	return e.ticks = function(e) {
		var n = t();
		return cg(n[0], n[n.length - 1], e ?? 10);
	}, e.tickFormat = function(e, n) {
		var r = t();
		return dv(r[0], r[r.length - 1], e ?? 10, n);
	}, e.nice = function(n) {
		n ??= 10;
		var r = t(), i = 0, a = r.length - 1, o = r[i], s = r[a], c, l, u = 10;
		for (s < o && (l = o, o = s, s = l, l = i, i = a, a = l); u-- > 0;) {
			if (l = lg(o, s, n), l === c) return r[i] = o, r[a] = s, t(r);
			if (l > 0) o = Math.floor(o / l) * l, s = Math.ceil(s / l) * l;
			else if (l < 0) o = Math.ceil(o * l) / l, s = Math.floor(s * l) / l;
			else break;
			c = l;
		}
		return e;
	}, e;
}
function pv() {
	var e = B_();
	return e.copy = function() {
		return R_(e, pv());
	}, vg.apply(e, arguments), fv(e);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/identity.js
function mv(e) {
	var t;
	function n(e) {
		return e == null || isNaN(e = +e) ? t : e;
	}
	return n.invert = n, n.domain = n.range = function(t) {
		return arguments.length ? (e = Array.from(t, j_), n) : e.slice();
	}, n.unknown = function(e) {
		return arguments.length ? (t = e, n) : t;
	}, n.copy = function() {
		return mv(e).unknown(t);
	}, e = arguments.length ? Array.from(e, j_) : [0, 1], fv(n);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/nice.js
function hv(e, t) {
	e = e.slice();
	var n = 0, r = e.length - 1, i = e[n], a = e[r], o;
	return a < i && (o = n, n = r, r = o, o = i, i = a, a = o), e[n] = t.floor(i), e[r] = t.ceil(a), e;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/log.js
function gv(e) {
	return Math.log(e);
}
function _v(e) {
	return Math.exp(e);
}
function vv(e) {
	return -Math.log(-e);
}
function yv(e) {
	return -Math.exp(-e);
}
function bv(e) {
	return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function xv(e) {
	return e === 10 ? bv : e === Math.E ? Math.exp : (t) => e ** +t;
}
function Sv(e) {
	return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function Cv(e) {
	return (t, n) => -e(-t, n);
}
function wv(e) {
	let t = e(gv, _v), n = t.domain, r = 10, i, a;
	function o() {
		return i = Sv(r), a = xv(r), n()[0] < 0 ? (i = Cv(i), a = Cv(a), e(vv, yv)) : e(gv, _v), t;
	}
	return t.base = function(e) {
		return arguments.length ? (r = +e, o()) : r;
	}, t.domain = function(e) {
		return arguments.length ? (n(e), o()) : n();
	}, t.ticks = (e) => {
		let t = n(), o = t[0], s = t[t.length - 1], c = s < o;
		c && ([o, s] = [s, o]);
		let l = i(o), u = i(s), d, f, p = e == null ? 10 : +e, m = [];
		if (!(r % 1) && u - l < p) {
			if (l = Math.floor(l), u = Math.ceil(u), o > 0) {
				for (; l <= u; ++l) for (d = 1; d < r; ++d) if (f = l < 0 ? d / a(-l) : d * a(l), !(f < o)) {
					if (f > s) break;
					m.push(f);
				}
			} else for (; l <= u; ++l) for (d = r - 1; d >= 1; --d) if (f = l > 0 ? d / a(-l) : d * a(l), !(f < o)) {
				if (f > s) break;
				m.push(f);
			}
			m.length * 2 < p && (m = cg(o, s, p));
		} else m = cg(l, u, Math.min(u - l, p)).map(a);
		return c ? m.reverse() : m;
	}, t.tickFormat = (e, n) => {
		if (e ??= 10, n ??= r === 10 ? "s" : ",", typeof n != "function" && (!(r % 1) && (n = q_(n)).precision == null && (n.trim = !0), n = av(n)), e === Infinity) return n;
		let o = Math.max(1, r * e / t.ticks().length);
		return (e) => {
			let t = e / a(Math.round(i(e)));
			return t * r < r - .5 && (t *= r), t <= o ? n(e) : "";
		};
	}, t.nice = () => n(hv(n(), {
		floor: (e) => a(Math.floor(i(e))),
		ceil: (e) => a(Math.ceil(i(e)))
	})), t;
}
function Tv() {
	let e = wv(z_()).domain([1, 10]);
	return e.copy = () => R_(e, Tv()).base(e.base()), vg.apply(e, arguments), e;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/symlog.js
function Ev(e) {
	return function(t) {
		return Math.sign(t) * Math.log1p(Math.abs(t / e));
	};
}
function Dv(e) {
	return function(t) {
		return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
	};
}
function Ov(e) {
	var t = 1, n = e(Ev(t), Dv(t));
	return n.constant = function(n) {
		return arguments.length ? e(Ev(t = +n), Dv(t)) : t;
	}, fv(n);
}
function kv() {
	var e = Ov(z_());
	return e.copy = function() {
		return R_(e, kv()).constant(e.constant());
	}, vg.apply(e, arguments);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/pow.js
function Av(e) {
	return function(t) {
		return t < 0 ? -((-t) ** +e) : t ** +e;
	};
}
function jv(e) {
	return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function Mv(e) {
	return e < 0 ? -e * e : e * e;
}
function Nv(e) {
	var t = e(N_, N_), n = 1;
	function r() {
		return n === 1 ? e(N_, N_) : n === .5 ? e(jv, Mv) : e(Av(n), Av(1 / n));
	}
	return t.exponent = function(e) {
		return arguments.length ? (n = +e, r()) : n;
	}, fv(t);
}
function Pv() {
	var e = Nv(z_());
	return e.copy = function() {
		return R_(e, Pv()).exponent(e.exponent());
	}, vg.apply(e, arguments), e;
}
function Fv() {
	return Pv.apply(null, arguments).exponent(.5);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/radial.js
function Iv(e) {
	return Math.sign(e) * e * e;
}
function Lv(e) {
	return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Rv() {
	var e = B_(), t = [0, 1], n = !1, r;
	function i(t) {
		var i = Lv(e(t));
		return isNaN(i) ? r : n ? Math.round(i) : i;
	}
	return i.invert = function(t) {
		return e.invert(Iv(t));
	}, i.domain = function(t) {
		return arguments.length ? (e.domain(t), i) : e.domain();
	}, i.range = function(n) {
		return arguments.length ? (e.range((t = Array.from(n, j_)).map(Iv)), i) : t.slice();
	}, i.rangeRound = function(e) {
		return i.range(e).round(!0);
	}, i.round = function(e) {
		return arguments.length ? (n = !!e, i) : n;
	}, i.clamp = function(t) {
		return arguments.length ? (e.clamp(t), i) : e.clamp();
	}, i.unknown = function(e) {
		return arguments.length ? (r = e, i) : r;
	}, i.copy = function() {
		return Rv(e.domain(), t).round(n).clamp(e.clamp()).unknown(r);
	}, vg.apply(i, arguments), fv(i);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/quantile.js
function zv() {
	var e = [], t = [], n = [], r;
	function i() {
		var r = 0, i = Math.max(1, t.length);
		for (n = Array(i - 1); ++r < i;) n[r - 1] = gg(e, r / i);
		return a;
	}
	function a(e) {
		return e == null || isNaN(e = +e) ? r : t[Xh(n, e)];
	}
	return a.invertExtent = function(r) {
		var i = t.indexOf(r);
		return i < 0 ? [NaN, NaN] : [i > 0 ? n[i - 1] : e[0], i < n.length ? n[i] : e[e.length - 1]];
	}, a.domain = function(t) {
		if (!arguments.length) return e.slice();
		e = [];
		for (let n of t) n != null && !isNaN(n = +n) && e.push(n);
		return e.sort(Uh), i();
	}, a.range = function(e) {
		return arguments.length ? (t = Array.from(e), i()) : t.slice();
	}, a.unknown = function(e) {
		return arguments.length ? (r = e, a) : r;
	}, a.quantiles = function() {
		return n.slice();
	}, a.copy = function() {
		return zv().domain(e).range(t).unknown(r);
	}, vg.apply(a, arguments);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/quantize.js
function Bv() {
	var e = 0, t = 1, n = 1, r = [.5], i = [0, 1], a;
	function o(e) {
		return e != null && e <= e ? i[Xh(r, e, 0, n)] : a;
	}
	function s() {
		var i = -1;
		for (r = Array(n); ++i < n;) r[i] = ((i + 1) * t - (i - n) * e) / (n + 1);
		return o;
	}
	return o.domain = function(n) {
		return arguments.length ? ([e, t] = n, e = +e, t = +t, s()) : [e, t];
	}, o.range = function(e) {
		return arguments.length ? (n = (i = Array.from(e)).length - 1, s()) : i.slice();
	}, o.invertExtent = function(a) {
		var o = i.indexOf(a);
		return o < 0 ? [NaN, NaN] : o < 1 ? [e, r[0]] : o >= n ? [r[n - 1], t] : [r[o - 1], r[o]];
	}, o.unknown = function(e) {
		return arguments.length && (a = e), o;
	}, o.thresholds = function() {
		return r.slice();
	}, o.copy = function() {
		return Bv().domain([e, t]).range(i).unknown(a);
	}, vg.apply(fv(o), arguments);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/threshold.js
function Vv() {
	var e = [.5], t = [0, 1], n, r = 1;
	function i(i) {
		return i != null && i <= i ? t[Xh(e, i, 0, r)] : n;
	}
	return i.domain = function(n) {
		return arguments.length ? (e = Array.from(n), r = Math.min(e.length, t.length - 1), i) : e.slice();
	}, i.range = function(n) {
		return arguments.length ? (t = Array.from(n), r = Math.min(e.length, t.length - 1), i) : t.slice();
	}, i.invertExtent = function(n) {
		var r = t.indexOf(n);
		return [e[r - 1], e[r]];
	}, i.unknown = function(e) {
		return arguments.length ? (n = e, i) : n;
	}, i.copy = function() {
		return Vv().domain(e).range(t).unknown(n);
	}, vg.apply(i, arguments);
}
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/interval.js
var Hv = /* @__PURE__ */ new Date(), Uv = /* @__PURE__ */ new Date();
function Wv(e, t, n, r) {
	function i(t) {
		return e(t = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+t)), t;
	}
	return i.floor = (t) => (e(t = /* @__PURE__ */ new Date(+t)), t), i.ceil = (n) => (e(n = /* @__PURE__ */ new Date(n - 1)), t(n, 1), e(n), n), i.round = (e) => {
		let t = i(e), n = i.ceil(e);
		return e - t < n - e ? t : n;
	}, i.offset = (e, n) => (t(e = /* @__PURE__ */ new Date(+e), n == null ? 1 : Math.floor(n)), e), i.range = (n, r, a) => {
		let o = [];
		if (n = i.ceil(n), a = a == null ? 1 : Math.floor(a), !(n < r) || !(a > 0)) return o;
		let s;
		do
			o.push(s = /* @__PURE__ */ new Date(+n)), t(n, a), e(n);
		while (s < n && n < r);
		return o;
	}, i.filter = (n) => Wv((t) => {
		if (t >= t) for (; e(t), !n(t);) t.setTime(t - 1);
	}, (e, r) => {
		if (e >= e) {
			if (r < 0) for (; ++r <= 0;) for (; t(e, -1), !n(e););
			else for (; --r >= 0;) for (; t(e, 1), !n(e););
		}
	}), n && (i.count = (t, r) => (Hv.setTime(+t), Uv.setTime(+r), e(Hv), e(Uv), Math.floor(n(Hv, Uv))), i.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? i.filter(r ? (t) => r(t) % e === 0 : (t) => i.count(0, t) % e === 0) : i)), i;
}
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/millisecond.js
var Gv = Wv(() => {}, (e, t) => {
	e.setTime(+e + t);
}, (e, t) => t - e);
Gv.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Wv((t) => {
	t.setTime(Math.floor(t / e) * e);
}, (t, n) => {
	t.setTime(+t + n * e);
}, (t, n) => (n - t) / e) : Gv), Gv.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/duration.js
var Kv = 1e3, qv = Kv * 60, Jv = qv * 60, Yv = Jv * 24, Xv = Yv * 7, Zv = Yv * 30, Qv = Yv * 365, $v = Wv((e) => {
	e.setTime(e - e.getMilliseconds());
}, (e, t) => {
	e.setTime(+e + t * Kv);
}, (e, t) => (t - e) / Kv, (e) => e.getUTCSeconds());
$v.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/minute.js
var ey = Wv((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * Kv);
}, (e, t) => {
	e.setTime(+e + t * qv);
}, (e, t) => (t - e) / qv, (e) => e.getMinutes());
ey.range;
var ty = Wv((e) => {
	e.setUTCSeconds(0, 0);
}, (e, t) => {
	e.setTime(+e + t * qv);
}, (e, t) => (t - e) / qv, (e) => e.getUTCMinutes());
ty.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/hour.js
var ny = Wv((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * Kv - e.getMinutes() * qv);
}, (e, t) => {
	e.setTime(+e + t * Jv);
}, (e, t) => (t - e) / Jv, (e) => e.getHours());
ny.range;
var ry = Wv((e) => {
	e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
	e.setTime(+e + t * Jv);
}, (e, t) => (t - e) / Jv, (e) => e.getUTCHours());
ry.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/day.js
var iy = Wv((e) => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * qv) / Yv, (e) => e.getDate() - 1);
iy.range;
var ay = Wv((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Yv, (e) => e.getUTCDate() - 1);
ay.range;
var oy = Wv((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Yv, (e) => Math.floor(e / Yv));
oy.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/week.js
function sy(e) {
	return Wv((t) => {
		t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setDate(e.getDate() + t * 7);
	}, (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * qv) / Xv);
}
var cy = sy(0), ly = sy(1), uy = sy(2), dy = sy(3), fy = sy(4), py = sy(5), my = sy(6);
cy.range, ly.range, uy.range, dy.range, fy.range, py.range, my.range;
function hy(e) {
	return Wv((t) => {
		t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setUTCDate(e.getUTCDate() + t * 7);
	}, (e, t) => (t - e) / Xv);
}
var gy = hy(0), _y = hy(1), vy = hy(2), yy = hy(3), by = hy(4), xy = hy(5), Sy = hy(6);
gy.range, _y.range, vy.range, yy.range, by.range, xy.range, Sy.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/month.js
var Cy = Wv((e) => {
	e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
Cy.range;
var wy = Wv((e) => {
	e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
wy.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/year.js
var Ty = Wv((e) => {
	e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Ty.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Wv((t) => {
	t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, n) => {
	t.setFullYear(t.getFullYear() + n * e);
}), Ty.range;
var Ey = Wv((e) => {
	e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Ey.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Wv((t) => {
	t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, n) => {
	t.setUTCFullYear(t.getUTCFullYear() + n * e);
}), Ey.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/ticks.js
function Dy(e, t, n, r, i, a) {
	let o = [
		[
			$v,
			1,
			Kv
		],
		[
			$v,
			5,
			5 * Kv
		],
		[
			$v,
			15,
			15 * Kv
		],
		[
			$v,
			30,
			30 * Kv
		],
		[
			a,
			1,
			qv
		],
		[
			a,
			5,
			5 * qv
		],
		[
			a,
			15,
			15 * qv
		],
		[
			a,
			30,
			30 * qv
		],
		[
			i,
			1,
			Jv
		],
		[
			i,
			3,
			3 * Jv
		],
		[
			i,
			6,
			6 * Jv
		],
		[
			i,
			12,
			12 * Jv
		],
		[
			r,
			1,
			Yv
		],
		[
			r,
			2,
			2 * Yv
		],
		[
			n,
			1,
			Xv
		],
		[
			t,
			1,
			Zv
		],
		[
			t,
			3,
			3 * Zv
		],
		[
			e,
			1,
			Qv
		]
	];
	function s(e, t, n) {
		let r = t < e;
		r && ([e, t] = [t, e]);
		let i = n && typeof n.range == "function" ? n : c(e, t, n), a = i ? i.range(e, +t + 1) : [];
		return r ? a.reverse() : a;
	}
	function c(t, n, r) {
		let i = Math.abs(n - t) / r, a = Gh(([, , e]) => e).right(o, i);
		if (a === o.length) return e.every(ug(t / Qv, n / Qv, r));
		if (a === 0) return Gv.every(Math.max(ug(t, n, r), 1));
		let [s, c] = o[i / o[a - 1][2] < o[a][2] / i ? a - 1 : a];
		return s.every(c);
	}
	return [s, c];
}
var [Oy, ky] = Dy(Ey, wy, gy, oy, ry, ty), [Ay, jy] = Dy(Ty, Cy, cy, iy, ny, ey);
// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/locale.js
function My(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
		return t.setFullYear(e.y), t;
	}
	return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Ny(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
		return t.setUTCFullYear(e.y), t;
	}
	return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Py(e, t, n) {
	return {
		y: e,
		m: t,
		d: n,
		H: 0,
		M: 0,
		S: 0,
		L: 0
	};
}
function Fy(e) {
	var t = e.dateTime, n = e.date, r = e.time, i = e.periods, a = e.days, o = e.shortDays, s = e.months, c = e.shortMonths, l = Vy(i), u = Hy(i), d = Vy(a), f = Hy(a), p = Vy(o), m = Hy(o), h = Vy(s), g = Hy(s), _ = Vy(c), v = Hy(c), y = {
		a: N,
		A: P,
		b: ee,
		B: te,
		c: null,
		d: lb,
		e: lb,
		f: mb,
		g: Tb,
		G: Db,
		H: ub,
		I: db,
		j: fb,
		L: pb,
		m: hb,
		M: gb,
		p: ne,
		q: re,
		Q: Xb,
		s: Zb,
		S: _b,
		u: vb,
		U: yb,
		V: xb,
		w: Sb,
		W: Cb,
		x: null,
		X: null,
		y: wb,
		Y: Eb,
		Z: Ob,
		"%": Yb
	}, b = {
		a: ie,
		A: ae,
		b: oe,
		B: se,
		c: null,
		d: kb,
		e: kb,
		f: Pb,
		g: Gb,
		G: qb,
		H: Ab,
		I: jb,
		j: Mb,
		L: Nb,
		m: Fb,
		M: Ib,
		p: ce,
		q: le,
		Q: Xb,
		s: Zb,
		S: Lb,
		u: Rb,
		U: zb,
		V: Vb,
		w: Hb,
		W: Ub,
		x: null,
		X: null,
		y: Wb,
		Y: Kb,
		Z: Jb,
		"%": Yb
	}, x = {
		a: E,
		A: D,
		b: O,
		B: k,
		c: A,
		d: $y,
		e: $y,
		f: ab,
		g: Yy,
		G: Jy,
		H: tb,
		I: tb,
		j: eb,
		L: ib,
		m: Qy,
		M: nb,
		p: T,
		q: Zy,
		Q: sb,
		s: cb,
		S: rb,
		u: Wy,
		U: Gy,
		V: Ky,
		w: Uy,
		W: qy,
		x: j,
		X: M,
		y: Yy,
		Y: Jy,
		Z: Xy,
		"%": ob
	};
	y.x = S(n, y), y.X = S(r, y), y.c = S(t, y), b.x = S(n, b), b.X = S(r, b), b.c = S(t, b);
	function S(e, t) {
		return function(n) {
			var r = [], i = -1, a = 0, o = e.length, s, c, l;
			for (n instanceof Date || (n = /* @__PURE__ */ new Date(+n)); ++i < o;) e.charCodeAt(i) === 37 && (r.push(e.slice(a, i)), (c = Iy[s = e.charAt(++i)]) == null ? c = s === "e" ? " " : "0" : s = e.charAt(++i), (l = t[s]) && (s = l(n, c)), r.push(s), a = i + 1);
			return r.push(e.slice(a, i)), r.join("");
		};
	}
	function C(e, t) {
		return function(n) {
			var r = Py(1900, void 0, 1), i = w(r, e, n += "", 0), a, o;
			if (i != n.length) return null;
			if ("Q" in r) return new Date(r.Q);
			if ("s" in r) return new Date(r.s * 1e3 + ("L" in r ? r.L : 0));
			if (t && !("Z" in r) && (r.Z = 0), "p" in r && (r.H = r.H % 12 + r.p * 12), r.m === void 0 && (r.m = "q" in r ? r.q : 0), "V" in r) {
				if (r.V < 1 || r.V > 53) return null;
				"w" in r || (r.w = 1), "Z" in r ? (a = Ny(Py(r.y, 0, 1)), o = a.getUTCDay(), a = o > 4 || o === 0 ? _y.ceil(a) : _y(a), a = ay.offset(a, (r.V - 1) * 7), r.y = a.getUTCFullYear(), r.m = a.getUTCMonth(), r.d = a.getUTCDate() + (r.w + 6) % 7) : (a = My(Py(r.y, 0, 1)), o = a.getDay(), a = o > 4 || o === 0 ? ly.ceil(a) : ly(a), a = iy.offset(a, (r.V - 1) * 7), r.y = a.getFullYear(), r.m = a.getMonth(), r.d = a.getDate() + (r.w + 6) % 7);
			} else ("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : +("W" in r)), o = "Z" in r ? Ny(Py(r.y, 0, 1)).getUTCDay() : My(Py(r.y, 0, 1)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + r.W * 7 - (o + 5) % 7 : r.w + r.U * 7 - (o + 6) % 7);
			return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, Ny(r)) : My(r);
		};
	}
	function w(e, t, n, r) {
		for (var i = 0, a = t.length, o = n.length, s, c; i < a;) {
			if (r >= o) return -1;
			if (s = t.charCodeAt(i++), s === 37) {
				if (s = t.charAt(i++), c = x[s in Iy ? t.charAt(i++) : s], !c || (r = c(e, n, r)) < 0) return -1;
			} else if (s != n.charCodeAt(r++)) return -1;
		}
		return r;
	}
	function T(e, t, n) {
		var r = l.exec(t.slice(n));
		return r ? (e.p = u.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function E(e, t, n) {
		var r = p.exec(t.slice(n));
		return r ? (e.w = m.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function D(e, t, n) {
		var r = d.exec(t.slice(n));
		return r ? (e.w = f.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function O(e, t, n) {
		var r = _.exec(t.slice(n));
		return r ? (e.m = v.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function k(e, t, n) {
		var r = h.exec(t.slice(n));
		return r ? (e.m = g.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function A(e, n, r) {
		return w(e, t, n, r);
	}
	function j(e, t, r) {
		return w(e, n, t, r);
	}
	function M(e, t, n) {
		return w(e, r, t, n);
	}
	function N(e) {
		return o[e.getDay()];
	}
	function P(e) {
		return a[e.getDay()];
	}
	function ee(e) {
		return c[e.getMonth()];
	}
	function te(e) {
		return s[e.getMonth()];
	}
	function ne(e) {
		return i[+(e.getHours() >= 12)];
	}
	function re(e) {
		return 1 + ~~(e.getMonth() / 3);
	}
	function ie(e) {
		return o[e.getUTCDay()];
	}
	function ae(e) {
		return a[e.getUTCDay()];
	}
	function oe(e) {
		return c[e.getUTCMonth()];
	}
	function se(e) {
		return s[e.getUTCMonth()];
	}
	function ce(e) {
		return i[+(e.getUTCHours() >= 12)];
	}
	function le(e) {
		return 1 + ~~(e.getUTCMonth() / 3);
	}
	return {
		format: function(e) {
			var t = S(e += "", y);
			return t.toString = function() {
				return e;
			}, t;
		},
		parse: function(e) {
			var t = C(e += "", !1);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcFormat: function(e) {
			var t = S(e += "", b);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcParse: function(e) {
			var t = C(e += "", !0);
			return t.toString = function() {
				return e;
			}, t;
		}
	};
}
var Iy = {
	"-": "",
	_: " ",
	0: "0"
}, Ly = /^\s*\d+/, Ry = /^%/, zy = /[\\^$*+?|[\]().{}]/g;
function X(e, t, n) {
	var r = e < 0 ? "-" : "", i = (r ? -e : e) + "", a = i.length;
	return r + (a < n ? Array(n - a + 1).join(t) + i : i);
}
function By(e) {
	return e.replace(zy, "\\$&");
}
function Vy(e) {
	return RegExp("^(?:" + e.map(By).join("|") + ")", "i");
}
function Hy(e) {
	return new Map(e.map((e, t) => [e.toLowerCase(), t]));
}
function Uy(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 1));
	return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function Wy(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 1));
	return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function Gy(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 2));
	return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function Ky(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 2));
	return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function qy(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 2));
	return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function Jy(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 4));
	return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function Yy(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 2));
	return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function Xy(e, t, n) {
	var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
	return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Zy(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 1));
	return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Qy(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 2));
	return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function $y(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 2));
	return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function eb(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 3));
	return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function tb(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 2));
	return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function nb(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 2));
	return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function rb(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 2));
	return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function ib(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 3));
	return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function ab(e, t, n) {
	var r = Ly.exec(t.slice(n, n + 6));
	return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function ob(e, t, n) {
	var r = Ry.exec(t.slice(n, n + 1));
	return r ? n + r[0].length : -1;
}
function sb(e, t, n) {
	var r = Ly.exec(t.slice(n));
	return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function cb(e, t, n) {
	var r = Ly.exec(t.slice(n));
	return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function lb(e, t) {
	return X(e.getDate(), t, 2);
}
function ub(e, t) {
	return X(e.getHours(), t, 2);
}
function db(e, t) {
	return X(e.getHours() % 12 || 12, t, 2);
}
function fb(e, t) {
	return X(1 + iy.count(Ty(e), e), t, 3);
}
function pb(e, t) {
	return X(e.getMilliseconds(), t, 3);
}
function mb(e, t) {
	return pb(e, t) + "000";
}
function hb(e, t) {
	return X(e.getMonth() + 1, t, 2);
}
function gb(e, t) {
	return X(e.getMinutes(), t, 2);
}
function _b(e, t) {
	return X(e.getSeconds(), t, 2);
}
function vb(e) {
	var t = e.getDay();
	return t === 0 ? 7 : t;
}
function yb(e, t) {
	return X(cy.count(Ty(e) - 1, e), t, 2);
}
function bb(e) {
	var t = e.getDay();
	return t >= 4 || t === 0 ? fy(e) : fy.ceil(e);
}
function xb(e, t) {
	return e = bb(e), X(fy.count(Ty(e), e) + (Ty(e).getDay() === 4), t, 2);
}
function Sb(e) {
	return e.getDay();
}
function Cb(e, t) {
	return X(ly.count(Ty(e) - 1, e), t, 2);
}
function wb(e, t) {
	return X(e.getFullYear() % 100, t, 2);
}
function Tb(e, t) {
	return e = bb(e), X(e.getFullYear() % 100, t, 2);
}
function Eb(e, t) {
	return X(e.getFullYear() % 1e4, t, 4);
}
function Db(e, t) {
	var n = e.getDay();
	return e = n >= 4 || n === 0 ? fy(e) : fy.ceil(e), X(e.getFullYear() % 1e4, t, 4);
}
function Ob(e) {
	var t = e.getTimezoneOffset();
	return (t > 0 ? "-" : (t *= -1, "+")) + X(t / 60 | 0, "0", 2) + X(t % 60, "0", 2);
}
function kb(e, t) {
	return X(e.getUTCDate(), t, 2);
}
function Ab(e, t) {
	return X(e.getUTCHours(), t, 2);
}
function jb(e, t) {
	return X(e.getUTCHours() % 12 || 12, t, 2);
}
function Mb(e, t) {
	return X(1 + ay.count(Ey(e), e), t, 3);
}
function Nb(e, t) {
	return X(e.getUTCMilliseconds(), t, 3);
}
function Pb(e, t) {
	return Nb(e, t) + "000";
}
function Fb(e, t) {
	return X(e.getUTCMonth() + 1, t, 2);
}
function Ib(e, t) {
	return X(e.getUTCMinutes(), t, 2);
}
function Lb(e, t) {
	return X(e.getUTCSeconds(), t, 2);
}
function Rb(e) {
	var t = e.getUTCDay();
	return t === 0 ? 7 : t;
}
function zb(e, t) {
	return X(gy.count(Ey(e) - 1, e), t, 2);
}
function Bb(e) {
	var t = e.getUTCDay();
	return t >= 4 || t === 0 ? by(e) : by.ceil(e);
}
function Vb(e, t) {
	return e = Bb(e), X(by.count(Ey(e), e) + (Ey(e).getUTCDay() === 4), t, 2);
}
function Hb(e) {
	return e.getUTCDay();
}
function Ub(e, t) {
	return X(_y.count(Ey(e) - 1, e), t, 2);
}
function Wb(e, t) {
	return X(e.getUTCFullYear() % 100, t, 2);
}
function Gb(e, t) {
	return e = Bb(e), X(e.getUTCFullYear() % 100, t, 2);
}
function Kb(e, t) {
	return X(e.getUTCFullYear() % 1e4, t, 4);
}
function qb(e, t) {
	var n = e.getUTCDay();
	return e = n >= 4 || n === 0 ? by(e) : by.ceil(e), X(e.getUTCFullYear() % 1e4, t, 4);
}
function Jb() {
	return "+0000";
}
function Yb() {
	return "%";
}
function Xb(e) {
	return +e;
}
function Zb(e) {
	return Math.floor(e / 1e3);
}
// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/defaultLocale.js
var Qb, $b, ex;
tx({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	shortDays: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
});
function tx(e) {
	return Qb = Fy(e), $b = Qb.format, Qb.parse, ex = Qb.utcFormat, Qb.utcParse, Qb;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/time.js
function nx(e) {
	return new Date(e);
}
function rx(e) {
	return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function ix(e, t, n, r, i, a, o, s, c, l) {
	var u = B_(), d = u.invert, f = u.domain, p = l(".%L"), m = l(":%S"), h = l("%I:%M"), g = l("%I %p"), _ = l("%a %d"), v = l("%b %d"), y = l("%B"), b = l("%Y");
	function x(e) {
		return (c(e) < e ? p : s(e) < e ? m : o(e) < e ? h : a(e) < e ? g : r(e) < e ? i(e) < e ? _ : v : n(e) < e ? y : b)(e);
	}
	return u.invert = function(e) {
		return new Date(d(e));
	}, u.domain = function(e) {
		return arguments.length ? f(Array.from(e, rx)) : f().map(nx);
	}, u.ticks = function(t) {
		var n = f();
		return e(n[0], n[n.length - 1], t ?? 10);
	}, u.tickFormat = function(e, t) {
		return t == null ? x : l(t);
	}, u.nice = function(e) {
		var n = f();
		return e && typeof e.range == "function" || (e = t(n[0], n[n.length - 1], e ?? 10)), e ? f(hv(n, e)) : u;
	}, u.copy = function() {
		return R_(u, ix(e, t, n, r, i, a, o, s, c, l));
	}, u;
}
function ax() {
	return vg.apply(ix(Ay, jy, Ty, Cy, cy, iy, ny, ey, $v, $b).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/utcTime.js
function ox() {
	return vg.apply(ix(Oy, ky, Ey, wy, gy, ay, ry, ty, $v, ex).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/sequential.js
function sx() {
	var e = 0, t = 1, n, r, i, a, o = N_, s = !1, c;
	function l(e) {
		return e == null || isNaN(e = +e) ? c : o(i === 0 ? .5 : (e = (a(e) - n) * i, s ? Math.max(0, Math.min(1, e)) : e));
	}
	l.domain = function(o) {
		return arguments.length ? ([e, t] = o, n = a(e = +e), r = a(t = +t), i = n === r ? 0 : 1 / (r - n), l) : [e, t];
	}, l.clamp = function(e) {
		return arguments.length ? (s = !!e, l) : s;
	}, l.interpolator = function(e) {
		return arguments.length ? (o = e, l) : o;
	};
	function u(e) {
		return function(t) {
			var n, r;
			return arguments.length ? ([n, r] = t, o = e(n, r), l) : [o(0), o(1)];
		};
	}
	return l.range = u(D_), l.rangeRound = u(O_), l.unknown = function(e) {
		return arguments.length ? (c = e, l) : c;
	}, function(o) {
		return a = o, n = o(e), r = o(t), i = n === r ? 0 : 1 / (r - n), l;
	};
}
function cx(e, t) {
	return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function lx() {
	var e = fv(sx()(N_));
	return e.copy = function() {
		return cx(e, lx());
	}, yg.apply(e, arguments);
}
function ux() {
	var e = wv(sx()).domain([1, 10]);
	return e.copy = function() {
		return cx(e, ux()).base(e.base());
	}, yg.apply(e, arguments);
}
function dx() {
	var e = Ov(sx());
	return e.copy = function() {
		return cx(e, dx()).constant(e.constant());
	}, yg.apply(e, arguments);
}
function fx() {
	var e = Nv(sx());
	return e.copy = function() {
		return cx(e, fx()).exponent(e.exponent());
	}, yg.apply(e, arguments);
}
function px() {
	return fx.apply(null, arguments).exponent(.5);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/sequentialQuantile.js
function mx() {
	var e = [], t = N_;
	function n(n) {
		if (n != null && !isNaN(n = +n)) return t((Xh(e, n, 1) - 1) / (e.length - 1));
	}
	return n.domain = function(t) {
		if (!arguments.length) return e.slice();
		e = [];
		for (let n of t) n != null && !isNaN(n = +n) && e.push(n);
		return e.sort(Uh), n;
	}, n.interpolator = function(e) {
		return arguments.length ? (t = e, n) : t;
	}, n.range = function() {
		return e.map((n, r) => t(r / (e.length - 1)));
	}, n.quantiles = function(t) {
		return Array.from({ length: t + 1 }, (n, r) => hg(e, r / t));
	}, n.copy = function() {
		return mx(t).domain(e);
	}, yg.apply(n, arguments);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/diverging.js
function hx() {
	var e = 0, t = .5, n = 1, r = 1, i, a, o, s, c, l = N_, u, d = !1, f;
	function p(e) {
		return isNaN(e = +e) ? f : (e = .5 + ((e = +u(e)) - a) * (r * e < r * a ? s : c), l(d ? Math.max(0, Math.min(1, e)) : e));
	}
	p.domain = function(l) {
		return arguments.length ? ([e, t, n] = l, i = u(e = +e), a = u(t = +t), o = u(n = +n), s = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), r = a < i ? -1 : 1, p) : [
			e,
			t,
			n
		];
	}, p.clamp = function(e) {
		return arguments.length ? (d = !!e, p) : d;
	}, p.interpolator = function(e) {
		return arguments.length ? (l = e, p) : l;
	};
	function m(e) {
		return function(t) {
			var n, r, i;
			return arguments.length ? ([n, r, i] = t, l = k_(e, [
				n,
				r,
				i
			]), p) : [
				l(0),
				l(.5),
				l(1)
			];
		};
	}
	return p.range = m(D_), p.rangeRound = m(O_), p.unknown = function(e) {
		return arguments.length ? (f = e, p) : f;
	}, function(l) {
		return u = l, i = l(e), a = l(t), o = l(n), s = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), r = a < i ? -1 : 1, p;
	};
}
function gx() {
	var e = fv(hx()(N_));
	return e.copy = function() {
		return cx(e, gx());
	}, yg.apply(e, arguments);
}
function _x() {
	var e = wv(hx()).domain([
		.1,
		1,
		10
	]);
	return e.copy = function() {
		return cx(e, _x()).base(e.base());
	}, yg.apply(e, arguments);
}
function vx() {
	var e = Ov(hx());
	return e.copy = function() {
		return cx(e, vx()).constant(e.constant());
	}, yg.apply(e, arguments);
}
function yx() {
	var e = Nv(hx());
	return e.copy = function() {
		return cx(e, yx()).exponent(e.exponent());
	}, yg.apply(e, arguments);
}
function bx() {
	return yx.apply(null, arguments).exponent(.5);
}
// node_modules/.pnpm/victory-vendor@37.4.1/node_modules/victory-vendor/es/d3-scale.js
var xx = /* @__PURE__ */ r({
	scaleBand: () => Sg,
	scaleDiverging: () => gx,
	scaleDivergingLog: () => _x,
	scaleDivergingPow: () => yx,
	scaleDivergingSqrt: () => bx,
	scaleDivergingSymlog: () => vx,
	scaleIdentity: () => mv,
	scaleImplicit: () => bg,
	scaleLinear: () => pv,
	scaleLog: () => Tv,
	scaleOrdinal: () => xg,
	scalePoint: () => wg,
	scalePow: () => Pv,
	scaleQuantile: () => zv,
	scaleQuantize: () => Bv,
	scaleRadial: () => Rv,
	scaleSequential: () => lx,
	scaleSequentialLog: () => ux,
	scaleSequentialPow: () => fx,
	scaleSequentialQuantile: () => mx,
	scaleSequentialSqrt: () => px,
	scaleSequentialSymlog: () => dx,
	scaleSqrt: () => Fv,
	scaleSymlog: () => kv,
	scaleThreshold: () => Vv,
	scaleTime: () => ax,
	scaleUtc: () => ox,
	tickFormat: () => dv
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineConfiguredScale.js
function Sx(e) {
	var t = xx;
	if (e in t && typeof t[e] == "function") return t[e]();
	var n = `scale${et(e)}`;
	if (n in t && typeof t[n] == "function") return t[n]();
}
function Cx(e, t, n) {
	if (typeof e == "function") return e.copy().domain(t).range(n);
	if (e != null) {
		var r = Sx(e);
		if (r != null) return r.domain(t).range(n), r;
	}
}
function wx(e, t, n, r) {
	if (n != null && r != null) return typeof e.scale == "function" ? Cx(e.scale, n, r) : Cx(t, n, r);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineRealScaleType.js
function Tx(e) {
	return `scale${et(e)}`;
}
function Ex(e) {
	return Tx(e) in xx;
}
var Dx = (e, t, n) => {
	if (e != null) {
		var r = e.scale, i = e.type;
		if (r === "auto") return i === "category" && n && (n.indexOf("LineChart") >= 0 || n.indexOf("AreaChart") >= 0 || n.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
		if (typeof r == "string") return Ex(r) ? r : "point";
	}
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/scale/createCategoricalInverse.js
function Ox(e, t) {
	for (var n = 0, r = e.length, i = e[0] < e[e.length - 1]; n < r;) {
		var a = Math.floor((n + r) / 2);
		(i ? e[a] < t : e[a] > t) ? n = a + 1 : r = a;
	}
	return n;
}
function kx(e, t) {
	if (e) {
		var n = t ?? e.domain(), r = n.map((t) => e(t) ?? 0), i = e.range();
		if (!(n.length === 0 || i.length < 2)) return (e) => {
			var t = Ox(r, e);
			if (t <= 0) return n[0];
			if (t >= n.length) return n[n.length - 1];
			var i = r[t - 1] ?? 0, a = r[t] ?? 0;
			return Math.abs(e - i) <= Math.abs(e - a) ? n[t - 1] : n[t];
		};
	}
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineInverseScaleFunction.js
function Ax(e) {
	if (e != null) return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : kx(e, void 0);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/axisSelectors.js
function jx(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Mx(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? jx(Object(n), !0).forEach(function(t) {
			Nx(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : jx(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Nx(e, t, n) {
	return (t = Px(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Px(e) {
	var t = Fx(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Fx(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ix(e, t) {
	return Vx(e) || Bx(e, t) || Rx(e, t) || Lx();
}
function Lx() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Rx(e, t) {
	if (e) {
		if (typeof e == "string") return zx(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? zx(e, t) : void 0;
	}
}
function zx(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Bx(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Vx(e) {
	if (Array.isArray(e)) return e;
}
var Hx = [0, "auto"], Ux = {
	allowDataOverflow: !1,
	allowDecimals: !0,
	allowDuplicatedCategory: !0,
	angle: 0,
	dataKey: void 0,
	domain: void 0,
	height: 30,
	hide: !0,
	id: 0,
	includeHidden: !1,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: !1,
	name: void 0,
	orientation: "bottom",
	padding: {
		left: 0,
		right: 0
	},
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "category",
	unit: void 0,
	niceTicks: "auto"
}, Wx = (e, t) => e.cartesianAxis.xAxis[t], Gx = (e, t) => Wx(e, t) ?? Ux, Kx = {
	allowDataOverflow: !1,
	allowDecimals: !0,
	allowDuplicatedCategory: !0,
	angle: 0,
	dataKey: void 0,
	domain: Hx,
	hide: !0,
	id: 0,
	includeHidden: !1,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: !1,
	name: void 0,
	orientation: "left",
	padding: {
		top: 0,
		bottom: 0
	},
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "number",
	unit: void 0,
	niceTicks: "auto",
	width: 60
}, qx = (e, t) => e.cartesianAxis.yAxis[t], Jx = (e, t) => qx(e, t) ?? Kx, Yx = {
	domain: [0, "auto"],
	includeHidden: !1,
	reversed: !1,
	allowDataOverflow: !1,
	allowDuplicatedCategory: !1,
	dataKey: void 0,
	id: 0,
	name: "",
	range: [64, 64],
	scale: "auto",
	type: "number",
	unit: ""
}, Xx = (e, t) => e.cartesianAxis.zAxis[t] ?? Yx, Z = (e, t, n) => {
	switch (t) {
		case "xAxis": return Gx(e, n);
		case "yAxis": return Jx(e, n);
		case "zAxis": return Xx(e, n);
		case "angleAxis": return xh(e, n);
		case "radiusAxis": return Sh(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Zx = (e, t, n) => {
	switch (t) {
		case "xAxis": return Gx(e, n);
		case "yAxis": return Jx(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Qx = (e, t, n) => {
	switch (t) {
		case "xAxis": return Gx(e, n);
		case "yAxis": return Jx(e, n);
		case "angleAxis": return xh(e, n);
		case "radiusAxis": return Sh(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, $x = (e) => e.graphicalItems.cartesianItems.some((e) => e.type === "bar") || e.graphicalItems.polarItems.some((e) => e.type === "radialBar");
function eS(e, t) {
	return (n) => {
		switch (e) {
			case "xAxis": return "xAxisId" in n && n.xAxisId === t;
			case "yAxis": return "yAxisId" in n && n.yAxisId === t;
			case "zAxis": return "zAxisId" in n && n.zAxisId === t;
			case "angleAxis": return "angleAxisId" in n && n.angleAxisId === t;
			case "radiusAxis": return "radiusAxisId" in n && n.radiusAxisId === t;
			default: return !1;
		}
	};
}
var tS = (e) => e.graphicalItems.cartesianItems, nS = V([Y, Mh], eS), rS = (e, t, n) => e.filter(n).filter((e) => t?.includeHidden === !0 || !e.hide), iS = V([
	tS,
	Z,
	nS
], rS, { memoizeOptions: { resultEqualityCheck: Lh } }), aS = V([iS], (e) => e.filter((e) => e.type === "area" || e.type === "bar").filter(Fh)), oS = (e) => e.filter((e) => !("stackId" in e) || e.stackId === void 0), sS = V([iS], oS), cS = (e) => e.map((e) => e.data).filter(Boolean).flat(1), lS = V([iS], (e) => e.some((e) => !e.data)), uS = V([iS], cS, { memoizeOptions: { resultEqualityCheck: Lh } }), dS = (e, t) => {
	var n = t.chartData, r = n === void 0 ? [] : n, i = t.dataStartIndex, a = t.dataEndIndex;
	return e.length > 0 ? e : r.slice(i, a + 1);
}, fS = V([uS, Cm], dS), pS = (e, t, n) => t?.dataKey == null ? n.length > 0 ? n.map((e) => e.dataKey).flatMap((t) => e.map((e) => ({ value: G(e, t) }))) : e.map((e) => ({ value: e })) : e.map((e) => ({ value: G(e, t.dataKey) })), mS = (e, t, n, r, i, a) => {
	var o = r.chartData, s = o === void 0 ? [] : o, c = r.dataStartIndex, l = r.dataEndIndex, u = pS(e, t, n);
	return i && t?.dataKey != null && a.length > 0 ? [...s.slice(c, l + 1).map((e) => ({ value: G(e, t.dataKey) })).filter((e) => e.value != null), ...u] : u;
}, hS = V([
	fS,
	Z,
	iS,
	Cm,
	lS,
	uS
], mS);
function gS(e) {
	if (Je(e) || e instanceof Date) {
		var t = Number(e);
		if (W(t)) return t;
	}
}
function _S(e) {
	if (Array.isArray(e)) {
		var t = [gS(e[0]), gS(e[1])];
		return Pm(t) ? t : void 0;
	}
	var n = gS(e);
	if (n != null) return [n, n];
}
function vS(e) {
	return e.map(gS).filter(tt);
}
function yS(e, t) {
	var n = gS(e), r = gS(t);
	return n == null && r == null ? 0 : n == null ? -1 : r == null ? 1 : n - r;
}
var bS = V([hS], (e) => e?.map((e) => e.value).sort(yS));
function xS(e, t) {
	switch (e) {
		case "xAxis": return t.direction === "x";
		case "yAxis": return t.direction === "y";
		default: return !1;
	}
}
function SS(e, t, n) {
	if (!n || !n.length) return [];
	var r;
	if (typeof t == "number" && !Ke(t)) r = t;
	else if (Array.isArray(t)) {
		var i = vS(t);
		i.length > 0 && (r = Math.max(...i));
	}
	return r == null ? [] : vS(n.flatMap((t) => {
		var n = G(e, t.dataKey), i, a;
		if (Array.isArray(n)) {
			var o = Ix(n, 2);
			i = o[0], a = o[1];
		} else i = a = n;
		if (W(i) && W(a)) return [r - i, r + a];
	}));
}
var CS = (e) => Qx(e, zh(e), Bh(e)), wS = V([CS], (e) => e?.dataKey), TS = V([
	aS,
	Cm,
	CS
], Ph), ES = (e, t, n, r) => {
	var i = t.reduce((e, t) => {
		if (t.stackId == null) return e;
		var n = e[t.stackId];
		return n ??= [], n.push(t), e[t.stackId] = n, e;
	}, {});
	return Object.fromEntries(Object.entries(i).map((t) => {
		var i = Ix(t, 2), a = i[0], o = i[1], s = r ? [...o].reverse() : o;
		return [a, {
			stackedData: jc(e, s.map(Nh), n),
			graphicalItems: s
		}];
	}));
}, DS = V([
	TS,
	aS,
	rh,
	ih
], ES), OS = (e, t, n, r) => {
	var i = t.dataStartIndex, a = t.dataEndIndex;
	if (r == null && n !== "zAxis") return Rc(e, i, a);
}, kS = V([Z], (e) => e.allowDataOverflow), AS = (e) => {
	if (e == null || !("domain" in e)) return Hx;
	if (e.domain != null) return e.domain;
	if ("ticks" in e && e.ticks != null) {
		if (e.type === "number") {
			var t = vS(e.ticks);
			return [Math.min(...t), Math.max(...t)];
		}
		if (e.type === "category") return e.ticks.map(String);
	}
	return e?.domain ?? Hx;
}, jS = V([Z], AS), MS = V([jS, kS], Im), NS = V([
	DS,
	xm,
	Y,
	MS
], OS, { memoizeOptions: { resultEqualityCheck: Ih } }), PS = (e) => e.errorBars, FS = (e, t, n) => e.flatMap((e) => t[e.id]).filter(Boolean).filter((e) => xS(n, e)), IS = function() {
	var e = [...arguments].filter(Boolean);
	if (e.length !== 0) {
		var t = e.flat();
		return [Math.min(...t), Math.max(...t)];
	}
}, LS = function(e, t, n, r, i) {
	var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [], o, s;
	if (n.length > 0 && n.forEach((e) => {
		var n = e.data == null ? a : [...e.data], c = r[e.id]?.filter((e) => xS(i, e));
		n.forEach((n) => {
			var r = G(n, t.dataKey ?? e.dataKey), i = SS(n, r, c);
			if (i.length >= 2) {
				var a = Math.min(...i), l = Math.max(...i);
				(o == null || a < o) && (o = a), (s == null || l > s) && (s = l);
			}
			var u = _S(r);
			u != null && (o = o == null ? u[0] : Math.min(o, u[0]), s = s == null ? u[1] : Math.max(s, u[1]));
		});
	}), t?.dataKey != null && n.length === 0 && e.forEach((e) => {
		var n = _S(G(e, t.dataKey));
		n != null && (o = o == null ? n[0] : Math.min(o, n[0]), s = s == null ? n[1] : Math.max(s, n[1]));
	}), W(o) && W(s)) return [o, s];
}, RS = V([
	fS,
	Z,
	sS,
	PS,
	Y,
	Tm
], LS, { memoizeOptions: { resultEqualityCheck: Ih } });
function zS(e) {
	var t = e.value;
	if (Je(t) || t instanceof Date) return t;
}
var BS = (e, t, n) => {
	var r = e.map(zS).filter((e) => e != null);
	return n && (t.dataKey == null || t.allowDuplicatedCategory && Qe(r)) ? bm(0, e.length) : t.allowDuplicatedCategory ? r : Array.from(new Set(r));
}, VS = (e) => e.referenceElements.dots, HS = (e, t, n) => e.filter((e) => e.ifOverflow === "extendDomain").filter((e) => t === "xAxis" ? e.xAxisId === n : e.yAxisId === n), US = V([
	VS,
	Y,
	Mh
], HS), WS = (e) => e.referenceElements.areas, GS = V([
	WS,
	Y,
	Mh
], HS), KS = (e) => e.referenceElements.lines, qS = V([
	KS,
	Y,
	Mh
], HS), JS = (e, t) => {
	if (e != null) {
		var n = vS(e.map((e) => t === "xAxis" ? e.x : e.y));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, YS = V(US, Y, JS), XS = (e, t) => {
	if (e != null) {
		var n = vS(e.flatMap((e) => [t === "xAxis" ? e.x1 : e.y1, t === "xAxis" ? e.x2 : e.y2]));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, ZS = V([GS, Y], XS);
function QS(e) {
	if (e.x != null) return vS([e.x]);
	var t = e.segment?.map((e) => e.x);
	return t == null || t.length === 0 ? [] : vS(t);
}
function $S(e) {
	if (e.y != null) return vS([e.y]);
	var t = e.segment?.map((e) => e.y);
	return t == null || t.length === 0 ? [] : vS(t);
}
var eC = (e, t) => {
	if (e != null) {
		var n = e.flatMap((e) => t === "xAxis" ? QS(e) : $S(e));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, tC = V(YS, V([qS, Y], eC), ZS, (e, t, n) => IS(e, n, t)), nC = (e, t, n, r, i, a, o, s, c) => {
	if (n != null) return n;
	var l = o === "vertical" && s === "xAxis" || o === "horizontal" && s === "yAxis" ? IS(r, a, i) : IS(a, i), u = Lm(t, l, e.allowDataOverflow);
	return u == null && e.allowDataOverflow && l == null && c != null ? c : u;
}, rC = V([
	Z,
	jS,
	MS,
	NS,
	RS,
	tC,
	K,
	Y,
	V([Z], (e) => {
		if (e != null && e.type === "number" && "ticks" in e && e.ticks != null) {
			var t = vS(e.ticks);
			if (t.length !== 0) return [Math.min(...t), Math.max(...t)];
		}
	}, { memoizeOptions: { resultEqualityCheck: Ih } })
], nC, { memoizeOptions: { resultEqualityCheck: Ih } }), iC = [0, 1], aC = (e, t, n, r, i, a, o) => {
	if (e != null && n != null && n.length !== 0 || o !== void 0) {
		var s = e.dataKey, c = e.type, l = Ec(t, a);
		return l && s == null ? bm(0, n?.length ?? 0) : c === "category" ? BS(r, e, l) : i === "expand" && !l ? iC : o;
	}
}, oC = V([
	Z,
	K,
	fS,
	hS,
	rh,
	Y,
	rC
], aC), sC = V([
	Z,
	$x,
	ah
], Dx), cC = (e, t, n) => {
	var r = t.niceTicks;
	if (r !== "none") {
		var i = AS(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
		if ((r === "snap125" || r === "adaptive") && t != null && t.tickCount && Pm(e)) {
			if (a) return Zm(e, t.tickCount, t.allowDecimals, r);
			if (t.type === "number") return Qm(e, t.tickCount, t.allowDecimals, r);
		}
		if (r === "auto" && n === "linear" && t != null && t.tickCount) {
			if (a && Pm(e)) return Zm(e, t.tickCount, t.allowDecimals, "adaptive");
			if (t.type === "number" && Pm(e)) return Qm(e, t.tickCount, t.allowDecimals, "adaptive");
		}
	}
}, lC = V([
	oC,
	Qx,
	sC
], cC), uC = (e, t, n, r) => {
	if (r !== "angleAxis" && e?.type === "number" && Pm(t) && Array.isArray(n) && n.length > 0) {
		var i = t[0], a = n[0] ?? 0, o = t[1], s = n[n.length - 1] ?? 0;
		return [Math.min(i, a), Math.max(o, s)];
	}
	return t;
}, dC = V([
	Z,
	oC,
	lC,
	Y
], uC), fC = V(V(hS, Z, (e, t) => {
	if (t && t.type === "number") {
		var n = Infinity, r = Array.from(vS(e.map((e) => e.value))).sort((e, t) => e - t), i = r[0], a = r[r.length - 1];
		if (i == null || a == null) return Infinity;
		var o = a - i;
		if (o === 0) return Infinity;
		for (var s = 0; s < r.length - 1; s++) {
			var c = r[s], l = r[s + 1];
			if (c != null && l != null) {
				var u = l - c;
				n = Math.min(n, u);
			}
		}
		return n / o;
	}
}), K, th, ul, (e, t, n, r, i) => i, (e, t, n, r, i) => {
	if (!W(e)) return 0;
	var a = t === "vertical" ? r.height : r.width;
	if (i === "gap") return e * a / 2;
	if (i === "no-gap") {
		var o = Ze(n, e * a), s = e * a / 2;
		return s - o - (s - o) / a * o;
	}
	return 0;
}), pC = (e, t, n) => {
	var r = Gx(e, t);
	return r == null || typeof r.padding != "string" ? 0 : fC(e, "xAxis", t, n, r.padding);
}, mC = (e, t, n) => {
	var r = Jx(e, t);
	return r == null || typeof r.padding != "string" ? 0 : fC(e, "yAxis", t, n, r.padding);
}, hC = V(Gx, pC, (e, t) => {
	if (e == null) return {
		left: 0,
		right: 0
	};
	var n = e.padding;
	return typeof n == "string" ? {
		left: t,
		right: t
	} : {
		left: (n.left ?? 0) + t,
		right: (n.right ?? 0) + t
	};
}), gC = V(Jx, mC, (e, t) => {
	if (e == null) return {
		top: 0,
		bottom: 0
	};
	var n = e.padding;
	return typeof n == "string" ? {
		top: t,
		bottom: t
	} : {
		top: (n.top ?? 0) + t,
		bottom: (n.bottom ?? 0) + t
	};
}), _C = V([
	ul,
	hC,
	gl,
	hl,
	(e, t, n) => n
], (e, t, n, r, i) => {
	var a = r.padding;
	return i ? [a.left, n.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), vC = V([
	ul,
	K,
	gC,
	gl,
	hl,
	(e, t, n) => n
], (e, t, n, r, i, a) => {
	var o = i.padding;
	return a ? [r.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - n.bottom, e.top + n.top] : [e.top + n.top, e.top + e.height - n.bottom];
}), yC = (e, t, n, r) => {
	switch (t) {
		case "xAxis": return _C(e, n, r);
		case "yAxis": return vC(e, n, r);
		case "zAxis": return Xx(e, n)?.range;
		case "angleAxis": return Dh(e);
		case "radiusAxis": return kh(e, n);
		default: return;
	}
}, bC = V([Z, yC], fh), xC = V([
	Z,
	sC,
	V([sC, dC], Hh),
	bC
], wx), SC = (e, t, n, r) => {
	if (n != null && n.dataKey != null) {
		var i = n.type, a = n.scale;
		if (Ec(e, r) && (i === "number" || a !== "auto")) return t.map((e) => e.value);
	}
}, CC = V([
	K,
	hS,
	Qx,
	Y
], SC), wC = V([xC], Vh);
V([xC], Ax), V([xC, bS], kx), V([
	iS,
	PS,
	Y
], FS);
function TC(e, t) {
	return e.id < t.id ? -1 : +(e.id > t.id);
}
var EC = (e, t) => t, DC = (e, t, n) => n, OC = V(Xc, EC, DC, (e, t, n) => e.filter((e) => e.orientation === t).filter((e) => e.mirror === n).sort(TC)), kC = V(Zc, EC, DC, (e, t, n) => e.filter((e) => e.orientation === t).filter((e) => e.mirror === n).sort(TC)), AC = (e, t) => {
	var n = typeof t.height == "number" ? t.height : 30;
	return {
		width: e.width,
		height: n
	};
}, jC = (e, t) => ({
	width: typeof t.width == "number" ? t.width : 60,
	height: e.height
}), MC = V(ul, Gx, AC), NC = (e, t, n) => {
	switch (t) {
		case "top": return e.top;
		case "bottom": return n - e.bottom;
		default: return 0;
	}
}, PC = (e, t, n) => {
	switch (t) {
		case "left": return e.left;
		case "right": return n - e.right;
		default: return 0;
	}
}, FC = V(qc, ul, OC, EC, DC, (e, t, n, r, i) => {
	var a = {}, o;
	return n.forEach((n) => {
		var s = AC(t, n);
		o ??= NC(t, r, e);
		var c = r === "top" && !i || r === "bottom" && i;
		a[n.id] = o - Number(c) * s.height, o += (c ? -1 : 1) * s.height;
	}), a;
}), IC = V(Kc, ul, kC, EC, DC, (e, t, n, r, i) => {
	var a = {}, o;
	return n.forEach((n) => {
		var s = jC(t, n);
		o ??= PC(t, r, e);
		var c = r === "left" && !i || r === "right" && i;
		a[n.id] = o - Number(c) * s.width, o += (c ? -1 : 1) * s.width;
	}), a;
}), LC = V([
	ul,
	Gx,
	(e, t) => {
		var n = Gx(e, t);
		if (n != null) return FC(e, n.orientation, n.mirror);
	},
	(e, t) => t
], (e, t, n, r) => {
	if (t != null) {
		var i = n?.[r];
		return i == null ? {
			x: e.left,
			y: 0
		} : {
			x: e.left,
			y: i
		};
	}
}), RC = V([
	ul,
	Jx,
	(e, t) => {
		var n = Jx(e, t);
		if (n != null) return IC(e, n.orientation, n.mirror);
	},
	(e, t) => t
], (e, t, n, r) => {
	if (t != null) {
		var i = n?.[r];
		return i == null ? {
			x: 0,
			y: e.top
		} : {
			x: i,
			y: e.top
		};
	}
}), zC = V(ul, Jx, (e, t) => ({
	width: typeof t.width == "number" ? t.width : 60,
	height: e.height
})), BC = (e, t, n) => {
	switch (t) {
		case "xAxis": return MC(e, n).width;
		case "yAxis": return zC(e, n).height;
		default: return;
	}
}, VC = (e, t, n, r) => {
	if (n != null) {
		var i = n.allowDuplicatedCategory, a = n.type, o = n.dataKey, s = Ec(e, r), c = t.map((e) => e.value), l = c.filter((e) => e != null);
		if (o && s && a === "category" && i && Qe(l)) return c;
	}
}, HC = V([
	K,
	hS,
	Z,
	Y
], VC), UC = V([
	K,
	Zx,
	sC,
	wC,
	HC,
	CC,
	yC,
	lC,
	Y
], (e, t, n, r, i, a, o, s, c) => {
	if (t != null) {
		var l = Ec(e, c);
		return {
			angle: t.angle,
			interval: t.interval,
			minTickGap: t.minTickGap,
			orientation: t.orientation,
			tick: t.tick,
			tickCount: t.tickCount,
			tickFormatter: t.tickFormatter,
			ticks: t.ticks,
			type: t.type,
			unit: t.unit,
			axisType: c,
			categoricalDomain: a,
			duplicateDomain: i,
			isCategorical: l,
			niceTicks: s,
			range: o,
			realScaleType: n,
			scale: r
		};
	}
}), WC = (e, t, n, r, i, a, o, s, c) => {
	if (t != null && r != null) {
		var l = Ec(e, c), u = t.type, d = t.ticks, f = t.tickCount, p = n === "scaleBand" && typeof r.bandwidth == "function" ? r.bandwidth() / 2 : 2, m = u === "category" && r.bandwidth ? r.bandwidth() / p : 0;
		m = c === "angleAxis" && a != null && a.length >= 2 ? Ge(a[0] - a[1]) * 2 * m : m;
		var h = d || i;
		return h ? h.map((e, t) => {
			var n = o ? o.indexOf(e) : e, i = r.map(n);
			return W(i) ? {
				index: t,
				coordinate: i + m,
				value: e,
				offset: m
			} : null;
		}).filter(tt) : l && s ? s.map((e, t) => {
			var n = r.map(e);
			return W(n) ? {
				coordinate: n + m,
				value: e,
				index: t,
				offset: m
			} : null;
		}).filter(tt) : r.ticks ? r.ticks(f).map((e, t) => {
			var n = r.map(e);
			return W(n) ? {
				coordinate: n + m,
				value: e,
				index: t,
				offset: m
			} : null;
		}).filter(tt) : r.domain().map((e, t) => {
			var n = r.map(e);
			return W(n) ? {
				coordinate: n + m,
				value: o ? o[e] : e,
				index: t,
				offset: m
			} : null;
		}).filter(tt);
	}
}, GC = V([
	K,
	Qx,
	sC,
	wC,
	lC,
	yC,
	HC,
	CC,
	Y
], WC), KC = (e, t, n, r, i, a, o) => {
	if (t != null && n != null && r != null && r[0] !== r[1]) {
		var s = Ec(e, o), c = t.tickCount, l = 0;
		return l = o === "angleAxis" && r?.length >= 2 ? Ge(r[0] - r[1]) * 2 * l : l, s && a ? a.map((e, t) => {
			var r = n.map(e);
			return W(r) ? {
				coordinate: r + l,
				value: e,
				index: t,
				offset: l
			} : null;
		}).filter(tt) : n.ticks ? n.ticks(c).map((e, t) => {
			var r = n.map(e);
			return W(r) ? {
				coordinate: r + l,
				value: e,
				index: t,
				offset: l
			} : null;
		}).filter(tt) : n.domain().map((e, t) => {
			var r = n.map(e);
			return W(r) ? {
				coordinate: r + l,
				value: i ? i[e] : e,
				index: t,
				offset: l
			} : null;
		}).filter(tt);
	}
}, qC = V([
	K,
	Qx,
	wC,
	yC,
	HC,
	CC,
	Y
], KC), JC = V(Z, wC, (e, t) => {
	if (e != null && t != null) return Mx(Mx({}, e), {}, { scale: t });
});
V((e, t, n) => Xx(e, n), V([V([
	Z,
	sC,
	oC,
	bC
], wx)], Vh), (e, t) => {
	if (e != null && t != null) return Mx(Mx({}, e), {}, { scale: t });
});
var YC = V([
	K,
	Xc,
	Zc
], (e, t, n) => {
	switch (e) {
		case "horizontal": return t.some((e) => e.reversed) ? "right-to-left" : "left-to-right";
		case "vertical": return n.some((e) => e.reversed) ? "bottom-to-top" : "top-to-bottom";
		case "centric":
		case "radial": return "left-to-right";
		default: return;
	}
});
V([(e, t, n) => e.renderedTicks[t]?.[n]], (e) => {
	if (e && e.length !== 0) return (t) => {
		var n = Infinity, r = e[0];
		for (var i of e) {
			var a = Math.abs(i.coordinate - t);
			a < n && (n = a, r = i);
		}
		return r?.value;
	};
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/selectTooltipEventType.js
var XC = (e) => e.options.defaultTooltipEventType, ZC = (e) => e.options.validateTooltipEventTypes;
function QC(e, t, n) {
	if (e == null) return t;
	var r = e ? "axis" : "item";
	return n == null ? t : n.includes(r) ? r : t;
}
function $C(e, t) {
	return QC(t, XC(e), ZC(e));
}
function ew(e) {
	return B((t) => $C(t, e));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineActiveLabel.js
var tw = (e, t) => {
	var n, r = Number(t);
	if (!(Ke(r) || t == null)) return r >= 0 ? e == null || (n = e[r]) == null ? void 0 : n.value : void 0;
}, nw = (e) => e.tooltip.settings, rw = {
	active: !1,
	index: null,
	dataKey: void 0,
	graphicalItemId: void 0,
	coordinate: void 0
}, iw = Cs({
	name: "tooltip",
	initialState: {
		itemInteraction: {
			click: rw,
			hover: rw
		},
		axisInteraction: {
			click: rw,
			hover: rw
		},
		keyboardInteraction: rw,
		syncInteraction: {
			active: !1,
			index: null,
			dataKey: void 0,
			label: void 0,
			coordinate: void 0,
			sourceViewBox: void 0,
			graphicalItemId: void 0
		},
		tooltipItemPayloads: [],
		settings: {
			shared: void 0,
			trigger: "hover",
			axisId: 0,
			active: !1,
			defaultIndex: void 0
		}
	},
	reducers: {
		addTooltipEntrySettings: {
			reducer(e, t) {
				e.tooltipItemPayloads.push(H(t.payload));
			},
			prepare: U()
		},
		replaceTooltipEntrySettings: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = Yo(e).tooltipItemPayloads.indexOf(H(r));
				a > -1 && (e.tooltipItemPayloads[a] = H(i));
			},
			prepare: U()
		},
		removeTooltipEntrySettings: {
			reducer(e, t) {
				var n = Yo(e).tooltipItemPayloads.indexOf(H(t.payload));
				n > -1 && e.tooltipItemPayloads.splice(n, 1);
			},
			prepare: U()
		},
		setTooltipSettingsState(e, t) {
			e.settings = t.payload;
		},
		setActiveMouseOverItemIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.itemInteraction.hover.active = !0, e.itemInteraction.hover.index = t.payload.activeIndex, e.itemInteraction.hover.dataKey = t.payload.activeDataKey, e.itemInteraction.hover.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.hover.coordinate = t.payload.activeCoordinate;
		},
		mouseLeaveChart(e) {
			e.itemInteraction.hover.active = !1, e.axisInteraction.hover.active = !1;
		},
		mouseLeaveItem(e) {
			e.itemInteraction.hover.active = !1;
		},
		setActiveClickItemIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.itemInteraction.click.active = !0, e.keyboardInteraction.active = !1, e.itemInteraction.click.index = t.payload.activeIndex, e.itemInteraction.click.dataKey = t.payload.activeDataKey, e.itemInteraction.click.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.click.coordinate = t.payload.activeCoordinate;
		},
		setMouseOverAxisIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.axisInteraction.hover.active = !0, e.keyboardInteraction.active = !1, e.axisInteraction.hover.index = t.payload.activeIndex, e.axisInteraction.hover.dataKey = t.payload.activeDataKey, e.axisInteraction.hover.coordinate = t.payload.activeCoordinate;
		},
		setMouseClickAxisIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.axisInteraction.click.active = !0, e.axisInteraction.click.index = t.payload.activeIndex, e.axisInteraction.click.dataKey = t.payload.activeDataKey, e.axisInteraction.click.coordinate = t.payload.activeCoordinate;
		},
		setSyncInteraction(e, t) {
			e.syncInteraction = t.payload;
		},
		setKeyboardInteraction(e, t) {
			e.keyboardInteraction.active = t.payload.active, e.keyboardInteraction.index = t.payload.activeIndex, e.keyboardInteraction.coordinate = t.payload.activeCoordinate;
		}
	}
}), aw = iw.actions, ow = aw.addTooltipEntrySettings, sw = aw.replaceTooltipEntrySettings, cw = aw.removeTooltipEntrySettings, lw = aw.setTooltipSettingsState, uw = aw.setActiveMouseOverItemIndex, dw = aw.mouseLeaveItem, fw = aw.mouseLeaveChart, pw = aw.setActiveClickItemIndex, mw = aw.setMouseOverAxisIndex, hw = aw.setMouseClickAxisIndex, gw = aw.setSyncInteraction, _w = aw.setKeyboardInteraction, vw = iw.reducer;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineTooltipInteractionState.js
function yw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function bw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? yw(Object(n), !0).forEach(function(t) {
			xw(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function xw(e, t, n) {
	return (t = Sw(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Sw(e) {
	var t = Cw(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Cw(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ww(e, t, n) {
	return t === "axis" ? n === "click" ? e.axisInteraction.click : e.axisInteraction.hover : n === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function Tw(e) {
	return e.index != null;
}
var Ew = (e, t, n, r) => {
	if (t == null) return rw;
	var i = ww(e, t, n);
	if (i == null) return rw;
	if (i.active) return i;
	if (e.keyboardInteraction.active) return e.keyboardInteraction;
	if (e.syncInteraction.active && e.syncInteraction.index != null) return e.syncInteraction;
	var a = e.settings.active === !0;
	if (Tw(i)) {
		if (a) return bw(bw({}, i), {}, { active: !0 });
	} else if (r != null) return {
		active: !0,
		coordinate: void 0,
		dataKey: void 0,
		index: r,
		graphicalItemId: void 0
	};
	return bw(bw({}, rw), {}, { coordinate: i.coordinate });
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineActiveTooltipIndex.js
function Dw(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (e instanceof Date) {
		var t = e.valueOf();
		return Number.isFinite(t) ? t : void 0;
	}
	var n = Number(e);
	return Number.isFinite(n) ? n : void 0;
}
function Ow(e, t) {
	var n = Dw(e), r = t[0], i = t[1];
	return n !== void 0 && n >= Math.min(r, i) && n <= Math.max(r, i);
}
function kw(e, t, n) {
	if (n == null || t == null) return !0;
	var r = G(e, t);
	return r == null || !Pm(n) || Ow(r, n);
}
var Aw = (e, t, n, r) => {
	var i = e?.index;
	if (i == null) return null;
	var a = Number(i);
	if (!W(a)) return i;
	var o = 0, s = Infinity;
	t.length > 0 && (s = t.length - 1);
	var c = Math.max(o, Math.min(a, s)), l = t[c];
	return l == null || kw(l, n, r) ? String(c) : null;
}, jw = (e, t, n, r, i, a, o) => {
	if (a != null) {
		var s = o[0]?.getPosition(a);
		if (s != null) return s;
		var c = i?.[Number(a)];
		if (c) switch (n) {
			case "horizontal": return {
				x: c.coordinate,
				y: (r.top + t) / 2
			};
			default: return {
				x: (r.left + e) / 2,
				y: c.coordinate
			};
		}
	}
}, Mw = (e, t, n, r) => {
	if (t === "axis") return e.tooltipItemPayloads;
	if (e.tooltipItemPayloads.length === 0) return [];
	var i = n === "hover" ? e.itemInteraction.hover.graphicalItemId : e.itemInteraction.click.graphicalItemId;
	if (e.syncInteraction.active && i == null) return e.tooltipItemPayloads;
	if (i == null && (r != null || e.keyboardInteraction.active)) {
		var a = e.tooltipItemPayloads[0];
		return a == null ? [] : [a];
	}
	return e.tooltipItemPayloads.filter((e) => e.settings?.graphicalItemId === i);
}, Nw = (e) => e.options.tooltipPayloadSearcher, Pw = (e) => e.tooltip;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineTooltipPayload.js
function Fw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Iw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Fw(Object(n), !0).forEach(function(t) {
			Lw(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Fw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Lw(e, t, n) {
	return (t = Rw(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Rw(e) {
	var t = zw(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function zw(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Bw(e) {
	if (typeof e == "string" || typeof e == "number") return e;
}
function Vw(e) {
	if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
}
function Hw(e) {
	if (typeof e == "string" || typeof e == "number") return e;
	if (typeof e == "function") return (t) => e(t);
}
function Uw(e) {
	if (typeof e == "string") return e;
}
function Ww(e) {
	if (typeof e == "object" && e) return {
		name: "name" in e ? Bw(e.name) : void 0,
		unit: "unit" in e ? Vw(e.unit) : void 0,
		dataKey: "dataKey" in e ? Hw(e.dataKey) : void 0,
		payload: "payload" in e ? e.payload : void 0,
		color: "color" in e ? Uw(e.color) : void 0,
		fill: "fill" in e ? Uw(e.fill) : void 0
	};
}
function Gw(e, t) {
	return e ?? t;
}
var Kw = (e, t, n, r, i, a, o) => {
	if (t != null && a != null) {
		var s = n.chartData, c = n.computedData, l = n.dataStartIndex, u = n.dataEndIndex;
		return e.reduce((e, n) => {
			var d = n.dataDefinedOnItem, f = n.settings, p = Gw(d, s), m = Array.isArray(p) ? vc(p, l, u) : p, h = f?.dataKey ?? r, g = f?.nameKey, _;
			return r && Array.isArray(m) && !Array.isArray(m[0]) && o === "axis" ? (_ = $e(m, r, i), _ ??= a(m, t, c, g)) : _ = a(m, t, c, g), Array.isArray(_) ? _.forEach((t) => {
				var n = Ww(t), r = n?.name, i = n?.dataKey, a = n?.payload, o = Iw(Iw({}, f), {}, {
					name: r,
					unit: n?.unit,
					color: n?.color ?? f?.color,
					fill: n?.fill ?? f?.fill
				});
				e.push(Hc({
					tooltipEntrySettings: o,
					dataKey: i,
					payload: a,
					value: G(a, i),
					name: r == null ? void 0 : String(r)
				}));
			}) : e.push(Hc({
				tooltipEntrySettings: f,
				dataKey: h,
				payload: _,
				value: G(_, h),
				name: G(_, g) ?? f?.name
			})), e;
		}, []);
	}
}, qw = V([
	CS,
	$x,
	ah
], Dx), Jw = V([
	V([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]),
	CS,
	V([zh, Bh], eS)
], rS, { memoizeOptions: { resultEqualityCheck: Lh } }), Yw = V([Jw], (e) => e.filter(Fh)), Xw = V([Jw], cS, { memoizeOptions: { resultEqualityCheck: Lh } }), Zw = V([Jw], (e) => e.some((e) => !e.data)), Qw = V([Xw, xm], dS), $w = V([
	Yw,
	xm,
	CS
], Ph), eT = V([
	Qw,
	CS,
	Jw,
	xm,
	Zw,
	Xw
], mS), tT = V([CS], AS), nT = V([tT, V([CS], (e) => e.allowDataOverflow)], Im), rT = V([
	V([
		$w,
		V([Jw], (e) => e.filter(Fh)),
		rh,
		ih
	], ES),
	xm,
	zh,
	nT
], OS), iT = V([
	Qw,
	CS,
	V([Jw], oS),
	PS,
	zh,
	Dm
], LS, { memoizeOptions: { resultEqualityCheck: Ih } }), aT = V([V([
	VS,
	zh,
	Bh
], HS), zh], JS), oT = V([V([
	WS,
	zh,
	Bh
], HS), zh], XS), sT = V([
	CS,
	K,
	Qw,
	eT,
	rh,
	zh,
	V([
		CS,
		tT,
		nT,
		rT,
		iT,
		V([
			aT,
			V([V([
				KS,
				zh,
				Bh
			], HS), zh], eC),
			oT
		], IS),
		K,
		zh
	], nC)
], aC), cT = V([
	CS,
	sT,
	V([
		sT,
		CS,
		qw
	], cC),
	zh
], uC), lT = (e) => yC(e, zh(e), Bh(e), !1), uT = V([CS, lT], fh), dT = V([V([
	CS,
	qw,
	cT,
	uT
], wx)], Vh), fT = V([
	K,
	CS,
	qw,
	dT,
	lT,
	V([
		K,
		eT,
		CS,
		zh
	], VC),
	V([
		K,
		eT,
		CS,
		zh
	], SC),
	zh
], (e, t, n, r, i, a, o, s) => {
	if (t) {
		var c = t.type, l = Ec(e, s);
		if (r) {
			var u = n === "scaleBand" && r.bandwidth ? r.bandwidth() / 2 : 2, d = c === "category" && r.bandwidth ? r.bandwidth() / u : 0;
			return d = s === "angleAxis" && i != null && i?.length >= 2 ? Ge(i[0] - i[1]) * 2 * d : d, l && o ? o.map((e, t) => {
				var n = r.map(e);
				return W(n) ? {
					coordinate: n + d,
					value: e,
					index: t,
					offset: d
				} : null;
			}).filter(tt) : r.domain().map((e, t) => {
				var n = r.map(e);
				return W(n) ? {
					coordinate: n + d,
					value: a ? a[e] : e,
					index: t,
					offset: d
				} : null;
			}).filter(tt);
		}
	}
}), pT = V([
	XC,
	ZC,
	nw
], (e, t, n) => QC(n.shared, e, t)), mT = (e) => e.tooltip.settings.trigger, hT = (e) => e.tooltip.settings.defaultIndex, gT = V([
	Pw,
	pT,
	mT,
	hT
], Ew), _T = V([
	gT,
	Qw,
	wS,
	sT
], Aw), vT = V([fT, _T], tw), yT = V([gT], (e) => {
	if (e) return e.dataKey;
}), bT = V([gT], (e) => {
	if (e) return e.graphicalItemId;
}), xT = V([
	Pw,
	pT,
	mT,
	hT
], Mw), ST = V([gT, V([
	Kc,
	qc,
	K,
	ul,
	fT,
	hT,
	xT
], jw)], (e, t) => e != null && e.coordinate ? e.coordinate : t), CT = V([gT], (e) => e?.active ?? !1), wT = V([V([
	xT,
	_T,
	xm,
	wS,
	vT,
	Nw,
	pT
], Kw)], (e) => {
	if (e != null) {
		var t = e.map((e) => e.payload).filter((e) => e != null);
		return Array.from(new Set(t));
	}
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/context/useTooltipAxis.js
function TT(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ET(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? TT(Object(n), !0).forEach(function(t) {
			DT(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : TT(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function DT(e, t, n) {
	return (t = OT(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function OT(e) {
	var t = kT(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function kT(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var AT = () => B(CS), jT = () => {
	var e = AT(), t = B(fT), n = B(dT);
	return Vc(!e || !n ? void 0 : ET(ET({}, e), {}, { scale: n }), t);
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/getActiveCoordinate.js
function MT(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function NT(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? MT(Object(n), !0).forEach(function(t) {
			PT(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : MT(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function PT(e, t, n) {
	return (t = FT(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function FT(e) {
	var t = IT(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function IT(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var LT = (e, t, n, r) => {
	var i = t.find((e) => e && e.index === n);
	if (i) {
		if (e === "horizontal") return {
			x: i.coordinate,
			y: r.relativeY
		};
		if (e === "vertical") return {
			x: r.relativeX,
			y: i.coordinate
		};
	}
	return {
		x: 0,
		y: 0
	};
}, RT = (e, t, n, r) => {
	var i = t.find((e) => e && e.index === n);
	if (i) {
		if (e === "centric") {
			var a = i.coordinate, o = r.radius;
			return NT(NT(NT({}, r), Jp(r.cx, r.cy, o, a)), {}, {
				angle: a,
				radius: o
			});
		}
		var s = i.coordinate, c = r.angle;
		return NT(NT(NT({}, r), Jp(r.cx, r.cy, s, c)), {}, {
			angle: c,
			radius: s
		});
	}
	return {
		angle: 0,
		clockWise: !1,
		cx: 0,
		cy: 0,
		endAngle: 0,
		innerRadius: 0,
		outerRadius: 0,
		radius: 0,
		startAngle: 0,
		x: 0,
		y: 0
	};
};
function zT(e, t) {
	var n = e.relativeX, r = e.relativeY;
	return n >= t.left && n <= t.left + t.width && r >= t.top && r <= t.top + t.height;
}
var BT = (e, t, n, r, i) => {
	var a = t?.length ?? 0;
	if (a <= 1 || e == null) return 0;
	if (r === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6) for (var o = i[1] - i[0], s = (t, n, r) => [
		e,
		e + o,
		e - o
	].some((e) => (r ? e >= t : e > t) && e <= n), c = 0; c < a; c++) {
		var l = c > 0 ? n[c - 1]?.coordinate : n[a - 1]?.coordinate, u = n[c]?.coordinate, d = c >= a - 1 ? n[0]?.coordinate : n[c + 1]?.coordinate, f = void 0;
		if (l != null && u != null && d != null) {
			if (Ge(u - l) !== Ge(d - u)) {
				var p = [];
				if (Ge(d - u) === Ge(i[1] - i[0])) {
					f = d;
					var m = u + i[1] - i[0];
					p[0] = Math.min(m, (m + l) / 2), p[1] = Math.max(m, (m + l) / 2);
				} else {
					f = l;
					var h = d + i[1] - i[0];
					p[0] = Math.min(u, (h + u) / 2), p[1] = Math.max(u, (h + u) / 2);
				}
				var g = [Math.min(u, (f + u) / 2), Math.max(u, (f + u) / 2)];
				if (s(g[0], g[1], !1) || s(p[0], p[1], !0)) return n[c]?.index;
			} else {
				var _ = Math.min(l, d), v = Math.max(l, d);
				if (s((_ + u) / 2, (v + u) / 2, !1)) return n[c]?.index;
			}
		}
	}
	else if (t) for (var y = 0; y < a; y++) {
		var b = t[y];
		if (b != null) {
			var x = t[y + 1], S = t[y - 1];
			if (y === 0 && x != null && e <= (b.coordinate + x.coordinate) / 2 || y === a - 1 && S != null && e > (b.coordinate + S.coordinate) / 2 || y > 0 && y < a - 1 && S != null && x != null && e > (b.coordinate + S.coordinate) / 2 && e <= (b.coordinate + x.coordinate) / 2) return b.index;
		}
	}
	return -1;
}, VT = () => B(ah), HT = (e, t) => t, UT = (e, t, n) => n, WT = (e, t, n, r) => r, GT = V(fT, (e) => ra(e, (e) => e.coordinate)), KT = V([
	Pw,
	HT,
	UT,
	WT
], Ew), qT = V([
	KT,
	Qw,
	wS,
	sT
], Aw), JT = (e, t, n) => {
	if (t != null) {
		var r = Pw(e);
		return t === "axis" ? n === "hover" ? r.axisInteraction.hover.dataKey : r.axisInteraction.click.dataKey : n === "hover" ? r.itemInteraction.hover.dataKey : r.itemInteraction.click.dataKey;
	}
}, YT = V([
	Pw,
	HT,
	UT,
	WT
], Mw), XT = V([
	Kc,
	qc,
	K,
	ul,
	fT,
	WT,
	YT
], jw), ZT = V([KT, XT], (e, t) => e.coordinate ?? t), QT = V([fT, qT], tw), $T = V([
	YT,
	qT,
	xm,
	wS,
	QT,
	Nw,
	HT
], Kw), eE = V([KT, qT], (e, t) => ({
	isActive: e.active && t != null,
	activeIndex: t
})), tE = (e, t, n, r, i, a, o) => {
	if (e && n && r && i && zT(e, o)) {
		var s = BT(Wc(e, t), a, i, n, r), c = LT(t, i, s, e);
		return {
			activeIndex: String(s),
			activeCoordinate: c
		};
	}
}, nE = (e, t, n, r, i, a, o) => {
	if (e && r && i && a && n) {
		var s = em(e, n);
		if (s) {
			var c = BT(Gc(s, t), o, a, r, i), l = RT(t, a, c, s);
			return {
				activeIndex: String(c),
				activeCoordinate: l
			};
		}
	}
}, rE = (e, t, n, r, i, a, o, s) => {
	if (e && t && r && i && a) return t === "horizontal" || t === "vertical" ? tE(e, t, r, i, a, o, s) : nE(e, t, n, r, i, a, o);
}, iE = V((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, n) => n, (e, t, n) => {
	if (t != null) {
		var r = e[t];
		if (r != null) return n ? r.panoramaElement : r.element;
	}
}), aE = V((e) => e.zIndex.zIndexMap, (e) => {
	var t = Object.keys(e).map((e) => parseInt(e, 10)).concat(Object.values(J));
	return Array.from(new Set(t)).sort((e, t) => e - t);
}, { memoizeOptions: { resultEqualityCheck: Rh } });
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/zIndexSlice.js
function oE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function sE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? oE(Object(n), !0).forEach(function(t) {
			cE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : oE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function cE(e, t, n) {
	return (t = lE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function lE(e) {
	var t = uE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function uE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var dE = { zIndexMap: Object.values(J).reduce((e, t) => sE(sE({}, e), {}, { [t]: {
	element: void 0,
	panoramaElement: void 0,
	consumers: 0
} }), {}) }, fE = new Set(Object.values(J));
function pE(e) {
	return fE.has(e);
}
var mE = Cs({
	name: "zIndex",
	initialState: dE,
	reducers: {
		registerZIndexPortal: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] ? e.zIndexMap[n].consumers += 1 : e.zIndexMap[n] = {
					consumers: 1,
					element: void 0,
					panoramaElement: void 0
				};
			},
			prepare: U()
		},
		unregisterZIndexPortal: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] && (--e.zIndexMap[n].consumers, e.zIndexMap[n].consumers <= 0 && !pE(n) && delete e.zIndexMap[n]);
			},
			prepare: U()
		},
		registerZIndexPortalElement: {
			reducer: (e, t) => {
				var n = t.payload, r = n.zIndex, i = n.element, a = n.isPanorama;
				e.zIndexMap[r] ? a ? e.zIndexMap[r].panoramaElement = H(i) : e.zIndexMap[r].element = H(i) : e.zIndexMap[r] = {
					consumers: 0,
					element: a ? void 0 : H(i),
					panoramaElement: a ? H(i) : void 0
				};
			},
			prepare: U()
		},
		unregisterZIndexPortalElement: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] && (t.payload.isPanorama ? e.zIndexMap[n].panoramaElement = void 0 : e.zIndexMap[n].element = void 0);
			},
			prepare: U()
		}
	}
}), hE = mE.actions, gE = hE.registerZIndexPortal, _E = hE.unregisterZIndexPortal, vE = hE.registerZIndexPortalElement, yE = hE.unregisterZIndexPortalElement, bE = mE.reducer;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/zIndex/ZIndexLayer.js
function xE(e) {
	var t = e.zIndex, n = e.children, r = ou() && t !== void 0 && t !== 0, i = ml(), a = (0, P.useRef)(void 0), o = (0, P.useRef)(/* @__PURE__ */ new Set()), s = z(), c = B((e) => iE(e, t, i));
	if ((0, P.useLayoutEffect)(() => {
		if (!r) {
			var e = o.current;
			e.forEach((e) => {
				s(_E({ zIndex: e }));
			}), e.clear(), a.current = void 0;
		} else if (o.current.has(t) || (s(gE({ zIndex: t })), o.current.add(t)), c) {
			a.current = c;
			var n = o.current;
			n.forEach((e) => {
				e !== t && (s(_E({ zIndex: e })), n.delete(e));
			});
		}
	}, [
		s,
		t,
		r,
		c
	]), (0, P.useLayoutEffect)(() => {
		var e = o.current;
		return () => {
			e.forEach((e) => {
				s(_E({ zIndex: e }));
			}), e.clear();
		};
	}, [s]), !r) return n;
	var l = c ?? a.current;
	return l ? /*#__PURE__*/ (0, le.createPortal)(n, l) : null;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/Cursor.js
function SE() {
	return SE = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, SE.apply(null, arguments);
}
function CE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function wE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? CE(Object(n), !0).forEach(function(t) {
			TE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : CE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function TE(e, t, n) {
	return (t = EE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function EE(e) {
	var t = DE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function DE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function OE(e) {
	var t = e.cursor, n = e.cursorComp, r = e.cursorProps;
	return /*#__PURE__*/ (0, P.isValidElement)(t) ? /*#__PURE__*/ (0, P.cloneElement)(t, r) : /*#__PURE__*/ (0, P.createElement)(n, r);
}
function kE(e) {
	var t = e.coordinate, n = e.payload, r = e.index, i = e.offset, a = e.tooltipAxisBandSize, o = e.layout, s = e.cursor, c = e.tooltipEventType, u = e.chartName, d = t, f = n, p = r;
	if (!s || !d || u !== "ScatterChart" && c !== "axis") return null;
	var m, h, g;
	if (u === "ScatterChart") m = d, h = Ef, g = J.cursorLine;
	else if (u === "BarChart") m = Df(o, d, i, a), h = zp, g = J.cursorRectangle;
	else if (o === "radial" && Qn(d)) {
		var _ = tm(d), v = _.cx, y = _.cy, b = _.radius;
		m = {
			cx: v,
			cy: y,
			startAngle: _.startAngle,
			endAngle: _.endAngle,
			innerRadius: b,
			outerRadius: b
		}, h = gm, g = J.cursorLine;
	} else m = { points: _m(o, d, i) }, h = hf, g = J.cursorLine;
	var x = typeof s == "object" && "className" in s ? s.className : void 0, S = wE(wE(wE(wE({
		stroke: "#ccc",
		pointerEvents: "none"
	}, i), m), ge(s)), {}, {
		payload: f,
		payloadIndex: p,
		className: l("recharts-tooltip-cursor", x)
	});
	return /*#__PURE__*/ P.createElement(xE, { zIndex: e.zIndex ?? g }, /*#__PURE__*/ P.createElement(OE, {
		cursor: s,
		cursorComp: h,
		cursorProps: S
	}));
}
function AE(e) {
	var t = jT(), n = Ql(), r = nu(), i = VT();
	return t == null || n == null || r == null || i == null ? null : /*#__PURE__*/ P.createElement(kE, SE({}, e, {
		offset: n,
		layout: r,
		tooltipAxisBandSize: t,
		chartName: i
	}));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/context/tooltipPortalContext.js
var jE = /*#__PURE__*/ (0, P.createContext)(null), ME = () => (0, P.useContext)(jE), NE = (/* @__PURE__ */ i((/* @__PURE__ */ n(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn !== t || i && !o.once || n && o.context !== n || s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})))(), 1)).default, PE = new NE(), FE = "recharts.syncEvent.tooltip", IE = "recharts.syncEvent.brush", LE = (e, t) => {
	if (t && Array.isArray(e)) {
		var n = Number.parseInt(t, 10);
		if (!Ke(n)) return e[n];
	}
}, RE = Cs({
	name: "options",
	initialState: {
		chartName: "",
		tooltipPayloadSearcher: () => void 0,
		eventEmitter: void 0,
		defaultTooltipEventType: "axis"
	},
	reducers: { createEventEmitter: (e) => {
		e.eventEmitter ??= Symbol("rechartsEventEmitter");
	} }
}), zE = RE.reducer, BE = RE.actions.createEventEmitter;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/synchronisation/syncSelectors.js
function VE(e) {
	return e.tooltip.syncInteraction;
}
var HE = Cs({
	name: "chartData",
	initialState: {
		chartData: void 0,
		computedData: void 0,
		dataStartIndex: 0,
		dataEndIndex: 0
	},
	reducers: {
		setChartData(e, t) {
			e.chartData = H(t.payload), t.payload == null ? (e.dataStartIndex = 0, e.dataEndIndex = 0) : t.payload.length > 0 && e.dataEndIndex !== t.payload.length - 1 && (e.dataEndIndex = t.payload.length - 1);
		},
		setComputedData(e, t) {
			e.computedData = t.payload;
		},
		setDataStartEndIndexes(e, t) {
			var n = t.payload, r = n.startIndex, i = n.endIndex;
			r != null && (e.dataStartIndex = r), i != null && (e.dataEndIndex = i);
		}
	}
}), UE = HE.actions, WE = UE.setChartData, GE = UE.setDataStartEndIndexes;
UE.setComputedData;
var KE = HE.reducer, qE = ["x", "y"];
function JE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function YE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? JE(Object(n), !0).forEach(function(t) {
			XE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : JE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function XE(e, t, n) {
	return (t = ZE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ZE(e) {
	var t = QE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function QE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function $E(e, t) {
	if (e == null) return {};
	var n, r, i = eD(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function eD(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function tD() {
	var e = B(oh), t = B(ch), n = z(), r = B(sh), i = B(fT), a = nu(), o = Xl(), s = B((e) => e.rootProps.className);
	(0, P.useEffect)(() => {
		if (e == null) return nt;
		var s = (s, c, l) => {
			if (t !== l && e === s) {
				if (c.payload.active === !1) n(gw({
					active: !1,
					coordinate: void 0,
					dataKey: void 0,
					index: null,
					label: void 0,
					sourceViewBox: void 0,
					graphicalItemId: void 0
				}));
				else if (r === "index") {
					var u;
					if (o && c != null && (u = c.payload) != null && u.coordinate && c.payload.sourceViewBox) {
						var d = c.payload.coordinate, f = d.x, p = d.y, m = $E(d, qE), h = c.payload.sourceViewBox, g = h.x, _ = h.y, v = h.width, y = h.height, b = YE(YE({}, m), {}, {
							x: o.x + (v ? (f - g) / v : 0) * o.width,
							y: o.y + (y ? (p - _) / y : 0) * o.height
						});
						n(YE(YE({}, c), {}, { payload: YE(YE({}, c.payload), {}, { coordinate: b }) }));
					} else n(c);
				} else if (i != null) {
					var x;
					typeof r == "function" ? x = i[r(i, {
						activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
						isTooltipActive: c.payload.active,
						activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
						activeLabel: c.payload.label,
						activeDataKey: c.payload.dataKey,
						activeCoordinate: c.payload.coordinate
					})] : r === "value" && (x = i.find((e) => String(e.value) === c.payload.label));
					var S = c.payload.coordinate;
					if (S == null || o == null) n(gw({
						active: !1,
						coordinate: void 0,
						dataKey: void 0,
						index: null,
						label: void 0,
						sourceViewBox: void 0,
						graphicalItemId: void 0
					}));
					else if (x == null) n(gw({
						active: !1,
						coordinate: void 0,
						dataKey: void 0,
						index: null,
						label: void 0,
						sourceViewBox: c.payload.sourceViewBox,
						graphicalItemId: void 0
					}));
					else {
						var C = S.x, w = S.y, T = Math.min(C, o.x + o.width), E = Math.min(w, o.y + o.height), D = {
							x: a === "horizontal" ? x.coordinate : T,
							y: a === "horizontal" ? E : x.coordinate
						};
						n(gw({
							active: c.payload.active,
							coordinate: D,
							dataKey: c.payload.dataKey,
							index: String(x.index),
							label: c.payload.label,
							sourceViewBox: c.payload.sourceViewBox,
							graphicalItemId: c.payload.graphicalItemId
						}));
					}
				}
			}
		};
		return PE.on(FE, s), () => {
			PE.off(FE, s);
		};
	}, [
		s,
		n,
		t,
		e,
		r,
		i,
		a,
		o
	]);
}
function nD() {
	var e = B(oh), t = B(ch), n = z();
	(0, P.useEffect)(() => {
		if (e == null) return nt;
		var r = (r, i, a) => {
			t !== a && e === r && n(GE(i));
		};
		return PE.on(IE, r), () => {
			PE.off(IE, r);
		};
	}, [
		n,
		t,
		e
	]);
}
function rD() {
	var e = z();
	(0, P.useEffect)(() => {
		e(BE());
	}, [e]), tD(), nD();
}
function iD(e, t, n, r, i, a) {
	var o = B((n) => JT(n, e, t)), s = B(bT), c = B(ch), l = B(oh), u = B(sh), d = B(VE)?.sourceViewBox != null, f = Xl();
	(0, P.useEffect)(() => {
		if (!d && l != null && c != null) {
			var e = gw({
				active: a,
				coordinate: n,
				dataKey: o,
				index: i,
				label: typeof r == "number" ? String(r) : r,
				sourceViewBox: f,
				graphicalItemId: s
			});
			PE.emit(FE, l, e, c);
		}
	}, [
		d,
		n,
		o,
		s,
		i,
		r,
		c,
		l,
		u,
		a,
		f
	]);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/Tooltip.js
function aD(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function oD(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? aD(Object(n), !0).forEach(function(t) {
			sD(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : aD(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function sD(e, t, n) {
	return (t = cD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function cD(e) {
	var t = lD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function lD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function uD(e, t) {
	return hD(e) || mD(e, t) || fD(e, t) || dD();
}
function dD() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function fD(e, t) {
	if (e) {
		if (typeof e == "string") return pD(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? pD(e, t) : void 0;
	}
}
function pD(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function mD(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function hD(e) {
	if (Array.isArray(e)) return e;
}
function gD(e) {
	return e.dataKey;
}
function _D(e, t) {
	return /*#__PURE__*/ P.isValidElement(e) ? /*#__PURE__*/ P.cloneElement(e, t) : typeof e == "function" ? /*#__PURE__*/ P.createElement(e, t) : /*#__PURE__*/ P.createElement(wd, t);
}
var vD = [], yD = {
	allowEscapeViewBox: {
		x: !1,
		y: !1
	},
	animationDuration: 400,
	animationEasing: "ease",
	axisId: 0,
	contentStyle: {},
	cursor: !0,
	filterNull: !0,
	includeHidden: !1,
	isAnimationActive: "auto",
	itemSorter: "name",
	itemStyle: {},
	labelStyle: {},
	offset: 10,
	reverseDirection: {
		x: !1,
		y: !1
	},
	separator: " : ",
	trigger: "hover",
	useTranslate3d: !1,
	wrapperStyle: {}
};
function bD(e) {
	var t = sr(e, yD), n = t.active, r = t.allowEscapeViewBox, i = t.animationDuration, a = t.animationEasing, o = t.content, s = t.filterNull, c = t.isAnimationActive, l = t.offset, u = t.payloadUniqBy, d = t.position, f = t.reverseDirection, p = t.useTranslate3d, m = t.wrapperStyle, h = t.cursor, g = t.shared, _ = t.trigger, v = t.defaultIndex, y = t.portal, b = t.axisId, x = z(), S = typeof v == "number" ? String(v) : v;
	(0, P.useEffect)(() => {
		x(lw({
			shared: g,
			trigger: _,
			axisId: b,
			active: n,
			defaultIndex: S
		}));
	}, [
		x,
		g,
		_,
		b,
		n,
		S
	]);
	var C = Xl(), w = $d(), T = ew(g), E = B((e) => eE(e, T, _, S)) ?? {}, D = E.activeIndex, O = E.isActive, k = B((e) => $T(e, T, _, S)), A = B((e) => QT(e, T, _, S)), j = B((e) => ZT(e, T, _, S)), M = k, N = ME(), ee = n ?? O ?? !1, te = uD(_a([M, ee]), 2), ne = te[0], re = te[1], ie = T === "axis" ? A : void 0;
	iD(T, _, j, ie, D, ee);
	var ae = y ?? N;
	if (ae == null || C == null || T == null) return null;
	var oe = M ?? vD;
	ee || (oe = vD), s && oe.length && (oe = ki(oe.filter((e) => e.value != null && (e.hide !== !0 || t.includeHidden)), u, gD));
	var se = oe.length > 0, ce = oD(oD({}, t), {}, {
		payload: oe,
		label: ie,
		active: ee,
		activeIndex: D,
		coordinate: j,
		accessibilityLayer: w
	}), ue = /*#__PURE__*/ P.createElement(Qd, {
		allowEscapeViewBox: r,
		animationDuration: i,
		animationEasing: a,
		isAnimationActive: c,
		active: ee,
		coordinate: j,
		hasPayload: se,
		offset: l,
		position: d,
		reverseDirection: f,
		useTranslate3d: p,
		viewBox: C,
		wrapperStyle: m,
		lastBoundingBox: ne,
		innerRef: re,
		hasPortalFromProps: !!y
	}, _D(o, ce));
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ (0, le.createPortal)(ue, ae), ee && /*#__PURE__*/ P.createElement(AE, {
		cursor: h,
		tooltipEventType: T,
		coordinate: j,
		payload: oe,
		index: D
	}));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/Cell.js
var xD = (e) => null;
xD.displayName = "Cell";
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/LRUCache.js
function SD(e, t, n) {
	return (t = CD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function CD(e) {
	var t = wD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function wD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var TD = class {
	constructor(e) {
		SD(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = e;
	}
	get(e) {
		var t = this.cache.get(e);
		return t !== void 0 && (this.cache.delete(e), this.cache.set(e, t)), t;
	}
	set(e, t) {
		if (this.cache.has(e)) this.cache.delete(e);
		else if (this.cache.size >= this.maxSize) {
			var n = this.cache.keys().next().value;
			n != null && this.cache.delete(n);
		}
		this.cache.set(e, t);
	}
	clear() {
		this.cache.clear();
	}
	size() {
		return this.cache.size;
	}
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/DOMUtils.js
function ED(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function DD(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ED(Object(n), !0).forEach(function(t) {
			OD(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ED(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function OD(e, t, n) {
	return (t = kD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function kD(e) {
	var t = AD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function AD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var jD = DD({}, {
	cacheSize: 2e3,
	enableCache: !0
}), MD = new TD(jD.cacheSize), ND = {
	position: "absolute",
	top: "-20000px",
	left: 0,
	padding: 0,
	margin: 0,
	border: "none",
	whiteSpace: "pre"
}, PD = "recharts_measurement_span";
function FD(e, t) {
	return `${e}|${t.fontSize || ""}|${t.fontFamily || ""}|${t.fontWeight || ""}|${t.fontStyle || ""}|${t.letterSpacing || ""}|${t.textTransform || ""}`;
}
var ID = (e, t) => {
	try {
		var n = document.getElementById(PD);
		n || (n = document.createElement("span"), n.setAttribute("id", PD), n.setAttribute("aria-hidden", "true"), document.body.appendChild(n)), Object.assign(n.style, ND, t), n.textContent = `${e}`;
		var r = n.getBoundingClientRect();
		return {
			width: r.width,
			height: r.height
		};
	} catch {
		return {
			width: 0,
			height: 0
		};
	}
}, LD = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	if (e == null || jd.isSsr) return {
		width: 0,
		height: 0
	};
	if (!jD.enableCache) return ID(e, t);
	var n = FD(e, t), r = MD.get(n);
	if (r) return r;
	var i = ID(e, t);
	return MD.set(n, i), i;
}, RD;
function zD(e, t) {
	return WD(e) || UD(e, t) || VD(e, t) || BD();
}
function BD() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function VD(e, t) {
	if (e) {
		if (typeof e == "string") return HD(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? HD(e, t) : void 0;
	}
}
function HD(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function UD(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function WD(e) {
	if (Array.isArray(e)) return e;
}
function GD(e, t, n) {
	return (t = KD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function KD(e) {
	var t = qD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function qD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var JD = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, YD = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, XD = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, ZD = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, QD = {
	cm: 96 / 2.54,
	mm: 96 / 25.4,
	pt: 96 / 72,
	pc: 16,
	in: 96,
	Q: 96 / 101.6,
	px: 1
}, $D = [
	"cm",
	"mm",
	"pt",
	"pc",
	"in",
	"Q",
	"px"
];
function eO(e) {
	return $D.includes(e);
}
var tO = "NaN";
function nO(e, t) {
	return e * QD[t];
}
var rO = class e {
	static parse(t) {
		var n = zD(ZD.exec(t) ?? [], 3), r = n[1], i = n[2];
		return r == null ? e.NaN : new e(parseFloat(r), i ?? "");
	}
	constructor(e, t) {
		this.num = e, this.unit = t, this.num = e, this.unit = t, Ke(e) && (this.unit = ""), t !== "" && !XD.test(t) && (this.num = NaN, this.unit = ""), eO(t) && (this.num = nO(e, t), this.unit = "px");
	}
	add(t) {
		return this.unit === t.unit ? new e(this.num + t.num, this.unit) : new e(NaN, "");
	}
	subtract(t) {
		return this.unit === t.unit ? new e(this.num - t.num, this.unit) : new e(NaN, "");
	}
	multiply(t) {
		return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new e(NaN, "") : new e(this.num * t.num, this.unit || t.unit);
	}
	divide(t) {
		return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new e(NaN, "") : new e(this.num / t.num, this.unit || t.unit);
	}
	toString() {
		return `${this.num}${this.unit}`;
	}
	isNaN() {
		return Ke(this.num);
	}
};
RD = rO, GD(rO, "NaN", new RD(NaN, ""));
function iO(e) {
	if (e == null || e.includes(tO)) return tO;
	for (var t = e; t.includes("*") || t.includes("/");) {
		var n = zD(JD.exec(t) ?? [], 4), r = n[1], i = n[2], a = n[3], o = rO.parse(r ?? ""), s = rO.parse(a ?? ""), c = i === "*" ? o.multiply(s) : o.divide(s);
		if (c.isNaN()) return tO;
		t = t.replace(JD, c.toString());
	}
	for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t);) {
		var l = zD(YD.exec(t) ?? [], 4), u = l[1], d = l[2], f = l[3], p = rO.parse(u ?? ""), m = rO.parse(f ?? ""), h = d === "+" ? p.add(m) : p.subtract(m);
		if (h.isNaN()) return tO;
		t = t.replace(YD, h.toString());
	}
	return t;
}
var aO = /\(([^()]*)\)/;
function oO(e) {
	for (var t = e, n; (n = aO.exec(t)) != null;) {
		var r = zD(n, 2)[1];
		t = t.replace(aO, iO(r));
	}
	return t;
}
function sO(e) {
	var t = e.replace(/\s+/g, "");
	return t = oO(t), t = iO(t), t;
}
function cO(e) {
	try {
		return sO(e);
	} catch {
		return tO;
	}
}
function lO(e) {
	var t = cO(e.slice(5, -1));
	return t === tO ? "" : t;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/Text.js
var uO = [
	"x",
	"y",
	"lineHeight",
	"capHeight",
	"fill",
	"scaleToFit",
	"textAnchor",
	"verticalAnchor"
], dO = [
	"dx",
	"dy",
	"angle",
	"className",
	"breakAll"
];
function fO() {
	return fO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, fO.apply(null, arguments);
}
function pO(e, t) {
	if (e == null) return {};
	var n, r, i = mO(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function mO(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function hO(e, t) {
	return bO(e) || yO(e, t) || _O(e, t) || gO();
}
function gO() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _O(e, t) {
	if (e) {
		if (typeof e == "string") return vO(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? vO(e, t) : void 0;
	}
}
function vO(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function yO(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function bO(e) {
	if (Array.isArray(e)) return e;
}
var xO = /[ \f\n\r\t\v\u2028\u2029]+/, SO = (e) => {
	var t = e.children, n = e.breakAll, r = e.style;
	try {
		var i = [];
		return L(t) || (i = n ? t.toString().split("") : t.toString().split(xO)), {
			wordsWithComputedWidth: i.map((e) => ({
				word: e,
				width: LD(e, r).width
			})),
			spaceWidth: n ? 0 : LD("\xA0", r).width
		};
	} catch {
		return null;
	}
};
function CO(e) {
	return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function wO(e) {
	return L(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var TO = (e, t, n, r) => e.reduce((e, i) => {
	var a = i.word, o = i.width, s = e[e.length - 1];
	if (s && o != null && (t == null || r || s.width + o + n < Number(t))) s.words.push(a), s.width += o + n;
	else {
		var c = {
			words: [a],
			width: o
		};
		e.push(c);
	}
	return e;
}, []), EO = (e) => e.reduce((e, t) => e.width > t.width ? e : t), DO = "…", OO = (e, t, n, r, i, a, o, s) => {
	var c = SO({
		breakAll: n,
		style: r,
		children: e.slice(0, t) + DO
	});
	if (!c) return [!1, []];
	var l = TO(c.wordsWithComputedWidth, a, o, s);
	return [l.length > i || EO(l).width > Number(a), l];
}, kO = (e, t, n, r, i) => {
	var a = e.maxLines, o = e.children, s = e.style, c = e.breakAll, l = F(a), u = String(o), d = TO(t, r, n, i);
	if (!l || i || !(d.length > a || EO(d).width > Number(r))) return d;
	for (var f = 0, p = u.length - 1, m = 0, h; f <= p && m <= u.length - 1;) {
		var g = Math.floor((f + p) / 2), _ = hO(OO(u, g - 1, c, s, a, r, n, i), 2), v = _[0], y = _[1], b = hO(OO(u, g, c, s, a, r, n, i), 1)[0];
		if (!v && !b && (f = g + 1), v && b && (p = g - 1), !v && b) {
			h = y;
			break;
		}
		m++;
	}
	return h || d;
}, AO = (e) => [{
	words: L(e) ? [] : e.toString().split(xO),
	width: void 0
}], jO = (e) => {
	var t = e.width, n = e.scaleToFit, r = e.children, i = e.style, a = e.breakAll, o = e.maxLines;
	if ((t || n) && !jd.isSsr) {
		var s, c, l = SO({
			breakAll: a,
			children: r,
			style: i
		});
		if (l) {
			var u = l.wordsWithComputedWidth, d = l.spaceWidth;
			s = u, c = d;
		} else return AO(r);
		return kO({
			breakAll: a,
			children: r,
			maxLines: o,
			style: i
		}, s, c, t, !!n);
	}
	return AO(r);
}, MO = "#808080", NO = {
	angle: 0,
	breakAll: !1,
	capHeight: "0.71em",
	fill: MO,
	lineHeight: "1em",
	scaleToFit: !1,
	textAnchor: "start",
	verticalAnchor: "end",
	x: 0,
	y: 0
}, PO = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = sr(e, NO), r = n.x, i = n.y, a = n.lineHeight, o = n.capHeight, s = n.fill, c = n.scaleToFit, u = n.textAnchor, d = n.verticalAnchor, f = pO(n, uO), p = (0, P.useMemo)(() => jO({
		breakAll: f.breakAll,
		children: f.children,
		maxLines: f.maxLines,
		scaleToFit: c,
		style: f.style,
		width: f.width
	}), [
		f.breakAll,
		f.children,
		f.maxLines,
		c,
		f.style,
		f.width
	]), m = f.dx, h = f.dy, g = f.angle, _ = f.className, v = f.breakAll, y = pO(f, dO);
	if (!Je(r) || !Je(i) || p.length === 0) return null;
	var b = Number(r) + (F(m) ? m : 0), x = Number(i) + (F(h) ? h : 0);
	if (!W(b) || !W(x)) return null;
	var S;
	switch (d) {
		case "start":
			S = lO(`calc(${o})`);
			break;
		case "middle":
			S = lO(`calc(${(p.length - 1) / 2} * -${a} + (${o} / 2))`);
			break;
		default: S = lO(`calc(${p.length - 1} * -${a})`);
	}
	var C = [], w = p[0];
	if (c && w != null) {
		var T = w.width, E = f.width;
		C.push(`scale(${F(E) && F(T) ? E / T : 1})`);
	}
	return g && C.push(`rotate(${g}, ${b}, ${x})`), C.length && (y.transform = C.join(" ")), /*#__PURE__*/ P.createElement("text", fO({}, _e(y), {
		ref: t,
		x: b,
		y: x,
		className: l("recharts-text", _),
		textAnchor: u,
		fill: s.includes("url") ? MO : s
	}), p.map((e, t) => {
		var n = e.words.join(v ? "" : " ");
		return /*#__PURE__*/ P.createElement("tspan", {
			x: b,
			dy: t === 0 ? S : a,
			key: `${n}-${t}`
		}, n);
	}));
});
PO.displayName = "Text";
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/Label.js
var FO = ["labelRef"], IO = ["content"];
function LO(e, t) {
	if (e == null) return {};
	var n, r, i = RO(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function RO(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function zO(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function BO(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? zO(Object(n), !0).forEach(function(t) {
			VO(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zO(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function VO(e, t, n) {
	return (t = HO(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function HO(e) {
	var t = UO(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function UO(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function WO() {
	return WO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, WO.apply(null, arguments);
}
var GO = /*#__PURE__*/ (0, P.createContext)(null), KO = (e) => {
	var t = e.x, n = e.y, r = e.upperWidth, i = e.lowerWidth, a = e.width, o = e.height, s = e.children, c = (0, P.useMemo)(() => ({
		x: t,
		y: n,
		upperWidth: r,
		lowerWidth: i,
		width: a,
		height: o
	}), [
		t,
		n,
		r,
		i,
		a,
		o
	]);
	return /*#__PURE__*/ P.createElement(GO.Provider, { value: c }, s);
}, qO = () => {
	var e = (0, P.useContext)(GO), t = Xl();
	return e || (t ? rt(t) : void 0);
}, JO = /*#__PURE__*/ (0, P.createContext)(null), YO = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, s = e.clockWise, c = e.children, l = (0, P.useMemo)(() => ({
		cx: t,
		cy: n,
		innerRadius: r,
		outerRadius: i,
		startAngle: a,
		endAngle: o,
		clockWise: s
	}), [
		t,
		n,
		r,
		i,
		a,
		o,
		s
	]);
	return /*#__PURE__*/ P.createElement(JO.Provider, { value: l }, c);
}, XO = () => {
	var e = (0, P.useContext)(JO), t = B(jh);
	return e || t;
}, ZO = (e) => {
	var t = e.value, n = e.formatter, r = L(e.children) ? t : e.children;
	return typeof n == "function" ? n(r) : r;
}, QO = (e) => e != null && typeof e == "function", $O = (e, t) => Ge(t - e) * Math.min(Math.abs(t - e), 360), ek = (e, t, n, r, i) => {
	var a = e.offset, o = e.className, s = i.cx, c = i.cy, u = i.innerRadius, d = i.outerRadius, f = i.startAngle, p = i.endAngle, m = i.clockWise, h = (u + d) / 2, g = $O(f, p), _ = g >= 0 ? 1 : -1, v, y;
	switch (t) {
		case "insideStart":
			v = f + _ * a, y = m;
			break;
		case "insideEnd":
			v = p - _ * a, y = !m;
			break;
		case "end":
			v = p + _ * a, y = m;
			break;
		default: throw Error(`Unsupported position ${t}`);
	}
	y = g <= 0 ? y : !y;
	var b = Jp(s, c, h, v), x = Jp(s, c, h, v + (y ? 1 : -1) * 359), S = `M${b.x},${b.y}
    A${h},${h},0,1,${+!y},
    ${x.x},${x.y}`, C = L(e.id) ? Xe("recharts-radial-line-") : e.id;
	return /*#__PURE__*/ P.createElement("text", WO({}, r, {
		dominantBaseline: "central",
		className: l("recharts-radial-bar-label", o)
	}), /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement("path", {
		id: C,
		d: S
	})), /*#__PURE__*/ P.createElement("textPath", { xlinkHref: `#${C}` }, n));
}, tk = (e, t, n) => {
	var r = e.cx, i = e.cy, a = e.innerRadius, o = e.outerRadius, s = (e.startAngle + e.endAngle) / 2;
	if (n === "outside") {
		var c = Jp(r, i, o + t, s), l = c.x;
		return {
			x: l,
			y: c.y,
			textAnchor: l >= r ? "start" : "end",
			verticalAnchor: "middle"
		};
	}
	if (n === "center") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
	if (n === "centerTop") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "start"
	};
	if (n === "centerBottom") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "end"
	};
	var u = Jp(r, i, (a + o) / 2, s);
	return {
		x: u.x,
		y: u.y,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
}, nk = (e) => e != null && "cx" in e && F(e.cx), rk = {
	angle: 0,
	offset: 5,
	zIndex: J.label,
	position: "middle",
	textBreakAll: !1
};
function ik(e) {
	if (!nk(e)) return e;
	var t = e.cx, n = e.cy, r = e.outerRadius, i = r * 2;
	return {
		x: t - r,
		y: n - r,
		width: i,
		upperWidth: i,
		lowerWidth: i,
		height: i
	};
}
function ak(e) {
	var t = sr(e, rk), n = t.viewBox, r = t.parentViewBox, i = t.position, a = t.value, o = t.children, s = t.content, c = t.className, u = c === void 0 ? "" : c, d = t.textBreakAll, f = t.labelRef, p = XO(), m = qO(), h = n == null ? i === "center" ? m : p ?? m : nk(n) ? n : rt(n), g, _, v = ik(h);
	if (!h || L(a) && L(o) && !/*#__PURE__*/ (0, P.isValidElement)(s) && typeof s != "function") return null;
	var y = nk(h) && (i === "insideStart" || i === "insideEnd" || i === "end");
	if (nk(h)) y || (_ = tk(h, t.offset, t.position));
	else if (v) {
		var b = lt({
			viewBox: v,
			position: i,
			offset: t.offset,
			parentViewBox: nk(r) ? void 0 : r,
			clamp: !0
		});
		_ = BO(BO({
			x: b.x,
			y: b.y,
			textAnchor: b.horizontalAnchor,
			verticalAnchor: b.verticalAnchor
		}, b.width === void 0 ? {} : { width: b.width }), b.height === void 0 ? {} : { height: b.height });
	}
	var x = BO(BO(BO(BO({}, _?.x === void 0 ? {} : { x: _.x }), _?.y === void 0 ? {} : { y: _.y }), t), {}, { viewBox: h });
	if (/*#__PURE__*/ (0, P.isValidElement)(s)) {
		x.labelRef;
		var S = LO(x, FO);
		return /*#__PURE__*/ (0, P.cloneElement)(s, S);
	}
	if (typeof s == "function") {
		x.content;
		var C = LO(x, IO);
		if (g = /*#__PURE__*/ (0, P.createElement)(s, C), /*#__PURE__*/ (0, P.isValidElement)(g)) return g;
	} else g = ZO(t);
	var w = _e(t);
	return y && nk(h) ? ek(t, i, g, w, h) : _ == null ? null : /*#__PURE__*/ P.createElement(xE, { zIndex: t.zIndex }, /*#__PURE__*/ P.createElement(PO, WO({
		ref: f,
		className: l("recharts-label", u)
	}, w, _, {
		textAnchor: CO(w.textAnchor) ? w.textAnchor : _.textAnchor,
		breakAll: d
	}), g));
}
ak.displayName = "Label";
var ok = (e, t, n) => {
	if (!e) return null;
	var r = {
		viewBox: t,
		labelRef: n
	};
	return e === !0 ? /*#__PURE__*/ P.createElement(ak, WO({ key: "label-implicit" }, r)) : Je(e) ? /*#__PURE__*/ P.createElement(ak, WO({
		key: "label-implicit",
		value: e
	}, r)) : /*#__PURE__*/ (0, P.isValidElement)(e) ? e.type === ak ? /*#__PURE__*/ (0, P.cloneElement)(e, BO({ key: "label-implicit" }, r)) : /*#__PURE__*/ P.createElement(ak, WO({
		key: "label-implicit",
		content: e
	}, r)) : QO(e) ? /*#__PURE__*/ P.createElement(ak, WO({
		key: "label-implicit",
		content: e
	}, r)) : e && typeof e == "object" ? /*#__PURE__*/ P.createElement(ak, WO({}, e, { key: "label-implicit" }, r)) : null;
};
function sk(e) {
	var t = e.label, n = e.labelRef;
	return ok(t, qO(), n) || null;
}
function ck(e) {
	var t = e.label;
	return ok(t, XO()) || null;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/LabelList.js
var lk = ["valueAccessor"], uk = [
	"dataKey",
	"clockWise",
	"id",
	"textBreakAll",
	"zIndex"
];
function dk() {
	return dk = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, dk.apply(null, arguments);
}
function fk(e, t) {
	if (e == null) return {};
	var n, r, i = pk(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function pk(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var mk = (e) => {
	var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
	if (wO(t)) return t;
}, hk = /*#__PURE__*/ (0, P.createContext)(void 0), gk = hk.Provider, _k = /*#__PURE__*/ (0, P.createContext)(void 0), vk = _k.Provider;
function yk() {
	return (0, P.useContext)(hk);
}
function bk() {
	return (0, P.useContext)(_k);
}
function xk(e) {
	var t = e.valueAccessor, n = t === void 0 ? mk : t, r = fk(e, lk), i = r.dataKey;
	r.clockWise;
	var a = r.id, o = r.textBreakAll, s = r.zIndex, c = fk(r, uk), l = yk(), u = bk(), d = l || u;
	return !d || !d.length ? null : /*#__PURE__*/ P.createElement(xE, { zIndex: s ?? J.label }, /*#__PURE__*/ P.createElement(ke, { className: "recharts-label-list" }, d.map((e, t) => {
		var s = L(i) ? n(e, t) : G(e.payload, i), l = L(a) ? {} : { id: `${a}-${t}` };
		return /*#__PURE__*/ P.createElement(ak, dk({ key: `label-${t}` }, _e(e), c, l, {
			fill: r.fill ?? e.fill,
			parentViewBox: e.parentViewBox,
			value: s,
			textBreakAll: o,
			viewBox: e.viewBox,
			index: t,
			zIndex: 0
		}));
	})));
}
xk.displayName = "LabelList";
function Sk(e) {
	var t = e.label;
	return t ? t === !0 ? /*#__PURE__*/ P.createElement(xk, { key: "labelList-implicit" }) : /*#__PURE__*/ P.isValidElement(t) || QO(t) ? /*#__PURE__*/ P.createElement(xk, {
		key: "labelList-implicit",
		content: t
	}) : typeof t == "object" ? /*#__PURE__*/ P.createElement(xk, dk({ key: "labelList-implicit" }, t, { type: String(t.type) })) : null : null;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/shape/Dot.js
function Ck() {
	return Ck = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ck.apply(null, arguments);
}
var wk = (e) => {
	var t = e.cx, n = e.cy, r = e.r, i = e.className, a = l("recharts-dot", i);
	return F(t) && F(n) && F(r) ? /*#__PURE__*/ P.createElement("circle", Ck({}, he(e), $n(e), {
		className: a,
		cx: t,
		cy: n,
		r
	})) : null;
}, Tk = (e) => e.graphicalItems.polarItems, Ek = V([
	Tk,
	Z,
	V([Y, Mh], eS)
], rS), Dk = V([V([Ek], cS), Sm], dS), Ok = V([
	Dk,
	Z,
	Ek
], pS);
V([
	Dk,
	Z,
	Ek
], (e, t, n) => n.length > 0 ? e.flatMap((e) => n.flatMap((n) => ({
	value: G(e, t.dataKey ?? n.dataKey),
	errorDomain: []
}))).filter(Boolean) : t?.dataKey == null ? e.map((e) => ({
	value: e,
	errorDomain: []
})) : e.map((e) => ({
	value: G(e, t.dataKey),
	errorDomain: []
})));
var kk = () => void 0, Ak = V([
	Z,
	K,
	Dk,
	Ok,
	rh,
	Y,
	V([
		Z,
		jS,
		MS,
		kk,
		V([
			Dk,
			Z,
			Ek,
			PS,
			Y,
			Em
		], LS),
		kk,
		K,
		Y
	], nC)
], aC), jk = V([
	Ak,
	Qx,
	sC
], cC), Mk = V([sC, V([
	Z,
	Ak,
	jk,
	Y
], uC)], Hh), Nk = Cs({
	name: "polarAxis",
	initialState: {
		radiusAxis: {},
		angleAxis: {}
	},
	reducers: {
		addRadiusAxis(e, t) {
			e.radiusAxis[t.payload.id] = H(t.payload);
		},
		removeRadiusAxis(e, t) {
			delete e.radiusAxis[t.payload.id];
		},
		addAngleAxis(e, t) {
			e.angleAxis[t.payload.id] = H(t.payload);
		},
		removeAngleAxis(e, t) {
			delete e.angleAxis[t.payload.id];
		}
	}
}), Pk = Nk.actions, Fk = Pk.addRadiusAxis, Ik = Pk.removeRadiusAxis, Lk = Pk.addAngleAxis, Rk = Pk.removeAngleAxis, zk = Nk.reducer;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/getClassNameFromUnknown.js
function Bk(e) {
	return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
// node_modules/.pnpm/react-is@19.3.1/node_modules/react-is/cjs/react-is.production.js
var Vk = /* @__PURE__ */ n(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.view_transition");
	function m(e) {
		if (typeof e == "object" && e) {
			var m = e.$$typeof;
			switch (m) {
				case t: switch (e = e.type, e) {
					case r:
					case a:
					case i:
					case l:
					case u:
					case p: return e;
					default: switch (e &&= e.$$typeof, e) {
						case s:
						case c:
						case f:
						case d: return e;
						case o: return e;
						default: return m;
					}
				}
				case n: return m;
			}
		}
	}
	e.isFragment = function(e) {
		return m(e) === r;
	};
})), Hk = (/* @__PURE__ */ n(((e, t) => {
	t.exports = Vk();
})))(), Uk = (e) => typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : "", Wk = null, Gk = null, Kk = (e) => {
	if (e === Wk && Array.isArray(Gk)) return Gk;
	var t = [];
	return P.Children.forEach(e, (e) => {
		L(e) || ((0, Hk.isFragment)(e) ? t = t.concat(Kk(e.props.children)) : t.push(e));
	}), Gk = t, Wk = e, t;
};
function qk(e, t) {
	var n = [], r = [];
	return r = Array.isArray(t) ? t.map((e) => Uk(e)) : [Uk(t)], Kk(e).forEach((e) => {
		var t = Be(e, "type.displayName") || Be(e, "type.name");
		t && r.indexOf(t) !== -1 && n.push(e);
	}), n;
}
var Jk = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/ActiveShapeUtils.js
function Yk(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Xk(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Yk(Object(n), !0).forEach(function(t) {
			Zk(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yk(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Zk(e, t, n) {
	return (t = Qk(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Qk(e) {
	var t = $k(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function $k(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function eA(e, t) {
	return Xk(Xk({}, t), e);
}
function tA(e) {
	return /*#__PURE__*/ (0, P.isValidElement)(e) ? e.props : e;
}
function nA(e, t) {
	return /*#__PURE__*/ (0, P.cloneElement)(e, eA(tA(e), t));
}
function rA(e) {
	if ("index" in e) {
		var t = e.index;
		return typeof t == "number" || typeof t == "string" ? t : void 0;
	}
}
function iA(e) {
	return "isActive" in e && e.isActive === !0;
}
function aA(e) {
	var t = e.option, n = e.DefaultShape, r = e.shapeProps, i = e.activeClassName, a = i === void 0 ? "recharts-active-shape" : i, o = e.inActiveClassName, s = o === void 0 ? "recharts-shape" : o, c = rA(r), l = /*#__PURE__*/ (0, P.isValidElement)(t) ? nA(t, r) : t === n ? /*#__PURE__*/ P.createElement(n, r) : typeof t == "function" ? t(r, c) : typeof t == "object" ? /*#__PURE__*/ P.createElement(n, eA(t, r)) : /*#__PURE__*/ P.createElement(n, r);
	return iA(r) ? /*#__PURE__*/ P.createElement(ke, { className: a }, l) : /*#__PURE__*/ P.createElement(ke, { className: s }, l);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/context/tooltipContext.js
var oA = (e, t, n) => {
	var r = z();
	return (i, a) => (o) => {
		e?.(i, a, o), r(uw({
			activeIndex: String(a),
			activeDataKey: t,
			activeCoordinate: i.tooltipPosition,
			activeGraphicalItemId: n
		}));
	};
}, sA = (e) => {
	var t = z();
	return (n, r) => (i) => {
		e?.(n, r, i), t(dw());
	};
}, cA = (e, t, n) => {
	var r = z();
	return (i, a) => (o) => {
		e?.(i, a, o), r(pw({
			activeIndex: String(a),
			activeDataKey: t,
			activeCoordinate: i.tooltipPosition,
			activeGraphicalItemId: n
		}));
	};
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/SetTooltipEntrySettings.js
function lA(e) {
	var t = e.tooltipEntrySettings, n = z(), r = ml(), i = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		r || (i.current === null ? n(ow(t)) : i.current !== t && n(sw({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		t,
		n,
		r
	]), (0, P.useLayoutEffect)(() => () => {
		i.current &&= (n(cw(i.current)), null);
	}, [n]), null;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/SetLegendPayload.js
function uA(e) {
	var t = e.legendPayload, n = z(), r = ml(), i = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		r || (i.current === null ? n(fu(t)) : i.current !== t && n(pu({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		n,
		r,
		t
	]), (0, P.useLayoutEffect)(() => () => {
		i.current &&= (n(mu(i.current)), null);
	}, [n]), null;
}
function dA(e) {
	var t = e.legendPayload, n = z(), r = B(K), i = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		(r === "centric" || r === "radial") && (i.current === null ? n(fu(t)) : i.current !== t && n(pu({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		n,
		r,
		t
	]), (0, P.useLayoutEffect)(() => () => {
		i.current &&= (n(mu(i.current)), null);
	}, [n]), null;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/animation/matchBy.js
function fA(e, t) {
	return _A(e) || gA(e, t) || mA(e, t) || pA();
}
function pA() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function mA(e, t) {
	if (e) {
		if (typeof e == "string") return hA(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? hA(e, t) : void 0;
	}
}
function hA(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function gA(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function _A(e) {
	if (Array.isArray(e)) return e;
}
var vA = "index", yA = "append";
function bA(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], r = [];
	for (var i of n) r.push({
		status: "removed",
		prev: i
	});
	for (var a = 0; a < t.length; a++) {
		var o = e[a], s = t[a];
		o == null ? r.push({
			status: "added",
			next: s
		}) : r.push({
			status: "matched",
			prev: o,
			next: s
		});
	}
	return r;
}
function xA(e, t) {
	var n = e.length / t.length;
	return bA(t.map((t, r) => e[Math.floor(r * n)]), t);
}
function SA(e, t) {
	return bA(t.map((t, n) => e[n]), t);
}
function CA(e, t) {
	for (var n = /* @__PURE__ */ new Map(), r = 0; r < e.length; r++) {
		var i = e[r];
		if (i != null) {
			var a = t(i, r);
			a != null && !n.has(a) && n.set(a, i);
		}
	}
	return n;
}
function wA(e, t, n) {
	var r = CA(e, n), i = /* @__PURE__ */ new Set(), a = t.map((e, t) => {
		var a = n(e, t);
		if (a != null) {
			var o = r.get(a);
			if (o !== void 0) return i.add(a), o;
		}
	}), o = [];
	for (var s of r) {
		var c = fA(s, 2), l = c[0], u = c[1];
		i.has(l) || o.push(u);
	}
	return bA(a, t, o);
}
function TA(e, t, n) {
	return t == null ? null : e == null ? t.map((e) => ({
		status: "added",
		next: e
	})) : n === "index" ? xA(e, t) : n === "append" ? SA(e, t) : wA(e, t, n);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/animation/useAnimationStartSnapshot.js
function EA(e, t) {
	var n = (0, P.useRef)(e), r = (0, P.useRef)(t.current), i = (0, P.useRef)(!0);
	n.current !== e && (n.current = e, r.current = t.current, i.current = !1);
	var a = (0, P.useCallback)(function(e, n) {
		var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
		n === 0 ? i.current = !0 : (n === 1 && (r.current = e), n > 0 && i.current && a && (t.current = e));
	}, [t]);
	return {
		startValue: r.current,
		syncStepValue: a
	};
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/animation/AnimatedItems.js
function DA(e, t) {
	return MA(e) || jA(e, t) || kA(e, t) || OA();
}
function OA() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function kA(e, t) {
	if (e) {
		if (typeof e == "string") return AA(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? AA(e, t) : void 0;
	}
}
function AA(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function jA(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function MA(e) {
	if (Array.isArray(e)) return e;
}
function NA(e, t) {
	var n = DA((0, P.useState)(!1), 2), r = n[0], i = n[1];
	return {
		isAnimating: r,
		handleAnimationStart: (0, P.useCallback)(() => {
			typeof e == "function" && e(), i(!0);
		}, [e]),
		handleAnimationEnd: (0, P.useCallback)(() => {
			typeof t == "function" && t(), i(!1);
		}, [t])
	};
}
function PA(e) {
	var t = e.animationInput, n = e.animationIdPrefix, r = e.items, i = e.previousItemsRef, a = e.isAnimationActive, o = e.animationBegin, s = e.animationDuration, c = e.animationEasing, l = e.onAnimationStart, u = e.onAnimationEnd, d = e.animationInterpolateFn, f = e.animationMatchBy, p = e.shouldUpdatePreviousRef, m = e.children, h = e.layout, g = sp(t, n), _ = EA(g, i), v = _.startValue ?? null, y = TA(v, r, f ?? vA);
	return /*#__PURE__*/ P.createElement(op, {
		animationId: g,
		begin: o,
		duration: s,
		isActive: a,
		easing: c,
		onAnimationEnd: u,
		onAnimationStart: l,
		key: g
	}, (e) => {
		var t = v == null, n = r == null ? r : d(y, e, h), i = p ? p(e) : e > 0;
		return _.syncStepValue(n, e, i), n == null ? null : m(n, e, t);
	});
}
function FA(e, t) {
	return BA(e) || zA(e, t) || LA(e, t) || IA();
}
function IA() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function LA(e, t) {
	if (e) {
		if (typeof e == "string") return RA(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? RA(e, t) : void 0;
	}
}
function RA(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function zA(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function BA(e) {
	if (Array.isArray(e)) return e;
}
var VA = P.useId ?? (() => FA(P.useState(() => Xe("uid-")), 1)[0]);
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/useUniqueId.js
function HA(e, t) {
	var n = VA();
	return t || (e ? `${e}-${n}` : n);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/context/RegisterGraphicalItemId.js
var UA = /*#__PURE__*/ (0, P.createContext)(void 0), WA = (e) => {
	var t = e.id, n = e.type, r = e.children, i = HA(`recharts-${n}`, t);
	return /*#__PURE__*/ P.createElement(UA.Provider, { value: i }, r(i));
}, GA = Cs({
	name: "graphicalItems",
	initialState: {
		cartesianItems: [],
		polarItems: []
	},
	reducers: {
		addCartesianGraphicalItem: {
			reducer(e, t) {
				e.cartesianItems.push(H(t.payload));
			},
			prepare: U()
		},
		replaceCartesianGraphicalItem: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = Yo(e).cartesianItems.indexOf(H(r));
				a > -1 && (e.cartesianItems[a] = H(i));
			},
			prepare: U()
		},
		removeCartesianGraphicalItem: {
			reducer(e, t) {
				var n = Yo(e).cartesianItems.indexOf(H(t.payload));
				n > -1 && e.cartesianItems.splice(n, 1);
			},
			prepare: U()
		},
		addPolarGraphicalItem: {
			reducer(e, t) {
				e.polarItems.push(H(t.payload));
			},
			prepare: U()
		},
		removePolarGraphicalItem: {
			reducer(e, t) {
				var n = Yo(e).polarItems.indexOf(H(t.payload));
				n > -1 && e.polarItems.splice(n, 1);
			},
			prepare: U()
		},
		replacePolarGraphicalItem: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = Yo(e).polarItems.indexOf(H(r));
				a > -1 && (e.polarItems[a] = H(i));
			},
			prepare: U()
		}
	}
}), KA = GA.actions, qA = KA.addCartesianGraphicalItem, JA = KA.replaceCartesianGraphicalItem, YA = KA.removeCartesianGraphicalItem, XA = KA.addPolarGraphicalItem, ZA = KA.removePolarGraphicalItem, QA = KA.replacePolarGraphicalItem, $A = GA.reducer, ej = /*#__PURE__*/ (0, P.memo)((e) => {
	var t = z(), n = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		n.current === null ? t(qA(e)) : n.current !== e && t(JA({
			prev: n.current,
			next: e
		})), n.current = e;
	}, [t, e]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(YA(n.current)), null);
	}, [t]), null;
}), tj = /*#__PURE__*/ (0, P.memo)((e) => {
	var t = z(), n = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		n.current === null ? t(XA(e)) : n.current !== e && t(QA({
			prev: n.current,
			next: e
		})), n.current = e;
	}, [t, e]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(ZA(n.current)), null);
	}, [t]), null;
}), nj = ["points"];
function rj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ij(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? rj(Object(n), !0).forEach(function(t) {
			aj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : rj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function aj(e, t, n) {
	return (t = oj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function oj(e) {
	var t = sj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function sj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function cj() {
	return cj = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, cj.apply(null, arguments);
}
function lj(e, t) {
	if (e == null) return {};
	var n, r, i = uj(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function uj(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function dj(e) {
	var t = e.option, n = e.dotProps, r = e.className;
	if (/*#__PURE__*/ (0, P.isValidElement)(t)) return /*#__PURE__*/ (0, P.cloneElement)(t, n);
	if (typeof t == "function") return t(n);
	var i = l(r, typeof t == "boolean" ? "" : t.className), a = n ?? {};
	a.points;
	var o = lj(a, nj);
	return /*#__PURE__*/ P.createElement(wk, cj({}, o, { className: i }));
}
function fj(e, t) {
	return e == null ? !1 : t ? !0 : e.length === 1;
}
function pj(e) {
	var t = e.points, n = e.dot, r = e.className, i = e.dotClassName, a = e.dataKey, o = e.baseProps, s = e.needClip, c = e.clipPathId, l = e.zIndex, u = l === void 0 ? J.scatter : l;
	if (!fj(t, n)) return null;
	var d = Jk(n), f = ve(n), p = t.map((e, r) => {
		var s = ij(ij(ij({ r: 3 }, o), f), {}, {
			index: r,
			cx: e.x ?? void 0,
			cy: e.y ?? void 0,
			dataKey: a,
			value: e.value,
			payload: e.payload,
			points: t
		});
		return /*#__PURE__*/ P.createElement(dj, {
			key: `dot-${r}`,
			option: n,
			dotProps: s,
			className: i
		});
	}), m = {};
	return s && c != null && (m.clipPath = `url(#clipPath-${d ? "" : "dots-"}${c})`), /*#__PURE__*/ P.createElement(xE, { zIndex: u }, /*#__PURE__*/ P.createElement(ke, cj({ className: r }, m), p));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/cartesianAxisSlice.js
function mj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function hj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? mj(Object(n), !0).forEach(function(t) {
			gj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : mj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function gj(e, t, n) {
	return (t = _j(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function _j(e) {
	var t = vj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function vj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var yj = Cs({
	name: "cartesianAxis",
	initialState: {
		xAxis: {},
		yAxis: {},
		zAxis: {}
	},
	reducers: {
		addXAxis: {
			reducer(e, t) {
				e.xAxis[t.payload.id] = H(t.payload);
			},
			prepare: U()
		},
		replaceXAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.xAxis[r.id] !== void 0 && (r.id !== i.id && delete e.xAxis[r.id], e.xAxis[i.id] = H(i));
			},
			prepare: U()
		},
		removeXAxis: {
			reducer(e, t) {
				delete e.xAxis[t.payload.id];
			},
			prepare: U()
		},
		addYAxis: {
			reducer(e, t) {
				e.yAxis[t.payload.id] = H(t.payload);
			},
			prepare: U()
		},
		replaceYAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.yAxis[r.id] !== void 0 && (r.id !== i.id && delete e.yAxis[r.id], e.yAxis[i.id] = H(i));
			},
			prepare: U()
		},
		removeYAxis: {
			reducer(e, t) {
				delete e.yAxis[t.payload.id];
			},
			prepare: U()
		},
		addZAxis: {
			reducer(e, t) {
				e.zAxis[t.payload.id] = H(t.payload);
			},
			prepare: U()
		},
		replaceZAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.zAxis[r.id] !== void 0 && (r.id !== i.id && delete e.zAxis[r.id], e.zAxis[i.id] = H(i));
			},
			prepare: U()
		},
		removeZAxis: {
			reducer(e, t) {
				delete e.zAxis[t.payload.id];
			},
			prepare: U()
		},
		updateYAxisWidth(e, t) {
			var n = t.payload, r = n.id, i = n.width, a = e.yAxis[r];
			if (a) {
				var o = a.widthHistory || [];
				if (o.length === 3 && o[0] === o[2] && i === o[1] && i !== a.width && Math.abs(i - (o[0] ?? 0)) <= 1) return;
				var s = [...o, i].slice(-3);
				e.yAxis[r] = hj(hj({}, a), {}, {
					width: i,
					widthHistory: s
				});
			}
		},
		updateXAxisHeight(e, t) {
			var n = t.payload, r = n.id, i = n.height, a = e.xAxis[r];
			if (a) {
				var o = a.heightHistory || [];
				if (o.length === 3 && o[0] === o[2] && i === o[1] && i !== a.height && Math.abs(i - (o[0] ?? 0)) <= 1) return;
				var s = [...o, i].slice(-3);
				e.xAxis[r] = hj(hj({}, a), {}, {
					height: i,
					heightHistory: s
				});
			}
		}
	}
}), bj = yj.actions, xj = bj.addXAxis, Sj = bj.replaceXAxis, Cj = bj.removeXAxis, wj = bj.addYAxis, Tj = bj.replaceYAxis, Ej = bj.removeYAxis;
bj.addZAxis, bj.replaceZAxis, bj.removeZAxis;
var Dj = bj.updateYAxisWidth, Oj = bj.updateXAxisHeight, kj = yj.reducer, Aj = V([
	V([ul], (e) => ({
		top: e.top,
		bottom: e.bottom,
		left: e.left,
		right: e.right
	})),
	Kc,
	qc
], (e, t, n) => {
	if (e && t != null && n != null) return {
		x: e.left,
		y: e.top,
		width: Math.max(0, t - e.left - e.right),
		height: Math.max(0, n - e.top - e.bottom)
	};
}), jj = () => B(Aj), Mj = () => B(wT);
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/ActivePoints.js
function Nj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Pj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Nj(Object(n), !0).forEach(function(t) {
			Fj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Nj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Fj(e, t, n) {
	return (t = Ij(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ij(e) {
	var t = Lj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Lj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Rj = (e) => {
	var t = e.point, n = e.childIndex, r = e.mainColor, i = e.activeDot, a = e.dataKey, o = e.clipPath;
	if (i === !1 || t.x == null || t.y == null) return null;
	var s = Pj(Pj(Pj({}, {
		index: n,
		dataKey: a,
		cx: t.x,
		cy: t.y,
		r: 4,
		fill: r ?? "none",
		strokeWidth: 2,
		stroke: "#fff",
		payload: t.payload,
		value: t.value
	}), ge(i)), $n(i)), c = /*#__PURE__*/ (0, P.isValidElement)(i) ? /*#__PURE__*/ (0, P.cloneElement)(i, s) : typeof i == "function" ? i(s) : /*#__PURE__*/ P.createElement(wk, s);
	return /*#__PURE__*/ P.createElement(ke, {
		className: "recharts-active-dot",
		clipPath: o
	}, c);
};
function zj(e) {
	var t = e.points, n = e.mainColor, r = e.activeDot, i = e.itemDataKey, a = e.clipPath, o = e.zIndex, s = o === void 0 ? J.activeDot : o, c = B(_T), l = Mj();
	if (t == null || l == null) return null;
	var u = t.find((e) => l.includes(e.payload));
	return L(u) ? null : /*#__PURE__*/ P.createElement(xE, { zIndex: s }, /*#__PURE__*/ P.createElement(Rj, {
		point: u,
		childIndex: Number(c),
		mainColor: n,
		dataKey: i,
		activeDot: r,
		clipPath: a
	}));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineBarSizeList.js
function Bj(e, t) {
	return Gj(e) || Wj(e, t) || Hj(e, t) || Vj();
}
function Vj() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Hj(e, t) {
	if (e) {
		if (typeof e == "string") return Uj(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Uj(e, t) : void 0;
	}
}
function Uj(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Wj(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Gj(e) {
	if (Array.isArray(e)) return e;
}
var Kj = (e, t, n) => {
	var r = n ?? e;
	if (!L(r)) return Ze(r, t, 0);
}, qj = (e, t, n) => {
	var r = {}, i = e.filter(Fh), a = e.filter((e) => e.stackId == null), o = i.reduce((e, t) => {
		var n = e[t.stackId];
		return n ??= [], n.push(t), e[t.stackId] = n, e;
	}, r), s = Object.entries(o).map((e) => {
		var r = Bj(e, 2), i = r[0], a = r[1];
		return {
			stackId: i,
			dataKeys: a.map((e) => e.dataKey),
			barSize: Kj(t, n, a[0]?.barSize)
		};
	}), c = a.map((e) => ({
		stackId: void 0,
		dataKeys: [e.dataKey].filter((e) => e != null),
		barSize: Kj(t, n, e.barSize)
	}));
	return [...s, ...c];
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/combiners/combineAllBarPositions.js
function Jj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Yj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Jj(Object(n), !0).forEach(function(t) {
			Xj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Jj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Xj(e, t, n) {
	return (t = Zj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Zj(e) {
	var t = Qj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Qj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function $j(e, t, n, r, i) {
	var a = r.length;
	if (!(a < 1)) {
		var o = Ze(e, n, 0, !0), s, c = [];
		if (W(r[0]?.barSize)) {
			var l = !1, u = n / a, d = r.reduce((e, t) => e + (t.barSize || 0), 0);
			d += (a - 1) * o, d >= n && (d -= (a - 1) * o, o = 0), d >= n && u > 0 && (l = !0, u *= .9, d = a * u);
			var f = {
				offset: Math.round((n - d) / 2) - o,
				size: 0
			};
			s = r.reduce((e, t) => {
				var n = {
					stackId: t.stackId,
					dataKeys: t.dataKeys,
					position: {
						offset: f.offset + f.size + o,
						size: l ? u : t.barSize ?? 0
					}
				}, r = [...e, n];
				return f = n.position, r;
			}, c);
		} else {
			var p = Ze(t, n, 0, !0);
			n - 2 * p - (a - 1) * o <= 0 && (o = 0);
			var m = (n - 2 * p - (a - 1) * o) / a;
			m > 1 && (m = Math.round(m));
			var h = W(i) ? Math.min(m, i) : m;
			s = r.reduce((e, t, n) => [...e, {
				stackId: t.stackId,
				dataKeys: t.dataKeys,
				position: {
					offset: p + a * (m - h) / 2 + (h + o) * n,
					size: h
				}
			}], c);
		}
		return s;
	}
}
var eM = (e, t, n, r, i, a, o) => {
	var s = L(o) ? t : o, c = $j(n, r, i === a ? a : i, e, s);
	return i !== a && c != null && (c = c.map((e) => Yj(Yj({}, e), {}, { position: Yj(Yj({}, e.position), {}, { offset: e.position.offset - i / 2 }) }))), c;
}, tM = (e, t) => {
	var n = Nh(t);
	if (e && n != null && t != null) {
		var r = t.stackId;
		if (r != null) {
			var i = e[r];
			if (i) {
				var a = i.stackedData;
				if (a) return a.find((e) => e.key === n);
			}
		}
	}
}, nM = (e, t) => {
	if (e != null && t != null) {
		var n = e.find((e) => e.stackId === t.stackId && t.dataKey != null && e.dataKeys.includes(t.dataKey));
		if (n != null) return n.position;
	}
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/zIndex/getZIndexFromUnknown.js
function rM(e, t) {
	return e && typeof e == "object" && "zIndex" in e && typeof e.zIndex == "number" && W(e.zIndex) ? e.zIndex : t;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/context/chartDataContext.js
var iM = (e) => {
	var t = e.chartData, n = z(), r = ml();
	return (0, P.useEffect)(() => r ? () => {} : (n(WE(t)), () => {
		n(WE(void 0));
	}), [
		t,
		n,
		r
	]), null;
}, aM = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	padding: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
}, oM = Cs({
	name: "brush",
	initialState: aM,
	reducers: { setBrushSettings(e, t) {
		return t.payload == null ? aM : t.payload;
	} }
});
oM.actions.setBrushSettings;
var sM = oM.reducer, cM = (e, t) => {
	var n = e.x, r = e.y, i = t.x, a = t.y;
	return {
		x: Math.min(n, i),
		y: Math.min(r, a),
		width: Math.abs(i - n),
		height: Math.abs(a - r)
	};
}, lM = (e) => {
	var t = e.x1, n = e.y1, r = e.x2, i = e.y2;
	return cM({
		x: t,
		y: n
	}, {
		x: r,
		y: i
	});
};
function uM(e) {
	return (e % 180 + 180) % 180;
}
var dM = function(e) {
	var t = e.width, n = e.height, r = uM(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0) * Math.PI / 180, i = Math.atan(n / t), a = r > i && r < Math.PI - i ? n / Math.sin(r) : t / Math.cos(r);
	return Math.abs(a);
}, fM = Cs({
	name: "referenceElements",
	initialState: {
		dots: [],
		areas: [],
		lines: []
	},
	reducers: {
		addDot: (e, t) => {
			e.dots.push(t.payload);
		},
		removeDot: (e, t) => {
			var n = Yo(e).dots.findIndex((e) => e === t.payload);
			n !== -1 && e.dots.splice(n, 1);
		},
		addArea: (e, t) => {
			e.areas.push(t.payload);
		},
		removeArea: (e, t) => {
			var n = Yo(e).areas.findIndex((e) => e === t.payload);
			n !== -1 && e.areas.splice(n, 1);
		},
		addLine: (e, t) => {
			e.lines.push(H(t.payload));
		},
		removeLine: (e, t) => {
			var n = Yo(e).lines.findIndex((e) => e === t.payload);
			n !== -1 && e.lines.splice(n, 1);
		}
	}
}), pM = fM.actions;
pM.addDot, pM.removeDot, pM.addArea, pM.removeArea;
var mM = pM.addLine, hM = pM.removeLine, gM = fM.reducer;
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/container/ClipPathProvider.js
function _M(e, t) {
	return SM(e) || xM(e, t) || yM(e, t) || vM();
}
function vM() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function yM(e, t) {
	if (e) {
		if (typeof e == "string") return bM(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? bM(e, t) : void 0;
	}
}
function bM(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function xM(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function SM(e) {
	if (Array.isArray(e)) return e;
}
var CM = /*#__PURE__*/ (0, P.createContext)(void 0), wM = (e) => {
	var t = e.children, n = _M((0, P.useState)(`${Xe("recharts")}-clip`), 1)[0], r = jj();
	if (r == null) return null;
	var i = r.x, a = r.y, o = r.width, s = r.height;
	return /*#__PURE__*/ P.createElement(CM.Provider, { value: n }, /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement("clipPath", { id: n }, /*#__PURE__*/ P.createElement("rect", {
		x: i,
		y: a,
		height: s,
		width: o
	}))), t);
}, TM = () => (0, P.useContext)(CM), EM = class {
	constructor(e) {
		var t = e.x, n = e.y;
		this.xAxisScale = t, this.yAxisScale = n;
	}
	map(e, t) {
		var n = t.position;
		return {
			x: this.xAxisScale.map(e.x, { position: n }) ?? 0,
			y: this.yAxisScale.map(e.y, { position: n }) ?? 0
		};
	}
	mapWithFallback(e, t) {
		var n = t.position, r = t.fallback, i = r === "rangeMin" ? this.yAxisScale.rangeMin() : r === "rangeMax" ? this.yAxisScale.rangeMax() : 0, a = r === "rangeMin" ? this.xAxisScale.rangeMin() : r === "rangeMax" ? this.xAxisScale.rangeMax() : 0;
		return {
			x: this.xAxisScale.map(e.x, { position: n }) ?? a,
			y: this.yAxisScale.map(e.y, { position: n }) ?? i
		};
	}
	isInRange(e) {
		var t = e.x, n = e.y, r = t == null || this.xAxisScale.isInRange(t), i = n == null || this.yAxisScale.isInRange(n);
		return r && i;
	}
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/ReferenceLine.js
function DM(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function OM(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? DM(Object(n), !0).forEach(function(t) {
			kM(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : DM(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function kM(e, t, n) {
	return (t = AM(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function AM(e) {
	var t = jM(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function jM(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function MM() {
	return MM = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, MM.apply(null, arguments);
}
var NM = (e, t) => {
	var n;
	if (/*#__PURE__*/ P.isValidElement(e)) n = /*#__PURE__*/ P.cloneElement(e, t);
	else if (typeof e == "function") n = e(t);
	else {
		if (!W(t.x1) || !W(t.y1) || !W(t.x2) || !W(t.y2)) return null;
		n = /*#__PURE__*/ P.createElement("line", MM({}, t, { className: "recharts-reference-line-line" }));
	}
	return n;
}, PM = (e, t, n, r, i, a) => {
	var o = a.x, s = a.width, c = i.map(e, { position: n });
	if (!W(c) || t === "discard" && !i.isInRange(c)) return null;
	var l = [{
		x: o + s,
		y: c
	}, {
		x: o,
		y: c
	}];
	return r === "left" ? l.reverse() : l;
}, FM = (e, t, n, r, i, a) => {
	var o = a.y, s = a.height, c = i.map(e, { position: n });
	if (!W(c) || t === "discard" && !i.isInRange(c)) return null;
	var l = [{
		x: c,
		y: o + s
	}, {
		x: c,
		y: o
	}];
	return r === "top" ? l.reverse() : l;
}, IM = (e, t, n, r) => {
	var i = [r.mapWithFallback(e[0], {
		position: n,
		fallback: "rangeMin"
	}), r.mapWithFallback(e[1], {
		position: n,
		fallback: "rangeMax"
	})];
	return t === "discard" && i.some((e) => !r.isInRange(e)) ? null : i;
}, LM = (e, t, n, r, i, a, o) => {
	var s = o.x, c = o.y, l = o.segment, u = o.ifOverflow, d = Je(s);
	return Je(c) ? PM(c, u, r, a, t, n) : d ? FM(s, u, r, i, e, n) : l != null && l.length === 2 ? IM(l, u, r, new EM({
		x: e,
		y: t
	})) : null;
};
function RM(e) {
	var t = z();
	return (0, P.useEffect)(() => (t(mM(e)), () => {
		t(hM(e));
	})), null;
}
function zM(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.shape, i = e.className, a = e.ifOverflow, o = ml(), s = TM(), c = B((e) => Gx(e, t)), u = B((e) => Jx(e, n)), d = B((e) => wC(e, "xAxis", t, o)), f = B((e) => wC(e, "yAxis", n, o)), p = Xl();
	if (!s || !p || c == null || u == null || d == null || f == null) return null;
	var m = LM(d, f, p, e.position, c.orientation, u.orientation, e);
	if (!m) return null;
	var h = m[0], g = m[1];
	if (h == null || g == null) return null;
	var _ = h.x, v = h.y, y = g.x, b = g.y, x = OM(OM({ clipPath: a === "hidden" ? `url(#${s})` : void 0 }, _e(e)), {}, {
		x1: _,
		y1: v,
		x2: y,
		y2: b
	}), S = lM({
		x1: _,
		y1: v,
		x2: y,
		y2: b
	});
	return /*#__PURE__*/ P.createElement(xE, { zIndex: e.zIndex }, /*#__PURE__*/ P.createElement(ke, { className: l("recharts-reference-line", i) }, NM(r, x), /*#__PURE__*/ P.createElement(KO, MM({}, S, {
		lowerWidth: S.width,
		upperWidth: S.width
	}), /*#__PURE__*/ P.createElement(sk, { label: e.label }), e.children)));
}
var BM = {
	ifOverflow: "discard",
	xAxisId: 0,
	yAxisId: 0,
	fill: "none",
	label: !1,
	stroke: "#ccc",
	fillOpacity: 1,
	strokeWidth: 1,
	position: "middle",
	zIndex: J.line
};
function VM(e) {
	var t = sr(e, BM);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(RM, {
		yAxisId: t.yAxisId,
		xAxisId: t.xAxisId,
		ifOverflow: t.ifOverflow,
		x: t.x,
		y: t.y,
		segment: t.segment
	}), /*#__PURE__*/ P.createElement(zM, t));
}
VM.displayName = "ReferenceLine";
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/function/noop.mjs
function HM() {}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function UM(e) {
	if (!e || typeof e != "object") return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null ? !1 : Object.prototype.toString.call(e) === "[object Object]";
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/_internal/baseIsEqualWith.mjs
function WM(e, t, n) {
	return GM(e, t, void 0, void 0, void 0, void 0, n);
}
function GM(e, t, n, r, i, a, o) {
	let s = o(e, t, n, r, i, a);
	if (s !== void 0) return s;
	if (typeof e == typeof t) switch (typeof e) {
		case "bigint":
		case "string":
		case "boolean":
		case "symbol":
		case "undefined": return e === t;
		case "number": return e === t || Object.is(e, t);
		case "function": return e === t;
		case "object": return KM(e, t, a, o);
	}
	return KM(e, t, a, o);
}
function KM(e, t, n, r) {
	if (Object.is(e, t)) return !0;
	let i = Dr(e), a = Dr(t);
	if (i === "[object Arguments]" && (i = Br), a === "[object Arguments]" && (a = Br), i !== a) return !1;
	switch (i) {
		case kr: return e.toString() === t.toString();
		case Ar: return ei(e.valueOf(), t.valueOf());
		case jr:
		case Pr:
		case Nr: return Object.is(e.valueOf(), t.valueOf());
		case Or: return e.source === t.source && e.flags === t.flags;
		case Rr: return e === t;
	}
	n ??= /* @__PURE__ */ new Map();
	let o = n.get(e), s = n.get(t);
	if (o != null && s != null) return o === t;
	n.set(e, t), n.set(t, e);
	try {
		switch (i) {
			case Fr:
				if (e.size !== t.size) return !1;
				for (let [i, a] of e.entries()) if (!t.has(i) || !GM(a, t.get(i), i, e, t, n, r)) return !1;
				return !0;
			case Ir: {
				if (e.size !== t.size) return !1;
				let i = Array.from(e.values()), a = Array.from(t.values());
				for (let o = 0; o < i.length; o++) {
					let s = i[o], c = a.findIndex((i) => GM(s, i, void 0, e, t, n, r));
					if (c === -1) return !1;
					a.splice(c, 1);
				}
				return !0;
			}
			case Lr:
			case Ur:
			case Wr:
			case Gr:
			case Kr:
			case qr:
			case Jr:
			case Yr:
			case Xr:
			case Zr:
			case Qr:
			case $r:
				if (di(e) !== di(t) || e.length !== t.length) return !1;
				for (let i = 0; i < e.length; i++) if (!GM(e[i], t[i], i, e, t, n, r)) return !1;
				return !0;
			case zr: return e.byteLength === t.byteLength && KM(new Uint8Array(e), new Uint8Array(t), n, r);
			case Hr: return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : KM(new Uint8Array(e), new Uint8Array(t), n, r);
			case Vr: return e.name === t.name && e.message === t.message;
			case Br: {
				if (!(KM(e.constructor, t.constructor, n, r) || UM(e) && UM(t))) return !1;
				let i = [...Object.keys(e), ...li(e)], a = [...Object.keys(t), ...li(t)];
				if (i.length !== a.length) return !1;
				for (let a = 0; a < i.length; a++) {
					let o = i[a], s = e[o];
					if (!Me(t, o)) return !1;
					let c = t[o];
					if (!GM(s, c, o, e, t, n, r)) return !1;
				}
				return !0;
			}
			default: return !1;
		}
	} finally {
		n.delete(e), n.delete(t);
	}
}
// node_modules/.pnpm/es-toolkit@1.53.0/node_modules/es-toolkit/dist/compat/predicate/isEqual.mjs
function qM(e, t) {
	return WM(e, t, HM);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/getEveryNth.js
function JM(e, t) {
	if (t < 1) return [];
	if (t === 1) return e;
	for (var n = [], r = 0; r < e.length; r += t) {
		var i = e[r];
		i !== void 0 && n.push(i);
	}
	return n;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/TickUtils.js
function YM(e, t, n) {
	return dM({
		width: e.width + t.width,
		height: e.height + t.height
	}, n);
}
function XM(e, t, n) {
	var r = n === "width", i = e.x, a = e.y, o = e.width, s = e.height;
	return t === 1 ? {
		start: r ? i : a,
		end: r ? i + o : a + s
	} : {
		start: r ? i + o : a + s,
		end: r ? i : a
	};
}
function ZM(e, t, n, r, i) {
	if (e * t < e * r || e * t > e * i) return !1;
	var a = n();
	return e * (t - e * a / 2 - r) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function QM(e, t) {
	return JM(e, t + 1);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/getEquidistantTicks.js
function $M(e, t, n, r, i) {
	for (var a = (r || []).slice(), o = t.start, s = t.end, c = 0, l = 1, u = o, d = function() {
		var t = r?.[c];
		if (t === void 0) return { v: JM(r, l) };
		var a = c, d, f = () => (d === void 0 && (d = n(t, a)), d), p = t.coordinate, m = c === 0 || ZM(e, p, f, u, s);
		m || (c = 0, u = o, l += 1), m && (u = p + e * (f() / 2 + i), c += l);
	}, f; l <= a.length;) if (f = d(), f) return f.v;
	return [];
}
function eN(e, t, n, r, i) {
	var a = (r || []).slice().length;
	if (a === 0) return [];
	for (var o = t.start, s = t.end, c = 1; c <= a; c++) {
		for (var l = (a - 1) % c, u = o, d = !0, f = function() {
			var t = r[m];
			if (t == null) return 0;
			var a = m, o, c = () => (o === void 0 && (o = n(t, a)), o), f = t.coordinate, p = m === l || ZM(e, f, c, u, s);
			if (!p) return d = !1, 1;
			p && (u = f + e * (c() / 2 + i));
		}, p, m = l; m < a && (p = f(), p === 0 || p !== 1); m += c);
		if (d) {
			for (var h = [], g = l; g < a; g += c) {
				var _ = r[g];
				_ != null && h.push(_);
			}
			return h;
		}
	}
	return [];
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/getTicks.js
function tN(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function nN(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? tN(Object(n), !0).forEach(function(t) {
			rN(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : tN(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function rN(e, t, n) {
	return (t = iN(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function iN(e) {
	var t = aN(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function aN(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function oN(e, t, n, r, i) {
	for (var a = (r || []).slice(), o = a.length, s = t.start, c = t.end, l = function(t) {
		var r = a[t];
		if (r == null) return 1;
		var l = r, u, d = () => (u === void 0 && (u = n(r, t)), u);
		if (t === o - 1) {
			var f = e * (l.coordinate + e * d() / 2 - c);
			a[t] = l = nN(nN({}, l), {}, { tickCoord: f > 0 ? l.coordinate - f * e : l.coordinate });
		} else a[t] = l = nN(nN({}, l), {}, { tickCoord: l.coordinate });
		l.tickCoord != null && ZM(e, l.tickCoord, d, s, c) && (c = l.tickCoord - e * (d() / 2 + i), a[t] = nN(nN({}, l), {}, { isShow: !0 }));
	}, u = o - 1; u >= 0; u--) if (l(u)) continue;
	return a;
}
function sN(e, t, n, r, i, a) {
	var o = (r || []).slice(), s = o.length, c = t.start, l = t.end;
	if (a) {
		var u = r[s - 1];
		if (u != null) {
			var d = n(u, s - 1), f = e * (u.coordinate + e * d / 2 - l);
			o[s - 1] = u = nN(nN({}, u), {}, { tickCoord: f > 0 ? u.coordinate - f * e : u.coordinate }), u.tickCoord != null && ZM(e, u.tickCoord, () => d, c, l) && (l = u.tickCoord - e * (d / 2 + i), o[s - 1] = nN(nN({}, u), {}, { isShow: !0 }));
		}
	}
	for (var p = a ? s - 1 : s, m = function(t) {
		var r = o[t];
		if (r == null) return 1;
		var a = r, s, u = () => (s === void 0 && (s = n(r, t)), s);
		if (t === 0) {
			var d = e * (a.coordinate - e * u() / 2 - c);
			o[t] = a = nN(nN({}, a), {}, { tickCoord: d < 0 ? a.coordinate - d * e : a.coordinate });
		} else o[t] = a = nN(nN({}, a), {}, { tickCoord: a.coordinate });
		a.tickCoord != null && ZM(e, a.tickCoord, u, c, l) && (c = a.tickCoord + e * (u() / 2 + i), o[t] = nN(nN({}, a), {}, { isShow: !0 }));
	}, h = 0; h < p; h++) if (m(h)) continue;
	return o;
}
function cN(e, t, n) {
	var r = e.tick, i = e.ticks, a = e.viewBox, o = e.minTickGap, s = e.orientation, c = e.interval, l = e.tickFormatter, u = e.unit, d = e.angle;
	if (!i || !i.length || !r) return [];
	if (F(c) || jd.isSsr) return QM(i, F(c) ? c : 0) ?? [];
	var f = [], p = s === "top" || s === "bottom" ? "width" : "height", m = u && p === "width" ? LD(u, {
		fontSize: t,
		letterSpacing: n
	}) : {
		width: 0,
		height: 0
	}, h = (e, r) => {
		var i = typeof l == "function" ? l(e.value, r) : e.value;
		return p === "width" ? YM(LD(i, {
			fontSize: t,
			letterSpacing: n
		}), m, d) : LD(i, {
			fontSize: t,
			letterSpacing: n
		})[p];
	}, g = i[0], _ = i[1], v = i.length >= 2 && g != null && _ != null ? Ge(_.coordinate - g.coordinate) : 1, y = XM(a, v, p);
	return c === "equidistantPreserveStart" ? $M(v, y, h, i, o) : c === "equidistantPreserveEnd" ? eN(v, y, h, i, o) : (f = c === "preserveStart" || c === "preserveStartEnd" ? sN(v, y, h, i, o, c === "preserveStartEnd") : oN(v, y, h, i, o), f.filter((e) => e.isShow));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/YAxisUtils.js
var lN = (e) => {
	var t = e.ticks, n = e.label, r = e.labelGapWithTick, i = r === void 0 ? 5 : r, a = e.tickSize, o = a === void 0 ? 0 : a, s = e.tickMargin, c = s === void 0 ? 0 : s, l = 0;
	if (t) {
		Array.from(t).forEach((e) => {
			if (e) {
				var t = e.getBoundingClientRect();
				t.width > l && (l = t.width);
			}
		});
		var u = n ? n.getBoundingClientRect().width : 0, d = o + c, f = l + d + u + (n ? i : 0);
		return Math.round(f);
	}
	return 0;
}, uN = (e) => {
	var t = e.ticks, n = e.label, r = e.labelGapWithTick, i = r === void 0 ? 5 : r, a = e.tickSize, o = a === void 0 ? 0 : a, s = e.tickMargin, c = s === void 0 ? 0 : s, l = 0;
	if (t) {
		Array.from(t).forEach((e) => {
			if (e) {
				var t = e.getBoundingClientRect();
				t.height > l && (l = t.height);
			}
		});
		var u = n ? n.getBoundingClientRect().height : 0, d = o + c, f = l + d + u + (n ? i : 0);
		return Math.round(f);
	}
	return 0;
}, dN = Cs({
	name: "renderedTicks",
	initialState: {
		xAxis: {},
		yAxis: {}
	},
	reducers: {
		setRenderedTicks: (e, t) => {
			var n = t.payload, r = n.axisType, i = n.axisId, a = n.ticks;
			e[r][i] = H(a);
		},
		removeRenderedTicks: (e, t) => {
			var n = t.payload, r = n.axisType, i = n.axisId;
			delete e[r][i];
		}
	}
}), fN = dN.actions, pN = fN.setRenderedTicks, mN = fN.removeRenderedTicks, hN = dN.reducer, gN = [
	"axisLine",
	"width",
	"height",
	"className",
	"hide",
	"ticks",
	"axisType",
	"axisId"
];
function _N(e, t) {
	return SN(e) || xN(e, t) || yN(e, t) || vN();
}
function vN() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function yN(e, t) {
	if (e) {
		if (typeof e == "string") return bN(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? bN(e, t) : void 0;
	}
}
function bN(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function xN(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function SN(e) {
	if (Array.isArray(e)) return e;
}
function CN(e, t) {
	if (e == null) return {};
	var n, r, i = wN(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function wN(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function TN() {
	return TN = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, TN.apply(null, arguments);
}
function EN(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Q(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? EN(Object(n), !0).forEach(function(t) {
			DN(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : EN(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function DN(e, t, n) {
	return (t = ON(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ON(e) {
	var t = kN(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function kN(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var AN = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	viewBox: {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	},
	orientation: "bottom",
	ticks: [],
	stroke: "#666",
	tickLine: !0,
	axisLine: !0,
	tick: !0,
	mirror: !1,
	minTickGap: 5,
	tickSize: 6,
	tickMargin: 2,
	interval: "preserveEnd",
	zIndex: J.axis
};
function jN(e) {
	var t = e.x, n = e.y, r = e.width, i = e.height, a = e.orientation, o = e.mirror, s = e.axisLine, c = e.otherSvgProps;
	if (!s) return null;
	var u = Q(Q(Q({}, c), he(s)), {}, { fill: "none" });
	if (a === "top" || a === "bottom") {
		var d = +(a === "top" && !o || a === "bottom" && o);
		u = Q(Q({}, u), {}, {
			x1: t,
			y1: n + d * i,
			x2: t + r,
			y2: n + d * i
		});
	} else {
		var f = +(a === "left" && !o || a === "right" && o);
		u = Q(Q({}, u), {}, {
			x1: t + f * r,
			y1: n,
			x2: t + f * r,
			y2: n + i
		});
	}
	return /*#__PURE__*/ P.createElement("line", TN({}, u, { className: l("recharts-cartesian-axis-line", Be(s, "className")) }));
}
function MN(e, t, n, r, i, a, o, s, c) {
	var l, u, d, f, p, m, h = s ? -1 : 1, g = e.tickSize || o, _ = F(e.tickCoord) ? e.tickCoord : e.coordinate;
	switch (a) {
		case "top":
			l = u = e.coordinate, f = n + +!s * i, d = f - h * g, m = d - h * c, p = _;
			break;
		case "left":
			d = f = e.coordinate, u = t + +!s * r, l = u - h * g, p = l - h * c, m = _;
			break;
		case "right":
			d = f = e.coordinate, u = t + +s * r, l = u + h * g, p = l + h * c, m = _;
			break;
		default: l = u = e.coordinate, f = n + +s * i, d = f + h * g, m = d + h * c, p = _;
	}
	return {
		line: {
			x1: l,
			y1: d,
			x2: u,
			y2: f
		},
		tick: {
			x: p,
			y: m
		}
	};
}
function NN(e, t) {
	switch (e) {
		case "left": return t ? "start" : "end";
		case "right": return t ? "end" : "start";
		default: return "middle";
	}
}
function PN(e, t) {
	switch (e) {
		case "left":
		case "right": return "middle";
		case "top": return t ? "start" : "end";
		default: return t ? "end" : "start";
	}
}
function FN(e) {
	var t = e.option, n = e.tickProps, r = e.value, i, a = l(n.className, "recharts-cartesian-axis-tick-value");
	if (/*#__PURE__*/ P.isValidElement(t)) i = /*#__PURE__*/ P.cloneElement(t, Q(Q({}, n), {}, { className: a }));
	else if (typeof t == "function") i = t(Q(Q({}, n), {}, { className: a }));
	else {
		var o = "recharts-cartesian-axis-tick-value";
		typeof t != "boolean" && (o = l(o, Bk(t))), i = /*#__PURE__*/ P.createElement(PO, TN({}, n, { className: o }), r);
	}
	return i;
}
function IN(e) {
	var t = e.ticks, n = e.axisType, r = e.axisId, i = z(), a = (0, P.useRef)(null);
	return (0, P.useEffect)(() => {
		if (r != null && n != null) {
			var e = t.map((e) => ({
				value: e.value,
				coordinate: e.coordinate,
				offset: e.offset,
				index: e.index
			})), o = a.current;
			o != null && o.axisId === r && o.axisType === n && qM(o.ticks, e) || (a.current = {
				ticks: e,
				axisId: r,
				axisType: n
			}, i(pN({
				ticks: e,
				axisId: r,
				axisType: n
			})));
		}
	}, [
		i,
		t,
		r,
		n
	]), (0, P.useEffect)(() => r == null || n == null ? nt : () => {
		i(mN({
			axisId: r,
			axisType: n
		}));
	}, [
		i,
		r,
		n
	]), null;
}
var LN = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.ticks, r = n === void 0 ? [] : n, i = e.tick, a = e.tickLine, o = e.stroke, s = e.tickFormatter, c = e.unit, u = e.padding, d = e.tickTextProps, f = e.orientation, p = e.mirror, m = e.x, h = e.y, g = e.width, _ = e.height, v = e.tickSize, y = e.tickMargin, b = e.fontSize, x = e.letterSpacing, S = e.getTicksConfig, C = e.events, w = e.axisType, T = e.axisId, E = cN(Q(Q({}, S), {}, { ticks: r }), b, x), D = he(S), O = ge(i), k = CO(D.textAnchor) ? D.textAnchor : NN(f, p), A = PN(f, p), j = {};
	typeof a == "object" && (j = a);
	var M = Q(Q({}, D), {}, { fill: "none" }, j), N = E.map((e) => Q({ entry: e }, MN(e, m, h, g, _, f, v, p, y))), ee = N.map((e) => {
		var t = e.entry, n = e.line;
		return /*#__PURE__*/ P.createElement(ke, {
			className: "recharts-cartesian-axis-tick",
			key: `tick-${t.value}-${t.coordinate}-${t.tickCoord}`
		}, a && /*#__PURE__*/ P.createElement("line", TN({}, M, n, { className: l("recharts-cartesian-axis-tick-line", Be(a, "className")) })));
	}), te = N.map((e, t) => {
		var n = e.entry, r = e.tick, a = Q(Q({}, Q(Q(Q(Q({ verticalAnchor: A }, D), {}, {
			textAnchor: k,
			stroke: "none",
			fill: o
		}, r), {}, {
			index: t,
			payload: n,
			visibleTicksCount: E.length,
			tickFormatter: s,
			padding: u
		}, d), {}, { angle: d?.angle ?? D.angle ?? 0 })), O);
		return /*#__PURE__*/ P.createElement(ke, TN({
			className: "recharts-cartesian-axis-tick-label",
			key: `tick-label-${n.value}-${n.coordinate}-${n.tickCoord}`
		}, tr(C, n, t)), i && /*#__PURE__*/ P.createElement(FN, {
			option: i,
			tickProps: a,
			value: `${typeof s == "function" ? s(n.value, t) : n.value}${c || ""}`
		}));
	});
	return /*#__PURE__*/ P.createElement("g", { className: `recharts-cartesian-axis-ticks recharts-${w}-ticks` }, /*#__PURE__*/ P.createElement(IN, {
		ticks: E,
		axisId: T,
		axisType: w
	}), te.length > 0 && /*#__PURE__*/ P.createElement(xE, { zIndex: J.label }, /*#__PURE__*/ P.createElement("g", {
		className: `recharts-cartesian-axis-tick-labels recharts-${w}-tick-labels`,
		ref: t
	}, te)), ee.length > 0 && /*#__PURE__*/ P.createElement("g", { className: `recharts-cartesian-axis-tick-lines recharts-${w}-tick-lines` }, ee));
}), RN = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.axisLine, r = e.width, i = e.height, a = e.className, o = e.hide, s = e.ticks, c = e.axisType, u = e.axisId, d = CN(e, gN), f = _N((0, P.useState)(""), 2), p = f[0], m = f[1], h = _N((0, P.useState)(""), 2), g = h[0], _ = h[1], v = (0, P.useRef)(null);
	(0, P.useImperativeHandle)(t, () => ({
		getCalculatedWidth: () => lN({
			ticks: v.current,
			label: e.labelRef?.current,
			labelGapWithTick: 5,
			tickSize: e.tickSize,
			tickMargin: e.tickMargin
		}),
		getCalculatedHeight: () => uN({
			ticks: v.current,
			label: e.labelRef?.current,
			labelGapWithTick: 5,
			tickSize: e.tickSize,
			tickMargin: e.tickMargin
		})
	}));
	var y = (0, P.useCallback)((e) => {
		if (e) {
			var t = e.getElementsByClassName("recharts-cartesian-axis-tick-value");
			v.current = t;
			var n = t[0];
			if (n) {
				var r = window.getComputedStyle(n), i = r.fontSize, a = r.letterSpacing;
				(i !== p || a !== g) && (m(i), _(a));
			}
		}
	}, [p, g]);
	return o || r != null && r <= 0 || i != null && i <= 0 ? null : /*#__PURE__*/ P.createElement(xE, { zIndex: e.zIndex }, /*#__PURE__*/ P.createElement(ke, { className: l("recharts-cartesian-axis", a) }, /*#__PURE__*/ P.createElement(jN, {
		x: e.x,
		y: e.y,
		width: r,
		height: i,
		orientation: e.orientation,
		mirror: e.mirror,
		axisLine: n,
		otherSvgProps: he(e)
	}), /*#__PURE__*/ P.createElement(LN, {
		ref: y,
		axisType: c,
		events: d,
		fontSize: p,
		getTicksConfig: e,
		height: e.height,
		letterSpacing: g,
		mirror: e.mirror,
		orientation: e.orientation,
		padding: e.padding,
		stroke: e.stroke,
		tick: e.tick,
		tickFormatter: e.tickFormatter,
		tickLine: e.tickLine,
		tickMargin: e.tickMargin,
		tickSize: e.tickSize,
		tickTextProps: e.tickTextProps,
		ticks: s,
		unit: e.unit,
		width: e.width,
		x: e.x,
		y: e.y,
		axisId: u
	}), /*#__PURE__*/ P.createElement(KO, {
		x: e.x,
		y: e.y,
		width: e.width,
		height: e.height,
		lowerWidth: e.width,
		upperWidth: e.width
	}, /*#__PURE__*/ P.createElement(sk, {
		label: e.label,
		labelRef: e.labelRef
	}), e.children)));
}), zN = /*#__PURE__*/ P.forwardRef((e, t) => {
	var n = sr(e, AN);
	return /*#__PURE__*/ P.createElement(RN, TN({}, n, { ref: t }));
});
zN.displayName = "CartesianAxis";
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/theme/RechartsThemeContext.js
var BN = /*#__PURE__*/ (0, P.createContext)({ grid: {
	stroke: "#ccc",
	fill: "none"
} });
BN.Provider;
var VN = () => (0, P.useContext)(BN), HN = [
	"x1",
	"y1",
	"x2",
	"y2",
	"key"
], UN = ["offset"], WN = ["xAxisId", "yAxisId"], GN = ["xAxisId", "yAxisId"];
function KN(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function qN(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? KN(Object(n), !0).forEach(function(t) {
			JN(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : KN(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function JN(e, t, n) {
	return (t = YN(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function YN(e) {
	var t = XN(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function XN(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ZN() {
	return ZN = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ZN.apply(null, arguments);
}
function QN(e, t) {
	if (e == null) return {};
	var n, r, i = $N(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function $N(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var eP = (e) => {
	var t = e.fill;
	if (!t || t === "none") return null;
	var n = e.fillOpacity, r = e.x, i = e.y, a = e.width, o = e.height, s = e.ry;
	return /*#__PURE__*/ P.createElement("rect", {
		x: r,
		y: i,
		ry: s,
		width: a,
		height: o,
		stroke: "none",
		fill: t,
		fillOpacity: n,
		className: "recharts-cartesian-grid-bg"
	});
};
function tP(e) {
	var t = e.option, n = e.lineItemProps, r;
	if (/*#__PURE__*/ P.isValidElement(t)) r = /*#__PURE__*/ P.cloneElement(t, n);
	else if (typeof t == "function") r = t(n);
	else {
		var i = n.x1, a = n.y1, o = n.x2, s = n.y2, c = n.key, l = he(QN(n, HN)) ?? {};
		l.offset;
		var u = QN(l, UN), d = Array.isArray(u.strokeDasharray) ? u.strokeDasharray.join(",") : u.strokeDasharray;
		r = /*#__PURE__*/ P.createElement("line", ZN({}, u, {
			strokeDasharray: d,
			x1: i,
			y1: a,
			x2: o,
			y2: s,
			fill: "none",
			key: c
		}));
	}
	return r;
}
function nP(e) {
	var t = e.x, n = e.width, r = e.horizontal, i = r === void 0 || r, a = e.horizontalPoints;
	if (!i || !a || !a.length) return null;
	e.xAxisId, e.yAxisId;
	var o = QN(e, WN), s = a.map((e, r) => {
		var a = qN(qN({}, o), {}, {
			x1: t,
			y1: e,
			x2: t + n,
			y2: e,
			key: `line-${r}`,
			index: r
		});
		return /*#__PURE__*/ P.createElement(tP, {
			key: `line-${r}`,
			option: i,
			lineItemProps: a
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, s);
}
function rP(e) {
	var t = e.y, n = e.height, r = e.vertical, i = r === void 0 || r, a = e.verticalPoints;
	if (!i || !a || !a.length) return null;
	e.xAxisId, e.yAxisId;
	var o = QN(e, GN), s = a.map((e, r) => {
		var a = qN(qN({}, o), {}, {
			x1: e,
			y1: t,
			x2: e,
			y2: t + n,
			key: `line-${r}`,
			index: r
		});
		return /*#__PURE__*/ P.createElement(tP, {
			option: i,
			lineItemProps: a,
			key: `line-${r}`
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-grid-vertical" }, s);
}
function iP(e) {
	var t = e.horizontalFill, n = e.fillOpacity, r = e.x, i = e.y, a = e.width, o = e.height, s = e.horizontalPoints, c = e.horizontal;
	if (!(c === void 0 || c) || !t || !t.length || s == null) return null;
	var l = s.map((e) => Math.round(e + i - i)).sort((e, t) => e - t);
	i !== l[0] && l.unshift(0);
	var u = l.map((e, s) => {
		var c = l[s + 1], u = c == null ? i + o - e : c - e;
		if (u <= 0) return null;
		var d = s % t.length;
		return /*#__PURE__*/ P.createElement("rect", {
			key: `react-${s}`,
			y: e,
			x: r,
			height: u,
			width: a,
			stroke: "none",
			fill: t[d],
			fillOpacity: n,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, u);
}
function aP(e) {
	var t = e.vertical, n = t === void 0 || t, r = e.verticalFill, i = e.fillOpacity, a = e.x, o = e.y, s = e.width, c = e.height, l = e.verticalPoints;
	if (!n || !r || !r.length) return null;
	var u = l.map((e) => Math.round(e + a - a)).sort((e, t) => e - t);
	a !== u[0] && u.unshift(0);
	var d = u.map((e, t) => {
		var n = u[t + 1], l = n == null ? a + s - e : n - e;
		if (l <= 0) return null;
		var d = t % r.length;
		return /*#__PURE__*/ P.createElement("rect", {
			key: `react-${t}`,
			x: e,
			y: o,
			width: l,
			height: c,
			stroke: "none",
			fill: r[d],
			fillOpacity: i,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, d);
}
var oP = (e, t) => {
	var n = e.xAxis, r = e.width, i = e.height, a = e.offset;
	return Dc(cN(qN(qN(qN({}, AN), n), {}, {
		ticks: Oc(n, !0),
		viewBox: {
			x: 0,
			y: 0,
			width: r,
			height: i
		}
	})), a.left, a.left + a.width, t);
}, sP = (e, t) => {
	var n = e.yAxis, r = e.width, i = e.height, a = e.offset;
	return Dc(cN(qN(qN(qN({}, AN), n), {}, {
		ticks: Oc(n, !0),
		viewBox: {
			x: 0,
			y: 0,
			width: r,
			height: i
		}
	})), a.top, a.top + a.height, t);
}, cP = {
	horizontal: !0,
	vertical: !0,
	horizontalPoints: [],
	verticalPoints: [],
	verticalFill: [],
	horizontalFill: [],
	xAxisId: 0,
	yAxisId: 0,
	syncWithTicks: !1,
	zIndex: J.grid
};
function lP(e) {
	var t = $l(), n = eu(), r = Ql(), i = qN(qN({}, sr(e, cP)), {}, {
		x: F(e.x) ? e.x : r.left,
		y: F(e.y) ? e.y : r.top,
		width: F(e.width) ? e.width : r.width,
		height: F(e.height) ? e.height : r.height
	}), a = i.xAxisId, o = i.yAxisId, s = i.x, c = i.y, l = i.width, u = i.height, d = i.syncWithTicks, f = i.horizontalValues, p = i.verticalValues, m = ml(), h = B((e) => UC(e, "xAxis", a, m)), g = B((e) => UC(e, "yAxis", o, m)), _ = VN(), v = {
		stroke: i.stroke ?? _.grid.stroke,
		strokeWidth: i.strokeWidth ?? _.grid.strokeWidth,
		strokeOpacity: i.strokeOpacity ?? _.grid.strokeOpacity,
		strokeDasharray: i.strokeDasharray ?? _.grid.strokeDasharray
	};
	if (!yc(l) || !yc(u) || !F(s) || !F(c)) return null;
	var y = i.verticalCoordinatesGenerator || oP, b = i.horizontalCoordinatesGenerator || sP, x = i.horizontalPoints, S = i.verticalPoints;
	if ((!x || !x.length) && typeof b == "function") {
		var C = f && f.length, w = b({
			yAxis: g ? qN(qN({}, g), {}, { ticks: C ? f : g.ticks }) : void 0,
			width: t ?? l,
			height: n ?? u,
			offset: r
		}, C ? !0 : d);
		bl(Array.isArray(w), `horizontalCoordinatesGenerator should return Array but instead it returned [${typeof w}]`), Array.isArray(w) && (x = w);
	}
	if ((!S || !S.length) && typeof y == "function") {
		var T = p && p.length, E = y({
			xAxis: h ? qN(qN({}, h), {}, { ticks: T ? p : h.ticks }) : void 0,
			width: t ?? l,
			height: n ?? u,
			offset: r
		}, T ? !0 : d);
		bl(Array.isArray(E), `verticalCoordinatesGenerator should return Array but instead it returned [${typeof E}]`), Array.isArray(E) && (S = E);
	}
	return /*#__PURE__*/ P.createElement(xE, { zIndex: i.zIndex }, /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-grid" }, /*#__PURE__*/ P.createElement(eP, {
		fill: i.fill ?? _.grid.fill,
		fillOpacity: i.fillOpacity ?? _.grid.fillOpacity,
		x: i.x,
		y: i.y,
		width: i.width,
		height: i.height,
		ry: i.ry
	}), /*#__PURE__*/ P.createElement(iP, ZN({}, i, { horizontalPoints: x })), /*#__PURE__*/ P.createElement(aP, ZN({}, i, { verticalPoints: S })), /*#__PURE__*/ P.createElement(nP, ZN({}, i, v, {
		offset: r,
		horizontalPoints: x,
		xAxis: h,
		yAxis: g
	})), /*#__PURE__*/ P.createElement(rP, ZN({}, i, v, {
		offset: r,
		verticalPoints: S,
		xAxis: h,
		yAxis: g
	}))));
}
lP.displayName = "CartesianGrid";
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/LineDrawShape.js
var uP = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"visibleLength",
	"strokeDasharray",
	"connectNulls"
];
function dP() {
	return dP = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, dP.apply(null, arguments);
}
function fP(e, t) {
	if (e == null) return {};
	var n, r, i = pP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function pP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function mP(e) {
	try {
		return e && e.getTotalLength && e.getTotalLength() || 0;
	} catch {
		return 0;
	}
}
function hP(e, t) {
	return `${t}px ${e}px`;
}
function gP(e) {
	return e.length % 2 == 0 ? e : [...e, ...e];
}
function _P(e, t) {
	for (var n = [], r = 0; r < t; ++r) n.push(...e);
	return n;
}
function vP(e, t, n) {
	var r = gP(n), i = r.reduce((e, t) => e + t, 0);
	if (!i) return hP(t, e);
	for (var a = Math.floor(e / i), o = e % i, s = [], c = 0, l = 0; c < r.length; l += (u = r[c]) ?? 0, ++c) {
		var u, d = r[c];
		if (d != null && l + d > o) {
			s = [...r.slice(0, c), o - l];
			break;
		}
	}
	var f = s.length % 2 == 0 ? [0, t] : [t];
	return [
		..._P(r, a),
		...s,
		...f
	].map((e) => `${e}px`).join(", ");
}
function yP(e, t, n) {
	return e ? vP(n, t, `${e}`.split(/[,\s]+/gim).map((e) => parseFloat(e))) : hP(t, n);
}
function bP(e) {
	e.animationElapsedTime, e.isAnimating, e.isEntrance;
	var t = e.visibleLength, n = e.strokeDasharray, r = e.connectNulls, i = fP(e, uP), a = r ?? !1, o;
	if (t != null) {
		var s = i.pathRef;
		o = yP(n, mP(s?.current ?? null), t);
	} else n != null && (o = String(n));
	return /*#__PURE__*/ P.createElement(hf, dP({}, i, {
		connectNulls: a,
		strokeDasharray: o
	}));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/useAnimatedLineLength.js
function xP(e) {
	var t = (0, P.useRef)(0), n = (0, P.useRef)(0), r = (0, P.useRef)(!1), i = (0, P.useRef)(e);
	return i.current !== e && (t.current = n.current, i.current = e), (0, P.useCallback)((e, i) => {
		if (r.current) return null;
		var a = Math.min(Ue(t.current + e * i), i);
		return e > 0 && i > 0 && (n.current = Math.max(n.current, a), a >= i) ? (r.current = !0, null) : a;
	}, []);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/errorBarSlice.js
var SP = Cs({
	name: "errorBars",
	initialState: {},
	reducers: {
		addErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.errorBar;
			e[r] || (e[r] = []), e[r].push(i);
		},
		replaceErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.prev, a = n.next;
			e[r] && (e[r] = e[r].map((e) => e.dataKey === i.dataKey && e.direction === i.direction ? a : e));
		},
		removeErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.errorBar;
			e[r] && (e[r] = e[r].filter((e) => e.dataKey !== i.dataKey || e.direction !== i.direction));
		}
	}
}), CP = SP.actions;
CP.addErrorBar, CP.replaceErrorBar, CP.removeErrorBar;
var wP = SP.reducer, TP = ["children"];
function EP(e, t) {
	if (e == null) return {};
	var n, r, i = DP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function DP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var OP = /*#__PURE__*/ (0, P.createContext)({
	data: [],
	xAxisId: "xAxis-0",
	yAxisId: "yAxis-0",
	dataPointFormatter: () => ({
		x: 0,
		y: 0,
		value: 0
	}),
	errorBarOffset: 0
});
function kP(e) {
	var t = e.children, n = EP(e, TP);
	return /*#__PURE__*/ P.createElement(OP.Provider, { value: n }, t);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/GraphicalItemClipPath.js
function AP(e, t) {
	var n = B((t) => Gx(t, e)), r = B((e) => Jx(e, t)), i = n?.allowDataOverflow ?? Ux.allowDataOverflow, a = r?.allowDataOverflow ?? Kx.allowDataOverflow;
	return {
		needClip: i || a,
		needClipX: i,
		needClipY: a
	};
}
function jP(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.clipPathId, i = jj(), a = AP(t, n), o = a.needClipX, s = a.needClipY, c = a.needClip, l = B((e) => _C(e, t, !1)), u = B((e) => vC(e, n, !1));
	if (!c || !i) return null;
	var d = i.x, f = i.y, p = i.width, m = i.height, h = o && l ? Math.min(l[0], l[1]) : d - p / 2, g = s && u ? Math.min(u[0], u[1]) : f - m / 2, _ = o && l ? Math.abs(l[1] - l[0]) : p * 2, v = s && u ? Math.abs(u[1] - u[0]) : m * 2;
	return /*#__PURE__*/ P.createElement("clipPath", { id: `clipPath-${r}` }, /*#__PURE__*/ P.createElement("rect", {
		x: h,
		y: g,
		width: _,
		height: v
	}));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/lineSelectors.js
var MP = (e, t, n, r) => JC(e, "xAxis", t, r), NP = (e, t, n, r) => qC(e, "xAxis", t, r), PP = (e, t, n, r) => JC(e, "yAxis", n, r), FP = (e, t, n, r) => qC(e, "yAxis", n, r), IP = V([
	K,
	MP,
	PP,
	NP,
	FP
], (e, t, n, r, i) => Ec(e, "xAxis") ? Vc(t, r, !1) : Vc(n, i, !1)), LP = (e, t, n, r, i) => i;
function RP(e) {
	return e.type === "line";
}
var zP = V([
	K,
	MP,
	PP,
	NP,
	FP,
	V([tS, LP], (e, t) => e.filter(RP).find((e) => e.id === t)),
	IP,
	Cm
], (e, t, n, r, i, a, o, s) => {
	var c = s.chartData, l = s.dataStartIndex, u = s.dataEndIndex;
	if (!(a == null || t == null || n == null || r == null || i == null || r.length === 0 || i.length === 0 || o == null || e !== "horizontal" && e !== "vertical")) {
		var d = a.dataKey, f = a.data, p = f != null && f.length > 0 ? f : c?.slice(l, u + 1);
		if (p != null) return dF({
			layout: e,
			xAxis: t,
			yAxis: n,
			xAxisTicks: r,
			yAxisTicks: i,
			dataKey: d,
			bandSize: o,
			displayedData: p
		});
	}
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/getRadiusAndStrokeWidthFromDot.js
function BP(e) {
	var t = ge(e), n = 3, r = 2;
	if (t != null) {
		var i = t.r, a = t.strokeWidth, o = Number(i), s = Number(a);
		return (Number.isNaN(o) || o < 0) && (o = n), (Number.isNaN(s) || s < 0) && (s = r), {
			r: o,
			strokeWidth: s
		};
	}
	return {
		r: n,
		strokeWidth: r
	};
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/Line.js
var VP = ["id"], HP = [
	"type",
	"layout",
	"connectNulls",
	"needClip",
	"shape",
	"strokeDasharray"
], UP = [
	"activeDot",
	"animateNewValues",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"hide",
	"isAnimationActive",
	"label",
	"legendType",
	"xAxisId",
	"yAxisId",
	"id"
];
function WP() {
	return WP = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, WP.apply(null, arguments);
}
function GP(e, t) {
	if (e == null) return {};
	var n, r, i = KP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function KP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function qP(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function JP(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? qP(Object(n), !0).forEach(function(t) {
			YP(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : qP(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function YP(e, t, n) {
	return (t = XP(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function XP(e) {
	var t = ZP(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ZP(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function QP(e) {
	try {
		return e && e.getTotalLength && e.getTotalLength() || 0;
	} catch {
		return 0;
	}
}
function $P(e) {
	var t = 0, n = 0;
	for (var r of e) r.status === "matched" && r.prev.x != null && r.next.x != null && (t += r.next.x - r.prev.x, n++);
	return n > 0 ? t / n : 0;
}
var eF = {
	activeDot: !0,
	animateNewValues: !0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationInterpolateFn: (e, t) => {
		if (e == null) return [];
		if (t === 1) return e.flatMap((e) => e.status === "removed" ? [] : [e.next]);
		var n = $P(e), r = [];
		for (var i of e) if (i.status === "matched") r.push(JP(JP({}, i.next), {}, {
			x: I(i.prev.x, i.next.x, t),
			y: I(i.prev.y, i.next.y, t)
		}));
		else if (i.status === "added") {
			if (i.next.x != null) {
				var a = i.next.x - n;
				r.push(JP(JP({}, i.next), {}, {
					x: I(a, i.next.x, t),
					y: i.next.y
				}));
			} else r.push(i.next);
		} else if (i.status === "removed" && i.prev.x != null) {
			var o = i.prev.x + n;
			r.push(JP(JP({}, i.prev), {}, {
				x: I(i.prev.x, o, t),
				y: i.prev.y
			}));
		}
		return r;
	},
	animationMatchBy: vA,
	connectNulls: !1,
	dot: !0,
	fill: "#fff",
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "line",
	shape: bP,
	stroke: "#3182bd",
	strokeWidth: 1,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: J.line,
	type: "linear"
}, tF = (e) => {
	var t = e.dataKey, n = e.name, r = e.stroke, i = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: i,
		color: r,
		value: Uc(n, t),
		payload: e
	}];
}, nF = /*#__PURE__*/ P.memo((e) => {
	var t = e.dataKey, n = e.data, r = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, s = e.hide, c = e.unit, l = e.formatter, u = e.tooltipType, d = e.id, f = {
		dataDefinedOnItem: n,
		getPosition: nt,
		settings: {
			stroke: r,
			strokeWidth: i,
			fill: a,
			dataKey: t,
			nameKey: void 0,
			name: Uc(o, t),
			hide: s,
			type: u,
			color: r,
			unit: c,
			formatter: l,
			graphicalItemId: d
		}
	};
	return /*#__PURE__*/ P.createElement(lA, { tooltipEntrySettings: f });
});
function rF(e) {
	var t = e.clipPathId, n = e.points, r = e.props, i = r.dot, a = r.dataKey, o = r.needClip;
	r.id;
	var s = he(GP(r, VP));
	return /*#__PURE__*/ P.createElement(pj, {
		points: n,
		dot: i,
		className: "recharts-line-dots",
		dotClassName: "recharts-line-dot",
		dataKey: a,
		baseProps: s,
		needClip: o,
		clipPathId: t
	});
}
function iF(e) {
	var t = e.showLabels, n = e.children, r = e.points, i = (0, P.useMemo)(() => r?.map((e) => {
		var t = {
			x: e.x ?? 0,
			y: e.y ?? 0,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return JP(JP({}, t), {}, {
			value: e.value,
			payload: e.payload,
			viewBox: t,
			parentViewBox: void 0,
			fill: void 0
		});
	}), [r]);
	return /*#__PURE__*/ P.createElement(gk, { value: t ? i : void 0 }, n);
}
function aF(e) {
	var t = e.clipPathId, n = e.pathRef, r = e.points, i = e.props, a = e.animationElapsedTime, o = e.isAnimating, s = e.isEntrance, c = e.visibleLength, l = i.type, u = i.layout, d = i.connectNulls, f = i.needClip, p = i.shape, m = i.strokeDasharray, h = JP(JP({}, _e(GP(i, HP))), {}, {
		fill: "none",
		className: "recharts-line-curve",
		clipPath: f ? `url(#clipPath-${t})` : void 0,
		points: r,
		type: l,
		layout: u,
		connectNulls: d,
		strokeDasharray: m ?? i.strokeDasharray,
		pathRef: n,
		animationElapsedTime: a,
		isAnimating: o,
		isEntrance: i.animateNewValues ? s : !1,
		visibleLength: c
	});
	return /*#__PURE__*/ P.createElement(P.Fragment, null, r?.length > 1 && /*#__PURE__*/ P.createElement(aA, {
		option: p,
		DefaultShape: eF.shape,
		shapeProps: h
	}), /*#__PURE__*/ P.createElement(rF, {
		points: r,
		clipPathId: t,
		props: i
	}));
}
function oF(e) {
	var t = e.clipPathId, n = e.props, r = e.pathRef, i = e.previousPointsRef, a = n.points, o = n.isAnimationActive, s = n.animationBegin, c = n.animationDuration, l = n.animationEasing, u = n.animationMatchBy, d = n.animationInterpolateFn, f = n.layout, p = QP(r.current), m = NA(n.onAnimationStart, n.onAnimationEnd), h = m.isAnimating, g = m.handleAnimationStart, _ = m.handleAnimationEnd, v = !h, y = xP(a), b = (0, P.useCallback)((e) => e > 0 && p > 0, [p]);
	return /*#__PURE__*/ P.createElement(iF, {
		points: a,
		showLabels: v
	}, n.children, /*#__PURE__*/ P.createElement(PA, {
		animationInput: a,
		animationIdPrefix: "recharts-line-",
		items: a,
		previousItemsRef: i,
		isAnimationActive: o,
		animationBegin: s,
		animationDuration: c,
		animationEasing: l,
		onAnimationStart: g,
		onAnimationEnd: _,
		animationInterpolateFn: d,
		animationMatchBy: u,
		shouldUpdatePreviousRef: b,
		layout: f
	}, (e, i, a) => {
		var o = h || i < 1, s = o ? y(i, p) : null;
		return /*#__PURE__*/ P.createElement(aF, {
			props: n,
			points: e,
			clipPathId: t,
			pathRef: r,
			animationElapsedTime: i,
			isAnimating: o,
			isEntrance: a,
			visibleLength: s
		});
	}), /*#__PURE__*/ P.createElement(Sk, { label: n.label }));
}
function sF(e) {
	var t = e.clipPathId, n = e.props, r = (0, P.useRef)(null), i = (0, P.useRef)(null);
	return /*#__PURE__*/ P.createElement(oF, {
		props: n,
		clipPathId: t,
		previousPointsRef: r,
		pathRef: i
	});
}
var cF = (e, t) => ({
	x: e.x ?? void 0,
	y: e.y ?? void 0,
	value: e.value,
	errorVal: G(e.payload, t)
}), lF = class extends P.Component {
	render() {
		var e = this.props, t = e.hide, n = e.dot, r = e.points, i = e.className, a = e.xAxisId, o = e.yAxisId, s = e.top, c = e.left, u = e.width, d = e.height, f = e.id, p = e.needClip, m = e.zIndex;
		if (t) return null;
		var h = l("recharts-line", i), g = f, _ = BP(n), v = _.r, y = _.strokeWidth, b = Jk(n), x = v * 2 + y, S = p ? `url(#clipPath-${b ? "" : "dots-"}${g})` : void 0;
		return /*#__PURE__*/ P.createElement(xE, { zIndex: m }, /*#__PURE__*/ P.createElement(ke, { className: h }, p && /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement(jP, {
			clipPathId: g,
			xAxisId: a,
			yAxisId: o
		}), !b && /*#__PURE__*/ P.createElement("clipPath", { id: `clipPath-dots-${g}` }, /*#__PURE__*/ P.createElement("rect", {
			x: c - x / 2,
			y: s - x / 2,
			width: u + x,
			height: d + x
		}))), /*#__PURE__*/ P.createElement(kP, {
			xAxisId: a,
			yAxisId: o,
			data: r,
			dataPointFormatter: cF,
			errorBarOffset: 0
		}, /*#__PURE__*/ P.createElement(sF, {
			props: this.props,
			clipPathId: g
		}))), /*#__PURE__*/ P.createElement(zj, {
			activeDot: this.props.activeDot,
			points: r,
			mainColor: this.props.stroke,
			itemDataKey: this.props.dataKey,
			clipPath: S
		}));
	}
};
function uF(e) {
	var t = sr(e, eF), n = t.activeDot, r = t.animateNewValues, i = t.animationBegin, a = t.animationDuration, o = t.animationEasing, s = t.connectNulls, c = t.dot, l = t.hide, u = t.isAnimationActive, d = t.label, f = t.legendType, p = t.xAxisId, m = t.yAxisId, h = t.id, g = GP(t, UP), _ = AP(p, m).needClip, v = jj(), y = nu(), b = ml(), x = B((e) => zP(e, p, m, b, h));
	if (y !== "horizontal" && y !== "vertical" || x == null || v == null) return null;
	var S = v.height, C = v.width, w = v.x, T = v.y;
	return /*#__PURE__*/ P.createElement(lF, WP({}, g, {
		id: h,
		connectNulls: s,
		dot: c,
		activeDot: n,
		animateNewValues: r,
		animationBegin: i,
		animationDuration: a,
		animationEasing: o,
		isAnimationActive: u,
		hide: l,
		label: d,
		legendType: f,
		xAxisId: p,
		yAxisId: m,
		points: x,
		layout: y,
		height: S,
		width: C,
		left: w,
		top: T,
		needClip: _
	}));
}
function dF(e) {
	var t = e.layout, n = e.xAxis, r = e.yAxis, i = e.xAxisTicks, a = e.yAxisTicks, o = e.dataKey, s = e.bandSize;
	return e.displayedData.map((e, c) => {
		var l = G(e, o);
		if (t === "horizontal") return {
			x: Nc({
				axis: n,
				ticks: i,
				bandSize: s,
				entry: e,
				index: c
			}),
			y: (L(l) ? null : r.scale.map(l)) ?? null,
			value: l,
			payload: e
		};
		var u = L(l) ? null : n.scale.map(l), d = Nc({
			axis: r,
			ticks: a,
			bandSize: s,
			entry: e,
			index: c
		});
		return u == null || d == null ? null : {
			x: u,
			y: d,
			value: l,
			payload: e
		};
	}).filter(Boolean);
}
function fF(e) {
	var t = sr(e, eF), n = ml();
	return /*#__PURE__*/ P.createElement(WA, {
		id: t.id,
		type: "line"
	}, (e) => /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(uA, { legendPayload: tF(t) }), /*#__PURE__*/ P.createElement(nF, {
		dataKey: t.dataKey,
		data: t.data,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ P.createElement(ej, {
		type: "line",
		id: e,
		data: t.data,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		dataKey: t.dataKey,
		hide: t.hide,
		isPanorama: n
	}), /*#__PURE__*/ P.createElement(uF, WP({}, t, { id: e }))));
}
var pF = /*#__PURE__*/ P.memo(fF, Nu);
pF.displayName = "Line";
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/graphicalItemSelectors.js
function mF(e, t) {
	return e.graphicalItems.cartesianItems.find((e) => e.id === t)?.xAxisId ?? 0;
}
function hF(e, t) {
	return e.graphicalItems.cartesianItems.find((e) => e.id === t)?.yAxisId ?? 0;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/areaSelectors.js
var gF = (e, t, n) => JC(e, "xAxis", mF(e, t), n), _F = (e, t, n) => qC(e, "xAxis", mF(e, t), n), vF = (e, t, n) => JC(e, "yAxis", hF(e, t), n), yF = (e, t, n) => qC(e, "yAxis", hF(e, t), n), bF = V([
	K,
	gF,
	vF,
	_F,
	yF
], (e, t, n, r, i) => Ec(e, "xAxis") ? Vc(t, r, !1) : Vc(n, i, !1)), xF = V([tS, (e, t) => t], (e, t) => e.filter((e) => e.type === "area").find((e) => e.id === t)), SF = (e) => Ec(K(e), "xAxis") ? "yAxis" : "xAxis", CF = (e, t) => SF(e) === "yAxis" ? hF(e, t) : mF(e, t), wF = (e, t, n) => DS(e, SF(e), CF(e, t), n), TF = V([
	K,
	gF,
	vF,
	_F,
	yF,
	V([xF, wF], (e, t) => {
		if (e != null && t != null) {
			var n = e.stackId, r = Nh(e);
			if (n != null && r != null) {
				var i = (t[n]?.stackedData)?.find((e) => e.key === r);
				if (i != null) return i.map((e) => [e[0], e[1]]);
			}
		}
	}),
	wm,
	bF,
	xF,
	lh,
	V([xF, wF], (e, t) => {
		if (e != null && e.stackId != null && t != null) {
			var n = t[e.stackId];
			if (n != null) return n.graphicalItems.map((e) => e.dataKey).filter(tt);
		}
	})
], (e, t, n, r, i, a, o, s, c, l, u) => {
	var d = o.chartData, f = o.dataStartIndex, p = o.dataEndIndex;
	if (!(c == null || e !== "horizontal" && e !== "vertical" || t == null || n == null || r == null || i == null || r.length === 0 || i.length === 0 || s == null)) {
		var m = c.data, h = m && m.length > 0 ? m : d?.slice(f, p + 1);
		if (h != null) return iI({
			layout: e,
			xAxis: t,
			yAxis: n,
			xAxisTicks: r,
			yAxisTicks: i,
			dataStartIndex: f,
			areaSettings: c,
			stackedData: a,
			displayedData: h,
			chartBaseValue: l,
			bandSize: s,
			stackDataKeys: u
		});
	}
}), EF = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"layout",
	"isRange",
	"stroke",
	"connectNulls"
], DF = ["id", "baseLine"];
function OF() {
	return OF = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, OF.apply(null, arguments);
}
function kF(e, t) {
	if (e == null) return {};
	var n, r, i = AF(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function AF(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function jF(e) {
	var t = e.alpha, n = e.baseLine, r = e.points, i = e.strokeWidth, a = r[0]?.x, o = r[r.length - 1]?.x;
	if (!W(a) || !W(o)) return null;
	var s = t * Math.abs(a - o), c = Math.max(...r.map((e) => e.y || 0));
	return F(n) ? c = Math.max(n, c) : n && Array.isArray(n) && n.length && (c = Math.max(...n.map((e) => e.y || 0), c)), F(c) ? /*#__PURE__*/ P.createElement("rect", {
		x: a < o ? a : a - s,
		y: 0,
		width: s,
		height: Math.floor(c + (i ? parseInt(`${i}`, 10) : 1))
	}) : null;
}
function MF(e) {
	var t = e.alpha, n = e.baseLine, r = e.points, i = e.strokeWidth, a = r[0]?.y, o = r[r.length - 1]?.y;
	if (!W(a) || !W(o)) return null;
	var s = t * Math.abs(a - o), c = Math.max(...r.map((e) => e.x || 0));
	return F(n) ? c = Math.max(n, c) : n && Array.isArray(n) && n.length && (c = Math.max(...n.map((e) => e.x || 0), c)), F(c) ? /*#__PURE__*/ P.createElement("rect", {
		x: 0,
		y: a < o ? a : a - s,
		width: c + (i ? parseInt(`${i}`, 10) : 1),
		height: Math.floor(s)
	}) : null;
}
function NF(e) {
	var t = e.alpha, n = e.layout, r = e.points, i = e.baseLine, a = e.strokeWidth;
	return n === "vertical" ? /*#__PURE__*/ P.createElement(MF, {
		alpha: t,
		points: r,
		baseLine: i,
		strokeWidth: a
	}) : /*#__PURE__*/ P.createElement(jF, {
		alpha: t,
		points: r,
		baseLine: i,
		strokeWidth: a
	});
}
function PF(e) {
	var t = e.animationElapsedTime, n = t === void 0 ? 1 : t, r = e.isAnimating, i = r !== void 0 && r, a = e.isEntrance, o = a !== void 0 && a, s = e.layout, c = e.isRange, l = e.stroke, u = e.connectNulls, d = kF(e, EF), f = s === "vertical" ? "vertical" : "horizontal", p = u ?? !1, m = VA(), h = d.id, g = d.baseLine, _ = he(kF(d, DF)), v = /*#__PURE__*/ P.createElement(hf, OF({}, d, {
		id: h,
		baseLine: g,
		connectNulls: p,
		stroke: "none",
		className: "recharts-area-area",
		layout: f
	})), y = l !== "none" && /*#__PURE__*/ P.createElement(hf, OF({}, _, {
		className: "recharts-area-curve",
		layout: f,
		type: d.type,
		connectNulls: p,
		fill: "none",
		stroke: l,
		points: d.points
	})), b = l !== "none" && c && Array.isArray(g) && /*#__PURE__*/ P.createElement(hf, OF({}, _, {
		className: "recharts-area-curve",
		layout: f,
		type: d.type,
		connectNulls: p,
		fill: "none",
		stroke: l,
		points: g
	}));
	return o && (i || n < 1) ? /*#__PURE__*/ P.createElement(ke, null, /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement("clipPath", { id: m }, /*#__PURE__*/ P.createElement(NF, {
		alpha: n,
		points: d.points ?? [],
		baseLine: g,
		layout: f,
		strokeWidth: d.strokeWidth
	}))), /*#__PURE__*/ P.createElement(ke, { clipPath: `url(#${m})` }, v, y, b)) : /*#__PURE__*/ P.createElement(P.Fragment, null, v, y, b);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/Area.js
var FF = ["id"], IF = [
	"activeDot",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"fill",
	"fillOpacity",
	"hide",
	"isAnimationActive",
	"legendType",
	"stroke",
	"xAxisId",
	"yAxisId"
];
function LF() {
	return LF = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, LF.apply(null, arguments);
}
function RF(e, t) {
	if (e == null) return {};
	var n, r, i = zF(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function zF(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function BF(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function VF(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? BF(Object(n), !0).forEach(function(t) {
			HF(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : BF(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function HF(e, t, n) {
	return (t = UF(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function UF(e) {
	var t = WF(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function WF(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var GF = {
	activeDot: !0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: vA,
	animationInterpolateFn: (e, t) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => e.status === "matched" ? [VF(VF({}, e.next), {}, {
		x: I(e.prev.x, e.next.x, t),
		y: I(e.prev.y, e.next.y, t)
	})] : e.status === "added" ? [e.next] : []),
	connectNulls: !1,
	dot: !1,
	fill: "#3182bd",
	fillOpacity: .6,
	hide: !1,
	isAnimationActive: "auto",
	legendType: "line",
	stroke: "#3182bd",
	strokeWidth: 1,
	type: "linear",
	label: !1,
	shape: PF,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: J.area
};
function KF(e, t) {
	return e && e !== "none" ? e : t;
}
var qF = (e) => {
	var t = e.dataKey, n = e.name, r = e.stroke, i = e.fill, a = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: a,
		color: KF(r, i),
		value: Uc(n, t),
		payload: e
	}];
}, JF = /*#__PURE__*/ P.memo((e) => {
	var t = e.dataKey, n = e.data, r = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, s = e.hide, c = e.unit, l = e.formatter, u = e.tooltipType, d = e.id, f = {
		dataDefinedOnItem: n,
		getPosition: nt,
		settings: {
			stroke: r,
			strokeWidth: i,
			fill: a,
			dataKey: t,
			nameKey: void 0,
			name: Uc(o, t),
			hide: s,
			type: u,
			color: KF(r, a),
			unit: c,
			formatter: l,
			graphicalItemId: d
		}
	};
	return /*#__PURE__*/ P.createElement(lA, { tooltipEntrySettings: f });
});
function YF(e) {
	var t = e.clipPathId, n = e.points, r = e.props, i = r.needClip, a = r.dot, o = r.dataKey, s = he(r);
	return /*#__PURE__*/ P.createElement(pj, {
		points: n,
		dot: a,
		className: "recharts-area-dots",
		dotClassName: "recharts-area-dot",
		dataKey: o,
		baseProps: s,
		needClip: i,
		clipPathId: t
	});
}
function XF(e) {
	var t = e.showLabels, n = e.children, r = e.points.map((e) => {
		var t = {
			x: e.x ?? 0,
			y: e.y ?? 0,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return VF(VF({}, t), {}, {
			value: e.value,
			payload: e.payload,
			parentViewBox: void 0,
			viewBox: t,
			fill: void 0
		});
	});
	return /*#__PURE__*/ P.createElement(gk, { value: t ? r : void 0 }, n);
}
function ZF(e) {
	var t = e.points, n = e.baseLine, r = e.needClip, i = e.clipPathId, a = e.props, o = e.animationElapsedTime, s = e.isAnimating, c = e.isEntrance, l = a.layout, u = a.type, d = a.stroke, f = a.connectNulls, p = a.isRange, m = a.shape, h = a.id, g = RF(a, FF), _ = VF(VF({}, _e(g)), {}, {
		id: h,
		points: t,
		connectNulls: f,
		type: u,
		baseLine: n,
		layout: l,
		stroke: d,
		isRange: p,
		animationElapsedTime: o,
		isAnimating: s,
		isEntrance: c
	});
	return /*#__PURE__*/ P.createElement(P.Fragment, null, t?.length > 1 && /*#__PURE__*/ P.createElement(ke, { clipPath: r ? `url(#clipPath-${i})` : void 0 }, /*#__PURE__*/ P.createElement(aA, {
		option: m,
		DefaultShape: GF.shape,
		shapeProps: _
	})), /*#__PURE__*/ P.createElement(YF, {
		points: t,
		props: g,
		clipPathId: i
	}));
}
function QF(e, t, n) {
	return F(e) ? I(F(t) ? t : void 0, e, n) : L(e) || Ke(e) ? I(F(t) ? t : void 0, 0, n) : e;
}
function $F(e) {
	var t = e.needClip, n = e.clipPathId, r = e.props, i = e.previousPointsRef, a = e.previousBaselineRef, o = r.points, s = r.baseLine, c = r.isAnimationActive, l = r.animationBegin, u = r.animationDuration, d = r.animationEasing, f = r.animationMatchBy, p = r.animationInterpolateFn, m = (0, P.useMemo)(() => ({
		points: o,
		baseLine: s
	}), [o, s]), h = EA(m, a), g = ru(), _ = NA(r.onAnimationStart, r.onAnimationEnd), v = _.isAnimating, y = _.handleAnimationStart, b = _.handleAnimationEnd, x = h.startValue;
	if (g == null) return null;
	var S = Array.isArray(s) && Array.isArray(x) ? TA(x, s, f) : Array.isArray(s) ? TA(null, s, f) : null;
	return /*#__PURE__*/ P.createElement(PA, {
		animationInput: m,
		animationIdPrefix: "recharts-area-",
		items: o,
		previousItemsRef: i,
		isAnimationActive: c,
		animationBegin: l,
		animationDuration: u,
		animationEasing: d,
		onAnimationStart: y,
		onAnimationEnd: b,
		animationInterpolateFn: p,
		animationMatchBy: f,
		layout: g
	}, (e, i, a) => {
		var c = i === 1 ? s : Array.isArray(s) ? p(S, i, g) : a ? s : QF(s, x, i);
		return h.syncStepValue(c, i), /*#__PURE__*/ P.createElement(XF, {
			showLabels: !v,
			points: o
		}, r.children, /*#__PURE__*/ P.createElement(ZF, {
			points: e,
			baseLine: c,
			needClip: t,
			clipPathId: n,
			props: r,
			animationElapsedTime: i,
			isAnimating: v || i < 1,
			isEntrance: a
		}), /*#__PURE__*/ P.createElement(Sk, { label: r.label }));
	});
}
function eI(e) {
	var t = e.needClip, n = e.clipPathId, r = e.props, i = (0, P.useRef)(null), a = (0, P.useRef)();
	return /*#__PURE__*/ P.createElement($F, {
		needClip: t,
		clipPathId: n,
		props: r,
		previousPointsRef: i,
		previousBaselineRef: a
	});
}
var tI = class extends P.PureComponent {
	render() {
		var e = this.props, t = e.hide, n = e.dot, r = e.points, i = e.className, a = e.top, o = e.left, s = e.needClip, c = e.xAxisId, u = e.yAxisId, d = e.width, f = e.height, p = e.id, m = e.baseLine, h = e.zIndex;
		if (t) return null;
		var g = l("recharts-area", i), _ = p, v = BP(n), y = v.r, b = v.strokeWidth, x = Jk(n), S = y * 2 + b, C = s ? `url(#clipPath-${x ? "" : "dots-"}${_})` : void 0;
		return /*#__PURE__*/ P.createElement(xE, { zIndex: h }, /*#__PURE__*/ P.createElement(ke, { className: g }, s && /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement(jP, {
			clipPathId: _,
			xAxisId: c,
			yAxisId: u
		}), !x && /*#__PURE__*/ P.createElement("clipPath", { id: `clipPath-dots-${_}` }, /*#__PURE__*/ P.createElement("rect", {
			x: o - S / 2,
			y: a - S / 2,
			width: d + S,
			height: f + S
		}))), /*#__PURE__*/ P.createElement(eI, {
			needClip: s,
			clipPathId: _,
			props: this.props
		})), /*#__PURE__*/ P.createElement(zj, {
			points: r,
			mainColor: KF(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: C
		}), this.props.isRange && Array.isArray(m) && /*#__PURE__*/ P.createElement(zj, {
			points: m,
			mainColor: KF(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: C
		}));
	}
};
function nI(e) {
	var t = e.activeDot, n = e.animationBegin, r = e.animationDuration, i = e.animationEasing, a = e.connectNulls, o = e.dot, s = e.fill, c = e.fillOpacity, l = e.hide, u = e.isAnimationActive, d = e.legendType, f = e.stroke, p = e.xAxisId, m = e.yAxisId, h = RF(e, IF), g = nu(), _ = VT(), v = AP(p, m).needClip, y = ml(), b = B((t) => TF(t, e.id, y)) ?? {}, x = b.points, S = b.isRange, C = b.baseLine, w = jj();
	if (g !== "horizontal" && g !== "vertical" || w == null || _ !== "AreaChart" && _ !== "ComposedChart") return null;
	var T = w.height, E = w.width, D = w.x, O = w.y;
	return !x || !x.length ? null : /*#__PURE__*/ P.createElement(tI, LF({}, h, {
		activeDot: t,
		animationBegin: n,
		animationDuration: r,
		animationEasing: i,
		baseLine: C,
		connectNulls: a,
		dot: o,
		fill: s,
		fillOpacity: c,
		height: T,
		hide: l,
		layout: g,
		isAnimationActive: u,
		isRange: S,
		legendType: d,
		needClip: v,
		points: x,
		stroke: f,
		width: E,
		left: D,
		top: O,
		xAxisId: p,
		yAxisId: m
	}));
}
var rI = (e, t, n, r, i) => {
	var a = n ?? t;
	if (F(a)) return a;
	var o = e === "horizontal" ? i : r, s = o.scale.domain();
	if (o.type === "number") {
		var c = Math.max(s[0], s[1]), l = Math.min(s[0], s[1]);
		return a === "dataMin" ? l : a === "dataMax" || c < 0 ? c : Math.max(Math.min(s[0], s[1]), 0);
	}
	return a === "dataMin" ? s[0] : a === "dataMax" ? s[1] : s[0];
};
function iI(e) {
	var t = e.areaSettings, n = t.connectNulls, r = t.baseValue, i = t.dataKey, a = e.stackedData, o = e.layout, s = e.chartBaseValue, c = e.xAxis, l = e.yAxis, u = e.displayedData, d = e.dataStartIndex, f = e.xAxisTicks, p = e.yAxisTicks, m = e.bandSize, h = e.stackDataKeys, g = a && a.length, _ = rI(o, s, r, c, l), v = o === "horizontal", y = !1, b = u.map((e, t) => {
		var r;
		if (g) r = a[d + t];
		else {
			var o = G(e, i);
			Array.isArray(o) ? (r = o, y = !0) : r = [_, o];
		}
		var s = r?.[1] ?? null, u = G(e, i), b = g && u == null && h != null && h.length > 0 && h.every((t) => G(e, t) == null), x = s == null || g && !n && u == null || b;
		return v ? {
			x: Nc({
				axis: c,
				ticks: f,
				bandSize: m,
				entry: e,
				index: t
			}),
			y: x ? null : l.scale.map(s) ?? null,
			value: r,
			payload: e
		} : {
			x: x ? null : c.scale.map(s) ?? null,
			y: Nc({
				axis: l,
				ticks: p,
				bandSize: m,
				entry: e,
				index: t
			}),
			value: r,
			payload: e
		};
	});
	return {
		points: b,
		baseLine: (g || y ? b.map((e) => {
			var t = Array.isArray(e.value) ? e.value[0] : null;
			return v ? {
				x: e.x,
				y: t != null && e.y != null ? l.scale.map(t) ?? null : null,
				payload: e.payload
			} : {
				x: t == null ? null : c.scale.map(t) ?? null,
				y: e.y,
				payload: e.payload
			};
		}) : v ? l.scale.map(_) : c.scale.map(_)) ?? 0,
		isRange: y
	};
}
function aI(e) {
	var t = sr(e, GF), n = ml();
	return /*#__PURE__*/ P.createElement(WA, {
		id: t.id,
		type: "area"
	}, (e) => /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(uA, { legendPayload: qF(t) }), /*#__PURE__*/ P.createElement(JF, {
		dataKey: t.dataKey,
		data: t.data,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ P.createElement(ej, {
		type: "area",
		id: e,
		data: t.data,
		dataKey: t.dataKey,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		stackId: Mc(t.stackId),
		hide: t.hide,
		barSize: void 0,
		baseValue: t.baseValue,
		isPanorama: n,
		connectNulls: t.connectNulls
	}), /*#__PURE__*/ P.createElement(nI, LF({}, t, { id: e }))));
}
var oI = /*#__PURE__*/ P.memo(aI, Nu);
oI.displayName = "Area";
// node_modules/.pnpm/tiny-invariant@1.3.3/node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var sI = "Invariant failed";
function cI(e, t) {
	if (!e) throw Error(sI);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/BarUtils.js
var lI = ["option"];
function uI(e, t) {
	if (e == null) return {};
	var n, r, i = dI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function dI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var fI = zp;
function pI(e) {
	var t = e.option, n = uI(e, lI);
	return /*#__PURE__*/ P.createElement(aA, {
		option: t,
		DefaultShape: fI,
		shapeProps: n,
		activeClassName: "recharts-active-bar",
		inActiveClassName: "recharts-inactive-bar"
	});
}
var mI = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	return (n, r) => {
		if (F(e)) return e;
		var i = F(n) || L(n);
		return i ? e(n, r) : (!i && cI(!1, `minPointSize callback function received a value with type of ${typeof n}. Currently only numbers or null/undefined are supported.`), t);
	};
}, hI = (e, t, n) => n, gI = V([tS, (e, t) => t], (e, t) => e.filter((e) => e.type === "bar").find((e) => e.id === t)), _I = V([gI], (e) => e?.maxBarSize), vI = (e, t, n, r) => r, yI = V([
	K,
	tS,
	mF,
	hF,
	hI
], (e, t, n, r, i) => t.filter((t) => e === "horizontal" ? t.xAxisId === n : t.yAxisId === r).filter((e) => e.isPanorama === i).filter((e) => e.hide === !1).filter((e) => e.type === "bar")), bI = (e, t, n) => {
	var r = K(e), i = mF(e, t), a = hF(e, t);
	if (i != null && a != null) return r === "horizontal" ? DS(e, "yAxis", a, n) : DS(e, "xAxis", i, n);
}, xI = V([
	yI,
	nh,
	(e, t) => {
		var n = K(e), r = mF(e, t), i = hF(e, t);
		if (r != null && i != null) return n === "horizontal" ? BC(e, "xAxis", r) : BC(e, "yAxis", i);
	}
], qj), SI = (e, t, n) => {
	var r = gI(e, t);
	if (r == null) return 0;
	var i = mF(e, t), a = hF(e, t);
	if (i == null || a == null) return 0;
	var o = K(e), s = $m(e), c = r.maxBarSize, l = L(c) ? s : c, u, d;
	return o === "horizontal" ? (u = JC(e, "xAxis", i, n), d = qC(e, "xAxis", i, n)) : (u = JC(e, "yAxis", a, n), d = qC(e, "yAxis", a, n)), Vc(u, d, !0) ?? l ?? 0;
}, CI = (e, t, n) => {
	var r = K(e), i = mF(e, t), a = hF(e, t);
	if (i != null && a != null) {
		var o, s;
		return r === "horizontal" ? (o = JC(e, "xAxis", i, n), s = qC(e, "xAxis", i, n)) : (o = JC(e, "yAxis", a, n), s = qC(e, "yAxis", a, n)), Vc(o, s);
	}
}, wI = V([
	ul,
	fl,
	(e, t, n) => {
		var r = mF(e, t);
		if (r != null) return JC(e, "xAxis", r, n);
	},
	(e, t, n) => {
		var r = hF(e, t);
		if (r != null) return JC(e, "yAxis", r, n);
	},
	(e, t, n) => {
		var r = mF(e, t);
		if (r != null) return qC(e, "xAxis", r, n);
	},
	(e, t, n) => {
		var r = hF(e, t);
		if (r != null) return qC(e, "yAxis", r, n);
	},
	V([V([
		xI,
		$m,
		eh,
		th,
		SI,
		CI,
		_I
	], eM), gI], nM),
	K,
	wm,
	CI,
	V([bI, gI], tM),
	gI,
	vI
], (e, t, n, r, i, a, o, s, c, l, u, d, f) => {
	var p = c.chartData, m = c.dataStartIndex, h = c.dataEndIndex;
	if (!(d == null || o == null || t == null || s !== "horizontal" && s !== "vertical" || n == null || r == null || i == null || a == null || l == null)) {
		var g = d.data, _ = g != null && g.length > 0 ? g : p?.slice(m, h + 1);
		if (_ != null) return pL({
			layout: s,
			barSettings: d,
			pos: o,
			parentViewBox: t,
			bandSize: l,
			xAxis: n,
			yAxis: r,
			xAxisTicks: i,
			yAxisTicks: a,
			stackedData: u,
			displayedData: _,
			offset: e,
			cells: f,
			dataStartIndex: m
		});
	}
}), TI = ["index"];
function EI() {
	return EI = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, EI.apply(null, arguments);
}
function DI(e, t) {
	if (e == null) return {};
	var n, r, i = OI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function OI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var kI = /*#__PURE__*/ (0, P.createContext)(void 0), AI = (e) => {
	var t = (0, P.useContext)(kI);
	if (t != null) return t.stackId;
	if (e != null) return Mc(e);
}, jI = (e, t) => `recharts-bar-stack-clip-path-${e}-${t}`, MI = (e) => {
	var t = (0, P.useContext)(kI);
	if (t != null) {
		var n = t.stackId;
		return `url(#${jI(n, e)})`;
	}
}, NI = (e) => {
	var t = e.index, n = DI(e, TI), r = MI(t);
	return /*#__PURE__*/ P.createElement(ke, EI({
		className: "recharts-bar-stack-layer",
		clipPath: r
	}, n));
}, PI = [
	"onMouseEnter",
	"onMouseLeave",
	"onClick"
], FI = [
	"value",
	"background",
	"tooltipPosition"
], II = ["id"], LI = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
];
function RI(e, t) {
	return UI(e) || HI(e, t) || BI(e, t) || zI();
}
function zI() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function BI(e, t) {
	if (e) {
		if (typeof e == "string") return VI(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? VI(e, t) : void 0;
	}
}
function VI(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function HI(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function UI(e) {
	if (Array.isArray(e)) return e;
}
function WI() {
	return WI = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, WI.apply(null, arguments);
}
function GI(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function KI(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? GI(Object(n), !0).forEach(function(t) {
			qI(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : GI(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function qI(e, t, n) {
	return (t = JI(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function JI(e) {
	var t = YI(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function YI(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function XI(e, t) {
	if (e == null) return {};
	var n, r, i = ZI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ZI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var QI = (e) => {
	var t = e.dataKey, n = e.name, r = e.fill, i = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: i,
		color: r,
		value: Uc(n, t),
		payload: e
	}];
}, $I = /*#__PURE__*/ P.memo((e) => {
	var t = e.dataKey, n = e.stroke, r = e.strokeWidth, i = e.fill, a = e.name, o = e.hide, s = e.unit, c = e.formatter, l = e.tooltipType, u = e.id, d = {
		dataDefinedOnItem: void 0,
		getPosition: nt,
		settings: {
			stroke: n,
			strokeWidth: r,
			fill: i,
			dataKey: t,
			nameKey: void 0,
			name: Uc(a, t),
			hide: o,
			type: l,
			color: i,
			unit: s,
			formatter: c,
			graphicalItemId: u
		}
	};
	return /*#__PURE__*/ P.createElement(lA, { tooltipEntrySettings: d });
});
function eL(e) {
	var t = B(_T), n = e.data, r = e.dataKey, i = e.background, a = e.allOtherBarProps, o = a.onMouseEnter, s = a.onMouseLeave, c = a.onClick, l = XI(a, PI), u = oA(o, r, a.id), d = sA(s), f = cA(c, r, a.id);
	if (!i || n == null) return null;
	var p = ge(i);
	return /*#__PURE__*/ P.createElement(xE, { zIndex: rM(i, J.barBackground) }, n.map((e, n) => {
		e.value;
		var a = e.background;
		e.tooltipPosition;
		var o = XI(e, FI);
		if (!a) return null;
		var s = u(e, e.originalDataIndex), c = d(e, e.originalDataIndex), m = f(e, e.originalDataIndex), h = KI(KI(KI(KI(KI({
			option: i,
			isActive: String(e.originalDataIndex) === t
		}, o), {}, { fill: "#eee" }, a), p), tr(l, e, n)), {}, {
			onMouseEnter: s,
			onMouseLeave: c,
			onClick: m,
			dataKey: r,
			index: n,
			className: "recharts-bar-background-rectangle"
		});
		return /*#__PURE__*/ P.createElement(pI, WI({ key: `background-bar-${n}` }, h));
	}));
}
function tL(e) {
	var t = e.showLabels, n = e.children, r = e.rects?.map((e) => {
		var t = {
			x: e.x,
			y: e.y,
			width: e.width,
			lowerWidth: e.width,
			upperWidth: e.width,
			height: e.height
		};
		return KI(KI({}, t), {}, {
			value: e.value,
			payload: e.payload,
			parentViewBox: e.parentViewBox,
			viewBox: t,
			fill: e.fill
		});
	});
	return /*#__PURE__*/ P.createElement(gk, { value: t ? r : void 0 }, n);
}
function nL(e) {
	var t = e.shape, n = e.activeBar, r = e.baseProps, i = e.entry, a = e.index, o = e.dataKey, s = B(_T), c = B(yT), l = n && String(i.originalDataIndex) === s && (c == null || o === c), u = s != null && (String(i.originalDataIndex) !== s || c != null && o !== c), d = RI((0, P.useState)(!1), 2), f = d[0], p = d[1], m = RI((0, P.useState)(!1), 2), h = m[0], g = m[1];
	(0, P.useEffect)(() => {
		var e;
		return l ? (p(!0), e = requestAnimationFrame(() => {
			g(!0);
		})) : (g(!1), u && p(!1)), () => {
			cancelAnimationFrame(e);
		};
	}, [l, u]);
	var _ = (0, P.useCallback)(() => {
		l || p(!1);
	}, [l]), v = l && h, y = l || f, b = l ? n === !0 ? t : n : t, x = /*#__PURE__*/ P.createElement(pI, WI({}, r, { name: String(r.name) }, i, {
		isActive: v,
		option: b,
		index: a,
		dataKey: o,
		animationElapsedTime: e.animationElapsedTime,
		isAnimating: e.isAnimating,
		isEntrance: e.isEntrance,
		onTransitionEnd: _
	}));
	return y ? /*#__PURE__*/ P.createElement(xE, { zIndex: J.activeBar }, /*#__PURE__*/ P.createElement(NI, { index: i.originalDataIndex }, x)) : x;
}
function rL(e) {
	var t = e.shape, n = e.baseProps, r = e.entry, i = e.index, a = e.dataKey;
	return /*#__PURE__*/ P.createElement(pI, WI({}, n, { name: String(n.name) }, r, {
		isActive: !1,
		option: t,
		index: i,
		dataKey: a,
		animationElapsedTime: e.animationElapsedTime,
		isAnimating: e.isAnimating,
		isEntrance: e.isEntrance
	}));
}
function iL(e) {
	var t = e.data, n = e.props, r = e.animationElapsedTime, i = e.isAnimating, a = e.isEntrance, o = he(n) ?? {}, s = o.id, c = XI(o, II), l = n.shape, u = n.dataKey, d = n.activeBar, f = n.onMouseEnter, p = n.onClick, m = n.onMouseLeave, h = XI(n, LI), g = oA(f, u, s), _ = sA(m), v = cA(p, u, s);
	return t ? /*#__PURE__*/ P.createElement(P.Fragment, null, t.map((e, t) => /*#__PURE__*/ P.createElement(NI, WI({
		index: e.originalDataIndex,
		key: `rectangle-${e?.x}-${e?.y}-${e?.value}-${t}`,
		className: "recharts-bar-rectangle"
	}, tr(h, e, t), {
		onMouseEnter: g(e, e.originalDataIndex),
		onMouseLeave: _(e, e.originalDataIndex),
		onClick: v(e, e.originalDataIndex)
	}), d ? /*#__PURE__*/ P.createElement(nL, {
		shape: l,
		activeBar: d,
		baseProps: c,
		entry: e,
		index: t,
		dataKey: u,
		animationElapsedTime: r,
		isAnimating: i,
		isEntrance: a
	}) : /*#__PURE__*/ P.createElement(rL, {
		shape: l,
		baseProps: c,
		entry: e,
		index: t,
		dataKey: u,
		animationElapsedTime: r,
		isAnimating: i,
		isEntrance: a
	})))) : null;
}
var aL = (e, t, n) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => {
	if (e.status === "removed") return n === "horizontal" ? [KI(KI({}, e.prev), {}, {
		height: I(e.prev.height, 0, t),
		y: I(e.prev.y, e.prev.y + e.prev.height, t)
	})] : [KI(KI({}, e.prev), {}, { width: I(e.prev.width, 0, t) })];
	if (e.status === "matched") return [KI(KI({}, e.next), {}, {
		x: I(e.prev.x, e.next.x, t),
		y: I(e.prev.y, e.next.y, t),
		width: I(e.prev.width, e.next.width, t),
		height: I(e.prev.height, e.next.height, t)
	})];
	var r = e.next;
	return n === "horizontal" ? [KI(KI({}, r), {}, {
		height: I(0, r.height, t),
		y: I(r.stackedBarStart, r.y, t)
	})] : [KI(KI({}, r), {}, {
		width: I(0, r.width, t),
		x: I(r.stackedBarStart, r.x, t)
	})];
});
function oL(e) {
	var t = e.props, n = e.previousRectanglesRef, r = t.data, i = t.isAnimationActive, a = t.animationBegin, o = t.animationDuration, s = t.animationEasing, c = t.animationInterpolateFn, l = t.layout, u = NA(t.onAnimationStart, t.onAnimationEnd), d = u.isAnimating, f = u.handleAnimationStart, p = u.handleAnimationEnd;
	return /*#__PURE__*/ P.createElement(tL, {
		showLabels: !d,
		rects: r
	}, /*#__PURE__*/ P.createElement(PA, {
		animationInput: r,
		animationIdPrefix: "recharts-bar-",
		items: r,
		previousItemsRef: n,
		isAnimationActive: i,
		animationBegin: a,
		animationDuration: o,
		animationEasing: s,
		onAnimationStart: f,
		onAnimationEnd: p,
		animationInterpolateFn: c,
		animationMatchBy: t.animationMatchBy,
		layout: l
	}, (e, n, r) => /*#__PURE__*/ P.createElement(ke, null, /*#__PURE__*/ P.createElement(iL, {
		props: t,
		data: e,
		animationElapsedTime: n,
		isAnimating: d || n < 1,
		isEntrance: r
	}))), /*#__PURE__*/ P.createElement(Sk, { label: t.label }), t.children);
}
function sL(e) {
	var t = (0, P.useRef)(null);
	return /*#__PURE__*/ P.createElement(oL, {
		previousRectanglesRef: t,
		props: e
	});
}
var cL = 0, lL = (e, t) => {
	var n = Array.isArray(e.value) ? e.value[1] : e.value;
	return {
		x: e.x,
		y: e.y,
		value: n,
		errorVal: G(e, t)
	};
}, uL = class extends P.PureComponent {
	render() {
		var e = this.props, t = e.hide, n = e.data, r = e.dataKey, i = e.className, a = e.xAxisId, o = e.yAxisId, s = e.needClip, c = e.background, u = e.id;
		if (t || n == null) return null;
		var d = l("recharts-bar", i), f = u;
		return /*#__PURE__*/ P.createElement(ke, {
			className: d,
			id: u
		}, s && /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement(jP, {
			clipPathId: f,
			xAxisId: a,
			yAxisId: o
		})), /*#__PURE__*/ P.createElement(ke, {
			className: "recharts-bar-rectangles",
			clipPath: s ? `url(#clipPath-${f})` : void 0
		}, /*#__PURE__*/ P.createElement(eL, {
			data: n,
			dataKey: r,
			background: c,
			allOtherBarProps: this.props
		}), /*#__PURE__*/ P.createElement(sL, this.props)));
	}
}, dL = {
	activeBar: !1,
	animationBegin: 0,
	animationDuration: 400,
	animationEasing: "ease",
	animationInterpolateFn: aL,
	animationMatchBy: yA,
	background: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	minPointSize: cL,
	shape: fI,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: J.bar
};
function fL(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.hide, i = e.legendType, a = e.minPointSize, o = e.activeBar, s = e.animationBegin, c = e.animationDuration, l = e.animationEasing, u = e.isAnimationActive, d = AP(t, n).needClip, f = nu(), p = ml(), m = qk(e.children, xD), h = B((t) => wI(t, e.id, p, m));
	if (f !== "vertical" && f !== "horizontal") return null;
	var g, _ = h?.[0];
	return g = _ == null || _.height == null || _.width == null ? 0 : f === "vertical" ? _.height / 2 : _.width / 2, /*#__PURE__*/ P.createElement(kP, {
		xAxisId: t,
		yAxisId: n,
		data: h,
		dataPointFormatter: lL,
		errorBarOffset: g
	}, /*#__PURE__*/ P.createElement(uL, WI({}, e, {
		layout: f,
		needClip: d,
		data: h,
		xAxisId: t,
		yAxisId: n,
		hide: r,
		legendType: i,
		minPointSize: a,
		activeBar: o,
		animationBegin: s,
		animationDuration: c,
		animationEasing: l,
		isAnimationActive: u
	})));
}
function pL(e) {
	var t = e.layout, n = e.barSettings, r = n.dataKey, i = n.minPointSize, a = n.hasCustomShape, o = e.pos, s = e.bandSize, c = e.xAxis, l = e.yAxis, u = e.xAxisTicks, d = e.yAxisTicks, f = e.stackedData, p = e.displayedData, m = e.offset, h = e.cells, g = e.parentViewBox, _ = e.dataStartIndex, v = t === "horizontal" ? l : c, y = f ? v.scale.domain() : null, b = Fc({ numericAxis: v }), x = v.scale.map(b);
	return p.map((e, n) => {
		var p, v, S, C, w, T;
		if (f) {
			var E = f[n + _];
			if (E == null) return null;
			p = kc(E, y);
		} else p = G(e, r), Array.isArray(p) || (p = [b, p]);
		var D = mI(i, cL)(p[1], n);
		if (t === "horizontal") {
			var O = l.scale.map(p[0]), k = l.scale.map(p[1]);
			if (O == null || k == null) return null;
			v = Pc({
				axis: c,
				ticks: u,
				bandSize: s,
				offset: o.offset,
				entry: e,
				index: n
			}), S = k ?? O ?? void 0, C = o.size;
			var A = O - k;
			if (w = Ke(A) ? 0 : A, T = {
				x: v,
				y: m.top,
				width: C,
				height: m.height
			}, Math.abs(D) > 0 && Math.abs(w) < Math.abs(D)) {
				var j = Ge(w || D) * (Math.abs(D) - Math.abs(w));
				S -= j, w += j;
			}
		} else {
			var M = c.scale.map(p[0]), N = c.scale.map(p[1]);
			if (M == null || N == null) return null;
			if (v = M, S = Pc({
				axis: l,
				ticks: d,
				bandSize: s,
				offset: o.offset,
				entry: e,
				index: n
			}), C = N - M, w = o.size, T = {
				x: m.left,
				y: S,
				width: m.width,
				height: w
			}, Math.abs(D) > 0 && Math.abs(C) < Math.abs(D)) {
				var P = Ge(C || D) * (Math.abs(D) - Math.abs(C));
				C += P;
			}
		}
		return v == null || S == null || C == null || w == null || !a && (C === 0 || w === 0) ? null : KI(KI({}, e), {}, {
			stackedBarStart: x,
			x: v,
			y: S,
			width: C,
			height: w,
			value: f ? p : p[1],
			payload: e,
			background: T,
			tooltipPosition: {
				x: v + C / 2,
				y: S + w / 2
			},
			parentViewBox: g,
			originalDataIndex: n
		}, h && h[n] && h[n].props);
	}).filter(Boolean);
}
function mL(e) {
	var t = sr(e, dL), n = AI(t.stackId), r = ml();
	return /*#__PURE__*/ P.createElement(WA, {
		id: t.id,
		type: "bar"
	}, (e) => /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(uA, { legendPayload: QI(t) }), /*#__PURE__*/ P.createElement($I, {
		dataKey: t.dataKey,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ P.createElement(ej, {
		type: "bar",
		id: e,
		data: void 0,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		dataKey: t.dataKey,
		stackId: n,
		hide: t.hide,
		barSize: t.barSize,
		minPointSize: t.minPointSize,
		maxBarSize: t.maxBarSize,
		isPanorama: r,
		hasCustomShape: t.shape != null && t.shape !== fI
	}), /*#__PURE__*/ P.createElement(xE, { zIndex: t.zIndex }, /*#__PURE__*/ P.createElement(fL, WI({}, t, { id: e })))));
}
var hL = /*#__PURE__*/ P.memo(mL, Nu);
hL.displayName = "Bar";
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/axisPropsAreEqual.js
var gL = ["domain", "range"], _L = ["domain", "range"];
function vL(e, t) {
	if (e == null) return {};
	var n, r, i = yL(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function yL(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function bL(e, t) {
	return e === t ? !0 : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2 ? e[0] === t[0] && e[1] === t[1] : !1;
}
function xL(e, t) {
	if (e === t) return !0;
	var n = e.domain, r = e.range, i = vL(e, gL), a = t.domain, o = t.range, s = vL(t, _L);
	return !bL(n, a) || !bL(r, o) ? !1 : Nu(i, s);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/XAxis.js
var SL = ["type"], CL = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], wL = ["id", "scale"];
function TL() {
	return TL = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, TL.apply(null, arguments);
}
function EL(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function DL(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? EL(Object(n), !0).forEach(function(t) {
			OL(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : EL(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function OL(e, t, n) {
	return (t = kL(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function kL(e) {
	var t = AL(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function AL(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function jL(e, t) {
	if (e == null) return {};
	var n, r, i = ML(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ML(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function NL(e) {
	var t = z(), n = (0, P.useRef)(null), r = ru(), i = e.type, a = jL(e, SL), o = ph(r, "xAxis", i), s = (0, P.useMemo)(() => {
		if (o != null) return DL(DL({}, a), {}, { type: o });
	}, [a, o]);
	return (0, P.useLayoutEffect)(() => {
		s != null && (n.current === null ? t(xj(s)) : n.current !== s && t(Sj({
			prev: n.current,
			next: s
		})), n.current = s);
	}, [s, t]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(Cj(n.current)), null);
	}, [t]), null;
}
var PL = (e) => {
	var t = e.xAxisId, n = e.className, r = e.height, i = e.label, a = (0, P.useRef)(null), o = (0, P.useRef)(null), s = B(fl), c = ml(), u = z(), d = "xAxis", f = B((e) => GC(e, d, t, c)), p = B((e) => MC(e, t)), m = B((e) => LC(e, t)), h = B((e) => Wx(e, t));
	if ((0, P.useLayoutEffect)(() => {
		if (!(r !== "auto" || !p || QO(i) || /*#__PURE__*/ (0, P.isValidElement)(i) || h == null)) {
			var e = a.current;
			if (e) {
				var n = e.getCalculatedHeight();
				Math.round(p.height) !== Math.round(n) && u(Oj({
					id: t,
					height: n
				}));
			}
		}
	}, [
		f,
		p,
		u,
		i,
		t,
		r,
		h
	]), p == null || m == null || h == null) return null;
	e.dangerouslySetInnerHTML, e.ticks, e.scale;
	var g = jL(e, CL);
	h.id, h.scale;
	var _ = jL(h, wL);
	return /*#__PURE__*/ P.createElement(zN, TL({}, g, _, {
		ref: a,
		labelRef: o,
		x: m.x,
		y: m.y,
		width: p.width,
		height: p.height,
		className: l(`recharts-${d} ${d}`, n),
		viewBox: s,
		ticks: f,
		axisType: d,
		axisId: t
	}));
}, FL = {
	allowDataOverflow: Ux.allowDataOverflow,
	allowDecimals: Ux.allowDecimals,
	allowDuplicatedCategory: Ux.allowDuplicatedCategory,
	angle: Ux.angle,
	axisLine: AN.axisLine,
	height: Ux.height,
	hide: !1,
	includeHidden: Ux.includeHidden,
	interval: Ux.interval,
	label: !1,
	minTickGap: Ux.minTickGap,
	mirror: Ux.mirror,
	orientation: Ux.orientation,
	padding: Ux.padding,
	reversed: Ux.reversed,
	scale: Ux.scale,
	tick: Ux.tick,
	tickCount: Ux.tickCount,
	tickLine: AN.tickLine,
	tickSize: AN.tickSize,
	type: Ux.type,
	niceTicks: Ux.niceTicks,
	xAxisId: 0
}, IL = /*#__PURE__*/ P.memo((e) => {
	var t = sr(e, FL);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(NL, {
		allowDataOverflow: t.allowDataOverflow,
		allowDecimals: t.allowDecimals,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		angle: t.angle,
		dataKey: t.dataKey,
		domain: t.domain,
		height: t.height,
		hide: t.hide,
		id: t.xAxisId,
		includeHidden: t.includeHidden,
		interval: t.interval,
		minTickGap: t.minTickGap,
		mirror: t.mirror,
		name: t.name,
		orientation: t.orientation,
		padding: t.padding,
		reversed: t.reversed,
		scale: t.scale,
		tick: t.tick,
		tickCount: t.tickCount,
		tickFormatter: t.tickFormatter,
		ticks: t.ticks,
		type: t.type,
		unit: t.unit,
		niceTicks: t.niceTicks
	}), /*#__PURE__*/ P.createElement(PL, t));
}, xL);
IL.displayName = "XAxis";
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/YAxis.js
var LL = ["type"], RL = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], zL = ["id", "scale"];
function BL() {
	return BL = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, BL.apply(null, arguments);
}
function VL(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function HL(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? VL(Object(n), !0).forEach(function(t) {
			UL(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : VL(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function UL(e, t, n) {
	return (t = WL(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function WL(e) {
	var t = GL(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function GL(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function KL(e, t) {
	if (e == null) return {};
	var n, r, i = qL(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function qL(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function JL(e) {
	var t = z(), n = (0, P.useRef)(null), r = ru(), i = e.type, a = KL(e, LL), o = ph(r, "yAxis", i), s = (0, P.useMemo)(() => {
		if (o != null) return HL(HL({}, a), {}, { type: o });
	}, [o, a]);
	return (0, P.useLayoutEffect)(() => {
		s != null && (n.current === null ? t(wj(s)) : n.current !== s && t(Tj({
			prev: n.current,
			next: s
		})), n.current = s);
	}, [s, t]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(Ej(n.current)), null);
	}, [t]), null;
}
function YL(e) {
	var t = e.yAxisId, n = e.className, r = e.width, i = e.label, a = (0, P.useRef)(null), o = (0, P.useRef)(null), s = B(fl), c = ml(), u = z(), d = "yAxis", f = B((e) => zC(e, t)), p = B((e) => RC(e, t)), m = B((e) => GC(e, d, t, c)), h = B((e) => qx(e, t));
	if ((0, P.useLayoutEffect)(() => {
		if (!(r !== "auto" || !f || QO(i) || /*#__PURE__*/ (0, P.isValidElement)(i) || h == null)) {
			var e = a.current;
			if (e) {
				var n = e.getCalculatedWidth();
				Math.round(f.width) !== Math.round(n) && u(Dj({
					id: t,
					width: n
				}));
			}
		}
	}, [
		m,
		f,
		u,
		i,
		t,
		r,
		h
	]), f == null || p == null || h == null) return null;
	e.dangerouslySetInnerHTML, e.ticks, e.scale;
	var g = KL(e, RL);
	h.id, h.scale;
	var _ = KL(h, zL);
	return /*#__PURE__*/ P.createElement(zN, BL({}, g, _, {
		ref: a,
		labelRef: o,
		x: p.x,
		y: p.y,
		tickTextProps: r === "auto" ? { width: void 0 } : { width: r },
		width: f.width,
		height: f.height,
		className: l(`recharts-${d} ${d}`, n),
		viewBox: s,
		ticks: m,
		axisType: d,
		axisId: t
	}));
}
var XL = {
	allowDataOverflow: Kx.allowDataOverflow,
	allowDecimals: Kx.allowDecimals,
	allowDuplicatedCategory: Kx.allowDuplicatedCategory,
	angle: Kx.angle,
	axisLine: AN.axisLine,
	hide: !1,
	includeHidden: Kx.includeHidden,
	interval: Kx.interval,
	label: !1,
	minTickGap: Kx.minTickGap,
	mirror: Kx.mirror,
	orientation: Kx.orientation,
	padding: Kx.padding,
	reversed: Kx.reversed,
	scale: Kx.scale,
	tick: Kx.tick,
	tickCount: Kx.tickCount,
	tickLine: AN.tickLine,
	tickSize: AN.tickSize,
	type: Kx.type,
	niceTicks: Kx.niceTicks,
	width: Kx.width,
	yAxisId: 0
}, ZL = /*#__PURE__*/ P.memo((e) => {
	var t = sr(e, XL);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(JL, {
		interval: t.interval,
		id: t.yAxisId,
		scale: t.scale,
		type: t.type,
		domain: t.domain,
		allowDataOverflow: t.allowDataOverflow,
		dataKey: t.dataKey,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		allowDecimals: t.allowDecimals,
		tickCount: t.tickCount,
		padding: t.padding,
		includeHidden: t.includeHidden,
		reversed: t.reversed,
		ticks: t.ticks,
		width: t.width,
		orientation: t.orientation,
		mirror: t.mirror,
		hide: t.hide,
		unit: t.unit,
		name: t.name,
		angle: t.angle,
		minTickGap: t.minTickGap,
		tick: t.tick,
		tickFormatter: t.tickFormatter,
		niceTicks: t.niceTicks
	}), /*#__PURE__*/ P.createElement(YL, t));
}, xL);
ZL.displayName = "YAxis";
var QL = V([
	(e, t) => t,
	K,
	jh,
	zh,
	uT,
	fT,
	GT,
	ul
], rE);
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/getRelativeCoordinate.js
function $L(e) {
	return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function eR(e) {
	var t = e.currentTarget.getBoundingClientRect(), n, r;
	if ($L(e)) {
		var i = e.currentTarget.getBBox();
		n = i.width > 0 ? t.width / i.width : 1, r = i.height > 0 ? t.height / i.height : 1;
	} else {
		var a = e.currentTarget;
		n = a.offsetWidth > 0 ? t.width / a.offsetWidth : 1, r = a.offsetHeight > 0 ? t.height / a.offsetHeight : 1;
	}
	var o = (e, i) => ({
		relativeX: Math.round((e - t.left) / n),
		relativeY: Math.round((i - t.top) / r)
	});
	return "touches" in e ? Array.from(e.touches).map((e) => o(e.clientX, e.clientY)) : o(e.clientX, e.clientY);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/mouseEventsMiddleware.js
var tR = ns("mouseClick"), nR = lc();
nR.startListening({
	actionCreator: tR,
	effect: (e, t) => {
		var n = e.payload, r = QL(t.getState(), eR(n));
		r?.activeIndex != null && t.dispatch(hw({
			activeIndex: r.activeIndex,
			activeDataKey: void 0,
			activeCoordinate: r.activeCoordinate
		}));
	}
});
var rR = ns("mouseMove"), iR = lc(), aR = null, oR = null, sR = null;
iR.startListening({
	actionCreator: rR,
	effect: (e, t) => {
		var n = e.payload, r = t.getState().eventSettings, i = r.throttleDelay, a = r.throttledEvents, o = a === "all" || a?.includes("mousemove");
		aR !== null && (cancelAnimationFrame(aR), aR = null), oR === null || typeof i == "number" && o || (clearTimeout(oR), oR = null), sR = eR(n);
		var s = () => {
			var e = t.getState(), n = $C(e, e.tooltip.settings.shared);
			if (!sR) aR = null, oR = null;
			else {
				if (n === "axis") {
					var r = QL(e, sR);
					r?.activeIndex == null ? t.dispatch(fw()) : t.dispatch(mw({
						activeIndex: r.activeIndex,
						activeDataKey: void 0,
						activeCoordinate: r.activeCoordinate
					}));
				}
				aR = null, oR = null;
			}
		};
		o ? i === "raf" ? aR = requestAnimationFrame(s) : typeof i == "number" && oR === null && (oR = setTimeout(s, i)) : s();
	}
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/reduxDevtoolsJsonStringifyReplacer.js
function cR(e, t) {
	return t instanceof HTMLElement ? `HTMLElement <${t.tagName} class="${t.className}">` : t === window ? "global.window" : e === "children" && typeof t == "object" && t ? "<<CHILDREN>>" : t;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/rootPropsSlice.js
var lR = {
	accessibilityLayer: !0,
	barCategoryGap: "10%",
	barGap: 4,
	barSize: void 0,
	className: void 0,
	maxBarSize: void 0,
	stackOffset: "none",
	syncId: void 0,
	syncMethod: "index",
	baseValue: void 0,
	reverseStackOrder: !1
}, uR = Cs({
	name: "rootProps",
	initialState: lR,
	reducers: { updateOptions: (e, t) => {
		e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = t.payload.barGap ?? lR.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
	} }
}), dR = uR.reducer, fR = uR.actions.updateOptions, pR = Cs({
	name: "polarOptions",
	initialState: null,
	reducers: { updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e) }
}), mR = pR.actions.updatePolarOptions, hR = pR.reducer, gR = ns("keyDown"), _R = ns("focus"), vR = ns("blur"), yR = lc(), bR = null, xR = null, SR = null;
yR.startListening({
	actionCreator: gR,
	effect: (e, t) => {
		SR = e.payload, bR !== null && (cancelAnimationFrame(bR), bR = null);
		var n = t.getState().eventSettings, r = n.throttleDelay, i = n.throttledEvents, a = i === "all" || i.includes("keydown");
		xR === null || typeof r == "number" && a || (clearTimeout(xR), xR = null);
		var o = () => {
			try {
				var e = t.getState();
				if (e.rootProps.accessibilityLayer === !1) return;
				var n = e.tooltip.keyboardInteraction, r = SR;
				if (r !== "ArrowRight" && r !== "ArrowLeft" && r !== "Enter") return;
				var i = Aw(n, Qw(e), wS(e), sT(e)), a = i == null ? -1 : Number(i), o = !Number.isFinite(a) || a < 0, s = fT(e), c = Qw(e), l = $C(e, e.tooltip.settings.shared);
				if (r === "Enter") {
					if (o) return;
					var u = XT(e, l, "hover", String(n.index));
					t.dispatch(_w({
						active: !n.active,
						activeIndex: n.index,
						activeCoordinate: u
					}));
					return;
				}
				var d = YC(e) === "left-to-right" ? 1 : -1, f = r === "ArrowRight" ? 1 : -1, p;
				if (o) {
					var m = wS(e), h = sT(e), g = f * d, _ = (e) => ({
						active: !1,
						index: String(e),
						dataKey: void 0,
						graphicalItemId: void 0,
						coordinate: void 0
					});
					if (p = -1, g > 0) {
						for (var v = 0; v < c.length; v++) if (Aw(_(v), c, m, h) != null) {
							p = v;
							break;
						}
					} else for (var y = c.length - 1; y >= 0; y--) if (Aw(_(y), c, m, h) != null) {
						p = y;
						break;
					}
					if (p < 0) return;
				} else {
					p = a + f * d;
					var b = s?.length || c.length;
					if (b === 0 || p >= b || p < 0) return;
				}
				var x = XT(e, l, "hover", String(p));
				t.dispatch(_w({
					active: !0,
					activeIndex: p.toString(),
					activeCoordinate: x
				}));
			} finally {
				bR = null, xR = null;
			}
		};
		a ? r === "raf" ? bR = requestAnimationFrame(o) : typeof r == "number" && xR === null && (o(), SR = null, xR = setTimeout(() => {
			SR ? o() : (xR = null, bR = null);
		}, r)) : o();
	}
}), yR.startListening({
	actionCreator: _R,
	effect: (e, t) => {
		var n = t.getState();
		if (n.rootProps.accessibilityLayer !== !1) {
			var r = n.tooltip.keyboardInteraction;
			if (!r.active && r.index == null) {
				var i = "0", a = XT(n, $C(n, n.tooltip.settings.shared), "hover", String(i));
				t.dispatch(_w({
					active: !0,
					activeIndex: i,
					activeCoordinate: a
				}));
			}
		}
	}
}), yR.startListening({
	actionCreator: vR,
	effect: (e, t) => {
		var n = t.getState();
		if (n.rootProps.accessibilityLayer !== !1) {
			var r = n.tooltip.keyboardInteraction;
			r.active && t.dispatch(_w({
				active: !1,
				activeIndex: r.index,
				activeCoordinate: r.coordinate
			}));
		}
	}
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/createEventProxy.js
function CR(e) {
	e.persist();
	var t = e.currentTarget;
	return new Proxy(e, { get: (e, n) => {
		if (n === "currentTarget") return t;
		var r = Reflect.get(e, n);
		return typeof r == "function" ? r.bind(e) : r;
	} });
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/externalEventsMiddleware.js
var wR = ns("externalEvent"), TR = lc(), ER = /* @__PURE__ */ new Map(), DR = /* @__PURE__ */ new Map(), OR = /* @__PURE__ */ new Map();
TR.startListening({
	actionCreator: wR,
	effect: (e, t) => {
		var n = e.payload, r = n.handler, i = n.reactEvent;
		if (r != null) {
			var a = i.type, o = CR(i);
			OR.set(a, {
				handler: r,
				reactEvent: o
			});
			var s = ER.get(a);
			s !== void 0 && (cancelAnimationFrame(s), ER.delete(a));
			var c = t.getState().eventSettings, l = c.throttleDelay, u = c.throttledEvents, d = u === "all" || u?.includes(a), f = DR.get(a);
			f === void 0 || typeof l == "number" && d || (clearTimeout(f), DR.delete(a));
			var p = () => {
				var e = OR.get(a);
				try {
					if (!e) return;
					var n = e.handler, r = e.reactEvent, i = t.getState(), o = {
						activeCoordinate: ST(i),
						activeDataKey: yT(i),
						activeIndex: _T(i),
						activeLabel: vT(i),
						activeTooltipIndex: _T(i),
						isTooltipActive: CT(i)
					};
					n && n(o, r);
				} finally {
					ER.delete(a), DR.delete(a), OR.delete(a);
				}
			};
			if (!d) p();
			else if (l === "raf") {
				var m = requestAnimationFrame(p);
				ER.set(a, m);
			} else if (typeof l == "number") {
				if (!DR.has(a)) {
					p();
					var h = setTimeout(p, l);
					DR.set(a, h);
				}
			} else p();
		}
	}
});
var kR = V([
	V([Pw], (e) => e.tooltipItemPayloads),
	(e, t) => t,
	(e, t, n) => n
], (e, t, n) => {
	if (t != null) {
		var r = e.find((e) => e.settings.graphicalItemId === n);
		if (r != null) {
			var i = r.getPosition;
			if (i != null) return i(t);
		}
	}
}), AR = ns("touchMove"), jR = lc(), MR = null, NR = null, PR = null, FR = null;
jR.startListening({
	actionCreator: AR,
	effect: (e, t) => {
		var n = e.payload;
		if (n.touches != null && n.touches.length !== 0) {
			FR = CR(n);
			var r = t.getState().eventSettings, i = r.throttleDelay, a = r.throttledEvents, o = a === "all" || a.includes("touchmove");
			MR !== null && (cancelAnimationFrame(MR), MR = null), NR === null || typeof i == "number" && o || (clearTimeout(NR), NR = null), PR = Array.from(n.touches).map((e) => eR({
				clientX: e.clientX,
				clientY: e.clientY,
				currentTarget: n.currentTarget
			}));
			var s = () => {
				if (FR != null) {
					var e = t.getState(), n = $C(e, e.tooltip.settings.shared);
					if (n === "axis") {
						var r = PR?.[0];
						if (r == null) {
							MR = null, NR = null;
							return;
						}
						var i = QL(e, r);
						i?.activeIndex != null && t.dispatch(mw({
							activeIndex: i.activeIndex,
							activeDataKey: void 0,
							activeCoordinate: i.activeCoordinate
						}));
					} else if (n === "item") {
						var a = FR.touches[0];
						if (document.elementFromPoint == null || a == null) return;
						var o = document.elementFromPoint(a.clientX, a.clientY);
						if (!o || !o.getAttribute) return;
						var s = o.getAttribute(Qc), c = o.getAttribute("data-recharts-item-id") ?? void 0, l = Jw(e).find((e) => e.id === c);
						if (s == null || l == null || c == null) return;
						var u = l.dataKey, d = kR(e, s, c);
						t.dispatch(uw({
							activeDataKey: u,
							activeIndex: s,
							activeCoordinate: d,
							activeGraphicalItemId: c
						}));
					}
					MR = null, NR = null;
				}
			};
			o ? i === "raf" ? MR = requestAnimationFrame(s) : typeof i == "number" && NR === null && (s(), FR = null, NR = setTimeout(() => {
				FR ? s() : (NR = null, MR = null);
			}, i)) : s();
		}
	}
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/eventSettingsSlice.js
var IR = {
	throttleDelay: "raf",
	throttledEvents: [
		"mousemove",
		"touchmove",
		"pointermove",
		"scroll",
		"wheel"
	]
}, LR = Cs({
	name: "eventSettings",
	initialState: IR,
	reducers: { setEventSettings: (e, t) => {
		t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = H(t.payload.throttledEvents));
	} }
}), RR = LR.actions.setEventSettings, zR = LR.reducer, BR = Ta({
	brush: sM,
	cartesianAxis: kj,
	chartData: KE,
	errorBars: wP,
	eventSettings: zR,
	graphicalItems: $A,
	layout: _c,
	legend: hu,
	options: zE,
	polarAxis: zk,
	polarOptions: hR,
	referenceElements: gM,
	renderedTicks: hN,
	rootProps: dR,
	tooltip: vw,
	zIndex: bE
}), VR = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
	return ps({
		reducer: BR,
		preloadedState: e,
		middleware: (e) => e({
			serializableCheck: !1,
			immutableCheck: ![
				"commonjs",
				"es6",
				"production"
			].includes("es6")
		}).concat([
			nR.middleware,
			iR.middleware,
			yR.middleware,
			TR.middleware,
			jR.middleware
		]),
		enhancers: (e) => {
			var t = e;
			return typeof e == "function" && (t = e()), t.concat(ds({ type: "raf" }));
		},
		devTools: jd.devToolsEnabled && {
			serialize: { replacer: cR },
			name: `recharts-${t}`
		}
	});
};
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/RechartsStoreProvider.js
function HR(e) {
	var t = e.preloadedState, n = e.children, r = e.reduxStoreName, i = ml(), a = (0, P.useRef)(null);
	if (i) return n;
	a.current ??= VR(t, r);
	var o = Ai;
	return /*#__PURE__*/ P.createElement(Au, {
		context: o,
		store: a.current
	}, n);
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/ReportMainChartProps.js
function UR(e) {
	var t = e.layout, n = e.margin, r = z(), i = ml();
	return (0, P.useEffect)(() => {
		i || (r(mc(t)), r(pc(n)));
	}, [
		r,
		i,
		t,
		n
	]), null;
}
var WR = /*#__PURE__*/ (0, P.memo)(UR, Nu);
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/ReportChartProps.js
function GR(e) {
	var t = z();
	return (0, P.useEffect)(() => {
		t(fR(e));
	}, [t, e]), null;
}
var KR = /*#__PURE__*/ (0, P.memo)((e) => {
	var t = z();
	return (0, P.useEffect)(() => {
		t(RR(e));
	}, [t, e]), null;
}, Nu);
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/zIndex/ZIndexPortal.js
function qR(e) {
	var t = e.zIndex, n = e.isPanorama, r = (0, P.useRef)(null), i = z();
	return (0, P.useLayoutEffect)(() => (r.current && i(vE({
		zIndex: t,
		element: r.current,
		isPanorama: n
	})), () => {
		i(yE({
			zIndex: t,
			isPanorama: n
		}));
	}), [
		i,
		t,
		n
	]), /*#__PURE__*/ P.createElement("g", {
		tabIndex: -1,
		ref: r,
		className: `recharts-zIndex-layer_${t}`
	});
}
function JR(e) {
	var t = e.children, n = e.isPanorama, r = B(aE);
	if (!r || r.length === 0) return t;
	var i = r.filter((e) => e < 0), a = r.filter((e) => e > 0);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, i.map((e) => /*#__PURE__*/ P.createElement(qR, {
		key: e,
		zIndex: e,
		isPanorama: n
	})), t, a.map((e) => /*#__PURE__*/ P.createElement(qR, {
		key: e,
		zIndex: e,
		isPanorama: n
	})));
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/container/RootSurface.js
var YR = ["children"];
function XR(e, t) {
	if (e == null) return {};
	var n, r, i = ZR(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ZR(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function QR() {
	return QR = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, QR.apply(null, arguments);
}
var $R = {
	width: "100%",
	height: "100%",
	display: "block"
}, ez = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = $l(), r = eu(), i = $d();
	if (!yc(n) || !yc(r)) return null;
	var a = e.children, o = e.otherAttributes, s = e.title, c = e.desc, l, u;
	return o != null && (l = typeof o.tabIndex == "number" ? o.tabIndex : i ? 0 : void 0, u = typeof o.role == "string" ? o.role : i ? "application" : void 0), /*#__PURE__*/ P.createElement(Ce, QR({}, o, {
		title: s,
		desc: c,
		role: u,
		tabIndex: l,
		width: n,
		height: r,
		style: $R,
		ref: t
	}), a);
}), tz = (e) => {
	var t = e.children, n = B(gl);
	if (!n) return null;
	var r = n.width, i = n.height, a = n.y, o = n.x;
	return /*#__PURE__*/ P.createElement(Ce, {
		width: r,
		height: i,
		x: o,
		y: a
	}, t);
}, nz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.children, r = XR(e, YR);
	return ml() ? /*#__PURE__*/ P.createElement(tz, null, /*#__PURE__*/ P.createElement(JR, { isPanorama: !0 }, n)) : /*#__PURE__*/ P.createElement(ez, QR({ ref: t }, r), /*#__PURE__*/ P.createElement(JR, { isPanorama: !1 }, n));
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/useReportScale.js
function rz(e, t) {
	return cz(e) || sz(e, t) || az(e, t) || iz();
}
function iz() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function az(e, t) {
	if (e) {
		if (typeof e == "string") return oz(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? oz(e, t) : void 0;
	}
}
function oz(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function sz(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function cz(e) {
	if (Array.isArray(e)) return e;
}
function lz() {
	var e = z(), t = rz((0, P.useState)(null), 2), n = t[0], r = t[1], i = B(Jc);
	return (0, P.useEffect)(() => {
		if (n != null) {
			var t = n.getBoundingClientRect().width / n.offsetWidth;
			W(t) && t !== i && e(gc(t));
		}
	}, [
		n,
		e,
		i
	]), r;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/chart/RechartsWrapper.js
function uz(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function dz(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? uz(Object(n), !0).forEach(function(t) {
			fz(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : uz(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function fz(e, t, n) {
	return (t = pz(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function pz(e) {
	var t = mz(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function mz(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function hz() {
	return hz = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, hz.apply(null, arguments);
}
function gz(e, t) {
	return xz(e) || bz(e, t) || vz(e, t) || _z();
}
function _z() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function vz(e, t) {
	if (e) {
		if (typeof e == "string") return yz(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? yz(e, t) : void 0;
	}
}
function yz(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function bz(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function xz(e) {
	if (Array.isArray(e)) return e;
}
var Sz = () => (rD(), null);
function Cz(e) {
	if (typeof e == "number") return e;
	if (typeof e == "string") {
		var t = parseFloat(e);
		if (!Number.isNaN(t)) return t;
	}
	return 0;
}
var wz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = (0, P.useRef)(null), r = gz((0, P.useState)({
		containerWidth: Cz(e.style?.width),
		containerHeight: Cz(e.style?.height)
	}), 2), i = r[0], a = r[1], o = (0, P.useCallback)((e, t) => {
		a((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []), s = (0, P.useCallback)((e) => {
		if (typeof t == "function" && t(e), n.current != null && (n.current.disconnect(), n.current = null), e != null && typeof ResizeObserver < "u") {
			var r = e.getBoundingClientRect(), i = r.width, a = r.height;
			o(i, a);
			var s = new ResizeObserver((e) => {
				var t = e[0];
				if (t != null) {
					var n = t.contentRect, r = n.width, i = n.height;
					o(r, i);
				}
			});
			s.observe(e), n.current = s;
		}
	}, [t, o]);
	return (0, P.useEffect)(() => () => {
		n.current?.disconnect();
	}, [o]), /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(su, {
		width: i.containerWidth,
		height: i.containerHeight
	}), /*#__PURE__*/ P.createElement("div", hz({ ref: s }, e)));
}), Tz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height, i = gz((0, P.useState)({
		containerWidth: Cz(n),
		containerHeight: Cz(r)
	}), 2), a = i[0], o = i[1], s = (0, P.useCallback)((e, t) => {
		o((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []), c = (0, P.useCallback)((e) => {
		if (typeof t == "function" && t(e), e != null) {
			var n = e.getBoundingClientRect(), r = n.width, i = n.height;
			s(r, i);
		}
	}, [t, s]);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(su, {
		width: a.containerWidth,
		height: a.containerHeight
	}), /*#__PURE__*/ P.createElement("div", hz({ ref: c }, e)));
}), Ez = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height;
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(su, {
		width: n,
		height: r
	}), /*#__PURE__*/ P.createElement("div", hz({ ref: t }, e)));
}), Dz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height;
	return typeof n == "string" || typeof r == "string" ? /*#__PURE__*/ P.createElement(Tz, hz({}, e, { ref: t })) : typeof n == "number" && typeof r == "number" ? /*#__PURE__*/ P.createElement(Ez, hz({}, e, {
		width: n,
		height: r,
		ref: t
	})) : /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(su, {
		width: n,
		height: r
	}), /*#__PURE__*/ P.createElement("div", hz({ ref: t }, e)));
});
function Oz(e) {
	return e ? wz : Dz;
}
var kz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.children, r = e.className, i = e.height, a = e.onClick, o = e.onContextMenu, s = e.onDoubleClick, c = e.onMouseDown, u = e.onMouseEnter, d = e.onMouseLeave, f = e.onMouseMove, p = e.onMouseUp, m = e.onTouchEnd, h = e.onTouchMove, g = e.onTouchStart, _ = e.style, v = e.width, y = e.responsive, b = e.dispatchTouchEvents, x = b === void 0 || b, S = (0, P.useRef)(null), C = z(), w = gz((0, P.useState)(null), 2), T = w[0], E = w[1], D = gz((0, P.useState)(null), 2), O = D[0], k = D[1], A = lz(), j = ql(), M = j?.width > 0 ? j.width : v, N = j?.height > 0 ? j.height : i, ee = (0, P.useCallback)((e) => {
		A(e), typeof t == "function" && t(e), E(e), k(e), e != null && (S.current = e);
	}, [
		A,
		t,
		E,
		k
	]), te = (0, P.useCallback)((e) => {
		C(tR(e)), C(wR({
			handler: a,
			reactEvent: e
		}));
	}, [C, a]), ne = (0, P.useCallback)((e) => {
		C(rR(e)), C(wR({
			handler: u,
			reactEvent: e
		}));
	}, [C, u]), re = (0, P.useCallback)((e) => {
		C(fw()), C(wR({
			handler: d,
			reactEvent: e
		}));
	}, [C, d]), ie = (0, P.useCallback)((e) => {
		C(rR(e)), C(wR({
			handler: f,
			reactEvent: e
		}));
	}, [C, f]), ae = (0, P.useCallback)(() => {
		C(_R());
	}, [C]), oe = (0, P.useCallback)(() => {
		C(vR());
	}, [C]), se = (0, P.useCallback)((e) => {
		C(gR(e.key));
	}, [C]), ce = (0, P.useCallback)((e) => {
		C(wR({
			handler: o,
			reactEvent: e
		}));
	}, [C, o]), le = (0, P.useCallback)((e) => {
		C(wR({
			handler: s,
			reactEvent: e
		}));
	}, [C, s]), ue = (0, P.useCallback)((e) => {
		C(wR({
			handler: c,
			reactEvent: e
		}));
	}, [C, c]), de = (0, P.useCallback)((e) => {
		C(wR({
			handler: p,
			reactEvent: e
		}));
	}, [C, p]), fe = (0, P.useCallback)((e) => {
		C(wR({
			handler: g,
			reactEvent: e
		}));
	}, [C, g]), pe = (0, P.useCallback)((e) => {
		x && C(AR(e)), C(wR({
			handler: h,
			reactEvent: e
		}));
	}, [
		C,
		x,
		h
	]), me = (0, P.useCallback)((e) => {
		C(wR({
			handler: m,
			reactEvent: e
		}));
	}, [C, m]), he = Oz(y);
	return /*#__PURE__*/ P.createElement(jE.Provider, { value: T }, /*#__PURE__*/ P.createElement(ft.Provider, { value: O }, /*#__PURE__*/ P.createElement(he, {
		width: M ?? _?.width,
		height: N ?? _?.height,
		className: l("recharts-wrapper", r),
		style: dz({
			position: "relative",
			cursor: "default",
			width: M,
			height: N
		}, _),
		onClick: te,
		onContextMenu: ce,
		onDoubleClick: le,
		onFocus: ae,
		onBlur: oe,
		onKeyDown: se,
		onMouseDown: ue,
		onMouseEnter: ne,
		onMouseLeave: re,
		onMouseMove: ie,
		onMouseUp: de,
		onTouchEnd: me,
		onTouchMove: pe,
		onTouchStart: fe,
		ref: ee
	}, /*#__PURE__*/ P.createElement(Sz, null), n)));
}), Az = [
	"width",
	"height",
	"responsive",
	"children",
	"className",
	"style",
	"compact",
	"title",
	"desc"
];
function jz(e, t) {
	if (e == null) return {};
	var n, r, i = Mz(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Mz(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Nz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height, i = e.responsive, a = e.children, o = e.className, s = e.style, c = e.compact, l = e.title, u = e.desc, d = he(jz(e, Az));
	return c ? /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(su, {
		width: n,
		height: r
	}), /*#__PURE__*/ P.createElement(nz, {
		otherAttributes: d,
		title: l,
		desc: u
	}, a)) : /*#__PURE__*/ P.createElement(kz, {
		className: o,
		style: s,
		width: n,
		height: r,
		responsive: i ?? !1,
		onClick: e.onClick,
		onMouseLeave: e.onMouseLeave,
		onMouseEnter: e.onMouseEnter,
		onMouseMove: e.onMouseMove,
		onMouseDown: e.onMouseDown,
		onMouseUp: e.onMouseUp,
		onContextMenu: e.onContextMenu,
		onDoubleClick: e.onDoubleClick,
		onTouchStart: e.onTouchStart,
		onTouchMove: e.onTouchMove,
		onTouchEnd: e.onTouchEnd
	}, /*#__PURE__*/ P.createElement(nz, {
		otherAttributes: d,
		title: l,
		desc: u,
		ref: t
	}, /*#__PURE__*/ P.createElement(wM, null, a)));
});
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/chart/CartesianChart.js
function Pz() {
	return Pz = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Pz.apply(null, arguments);
}
function Fz(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Iz(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Fz(Object(n), !0).forEach(function(t) {
			Lz(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Fz(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Lz(e, t, n) {
	return (t = Rz(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Rz(e) {
	var t = zz(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function zz(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Bz = Iz({
	accessibilityLayer: !0,
	barCategoryGap: "10%",
	barGap: 4,
	layout: "horizontal",
	margin: {
		top: 5,
		right: 5,
		bottom: 5,
		left: 5
	},
	responsive: !1,
	reverseStackOrder: !1,
	stackOffset: "none",
	syncMethod: "index"
}, IR), Vz = /*#__PURE__*/ (0, P.forwardRef)(function(e, t) {
	var n = sr(e.categoricalChartProps, Bz), r = e.chartName, i = e.defaultTooltipEventType, a = e.validateTooltipEventTypes, o = e.tooltipPayloadSearcher, s = e.categoricalChartProps, c = {
		chartName: r,
		defaultTooltipEventType: i,
		validateTooltipEventTypes: a,
		tooltipPayloadSearcher: o,
		eventEmitter: void 0
	};
	return /*#__PURE__*/ P.createElement(HR, {
		preloadedState: { options: c },
		reduxStoreName: s.id ?? r
	}, /*#__PURE__*/ P.createElement(iM, { chartData: s.data }), /*#__PURE__*/ P.createElement(WR, {
		layout: n.layout,
		margin: n.margin
	}), /*#__PURE__*/ P.createElement(KR, {
		throttleDelay: n.throttleDelay,
		throttledEvents: n.throttledEvents
	}), /*#__PURE__*/ P.createElement(GR, {
		baseValue: n.baseValue,
		accessibilityLayer: n.accessibilityLayer,
		barCategoryGap: n.barCategoryGap,
		maxBarSize: n.maxBarSize,
		stackOffset: n.stackOffset,
		barGap: n.barGap,
		barSize: n.barSize,
		syncId: n.syncId,
		syncMethod: n.syncMethod,
		className: n.className,
		reverseStackOrder: n.reverseStackOrder
	}), /*#__PURE__*/ P.createElement(Nz, Pz({}, n, { ref: t })));
}), Hz = ["axis"], Uz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => /*#__PURE__*/ P.createElement(Vz, {
	chartName: "LineChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: Hz,
	tooltipPayloadSearcher: LE,
	categoricalChartProps: e,
	ref: t
})), Wz = ["axis", "item"], Gz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => /*#__PURE__*/ P.createElement(Vz, {
	chartName: "BarChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: Wz,
	tooltipPayloadSearcher: LE,
	categoricalChartProps: e,
	ref: t
}));
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/ReportPolarOptions.js
function Kz(e) {
	var t = z();
	return (0, P.useEffect)(() => {
		t(mR(e));
	}, [t, e]), null;
}
// node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/chart/PolarChart.js
var qz = ["layout"];
function Jz() {
	return Jz = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Jz.apply(null, arguments);
}
function Yz(e, t) {
	if (e == null) return {};
	var n, r, i = Xz(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Xz(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Zz(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Qz(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Zz(Object(n), !0).forEach(function(t) {
			$z(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Zz(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function $z(e, t, n) {
	return (t = eB(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function eB(e) {
	var t = tB(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function tB(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var nB = Qz({
	accessibilityLayer: !0,
	stackOffset: "none",
	barCategoryGap: "10%",
	barGap: 4,
	margin: {
		top: 5,
		right: 5,
		bottom: 5,
		left: 5
	},
	reverseStackOrder: !1,
	syncMethod: "index",
	layout: "radial",
	responsive: !1,
	cx: "50%",
	cy: "50%",
	innerRadius: 0,
	outerRadius: "80%"
}, IR), rB = /*#__PURE__*/ (0, P.forwardRef)(function(e, t) {
	var n = sr(e.categoricalChartProps, nB), r = n.layout, i = Yz(n, qz), a = e.chartName, o = {
		chartName: a,
		defaultTooltipEventType: e.defaultTooltipEventType,
		validateTooltipEventTypes: e.validateTooltipEventTypes,
		tooltipPayloadSearcher: e.tooltipPayloadSearcher,
		eventEmitter: void 0
	};
	return /*#__PURE__*/ P.createElement(HR, {
		preloadedState: { options: o },
		reduxStoreName: n.id ?? a
	}, /*#__PURE__*/ P.createElement(iM, { chartData: n.data }), /*#__PURE__*/ P.createElement(WR, {
		layout: r,
		margin: n.margin
	}), /*#__PURE__*/ P.createElement(KR, {
		throttleDelay: n.throttleDelay,
		throttledEvents: n.throttledEvents
	}), /*#__PURE__*/ P.createElement(GR, {
		baseValue: void 0,
		accessibilityLayer: n.accessibilityLayer,
		barCategoryGap: n.barCategoryGap,
		maxBarSize: n.maxBarSize,
		stackOffset: n.stackOffset,
		barGap: n.barGap,
		barSize: n.barSize,
		syncId: n.syncId,
		syncMethod: n.syncMethod,
		className: n.className,
		reverseStackOrder: n.reverseStackOrder
	}), /*#__PURE__*/ P.createElement(Kz, {
		cx: n.cx,
		cy: n.cy,
		startAngle: n.startAngle,
		endAngle: n.endAngle,
		innerRadius: n.innerRadius,
		outerRadius: n.outerRadius
	}), /*#__PURE__*/ P.createElement(Nz, Jz({}, i, { ref: t })));
}), iB = ["axis"], aB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => /*#__PURE__*/ P.createElement(Vz, {
	chartName: "AreaChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: iB,
	tooltipPayloadSearcher: LE,
	categoricalChartProps: e,
	ref: t
}));
// src/react/charts/cn.ts
function oB(...e) {
	return d(l(e));
}
// src/react/evilcharts/registry/ui/recharts-chart.tsx
var $ = _(), sB = {
	light: "",
	dark: ".dark"
}, cB = Object.keys(sB);
function lB(e) {
	for (let [t, n] of Object.entries(e)) if (n.colors && !cB.some((e) => n.colors?.[e] !== void 0)) throw Error(`[EvilCharts] Invalid chart config for "${t}": colors object must have at least one theme key (${cB.join(", ")}). Received empty object or invalid keys.`);
}
var uB = P.createContext(null);
function dB() {
	let e = P.useContext(uB);
	if (!e) throw Error("useChart must be used within a <ChartContainer />");
	return e;
}
function fB({ id: e, config: t, initialDimension: n = {
	width: 320,
	height: 200
}, className: r, children: i, footer: a, ...o }) {
	let s = P.useId(), c = `chart-${e ?? s.replace(/:/g, "")}`;
	return lB(t), /* @__PURE__ */ (0, $.jsx)(uB.Provider, {
		value: { config: t },
		children: /* @__PURE__ */ (0, $.jsxs)("div", {
			"data-slot": "chart",
			"data-chart": c,
			className: oB("min-h-0 w-full flex-1", "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border relative flex flex-col justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", !a && "aspect-video", r),
			...o,
			children: [
				/* @__PURE__ */ (0, $.jsx)(hB, {
					id: c,
					config: t
				}),
				/* @__PURE__ */ (0, $.jsx)(Yl, {
					className: "min-h-0 w-full flex-1",
					initialDimension: n,
					children: i
				}),
				a
			]
		})
	});
}
function pB({ isLoading: e }) {
	return e ? /* @__PURE__ */ (0, $.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center",
		children: /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "text-primary bg-background flex items-center justify-center gap-2 rounded-md border px-2 py-0.5 text-sm",
			children: [/* @__PURE__ */ (0, $.jsx)("div", { className: "border-border border-t-primary h-3 w-3 animate-spin rounded-full border" }), /* @__PURE__ */ (0, $.jsx)("span", { children: "Loading" })]
		})
	}) : null;
}
function mB(e, t) {
	let n = e.length;
	if (n >= t) return e.slice(0, t);
	let r = [], i = Math.floor(t / n), a = t % n;
	for (let t = 0; t < n; t++) {
		let o = i + +(t >= n - a);
		for (let n = 0; n < o; n++) r.push(e[t]);
	}
	return r;
}
var hB = ({ id: e, config: t }) => {
	let n = Object.entries(t).filter(([, e]) => e.colors);
	if (!n.length) return null;
	let r = (e) => n.flatMap(([t, n]) => {
		let r = n.colors?.[e];
		return !r || !Array.isArray(r) || r.length === 0 ? [] : mB(r, _B(n)).map((e, n) => `  --color-${t}-${n}: ${e};`);
	}).filter(Boolean).join("\n"), i = Object.entries(sB).map(([t, n]) => `${n} [data-chart=${e}] {\n${r(t)}\n}`).join("\n");
	return /* @__PURE__ */ (0, $.jsx)("style", { dangerouslySetInnerHTML: { __html: i } });
};
function gB(e, t, n) {
	if (typeof t != "object" || !t) return;
	let r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0, i = n;
	return n in t && typeof t[n] == "string" ? i = t[n] : r && n in r && typeof r[n] == "string" && (i = r[n]), i in e ? e[i] : e[n];
}
function _B(e) {
	if (!e.colors) return 1;
	let t = cB.map((t) => e.colors?.[t]?.length ?? 0);
	return Math.max(...t, 1);
}
var vB = (e = 10, t = 0, n = 70) => {
	let r = n - t;
	return Array.from({ length: e }, () => ({ loading: Math.floor(Math.random() * r) + t }));
}, yB = {
	sm: "rounded-sm",
	md: "rounded-md",
	lg: "rounded-lg",
	xl: "rounded-xl"
}, bB = {
	default: "bg-background",
	"frosted-glass": "bg-background/70 backdrop-blur-sm"
};
function xB({ active: e, payload: t, className: n, indicator: r = "dot", hideLabel: i = !1, hideIndicator: a = !1, label: o, labelFormatter: s, labelClassName: c, formatter: l, nameKey: u, labelKey: d, selected: f, roundness: p = "lg", variant: m = "default" }) {
	let { config: h } = dB(), g = P.useMemo(() => {
		if (i || !t?.length) return null;
		let [e] = t, n = `${d ?? e?.dataKey ?? e?.name ?? "value"}`, r = gB(h, e, n), a = !d && typeof o == "string" ? h[o]?.label ?? o : r?.label;
		return s ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: oB("font-medium", c),
			children: s(a, t)
		}) : a ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: oB("font-medium", c),
			children: a
		}) : null;
	}, [
		o,
		s,
		t,
		i,
		c,
		h,
		d
	]);
	if (!e || !t?.length) return /* @__PURE__ */ (0, $.jsx)("span", { className: "p-4" });
	let _ = t.length === 1 && r !== "dot";
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: oB("border-border/50 grid min-w-32 items-start gap-1.5 border px-2.5 py-1.5 text-xs shadow-xl", yB[p], bB[m], n),
		children: [_ ? null : g, /* @__PURE__ */ (0, $.jsx)("div", {
			className: "grid gap-1.5",
			children: t.filter((e) => e.type !== "none").map((e, t) => {
				let n = `${(u && e.payload ? e.payload[u] : void 0) ?? e.name ?? e.dataKey ?? "value"}`, i = gB(h, e, n), o = i ? _B(i) : 1;
				return /* @__PURE__ */ (0, $.jsx)("div", {
					className: oB("[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5", r === "dot" && "items-center", f != null && f !== e.dataKey && "opacity-30"),
					children: l && e?.value !== void 0 && e.name ? l(e.value, e.name, e, t, e.payload) : /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [i?.icon ? /* @__PURE__ */ (0, $.jsx)(i.icon, {}) : !a && /* @__PURE__ */ (0, $.jsx)("div", {
						className: oB("shrink-0 rounded-[2px]", {
							"h-2.5 w-2.5": r === "dot",
							"w-1": r === "line",
							"w-0 border-[1.5px] border-dashed bg-transparent!": r === "dashed",
							"my-0.5": _ && r === "dashed"
						}),
						style: SB(n, o)
					}), /* @__PURE__ */ (0, $.jsxs)("div", {
						className: oB("flex flex-1 justify-between gap-4 leading-none", _ ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ (0, $.jsxs)("div", {
							className: "grid gap-1.5",
							children: [_ ? g : null, /* @__PURE__ */ (0, $.jsx)("span", {
								className: "text-muted-foreground",
								children: i?.label ?? e.name
							})]
						}), e.value != null && /* @__PURE__ */ (0, $.jsx)("span", {
							className: "text-foreground font-mono font-medium tabular-nums",
							children: typeof e.value == "number" ? e.value.toLocaleString() : String(e.value)
						})]
					})] })
				}, t);
			})
		})]
	});
}
function SB(e, t) {
	return t <= 1 ? { background: `var(--color-${e}-0)` } : { background: `linear-gradient(to right, ${Array.from({ length: t }, (n, r) => `var(--color-${e}-${r}) ${r / (t - 1) * 100}%`).join(", ")})` };
}
var CB = ({ animationDuration: e = 200, ...t }) => /* @__PURE__ */ (0, $.jsx)(bD, {
	animationDuration: e,
	...t
});
// src/react/evilcharts/registry/ui/recharts-legend.tsx
function wB({ className: e, hideIcon: t = !1, nameKey: n, payload: r, verticalAlign: i, align: a = "right", selected: o, onSelectChange: s, isClickable: c, variant: l = "rounded-square" }) {
	let { config: u } = dB();
	return r?.length ? /* @__PURE__ */ (0, $.jsx)("div", {
		className: oB("flex items-center gap-4 select-none", a === "left" && "justify-start", a === "center" && "justify-center", a === "right" && "justify-end", i === "top" ? "pb-4" : "pt-4", e),
		children: r.filter((e) => e.type !== "none").map((e) => {
			let r = `${(n && e.payload ? e.payload[n] : void 0) ?? e.value ?? e.dataKey ?? "value"}`, i = gB(u, e, r), a = o === null || o === r, d = i ? _B(i) : 1;
			return /* @__PURE__ */ (0, $.jsxs)("div", {
				className: oB("[&>svg]:text-muted-foreground flex items-center gap-1.5 transition-opacity [&>svg]:h-3 [&>svg]:w-3", !a && "opacity-30", c && "cursor-pointer"),
				onClick: () => {
					c && s?.(o === r ? null : r);
				},
				children: [i?.icon && !t ? /* @__PURE__ */ (0, $.jsx)(i.icon, {}) : /* @__PURE__ */ (0, $.jsx)(TB, {
					variant: l,
					dataKey: r,
					colorsCount: d
				}), i?.label]
			}, r);
		})
	}) : null;
}
function TB({ variant: e, dataKey: t, colorsCount: n }) {
	let r = EB(t, n), i = DB(t, n);
	switch (e) {
		case "square": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2 w-2 shrink-0",
			style: r
		});
		case "circle": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2 w-2 shrink-0 rounded-full",
			style: r
		});
		case "circle-outline": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2.5 w-2.5 shrink-0 rounded-full p-[1.5px]",
			style: i
		});
		case "vertical-bar": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-3 w-1 shrink-0 rounded-[2px]",
			style: r
		});
		case "horizontal-bar": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-1 w-3 shrink-0 rounded-[2px]",
			style: r
		});
		case "rounded-square-outline": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2.5 w-2.5 shrink-0 rounded-[3px] p-[1.5px]",
			style: i
		});
		default: return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2 w-2 shrink-0 rounded-[2px]",
			style: r
		});
	}
}
function EB(e, t) {
	return t <= 1 ? { backgroundColor: `var(--color-${e}-0)` } : { background: `linear-gradient(to right, ${Array.from({ length: t }, (n, r) => `var(--color-${e}-${r}) ${r / (t - 1) * 100}%`).join(", ")})` };
}
function DB(e, t) {
	let n = {
		WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
		WebkitMaskComposite: "xor",
		mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
		maskComposite: "exclude"
	};
	return t <= 1 ? {
		backgroundColor: `var(--color-${e}-0)`,
		...n
	} : {
		background: `linear-gradient(to right, ${Array.from({ length: t }, (n, r) => `var(--color-${e}-${r}) ${r / (t - 1) * 100}%`).join(", ")})`,
		...n
	};
}
var OB = cd, kB = () => null, AB = {
	stiffness: 300,
	damping: 35,
	mass: .8
};
function jB({ range: e, totalPoints: t, containerRef: n, commit: r }) {
	let i = P.useRef(null), [a, o] = P.useState(!1), s = (0, P.useCallback)((e) => !n.current || t <= 1 ? 0 : Math.round(e / n.current.getBoundingClientRect().width * (t - 1)), [t, n]), c = (0, P.useCallback)((t, n) => {
		t.preventDefault(), t.target.setPointerCapture(t.pointerId), i.current = {
			type: n,
			originX: t.clientX,
			originRange: { ...e }
		}, o(!0);
	}, [e]), l = (0, P.useCallback)((e) => {
		let n = i.current;
		if (!n) return;
		let a = s(e.clientX - n.originX), { type: o, originRange: c } = n;
		if (o === "left") r({
			startIndex: c.startIndex + a,
			endIndex: c.endIndex
		}, "left");
		else if (o === "right") r({
			startIndex: c.startIndex,
			endIndex: c.endIndex + a
		}, "right");
		else {
			let e = c.endIndex - c.startIndex, n = c.startIndex + a, i = n + e;
			n < 0 && (n = 0, i = e), i > t - 1 && (i = t - 1, n = Math.max(0, i - e)), r({
				startIndex: n,
				endIndex: i
			}, "middle");
		}
	}, [
		s,
		t,
		r
	]), u = (0, P.useCallback)((e) => {
		e.target.releasePointerCapture(e.pointerId), i.current = null, o(!1);
	}, []);
	return {
		isDragging: a,
		bind: (0, P.useCallback)((e) => ({
			onPointerDown: (t) => c(t, e),
			onPointerMove: l,
			onPointerUp: u
		}), [
			c,
			l,
			u
		])
	};
}
function MB({ data: e, chartConfig: t, dataKeys: n, xDataKey: r, variant: i = "area", height: a = 56, className: o, stacked: s = !1, strokeVariant: c = "solid", connectNulls: l = !1, barRadius: u, startIndex: d, endIndex: f, defaultStartIndex: p = 0, defaultEndIndex: m, onChange: g, formatLabel: _, curveType: v = "monotone", minSpan: y = 2, showLabels: b = !0, skipStyle: x = !1 }) {
	let S = P.useRef(null), C = P.useMemo(() => n ?? Object.keys(t), [n, t]), w = e.length, T = P.useId().replace(/:/g, ""), E = d !== void 0 && f !== void 0, [D, O] = P.useState(() => ({
		startIndex: Math.max(0, Math.min(p, w - 1)),
		endIndex: Math.max(0, Math.min(m ?? w - 1, w - 1))
	})), k = P.useRef(D);
	(0, P.useEffect)(() => {
		E || O((e) => {
			let t = {
				startIndex: Math.min(e.startIndex, Math.max(0, w - 1)),
				endIndex: Math.min(e.endIndex, Math.max(0, w - 1))
			};
			return k.current = t, t;
		});
	}, [w, E]);
	let A = (0, P.useCallback)((e, t) => {
		let { startIndex: n, endIndex: r } = e, i = Math.max(0, w - 1);
		if (n = Math.max(0, Math.min(n, i)), r = Math.max(0, Math.min(r, i)), t === "left") {
			let e = Math.max(0, r - y);
			return n = Math.min(n, e), {
				startIndex: n,
				endIndex: r
			};
		}
		if (t === "right") {
			let e = Math.min(i, n + y);
			return r = Math.max(r, e), {
				startIndex: n,
				endIndex: r
			};
		}
		return r - n < y && (r = Math.min(n + y, i), r - n < y && (n = Math.max(0, r - y))), {
			startIndex: n,
			endIndex: r
		};
	}, [w, y]), { isDragging: j, bind: M } = jB({
		range: D,
		totalPoints: w,
		containerRef: S,
		commit: (0, P.useCallback)((e, t) => {
			let n = A(e, t), r = k.current;
			(r.startIndex !== n.startIndex || r.endIndex !== n.endIndex) && (k.current = n, O(n), P.startTransition(() => {
				g?.(n);
			}));
		}, [A, g])
	}), N = D;
	(0, P.useEffect)(() => {
		if (E && !j) {
			let e = {
				startIndex: d,
				endIndex: f
			};
			O(e), k.current = e;
		}
	}, [
		E,
		d,
		f,
		j
	]);
	let ne = w > 1 ? N.startIndex / (w - 1) * 100 : 0, re = w > 1 ? N.endIndex / (w - 1) * 100 : 100, ie = te(ne), se = te(re);
	ie.get() !== ne && ie.set(ne), se.get() !== re && se.set(re);
	let ce = ae(ie, AB), le = ae(se, AB), ue = oe(ce, (e) => `${e}%`), de = oe(le, (e) => `${e}%`), fe = oe(ce, (e) => `${e}%`), pe = oe(le, (e) => `${Math.max(0, 100 - e)}%`), me = te(`${Math.max(0, re - ne)}%`), he = (0, P.useCallback)(() => {
		me.set(`${Math.max(0, le.get() - ce.get())}%`);
	}, [
		ce,
		le,
		me
	]);
	ee(ce, "change", he), ee(le, "change", he);
	let ge = (0, P.useCallback)((t) => {
		if (!r) return String(t);
		let n = e[t]?.[r];
		return _ ? _(n, t) : String(n ?? t);
	}, [
		e,
		r,
		_
	]);
	return w === 0 ? null : /* @__PURE__ */ (0, $.jsxs)("div", {
		ref: S,
		"data-chart": x ? void 0 : T,
		className: oB("group relative select-none", o),
		style: { height: a },
		children: [
			!x && /* @__PURE__ */ (0, $.jsx)(hB, {
				id: T,
				config: t
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "absolute inset-0 overflow-hidden rounded-md",
				children: /* @__PURE__ */ (0, $.jsx)(PB, {
					data: e,
					keys: C,
					chartConfig: t,
					variant: i,
					curveType: v,
					chartId: T,
					stacked: s,
					strokeVariant: c === "animated-dashed" ? "dashed" : c,
					connectNulls: l,
					barRadius: u
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(h.div, {
				className: "bg-background/70 pointer-events-none absolute inset-y-0 left-0 rounded-l-md backdrop-blur-[2px]",
				style: { width: fe }
			}),
			/* @__PURE__ */ (0, $.jsx)(h.div, {
				className: "bg-background/70 pointer-events-none absolute inset-y-0 right-0 rounded-r-md backdrop-blur-[2px]",
				style: { width: pe }
			}),
			/* @__PURE__ */ (0, $.jsx)(h.div, {
				className: "absolute inset-y-0 cursor-grab touch-none rounded-sm border active:cursor-grabbing",
				style: {
					left: ue,
					width: me
				},
				...M("middle")
			}),
			/* @__PURE__ */ (0, $.jsx)(NB, {
				side: "left",
				position: ue,
				label: b ? ge(N.startIndex) : void 0,
				bind: M("left")
			}),
			/* @__PURE__ */ (0, $.jsx)(NB, {
				side: "right",
				position: de,
				label: b ? ge(N.endIndex) : void 0,
				bind: M("right")
			})
		]
	});
}
function NB({ side: e, position: t, label: n, bind: r }) {
	let i = e === "left";
	return /* @__PURE__ */ (0, $.jsxs)(h.div, {
		className: "absolute inset-y-0 z-10",
		style: { left: t },
		children: [/* @__PURE__ */ (0, $.jsx)("div", {
			className: oB("group absolute inset-y-0 flex w-3 cursor-ew-resize touch-none items-center justify-center after:absolute after:inset-y-0 after:-left-4 after:w-11 after:content-['']", i ? "" : "-translate-x-full"),
			...r,
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				className: oB("bg-muted-foreground group-hover:bg-foreground relative flex h-4 w-1.5 items-center justify-center rounded-md transition-colors", i ? "-left-[5.5px]" : "-right-[5.5px]"),
				children: /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-[2px]",
					children: [
						/* @__PURE__ */ (0, $.jsx)("div", { className: "bg-background/70 h-[2px] w-[2px] rounded-full" }),
						/* @__PURE__ */ (0, $.jsx)("div", { className: "bg-background/70 h-[2px] w-[2px] rounded-full" }),
						/* @__PURE__ */ (0, $.jsx)("div", { className: "bg-background/70 h-[2px] w-[2px] rounded-full" })
					]
				})
			})
		}), n && /* @__PURE__ */ (0, $.jsx)("div", {
			className: oB("bg-foreground text-background pointer-events-none absolute -bottom-3 -translate-y-1/2 rounded-[3px] px-1 py-px text-[8px] leading-tight font-medium whitespace-nowrap opacity-0 group-hover:opacity-100", i ? "left-1.5" : "right-1.5"),
			children: n
		})]
	});
}
function PB({ data: e, keys: t, chartConfig: n, variant: r, curveType: i, chartId: a, stacked: o, strokeVariant: s = "solid", connectNulls: c = !1, barRadius: l }) {
	let u = P.useMemo(() => Object.entries(n).filter(([e]) => t.includes(e)).map(([e, t]) => ({
		dataKey: e,
		colorsCount: _B(t)
	})), [n, t]), d = s === "dashed" || s === "animated-dashed" ? "4 4" : void 0, f = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [r === "area" && /* @__PURE__ */ (0, $.jsxs)("linearGradient", {
		id: `${a}-zm-vertical-fade`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: "white",
			stopOpacity: .15
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: "white",
			stopOpacity: 0
		})]
	}), u.map(({ dataKey: e, colorsCount: t }) => {
		let n = t === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${e}-0)`
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${e}-0)`
		})] }) : Array.from({ length: t }, (n, r) => /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: `${r / (t - 1) * 100}%`,
			stopColor: `var(--color-${e}-${r}, var(--color-${e}-0))`
		}, r));
		return /* @__PURE__ */ (0, $.jsxs)(P.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${a}-zm-${e}`,
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "1",
			children: n
		}), r === "area" && /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${a}-zm-fill-mask-${e}`,
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: `url(#${a}-zm-vertical-fade)`
			})
		}), /* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${a}-zm-fill-${e}`,
			patternUnits: "userSpaceOnUse",
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: `url(#${a}-zm-${e})`,
				mask: `url(#${a}-zm-fill-mask-${e})`
			})
		})] })] }, e);
	})] });
	if (r === "line") return /* @__PURE__ */ (0, $.jsx)(Yl, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsxs)(Uz, {
			data: e,
			margin: {
				top: 4,
				right: 0,
				bottom: 0,
				left: 0
			},
			children: [/* @__PURE__ */ (0, $.jsx)("defs", { children: f }), t.map((e) => /* @__PURE__ */ (0, $.jsx)(pF, {
				type: i,
				dataKey: e,
				stroke: `url(#${a}-zm-${e})`,
				strokeWidth: 1,
				strokeOpacity: .5,
				strokeDasharray: d,
				connectNulls: c,
				dot: !1,
				activeDot: !1,
				isAnimationActive: !1
			}, e))]
		})
	});
	if (r === "bar") {
		let n = l ?? 3;
		return /* @__PURE__ */ (0, $.jsx)(Yl, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, $.jsxs)(Gz, {
				data: e,
				margin: {
					top: 2,
					right: 0,
					bottom: 0,
					left: 0
				},
				barGap: 2,
				barSize: 14,
				children: [/* @__PURE__ */ (0, $.jsx)("defs", { children: f }), t.map((e) => /* @__PURE__ */ (0, $.jsx)(hL, {
					dataKey: e,
					fill: `url(#${a}-zm-${e})`,
					fillOpacity: .35,
					stackId: o ? "zm-stack" : void 0,
					isAnimationActive: !1,
					radius: [
						n,
						n,
						n,
						n
					]
				}, e))]
			})
		});
	}
	return /* @__PURE__ */ (0, $.jsx)(Yl, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsxs)(aB, {
			data: e,
			margin: {
				top: 4,
				right: 0,
				bottom: 0,
				left: 0
			},
			children: [/* @__PURE__ */ (0, $.jsx)("defs", { children: f }), t.map((e) => /* @__PURE__ */ (0, $.jsx)(oI, {
				type: i,
				dataKey: e,
				stroke: `url(#${a}-zm-${e})`,
				fill: `url(#${a}-zm-fill-${e})`,
				strokeWidth: 1,
				strokeOpacity: .5,
				strokeDasharray: d,
				connectNulls: c,
				fillOpacity: 1,
				stackId: o ? "zm-stack" : void 0,
				dot: !1,
				activeDot: !1,
				isAnimationActive: !1
			}, e))]
		})
	});
}
function FB({ data: e, defaultStartIndex: t = 0, defaultEndIndex: n }) {
	let [r, i] = P.useState({
		startIndex: t,
		endIndex: n ?? Math.max(0, e.length - 1)
	}), a = P.useDeferredValue(r);
	return (0, P.useEffect)(() => {
		i({
			startIndex: 0,
			endIndex: Math.max(0, e.length - 1)
		});
	}, [e.length]), {
		range: r,
		visibleData: P.useMemo(() => e.slice(a.startIndex, a.endIndex + 1), [
			e,
			a.startIndex,
			a.endIndex
		]),
		brushProps: {
			startIndex: r.startIndex,
			endIndex: r.endIndex,
			onChange: i
		}
	};
}
var IB = {
	dots: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "20",
		height: "20",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("circle", {
			className: "text-border dark:text-border",
			cx: "2",
			cy: "2",
			r: "1",
			fill: "currentColor"
		})
	}),
	grid: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "20",
		height: "20",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M 20 0 L 0 0 0 20",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "0.5"
		})
	}),
	plus: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "16",
		height: "16",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M 8 4 L 8 12 M 4 8 L 12 8",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "0.5",
			strokeLinecap: "round"
		})
	}),
	bubbles: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "100",
		height: "100",
		patternUnits: "userSpaceOnUse",
		patternTransform: "scale(0.6667)",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z",
			fill: "currentColor",
			fillOpacity: "0.4",
			fillRule: "evenodd"
		})
	}),
	"cross-hatch": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "20",
		height: "20",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border/60 dark:text-border/50",
			d: "M 0 0 L 20 20 M 20 0 L 0 20",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "0.5"
		})
	}),
	"diagonal-lines": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "6",
		height: "6",
		patternUnits: "userSpaceOnUse",
		patternTransform: "rotate(45)",
		children: /* @__PURE__ */ (0, $.jsx)("line", {
			className: "text-border dark:text-border",
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "6",
			stroke: "currentColor",
			strokeWidth: "0.5"
		})
	}),
	"falling-triangles": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "18",
		height: "36",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z",
			transform: "scale(0.5)",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	}),
	"4-pointed-star": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "16",
		height: "16",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("polygon", {
			className: "text-border dark:text-border",
			fillRule: "evenodd",
			points: "5 3 8 4 5 5 4 8 3 5 0 4 3 3 4 0 5 3",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	}),
	"tiny-checkers": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "8",
		height: "8",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			fillRule: "evenodd",
			d: "M0 0h4v4H0V0zm4 4h4v4H4V4z",
			fill: "currentColor",
			fillOpacity: "0.2"
		})
	}),
	"overlapping-circles": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "40",
		height: "40",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			fillRule: "evenodd",
			d: "M25 25c0-2.762 2.238-5 5-5s5 2.238 5 5-2.238 5-5 5c0 2.762-2.238 5-5 5s-5-2.238-5-5 2.238-5 5-5zM5 5c0-2.762 2.238-5 5-5s5 2.238 5 5-2.238 5-5 5c0 2.762-2.238 5-5 5S0 12.762 0 10s2.238-5 5-5zm5 4c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm20 20c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	}),
	"wiggle-lines": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "52",
		height: "26",
		patternUnits: "userSpaceOnUse",
		patternTransform: "scale(0.6)",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	})
};
function LB({ variant: e }) {
	let t = (0, P.useId)().replace(/:/g, ""), n = `${t}-bg-${e}`, r = `${t}-bg-edge-fade`, i = `${t}-bg-blur`, a = IB[e];
	return /* @__PURE__ */ (0, $.jsxs)(xE, {
		zIndex: -1,
		children: [/* @__PURE__ */ (0, $.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, $.jsx)(a, { id: n }),
			/* @__PURE__ */ (0, $.jsx)("filter", {
				id: i,
				children: /* @__PURE__ */ (0, $.jsx)("feGaussianBlur", { stdDeviation: "25" })
			}),
			/* @__PURE__ */ (0, $.jsx)("mask", {
				id: r,
				maskUnits: "userSpaceOnUse",
				children: /* @__PURE__ */ (0, $.jsx)("rect", {
					x: "8%",
					y: "20%",
					width: "85%",
					height: "60%",
					fill: "white",
					filter: `url(#${i})`
				})
			})
		] }), /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${n})`,
			mask: `url(#${r})`
		})]
	});
}
// src/react/evilcharts/registry/charts/recharts-bar-chart.tsx
var RB = 2, zB = "loading", BB = 2e3, VB = "evil-stacked", HB = .5, UB = .05, WB = [
	0,
	.7,
	.5,
	1
], GB = (0, P.createContext)(null);
function KB() {
	let e = (0, P.use)(GB);
	if (!e) throw Error("Bar chart parts (<Bar />, <XAxis />, …) must be used within <EvilBarChart />");
	return e;
}
function qB({ config: e, data: t, children: n, className: r, chartProps: i, stackType: a = "default", layout: o = "vertical", barRadius: s = RB, animationType: c = "left-to-right", barGap: l, barCategoryGap: u, backgroundVariant: d, defaultSelectedDataKey: f = null, onSelectionChange: p, isLoading: m = !1, loadingBars: h, xDataKey: g }) {
	let _ = (0, P.useId)().replace(/:/g, ""), [v] = (0, P.useState)(() => Date.now()), [y, b] = (0, P.useState)(f), [x, S] = (0, P.useState)(!1), { loadingData: C, onShimmerExit: w } = pV(m, h), { visibleData: T, brushProps: E } = FB({ data: t }), D = (0, P.useMemo)(() => {
		let e = P.Children.toArray(n), t = e.find((e) => (0, P.isValidElement)(e) && e.type === kB), r = (0, P.isValidElement)(t) ? t.props : {};
		return {
			slot: {
				present: (0, P.isValidElement)(t),
				height: r.height,
				formatLabel: r.formatLabel,
				onChange: r.onChange
			},
			chartChildren: e.filter((e) => !((0, P.isValidElement)(e) && e.type === kB))
		};
	}, [n]), O = D.slot.present, k = a === "stacked" || a === "percent", A = o === "horizontal", j = O && !m ? T : t, M = (0, P.useCallback)((e) => {
		b(e), p?.(e);
	}, [p]), N = (0, P.useMemo)(() => ({
		config: e,
		isStacked: k,
		isHorizontal: A,
		isLoading: m,
		barRadius: s,
		animationType: c,
		introStartedAt: v,
		dataLength: j.length,
		selectedDataKey: y,
		selectDataKey: M,
		isMouseInChart: x
	}), [
		e,
		k,
		A,
		m,
		s,
		c,
		v,
		j.length,
		y,
		M,
		x
	]);
	return /* @__PURE__ */ (0, $.jsx)(GB, {
		value: N,
		children: /* @__PURE__ */ (0, $.jsxs)(fB, {
			className: r,
			config: e,
			footer: O && !m && /* @__PURE__ */ (0, $.jsx)(MB, {
				data: t,
				chartConfig: e,
				xDataKey: g,
				variant: "bar",
				barRadius: s,
				height: D.slot.height,
				formatLabel: D.slot.formatLabel,
				stacked: k,
				skipStyle: !0,
				className: "mt-1",
				...E,
				onChange: (e) => {
					E.onChange(e), D.slot.onChange?.(e);
				}
			}),
			children: [/* @__PURE__ */ (0, $.jsx)(pB, { isLoading: m }), /* @__PURE__ */ (0, $.jsxs)(Gz, {
				id: _,
				accessibilityLayer: !0,
				layout: A ? "vertical" : "horizontal",
				data: m ? C : j,
				barGap: l,
				barCategoryGap: u,
				stackOffset: a === "percent" ? "expand" : void 0,
				onMouseEnter: () => S(!0),
				onMouseLeave: () => S(!1),
				...i,
				children: [
					d && /* @__PURE__ */ (0, $.jsx)(LB, { variant: d }),
					/* @__PURE__ */ (0, $.jsx)(VM, { color: "white" }),
					D.chartChildren,
					m && /* @__PURE__ */ (0, $.jsx)(mV, {
						chartId: _,
						onShimmerExit: w
					})
				]
			})]
		})
	});
}
function JB({ dataKey: e, variant: t = "default", radius: n, animationType: r, isClickable: i = !1, enableHoverHighlight: a = !1, glowing: o = !1, bufferBar: s = !1, barProps: c }) {
	let { config: l, isStacked: u, isHorizontal: d, isLoading: f, barRadius: p, animationType: m, introStartedAt: h, dataLength: g, selectedDataKey: _, selectDataKey: v, isMouseInChart: y } = KB(), b = (0, P.useId)().replace(/:/g, ""), x = E();
	if (f) return null;
	let S = n ?? p, C = _ === e, w = x ? "none" : r ?? m, T = {
		id: b,
		dataKey: e,
		variant: t,
		barRadius: S,
		glowing: o,
		bufferBar: s,
		isClickable: i,
		enableHoverHighlight: a,
		isMouseInChart: y,
		isHorizontal: d,
		introStartedAt: h,
		selectedDataKey: _,
		dataLength: g,
		onClick: () => {
			i && v(C ? null : e);
		}
	};
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(hL, {
		dataKey: e,
		stackId: u ? VB : void 0,
		fill: `url(#${b}-colors-${e})`,
		radius: S,
		isAnimationActive: !1,
		style: i || a ? { cursor: "pointer" } : void 0,
		shape: (e) => /* @__PURE__ */ (0, $.jsx)(eV, {
			...e,
			...T,
			animationType: w
		}),
		activeBar: (e) => /* @__PURE__ */ (0, $.jsx)(eV, {
			...e,
			...T,
			animationType: "none"
		}),
		...c
	}), /* @__PURE__ */ (0, $.jsxs)("defs", { children: [
		/* @__PURE__ */ (0, $.jsx)(iV, {
			id: b,
			dataKey: e,
			config: l
		}),
		t === "hatched" && /* @__PURE__ */ (0, $.jsx)(aV, {
			id: b,
			dataKey: e
		}),
		t === "duotone" && /* @__PURE__ */ (0, $.jsx)(sV, {
			id: b,
			dataKey: e,
			config: l
		}),
		t === "duotone-reverse" && /* @__PURE__ */ (0, $.jsx)(cV, {
			id: b,
			dataKey: e,
			config: l
		}),
		t === "gradient" && /* @__PURE__ */ (0, $.jsx)(lV, {
			id: b,
			dataKey: e
		}),
		t === "stripped" && /* @__PURE__ */ (0, $.jsx)(uV, {
			id: b,
			dataKey: e
		}),
		s && /* @__PURE__ */ (0, $.jsx)(oV, {
			id: b,
			dataKey: e
		}),
		o && /* @__PURE__ */ (0, $.jsx)(dV, {
			id: b,
			dataKey: e
		})
	] })] });
}
function YB({ tickLine: e = !1, axisLine: t = !1, tickMargin: n = 8, minTickGap: r = 8, type: i, ...a }) {
	let { isLoading: o, isHorizontal: s } = KB();
	return o ? null : /* @__PURE__ */ (0, $.jsx)(IL, {
		tickLine: e,
		axisLine: t,
		tickMargin: n,
		minTickGap: r,
		type: i ?? (s ? "number" : "category"),
		...a
	});
}
function XB({ tickLine: e = !1, axisLine: t = !1, tickMargin: n = 8, minTickGap: r = 8, width: i = "auto", type: a, ...o }) {
	let { isLoading: s, isHorizontal: c } = KB();
	return s ? null : /* @__PURE__ */ (0, $.jsx)(ZL, {
		tickLine: e,
		axisLine: t,
		tickMargin: n,
		minTickGap: r,
		width: i,
		type: a ?? (c ? "category" : "number"),
		...o
	});
}
function ZB({ strokeDasharray: e = "3 3", vertical: t, horizontal: n, ...r }) {
	let { isHorizontal: i } = KB();
	return /* @__PURE__ */ (0, $.jsx)(lP, {
		strokeDasharray: e,
		vertical: t ?? i,
		horizontal: n ?? !i,
		...r
	});
}
function QB({ variant: e, roundness: t, defaultIndex: n }) {
	let { isLoading: r, selectedDataKey: i } = KB();
	return r ? null : /* @__PURE__ */ (0, $.jsx)(CB, {
		cursor: !1,
		defaultIndex: n,
		content: /* @__PURE__ */ (0, $.jsx)(xB, {
			selected: i,
			roundness: t,
			variant: e
		})
	});
}
function $B({ variant: e, align: t = "right", verticalAlign: n = "top", isClickable: r = !1 }) {
	let { selectedDataKey: i, selectDataKey: a } = KB();
	return /* @__PURE__ */ (0, $.jsx)(OB, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, $.jsx)(wB, {
			selected: i,
			onSelectChange: a,
			isClickable: r,
			variant: e
		})
	});
}
var eV = (e) => {
	let { x: t = 0, y: n = 0, width: r = 0, height: i = 0, id: a, dataKey: o, variant: s, barRadius: c, glowing: l, bufferBar: u, isClickable: d, enableHoverHighlight: f, isMouseInChart: p, isHorizontal: m = !1, animationType: g = "none", introStartedAt: _ = 0, selectedDataKey: v, isActive: y, dataLength: b = 0, onClick: x } = e, S = typeof e.index == "number" ? e.index : -1, C = u && b > 0 && S === b - 1, w = s === "stripped", T = tV(g, S, b, m, _), E = C ? `url(#${a}-buffer-hatched-${o})` : nV(s, a, o), D = l ? `url(#${a}-bar-glow-${o})` : void 0, O = rV({
		isClickable: d,
		selectedDataKey: v,
		dataKey: o,
		enableHoverHighlight: f,
		isMouseInChart: p,
		isActive: y
	}), k = d || f ? { cursor: "pointer" } : void 0, A = w ? [
		c,
		c,
		0,
		0
	] : c, j = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(zp, {
		x: t,
		y: n,
		width: r,
		opacity: O,
		height: Math.max(0, i - 3),
		radius: A,
		fill: E,
		filter: D,
		stroke: C ? `url(#${a}-colors-${o})` : void 0,
		strokeWidth: C ? 1 : void 0
	}), w && /* @__PURE__ */ (0, $.jsx)(zp, {
		x: t,
		y: n - 4,
		width: r,
		height: 2,
		radius: 1,
		fill: `url(#${a}-colors-${o})`
	})] });
	return /* @__PURE__ */ (0, $.jsxs)("g", {
		style: k,
		onClick: x,
		children: [/* @__PURE__ */ (0, $.jsx)(zp, {
			...e,
			fill: "transparent"
		}), T ? /* @__PURE__ */ (0, $.jsx)(h.g, {
			initial: T.initial,
			animate: T.animate,
			transition: T.transition,
			style: T.style,
			children: j
		}) : j]
	});
}, tV = (e, t, n, r, i) => {
	if (e === "none" || t < 0 || n <= 0) return null;
	let a = n - 1, o = a / 2, s;
	switch (e) {
		case "right-to-left":
			s = a - t;
			break;
		case "center-out":
			s = Math.abs(t - o);
			break;
		case "edges-in":
			s = o - Math.abs(t - o);
			break;
		default: s = t;
	}
	let c = s * UB * 1e3, l = HB * 1e3, u = c + l, d = Date.now() - i;
	if (d >= u) return null;
	let f = d <= c ? 0 : (d - c) / l, p = {
		duration: (u - Math.max(d, c)) / 1e3,
		ease: WB,
		delay: Math.max(0, c - d) / 1e3
	};
	return r ? {
		initial: { scaleX: f },
		animate: { scaleX: 1 },
		transition: p,
		style: { originX: 0 }
	} : {
		initial: { scaleY: f },
		animate: { scaleY: 1 },
		transition: p,
		style: { originY: 1 }
	};
}, nV = (e, t, n) => {
	switch (e) {
		case "hatched": return `url(#${t}-hatched-${n})`;
		case "duotone": return `url(#${t}-duotone-${n})`;
		case "duotone-reverse": return `url(#${t}-duotone-reverse-${n})`;
		case "gradient": return `url(#${t}-gradient-${n})`;
		case "stripped": return `url(#${t}-stripped-${n})`;
		default: return `url(#${t}-colors-${n})`;
	}
}, rV = ({ isClickable: e, selectedDataKey: t, dataKey: n, enableHoverHighlight: r, isMouseInChart: i, isActive: a }) => {
	let o = e && t !== null ? t === null || t === n ? 1 : .15 : 1;
	return r && i ? a ? o : o * .3 : o;
}, iV = ({ id: e, dataKey: t, config: n }) => {
	let r = _B(n[t] ?? {});
	return /* @__PURE__ */ (0, $.jsx)("linearGradient", {
		id: `${e}-colors-${t}`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${t}-0)`
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${t}-0)`
		})] }) : Array.from({ length: r }, (e, n) => {
			let i = `${n / (r - 1) * 100}%`;
			return /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: i,
				stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
			}, i);
		})
	});
}, aV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("pattern", {
		id: `${e}-hatched-mask-pattern`,
		x: "0",
		y: "0",
		width: "5",
		height: "5",
		patternUnits: "userSpaceOnUse",
		patternTransform: "rotate(-45)",
		children: [/* @__PURE__ */ (0, $.jsx)("rect", {
			width: "5",
			height: "5",
			fill: "white",
			fillOpacity: .3
		}), /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "1.5",
			height: "5",
			fill: "white",
			fillOpacity: 1
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-hatched-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-hatched-mask-pattern)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-hatched-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-hatched-mask-${t})`
		})
	})
] }), oV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("pattern", {
		id: `${e}-buffer-hatched-mask-pattern`,
		x: "0",
		y: "0",
		width: "5",
		height: "5",
		patternUnits: "userSpaceOnUse",
		patternTransform: "rotate(-45)",
		children: [/* @__PURE__ */ (0, $.jsx)("rect", {
			width: "5",
			height: "5",
			fill: "black",
			fillOpacity: 0
		}), /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "1",
			height: "5",
			fill: "white",
			fillOpacity: 1
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-buffer-hatched-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-buffer-hatched-mask-pattern)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-buffer-hatched-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-buffer-hatched-mask-${t})`
		})
	})
] }), sV = ({ id: e, dataKey: t, config: n }) => {
	let r = _B(n[t] ?? {});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
			id: `${e}-duotone-mask-gradient-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "0",
			children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: .4
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: 1
			})]
		}),
		/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${e}-duotone-colors-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "1",
			children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "0%",
				stopColor: `var(--color-${t}-0)`
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "100%",
				stopColor: `var(--color-${t}-0)`
			})] }) : Array.from({ length: r }, (e, n) => {
				let i = `${n / (r - 1) * 100}%`;
				return /* @__PURE__ */ (0, $.jsx)("stop", {
					offset: i,
					stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
				}, i);
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${e}-duotone-mask-${t}`,
			maskContentUnits: "objectBoundingBox",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-mask-gradient-${t})`
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${e}-duotone-${t}`,
			patternUnits: "objectBoundingBox",
			patternContentUnits: "objectBoundingBox",
			width: "1",
			height: "1",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-colors-${t})`,
				mask: `url(#${e}-duotone-mask-${t})`
			})
		})
	] });
}, cV = ({ id: e, dataKey: t, config: n }) => {
	let r = _B(n[t] ?? {});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
			id: `${e}-duotone-reverse-mask-gradient-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "0",
			children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: 1
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: .4
			})]
		}),
		/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${e}-duotone-reverse-colors-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "1",
			children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "0%",
				stopColor: `var(--color-${t}-0)`
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "100%",
				stopColor: `var(--color-${t}-0)`
			})] }) : Array.from({ length: r }, (e, n) => {
				let i = `${n / (r - 1) * 100}%`;
				return /* @__PURE__ */ (0, $.jsx)("stop", {
					offset: i,
					stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
				}, i);
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${e}-duotone-reverse-mask-${t}`,
			maskContentUnits: "objectBoundingBox",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-reverse-mask-gradient-${t})`
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${e}-duotone-reverse-${t}`,
			patternUnits: "objectBoundingBox",
			patternContentUnits: "objectBoundingBox",
			width: "1",
			height: "1",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-reverse-colors-${t})`,
				mask: `url(#${e}-duotone-reverse-mask-${t})`
			})
		})
	] });
}, lV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
		id: `${e}-gradient-mask-gradient`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "20%",
			stopColor: "white",
			stopOpacity: 1
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "90%",
			stopColor: "white",
			stopOpacity: 0
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-gradient-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-gradient-mask-gradient)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-gradient-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-gradient-mask-${t})`
		})
	})
] }), uV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
		id: `${e}-stripped-mask-gradient`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: "white",
			stopOpacity: .2
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: "white",
			stopOpacity: .2
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-stripped-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-stripped-mask-gradient)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-stripped-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-stripped-mask-${t})`
		})
	})
] }), dV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)("filter", {
	id: `${e}-bar-glow-${t}`,
	x: "-100%",
	y: "-100%",
	width: "300%",
	height: "300%",
	children: [
		/* @__PURE__ */ (0, $.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: "8",
			result: "blur"
		}),
		/* @__PURE__ */ (0, $.jsx)("feColorMatrix", {
			in: "blur",
			type: "matrix",
			values: "1 0 0 0 0\n                0 1 0 0 0\n                0 0 1 0 0\n                0 0 0 0.5 0",
			result: "glow"
		}),
		/* @__PURE__ */ (0, $.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, $.jsx)("feMergeNode", { in: "glow" }), /* @__PURE__ */ (0, $.jsx)("feMergeNode", { in: "SourceGraphic" })] })
	]
}), fV = (e = 17, t = .05, n = .9) => Array.from({ length: e }, (r, i) => {
	let a = i / (e - 1), o = t + Math.sin(a * Math.PI) ** 2 * (n - t);
	return {
		offset: `${(a * 100).toFixed(0)}%`,
		opacity: Number(o.toFixed(3))
	};
});
function pV(e, t = 12) {
	let [n, r] = (0, P.useState)(!1), i = (0, P.useCallback)(() => {
		e && r((e) => !e);
	}, [e]);
	return {
		loadingData: (0, P.useMemo)(() => vB(t, 20, 80), [t, n]),
		onShimmerExit: i
	};
}
var mV = ({ chartId: e, onShimmerExit: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(hL, {
	dataKey: zB,
	fill: "currentColor",
	fillOpacity: .15,
	radius: RB,
	isAnimationActive: !1,
	legendType: "none",
	style: { mask: `url(#${e}-loading-mask)` }
}), /* @__PURE__ */ (0, $.jsx)("defs", { children: /* @__PURE__ */ (0, $.jsx)(hV, {
	chartId: e,
	onShimmerExit: t
}) })] }), hV = ({ chartId: e, onShimmerExit: t }) => {
	let n = fV(), r = (0, P.useRef)(-1);
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${e}-loading-mask-gradient`,
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "0",
			children: n.map(({ offset: e, opacity: t }) => /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: e,
				stopColor: "white",
				stopOpacity: t
			}, e))
		}),
		/* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${e}-loading-mask-pattern`,
			patternUnits: "objectBoundingBox",
			patternContentUnits: "objectBoundingBox",
			patternTransform: "rotate(25)",
			width: 3,
			height: "1",
			x: "0",
			y: "0",
			children: /* @__PURE__ */ (0, $.jsx)(h.rect, {
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-loading-mask-gradient)`,
				initial: { x: -1 },
				animate: { x: 2 },
				transition: {
					duration: BB / 1e3,
					ease: "linear",
					repeat: Infinity,
					repeatType: "loop"
				},
				onUpdate: (e) => {
					let n = typeof e.x == "number" ? e.x : -1, i = r.current;
					n >= 1 && i < 1 && t(), r.current = n;
				}
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${e}-loading-mask`,
			maskUnits: "userSpaceOnUse",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: `url(#${e}-loading-mask-pattern)`
			})
		})
	] });
};
qB.Bar = JB, qB.XAxis = YB, qB.YAxis = XB, qB.Grid = ZB, qB.Tooltip = QB, qB.Legend = $B, qB.Brush = kB;
// src/react/charts/chart-card.tsx
var gV = `${c({ radius: "chart" })} flex flex-col gap-4 max-sm:p-4`;
function _V({ title: e, children: t }) {
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		className: gV,
		"aria-label": e,
		children: [/* @__PURE__ */ (0, $.jsx)("h3", {
			className: "text-title-2-medium text-text-primary",
			children: e
		}), /* @__PURE__ */ (0, $.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: t
		})]
	});
}
var vV = (e) => (e.codePointAt(0) ?? 0) > 11903 ? 13 : 7, yV = (e) => [...new Intl.Segmenter(void 0, { granularity: "grapheme" }).segment(e)].map((e) => e.segment), bV;
function xV(e) {
	if (bV === void 0) try {
		bV = document.createElement("canvas").getContext("2d"), bV && (bV.font = `12px ${getComputedStyle(document.body).fontFamily || "sans-serif"}`);
	} catch {
		bV = null;
	}
	return bV ? bV.measureText(e).width : null;
}
var SV = (e) => xV(e) ?? yV(e).reduce((e, t) => e + vV(t), 0);
function CV(e, t) {
	if (SV(e) <= t) return e;
	let n = yV(e), r = 0;
	for (; r < n.length && SV(`${n.slice(0, r + 1).join("")}…`) <= t;) r += 1;
	return `${n.slice(0, r).join("")}…`;
}
var wV = (e, t = 104) => Math.min(t, Math.max(24, ...e.map(SV)) + 12);
function TV(e) {
	let { along: t, payload: n, width: r = 0, visibleTicksCount: i = 1, ...a } = e, o = String(n?.value ?? ""), s = t === "x" ? r / Math.max(1, i) - 2 : r - 8;
	return /* @__PURE__ */ (0, $.jsxs)("g", { children: [/* @__PURE__ */ (0, $.jsx)("title", { children: o }), /* @__PURE__ */ (0, $.jsx)(PO, {
		...a,
		children: CV(o, s)
	})] });
}
function EV({ title: e, figure: t, note: n }) {
	return /* @__PURE__ */ (0, $.jsxs)("header", {
		className: "flex flex-wrap items-end justify-between gap-x-4 gap-y-1",
		children: [/* @__PURE__ */ (0, $.jsxs)("span", {
			className: "flex min-w-0 flex-col gap-1",
			children: [/* @__PURE__ */ (0, $.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: e
			}), /* @__PURE__ */ (0, $.jsx)("b", {
				className: "text-display-4-medium tabular-nums text-text-primary",
				children: t
			})]
		}), /* @__PURE__ */ (0, $.jsx)("small", {
			className: "min-w-0 text-caption-1-regular break-words text-text-secondary",
			children: n
		})]
	});
}
var DV = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)",
	"var(--color-chart-6)"
], OV = (e) => ({ light: [e] }), kV = (e) => `s${e}`;
function AV(e) {
	return Object.fromEntries(e.map((e, t) => [kV(t), {
		label: e,
		colors: OV(DV[t % DV.length])
	}]));
}
// src/react/charts/chart-tip.tsx
var jV = "flex min-w-32 flex-col gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl";
function MV({ swatch: e, name: t, value: n, format: r = (e) => e.toLocaleString() }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex w-full items-center gap-2",
		children: [e, /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex flex-1 items-center justify-between gap-4 leading-none",
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "text-muted-foreground",
				children: t
			}), /* @__PURE__ */ (0, $.jsx)("span", {
				className: "font-mono font-medium tabular-nums text-foreground",
				children: r(n)
			})]
		})]
	});
}
var NV = "size-2.5 shrink-0 rounded-xs";
function PV({ active: e, payload: t, label: n, nameKey: r, valueKey: i, hideLabel: a, format: o }) {
	let { config: s } = dB(), c = (t ?? []).filter((e) => e.type !== "none");
	if (!e || !c.length) return /* @__PURE__ */ (0, $.jsx)("span", { className: "p-4" });
	let l = a || typeof n != "string" ? null : s[n]?.label ?? n;
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: jV,
		children: [l ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: "font-medium text-foreground",
			children: l
		}) : null, c.map((e, t) => {
			let n = e.payload ?? {}, a = `${(r ? n[r] : void 0) ?? e.name ?? e.dataKey ?? "value"}`, c = gB(s, e, a), l = i ? n[i] : e.value;
			return /* @__PURE__ */ (0, $.jsx)(MV, {
				name: c?.label ?? e.name,
				value: Number(l ?? 0),
				format: o,
				swatch: /* @__PURE__ */ (0, $.jsx)("i", {
					className: NV,
					style: { background: `var(--color-${a}-0)` }
				})
			}, a + t);
		})]
	});
}
function FV({ nameKey: e, valueKey: t, hideLabel: n, format: r }) {
	return /* @__PURE__ */ (0, $.jsx)(CB, {
		cursor: !1,
		content: /* @__PURE__ */ (0, $.jsx)(PV, {
			nameKey: e,
			valueKey: t,
			hideLabel: n,
			format: r
		})
	});
}
export { zj as ActivePoints, PA as AnimatedItems, gV as CHART_CARD, DV as CHART_COLORS, gk as CartesianLabelListContextProvider, TV as CategoryTick, xD as Cell, LB as ChartBackground, fB as ChartContainer, _V as ChartEmpty, EV as ChartHead, OB as ChartLegend, wB as ChartLegendContent, FV as ChartTip, CB as ChartTooltip, xB as ChartTooltipContent, hf as Curve, $c as DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME, Qc as DATA_ITEM_INDEX_ATTRIBUTE_NAME, J as DefaultZIndexes, wk as Dot, pj as Dots, qB as EvilBarChart, xk as LabelList, Sk as LabelListFromLabelProp, ke as Layer, pB as LoadingIndicator, rB as PolarChart, YO as PolarLabelContextProvider, ck as PolarLabelFromLabelProp, vk as PolarLabelListContextProvider, WA as RegisterGraphicalItemId, gm as Sector, tj as SetPolarGraphicalItem, dA as SetPolarLegendPayload, lA as SetTooltipEntrySettings, aA as Shape, jV as TIP_SURFACE, NV as TIP_SWATCH, PO as Text, MV as TipRow, xE as ZIndexLayer, tr as adaptEventsOfChild, Lk as addAngleAxis, Fk as addRadiusAxis, LE as arrayTooltipSearcher, wV as categoryAxisWidth, oB as cn, eM as combineAllBarPositions, WC as combineAxisTicks, nM as combineBarPosition, qj as combineBarSizeList, SC as combineCategoricalDomain, wx as combineConfiguredScale, Ph as combineDisplayedStackedData, KC as combineGraphicalItemTicks, ES as combineStackGroups, tM as combineStackedData, V as createSelector, uh as defaultPolarAngleAxisProps, nB as defaultPolarChartProps, dh as defaultPolarRadiusAxisProps, Kp as degreeToRadian, qk as findAllByType, CV as fitLabel, Be as get, ph as getAxisTypeBasedOnLayout, Vc as getBandSizeOfAxis, Fc as getBaseValueOfBar, Pc as getCateCoordinateOfBar, Bk as getClassNameFromUnknown, _B as getColorsCount, Yp as getMaxRadius, Mc as getNormalizedStackId, Ze as getPercentValue, Uc as getTooltipNameProp, G as getValueByDataKey, rM as getZIndexFromUnknown, Sr as identity, I as interpolate, wr as isArrayLike, Ec as isCategoricalAxis, L as isNullish, F as isNumber, Fh as isStacked, Ei as iteratee, TA as matchAnimationItems, yA as matchAppend, vA as matchByIndex, Ge as mathSign, nt as noop, Y as pickAxisType, Jp as polarToCartesian, Vh as rechartsScaleFactory, Rk as removeAngleAxis, Ik as removeRadiusAxis, sr as resolveDefaultProps, We as roundTemplateLiteral, yT as selectActiveTooltipDataKey, bT as selectActiveTooltipGraphicalItemId, _T as selectActiveTooltipIndex, xh as selectAngleAxis, Oh as selectAngleAxisRangeWithReversed, th as selectBarCategoryGap, eh as selectBarGap, Sm as selectChartDataAndAlwaysIgnoreIndexes, xm as selectChartDataWithIndexes, K as selectChartLayout, ul as selectChartOffsetInternal, HC as selectDuplicateDomain, Ok as selectPolarAppliedValues, Mk as selectPolarAxisCheckedDomain, Ek as selectPolarItemsSettings, jk as selectPolarNiceTicks, jh as selectPolarViewBox, Sh as selectRadiusAxis, Ah as selectRadiusAxisRangeWithReversed, sC as selectRealScaleType, Qx as selectRenderableAxisSettings, ih as selectReverseStackOrder, nh as selectRootBarSize, $m as selectRootMaxBarSize, rh as selectStackOffsetType, CS as selectTooltipAxis, Tk as selectUnfilteredPolarItems, AV as sliceConfig, kV as sliceKey, _e as svgPropertiesAndEvents, he as svgPropertiesNoEvents, ge as svgPropertiesNoEventsFromUnknown, OV as tone, kc as truncateByDomain, NA as useAnimationCallbacks, EA as useAnimationStartSnapshot, z as useAppDispatch, B as useAppSelector, ml as useIsPanorama, cA as useMouseClickItemDispatch, oA as useMouseEnterItemDispatch, sA as useMouseLeaveItemDispatch, au as usePolarChartLayout };

//# debugId=8c2da805-2186-4e20-84b6-f2e355c884b0