import { random } from './helpers/math'

let uid = 0

export default class Block {
  constructor ({
    width = 30,
    height = 30,
    padding = 0,
    placement = 'random',
    name = 'Block',
    meta
  }) {
    this.startX = 0
    this._width = width
    this._height = height
    this._padding = padding
    this.width = genNumber(width)
    this.height = genNumber(height)
    this.padding = genNumber(padding)
    this.placement = placement
    this._direction = placement === 'random' ? random(0, 1) : Number(placement === 'bottom')
    this.uid = uid++
    this.name = name
    this._canvasHeight = 0
    this._canvasWidth = 0
    this.meta = meta
  }

  get endX () {
    return this.startX + this.width
  }

  get endY () {
    return this.startY + this.height
  }

  get startY () {
    const direction = this._direction
    const padding = direction ? -this.padding : this.padding

    return (this._canvasHeight - this.height) * direction + padding
  }

  _setStartX (x) {
    this.startX = x
  }

  _setCanvas (w, h) {
    this._canvasWidth = w
    this._canvasHeight = h
  }

  clone () {
    return new Block({
      width: this._width,
      height: this._height,
      padding: this._padding,
      placement: this.placement,
      name: this.name
    })
  }

  moveX (x) {
    this.startX -= x
  }

  moveY (y) {
    this.startY += y
  }
}

export function genBlocks ({
  width,
  height,
  remainder,
  blocks,
  distance = 10,
  isRandom = false
}) {
  const arr = []
  const len = blocks.length
  let startX = width
  let index = 0

  while (remainder > 0) {
    let block

    if (isRandom) {
      block = blocks[random(0, len - 1)]
    } else {
      block = blocks[index % len]
      index++
    }

    const space = block.width + genNumber(distance)

    block = block.clone()
    block._setStartX(startX)
    remainder -= space
    startX += space
    block._setCanvas(width, height)
    arr.push(block)
  }

  return arr
}

function genNumber (distance) {
  return Array.isArray(distance)
    ? random(...distance)
    : distance
}
