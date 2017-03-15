export default {
  name: 'tube',

  props: {
    image: {},
    ctx: {},
    data: Object
  },

  render () {},

  watch: {
    data: {
      deep: true,
      handler () {
        const { startX, startY, width, height } = this.data
        let y = startY
        if (!startY) {
          y = -height
          this.ctx.save()
          this.ctx.scale(1, -1)
        }

        this.ctx.drawImage(this.image,
          0, 0,
          width, height,
          startX, y,
          width, height)
        !startY && this.ctx.restore()
      }
    }
  }
}
