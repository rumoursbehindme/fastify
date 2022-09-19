// Compiled using marko@5.21.9 - DO NOT EDIT
import { t as _t } from "marko/src/runtime/html/index.js";

const _marko_componentType = "markos\\markofiles\\hello.marko",
      _marko_template = _t(_marko_componentType);

export default _marko_template;
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers/escape-xml.js";
import _marko_style_merge from "marko/src/runtime/helpers/style-value.js";
import _marko_attr from "marko/src/runtime/html/helpers/attr.js";
import _marko_renderer from "marko/src/runtime/components/renderer.js";
const _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _componentDef, _component, state) {
  out.w("<header>");
  out.w("<img src=.static/logo.png width=100 height=100 alt=\"marko logo\" class=logo>");
  out.w("<div>");
  out.w(_marko_escapeXml(input.title));
  out.w("</div>");
  out.w("</header>");
  out.w("<h1>");
  out.w("Hello ");
  out.w(_marko_escapeXml(input.name));
  out.w("</h1>");
  const colors = ["orange", "black", "green", "blue", "red", "yellow", "purple"];
  let _keyValue = 0;

  for (const color of colors) {
    const _keyScope = `[${_keyValue++}]`;
    out.w(`<li${_marko_attr("style", _marko_style_merge({
      color: color
    }))}>`);
    out.w(_marko_escapeXml(color));
    out.w("</li>");
  }

  out.w("<br>");
  out.w("<a href=/ >");
  out.w("home");
  out.w("</a>");
  out.w("<br>");
  out.w("<a href=/logout>");
  out.w("Logout");
  out.w("</a>");
}, {
  t: _marko_componentType,
  i: true,
  d: true
}, _marko_component);