function addListener (name, cb) {
  this._listener[name] = this._listener[name] || []
  this._listener[name].push(cb)
}

function on (name, cb) {
  if (Array.isArray(name)) {
    name.forEach(n => {
      this._addListener(n, cb)
    })
  } else {
    this._addListener(name, cb)
  }
}

function emit (name, ...args) {
  this._listener[name] && this._listener[name].forEach(cb => cb && cb.apply(this, args))
}

export default function (ctx) {
  ctx._listener = {}
  ctx.on = on
  ctx.emit = emit
  ctx._addListener = addListener
}
