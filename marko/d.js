// Compiled using marko@5.21.9 - DO NOT EDIT
import { t as _t } from "marko/src/runtime/vdom/index.js";

const _marko_componentType = "marko\\temp.marko";
      _marko_template = _t(_marko_componentType);

export default _marko_template;
import _marko_style_merge from "marko/src/runtime/helpers/style-value.js";
import _marko_renderer from "marko/src/runtime/components/renderer.js";
import { r as _marko_registerComponent } from "marko/src/runtime/components/registry";

_marko_registerComponent(_marko_componentType, () => _marko_template);

const _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _componentDef, _component, state) {
  const colors = ["red", "green", "blue"];
  out.be("ul", null, "0", _component, null, 0);
  {
    let _keyValue = 0;

    for (const color of colors) {
      const _keyScope = `[${_keyValue++}]`;
      out.be("li", {
        "style": _marko_style_merge({
          color: color
        })
      }, "1" + _keyScope, _component, null, 1);
      out.t(color, _component);
      out.ee();
    }
  }
  out.ee();
}, {
  t: _marko_componentType,
  i: true,
  d: true
}, _marko_component);
import _marko_defineComponent from "marko/src/runtime/components/defineComponent.js";
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);