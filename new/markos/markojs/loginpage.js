// Compiled using marko@5.21.9 - DO NOT EDIT
import { t as _t } from "marko/src/runtime/html/index.js";

const _marko_componentType = "markos\\markofiles\\loginpage.marko",
      _marko_template = _t(_marko_componentType);

export default _marko_template;
import _marko_attr from "marko/src/runtime/html/helpers/attr.js";
import _marko_renderer from "marko/src/runtime/components/renderer.js";
const _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _componentDef, _component, state) {
  out.w("<head>");
  out.w("<title>");
  out.w("Login Page");
  out.w("</title>");
  out.w("</head>");
  out.w("<h1>");
  out.w("Login using anyone of these");
  out.w("</h1>");
  out.w(`<a${_marko_attr("href", `/myapp?return_url=${input.return_url}`)}>`);
  out.w("My app login");
  out.w("</a>");
  out.w(" ");
  out.w("<br>");
  out.w(" ");
  out.w("<br>");
  out.w(`<a${_marko_attr("href", `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${input.client_id}&scope=openid%20email profile&response_type=code&redirect_uri=${input.redirect_uri}&nonce=${input.nonce}&state=${input.state}&code_challenge=${input.code_challenge}&code_challenge_method=S256`)}>`);
  out.w("Google Login");
  out.w("</a>");
}, {
  t: _marko_componentType,
  i: true,
  d: true
}, _marko_component);