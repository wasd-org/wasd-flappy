import emitterMixin from './mixins/emitter'
import stateMixin from './mixins/state'
import { random } from './helpers/math'

const STATE = {
  OVER: 'OVER',
  PROGRESS: 'PROGRESS',
  PAUSE: 'PAUSE',
  QUIT: 'QUIT',
  COLLIDE: 'COLLIDE',
  READY: 'READY'
}

class Canvas {
  constructor ({
    width = 300,
    height = 600,
    fps = 30 }) {
    this.width = width
    this.height = height
    this.fps = fps
  }

  get frames () {
    return 1000 / this.fps
  }
}

export default class Flappy {
  constructor ({
    canvas = {},
    levels = [],
    player
  }) {
    this._score = 0
    this._speed = 0
    this._canvas = new Canvas(canvas)
    this._levels = [].concat(levels)
    this._player = player
    this._init()
  }

  static get name () {
    return 'Flappy'
  }

  get state () {
    return this._state
  }

  stateHandler (state) {
    switch (state) {
      case STATE.PAUSE:
        // this.pause()
        break
      case STATE.READY:
        this._refresh()
        this.emit('ready', this._data)
        break
      case STATE.PROGRESS:
        this._refresh()
        this.emit('progress', this._data)
        break
      case STATE.COLLIDE:
        // do
        break
      default:
        break
    }
  }

  get _level () {
    return this._levels.find(level => level.score <= this._score) || this._levels[0]
  }

  get _blocks () {
    // block[0] 到达边界，生成下一批
    // 或者等级变化
    if (this.__level === this._level) {
      return this.__blocks
    }

    const arr = []
    const { blocks, blockDistance = 10, blockRandom = false } = this._level
    if (!Array.isArray(blocks) || blocks.length) {
      throw Error('[Flappy] levels.blocks is required.')
    }
    const { width, height } = this._canvas

    if (blockRandom) {

    } else {

    }

    this.__blocks = arr
    this.__level = this._level

    return this.__blocks
  }

  /**
   * init game
   */
  _init () {
    emitterMixin(this)
    stateMixin(this, {
      state: STATE,
      handler: this.stateHandler
    })

    if (!Array.isArray(this._levels) || this._levels.length) {
      throw Error('[Flappy] levels is required.')
    }

    this._player._init(this)

    this.on('hook:hitfloor', this._onHitFloor)
    this.on('hook:hitblock', this._onHitBlock)

    setTimeout(_ => this._action(STATE.READY), 0)
  }

  /**
   * start game
   */
  _run () {
    this._action(STATE.PROGRESS)

    setTimeout(_ => {
      if (this._state === STATE.PROGRESS) {
        this._run()
      }
    }, this._canvas.frames)
  }

  _refresh () {
    this._player._refresh()
  }

  get _data () {
    const player = this._player
    const blocks = this._blocks
    const canvas = this._canvas

    return {
      player: {
        startX: player._startX,
        startY: player._startY,
        endX: player._endX,
        endY: player._endY,
        state: player._state
      },
      blocks,
      canvas
    }
  }

  _onHitFloor () {
    // do
    this.emit('hit:floor')
  }

  _onHitBlock () {
    // do
    this.emit('hit:block')
  }

  start () {
    this._run()
  }

  pause () {
    this._action(STATE.PAUSE)
  }

  continue () {
    this._action(STATE.CONTINUE)
  }

  quit () {
    this._action(STATE.QUIT)
  }
}
