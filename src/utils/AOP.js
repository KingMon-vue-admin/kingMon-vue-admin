export function init(_, _FUN, _RUNS, _BEFORE, _AFTER) {
  const _E = _[_FUN]
  console.log(_E)
  const _BYCALL = () => {
    return _E.apply(_, arguments)
  }
  let _A = run(_BYCALL, _BEFORE, _AFTER)
  _[_FUN] = () => {
    return _A ? _A.apply(_, arguments) : _BYCALL.apply(_, arguments)
  }

  return {
    remove() {
      _A = null
      _RUNS = null
    }
  }
}
export function run(FU, _BEFORE, _AFTER) {
  return () => {
    _BEFORE()
    FU.apply(this, arguments)
    _AFTER()
  }
}
