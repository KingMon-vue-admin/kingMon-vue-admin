const qs = require("qs");
import request from "./request";
export default function requestMethod(e, s) {
  if (s == "payload") {
    return e;
  } else {
    return qs.stringify(e);
  }
}
export function MockrequestMethod(e, s) {
  // e._setMock = true;
  if (s == "payload") {
    return e;
  } else {
    return qs.stringify(e);
  }
}

export function AuthRequest(_) {
  const {
    Parm,
    url
  } = (function (_) {
    const DomElement = _.event || _._event;
    function _lo(_t) {
      if (_t.dataset.auth) {
        return _t.dataset.auth;
      } else {
        return _lo(_t.parentElement);
      }
    }
    const Auths = JSON.parse(sessionStorage.getItem("Auth"));
    const _l = Auths[_lo(DomElement.target)];
    delete _.event;
    delete _._event;
    return {
      _l,
      _
    };
  })(_)
  const data = requestMethod({
    ...Parm
  });
  return request({
    url: url,
    method: "POST",
    data
  });
}
