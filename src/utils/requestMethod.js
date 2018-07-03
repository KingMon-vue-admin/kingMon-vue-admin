const qs = require('qs')

export default function requestMethod(e, s) {
  if (s == 'payload') {
    return e
  } else {
    return qs.stringify(e)
  }
}
