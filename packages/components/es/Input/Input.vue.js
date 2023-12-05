import { defineComponent as c, computed as m, ref as r, openBlock as f, createElementBlock as _, withDirectives as v, createElementVNode as V, vModelText as x } from "vue";
const b = { class: "gie-input" }, g = ["disabled"], y = /* @__PURE__ */ c({
  name: "GieInput",
  __name: "Input",
  props: {
    modelValue: { default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(s, { expose: a, emit: u }) {
    const d = u, t = s, o = m({
      get: () => t.modelValue,
      set: (e) => {
        d("update:modelValue", e);
      }
    }), l = r();
    function i() {
      var e;
      (e = l.value) == null || e.focus();
    }
    return a({
      focus: i
    }), (e, n) => (f(), _("div", b, [
      v(V("input", {
        "onUpdate:modelValue": n[0] || (n[0] = (p) => o.value = p),
        ref_key: "inputRef",
        ref: l,
        class: "gie-input__control",
        type: "text",
        disabled: t.disabled
      }, null, 8, g), [
        [x, o.value]
      ])
    ]));
  }
});
export {
  y as default
};
