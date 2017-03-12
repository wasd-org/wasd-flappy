export default class LinearMotion {
  constructor ({ velocity = 15, fps = 30, g = 20 }) {
    this._time = 0
    this._v = velocity
    this.last = 0
    this.G = g / fps
  }

  reset () {
    this._time = 0
    this.last = 0
  }

  /**
   * h = v * t - g * t * t / 2
   */
  decelerate () {
    this._time++

    const distance = this._time * (this._v - this.G * this._time)
    const offset = distance - this.last

    this.last = distance

    return offset
  }
}
