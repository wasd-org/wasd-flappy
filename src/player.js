import LinearMotion from './helpers/linearMotion'
import stateMixin from './mixins/state'

const STATE = {
  JUMPING: 'JUMPING',
  WAITING: 'WAITING'
}

let uid = 0

export default class Player {
  constructor ({
      height = 30,
      width = 30,
      startX = 0,
      startY = 0,
      velocity = 15,
      g = 20,
      name = 'Player',
      data
    }) {
    this.startX = startX
    this.startY = startY
    this.width = width
    this.height = height
    this.velocity = velocity
    this.g = g
    this.uid = uid++
    this.name = name
    this.data = data
  }

  get endX () {
    return this.startX + this.width
  }

  get endY () {
    return this.startY + this.height
  }

  _stateHandler (state) {
    switch (state) {
      case STATE.JUMPING:
        this._moveUp()
        break
      case STATE.WAITING:
        break
      default:
        break
    }
  }

  _init (parent) {
    stateMixin(this, {
      state: STATE,
      handler: this._stateHandler
    })

    const canvas = parent._canvas

    this._parent = parent

    this._linearMotion = new LinearMotion({
      velocity: this.velocity,
      fps: canvas.fps,
      g: this.g
    })
    this.startY = this.startY || canvas.height / 2
    this._action(STATE.WAITING)
  }

  _moveUp () {
    this.offset = this._linearMotion.decelerate()
    const canvasHeight = this._parent._canvas.height

    this.startY -= this.offset

    if (this.endY > canvasHeight) {
      this.startY = canvasHeight - this.height
      this._action(STATE.WAITING)
      this._parent.emit('_hitfloor')
    }
  }

  _refresh () {
    this._action(this._state || STATE.WAITING)
  }

  get state () {
    return this._state
  }

  jump () {
    this._linearMotion.reset()
    this._action(STATE.JUMPING)
  }
}
