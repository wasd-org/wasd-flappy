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
      name = 'Player'
    }) {
    this._startX = startX
    this._startY = startY
    this._width = width
    this._height = height
    this._velocity = velocity
    this._g = g
    this.uid = uid++
    this.name = name
  }

  get _endX () {
    return this._startX + this._width
  }

  get _endY () {
    return this._startY + this._height
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
      velocity: this._velocity,
      fps: canvas.fps,
      g: this._g
    })
    this._startY = this._startY || canvas.height / 2
    this._action(STATE.WAITING)
  }

  _moveUp () {
    const offset = this._linearMotion.decelerate()
    const canvasHeight = this._parent._canvas.height

    this._startY -= offset

    if (this._endY > canvasHeight) {
      this._startY = canvasHeight - this._height
      this._action(STATE.WAITING)
      this._parent.emit('hook:hitfloor')
    }
  }

  _refresh () {
    this._action(this._state || STATE.WAITING)
  }

  jump () {
    this._linearMotion.reset()
    this._action(STATE.JUMPING)
  }
}
