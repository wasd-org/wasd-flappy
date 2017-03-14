import emitterMixin from './mixins/emitter'
import stateMixin from './mixins/state'
import { genBlocks } from './block'

const STATE = {
  OVER: 'OVER',
  PROGRESS: 'PROGRESS',
  PAUSE: 'PAUSE',
  READY: 'READY'
}

class Canvas {
  constructor ({
    width = 300,
    height = 600,
    fps = 30
  }) {
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
      case STATE.READY:
        this._player._refresh()
        this.emit('game:ready', this._stats)
        break
      case STATE.PROGRESS:
        this._refresh()
        this.emit('game:progress', this._stats)
        break
      case STATE.OVER:
        this.emit('game:over', this._stats)
        break
      case STATE.PAUSE:
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

    this.on('_hitfloor', this._onHitFloor)

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
    this._checkHit()
  }

  _checkHit () {
    const player = this._player

    for (let i = 0, len = this._blocks.length; i < len; i++) {
      const block = this._blocks[i]
      if (!(block.startX > player.endX || block.endX < player.startX)) {
        if (block._disabled) continue

        if (!(block.startY > player.endY || block.endY < player.startY)) {
          this.emit('player:hitblock', { block, stats: this._stats })
        } else {
          this._score++
        }

        block._disabled = true
        break
      }
    }
  }

  get _stats () {
    const player = this._player
    const blocks = this._blocks
    const canvas = this._canvas

    return {
      player,
      blocks,
      canvas,
      score: this._score,
      level: this._level
    }
  }

  _onHitFloor () {
    // do
    this.emit('player:hitfloor')
  }

  start () {
    this._run()
    this.emit('game:start', this._stats)
  }

  pause () {
    this._action(STATE.PAUSE)
  }

  continue () {
    this._action(STATE.PROGRESS)
  }

  gameover () {
    this._action(STATE.OVER)
  }
}