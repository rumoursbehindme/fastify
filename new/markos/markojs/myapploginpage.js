// Compiled using marko@5.21.9 - DO NOT EDIT
import { t as _t } from "marko/src/runtime/html/index.js";

const _marko_componentType = "markos\\markofiles\\myapplogin.marko",
      _marko_template = _t(_marko_componentType);

export default _marko_template;
import _marko_attr from "marko/src/runtime/html/helpers/attr.js";
import _initComponents from "marko/src/core-tags/components/init-components-tag.js";
import _marko_tag from "marko/src/runtime/helpers/render-tag.js";
import _awaitReorderer from "marko/src/core-tags/core/await/reorderer-renderer.js";
import _preferredScriptLocation from "marko/src/core-tags/components/preferred-script-location-tag.js";
import _marko_renderer from "marko/src/runtime/components/renderer.js";
const _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _componentDef, _component, state) {
  out.w("<body>");
  out.w("<h1>");
  out.w("Login");
  out.w("</h1>");
  out.w(`<form${_marko_attr("action", `http://localhost:3000/myapp?return_url=${input.return_url}`)} method=post>`);
  out.w("<h2>");
  out.w("Email");
  out.w("</h2>");
  out.w("<input type=email name=email>");
  out.w("<h2>");
  out.w("Password");
  out.w("</h2>");
  out.w("<input type=text name=password>");
  out.w("<br>");
  out.w("<br>");
  out.w("<button type=submit>");
  out.w("Login");
  out.w("</button>");
  out.w("<br>");
  out.w("</form>");

  _marko_tag(_initComponents, {}, out, _componentDef, "11");

  _marko_tag(_awaitReorderer, {}, out, _componentDef, "12");

  _marko_tag(_preferredScriptLocation, {}, out, _componentDef, "13");

  out.w("</body>");
  out.w(" ");
}, {
  t: _marko_componentType,
  i: true,
  d: true
}, _marko_component);