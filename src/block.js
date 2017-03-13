import { random } from './helpers/math'

let uid = 0

export default class Block {
  constructor ({
    width = 30,
    height = 30,
    padding = 10,
    placement = 'random',
    name = 'Block'
  }) {
    this.startX = 0
    this.width = width
    this.height = height
    this.placement = placement
    this._direction = placement === 'random' ? random(0, 1) : Number(placement === 'top')
    this._padding = padding
    this.uid = uid++
    this.name = name
    this._canvasHeight = 0
    this._canvasWidth = 0
  }

  get endX () {
    return this.startX + this.width
  }

  get endY () {
    return this.startY + this.height
  }

  get startY () {
    const placement = this._direction
    const padding = placement ? -this._padding : this._padding

    return (this._canvasHeight - this.height) * placement + padding
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
      width: this.width,
      height: this.height,
      placement: this.placement,
      name: this.name,
      padding: this._padding
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

    const space = block.width + genDistance(distance)

    block = block.clone()
    block._setStartX(startX)
    remainder -= space
    startX += space
    block._setCanvas(width, height)
    arr.push(block)
  }

  return arr
}

function genDistance (distance) {
  return Array.isArray(distance)
    ? random(...distance)
    : distance
}
