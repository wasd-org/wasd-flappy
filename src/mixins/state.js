function action (STATE) {
  return function (state) {
    if (!STATE[state]) {
      throw Error(`[Flappy:${this.name}] Unknown state:`, state)
    }

    this._state = this.__state = STATE[state]
  }
}

export default function (ctx, { state, handler }) {
  ctx._action = action(state)
  Object.defineProperty(ctx, '_state', {
    get () {
      return this.__state
    },

    set: handler
  })
}
