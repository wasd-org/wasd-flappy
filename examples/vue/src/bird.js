const STATE = {
  QUIET: 'QUIET',
  DEATH: 'DEATH',
  MOTION: 'MOTION'
}

export default {
  name: 'bird',

  props: {
    image: {},
    ctx: {},
    data: Object,
    state: {
      type: String,
      default: STATE.QUIET
    }
  },

  created () {
    this.count = 0
  },

  render () {},

  watch: {
    data: {
      deep: true,
      handler () {
        const { startX, startY, width, height, offset } = this.data
        const cur = parseInt(++this.count / 10, 10) % 3 * width
        const angle = offset * 2 * Math.PI / 180
        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)
        const x = cosA * startX - sinA * startY
        const y = cosA * startY + sinA * startX - width / 2

        this.ctx.save()
        this.ctx.rotate(-angle)
        this.ctx.drawImage(this.image,
          cur, 0,
          width, height,
          x, y,
          width + 5, height + 5)
        this.ctx.restore()
      }
    }
  }
}
