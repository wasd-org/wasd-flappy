let uid = 0

export default class Block {
  constructor ({
    width = 30,
    height = 30,
    padding = 10,
    placement = 'random',
    name = 'Block'
  }) {
    this._startX = 0
    this._startY = 0
    this._width = width
    this._height = height
    this._placement = placement
    this.uid = uid++
    this.name = name
  }

  get _endX () {
    return this._startX + this._width
  }

  get _endY () {
    return this._endY + this._height
  }

  moveX (x) {
    this._startX += x
  }

  moveY (y) {
    this._startY += y
  }
}
