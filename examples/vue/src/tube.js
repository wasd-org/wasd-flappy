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
        const { startX, startY, width, endY } = this.data

        this.ctx.save()
        // draw bottom
        this.ctx.drawImage(this.image,
          0, 0,
          width, endY,
          startX, endY,
          width, endY)

        // draw top
        this.ctx.scale(1, -1)
        this.ctx.drawImage(this.image,
          0, 0,
          width, startY,
          startX, -startY,
          width, startY)
        this.ctx.restore()
      }
    }
  }
}
