import emitterMixin from './mixins/emitter'
import stateMixin from './mixins/state'
import { genBlocks } from './block'

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
    this._canvas = new Canvas(canvas)
    this._levels = [].concat(levels)
    this._score = 0
    this._player = player
    this._init()
  }

  static get name () {
    return 'Flappy'
  }

  get state () {
    return this._state
  }

  _stateHandler (state) {
    switch (state) {
      case STATE.PAUSE:
        // this.pause()
        break
      case STATE.READY:
        this._player._refresh()
        this.emit('ready', this._stats)
        break
      case STATE.PROGRESS:
        this._refresh()
        this.emit('progress', this._stats)
        break
      case STATE.COLLIDE:
        // do
        break
      default:
        break
    }
  }

  set _score (val) {
    if (this.__score === val) {
      return val
    }

    this._level = this._levels.find(level => level.score <= this._score) || this._levels[0]
    this.__score = val
  }

  get _score () {
    return this.__score
  }

  get _blocks () {
    this.__blocks = this.__blocks || []
    const fristBlock = this.__blocks[0]

    if (fristBlock) {
      if (fristBlock.endX >= 0) {
        return this.__blocks
      } else {
        this.__blocks.shift()
      }
    }

    const { blocks, blockDistance, blockRandom } = this._level
    const currentWidth = this.__blocks.reduce((total, cur) =>
      total + cur.width,
    0)
    let remainderWidth = this._canvas.width - currentWidth

    this.__blocks = this.__blocks.concat(genBlocks({
      width: this._canvas.width,
      height: this._canvas.height,
      remainder: remainderWidth,
      blocks,
      distance: blockDistance,
      isRandom: blockRandom
    }))

    return this.__blocks
  }

  /**
   * init game
   */
  _init () {
    if (!Array.isArray(this._levels) || !this._levels.length) {
      throw Error('[Flappy] levels is required.')
    }
    this._levels.forEach(({ blocks }, index) => {
      if (!Array.isArray(blocks) || !blocks.length) {
        throw Error(`[Flappy] levels[${index}].blocks is required.`)
      }
    })

    emitterMixin(this)
    stateMixin(this, {
      state: STATE,
      handler: this._stateHandler
    })
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
    this._blocks.forEach(block => block.moveX(this._level.speed || 5))
  }

  get _stats () {
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
