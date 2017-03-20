<template>
  <canvas
    class="canvas"
    ref="canvas"
    v-bind="$props"
    :style="{ width: clientWidth }">
    <slot :ctx="ctx"></slot>
  </canvas>
</template>

<script>
  export default {
    name: 'canvas',

    props: {
      width: Number,
      height: Number,
      floorHeight: Number,
      score: Number,
      groundImage: {},
      bgImage: {},
      isMobile: Boolean
    },

    data () {
      return {
        ctx: {},
        clientWidth: this.width
      }
    },

    created () {
      this.count = 0
      this.groundY = this.height - this.floorHeight

      if (this.isMobile) {
        this.clientWidth = '100vw'
      }
    },

    methods: {
      reset (score = 0) {
        const offset = ++this.count * 3 % 48

        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.drawImage(this.bgImage, 0, 0)
        this.ctx.drawImage(this.groundImage,
          offset, 0,
          this.width, this.floorHeight,
          0, this.groundY,
          this.width, this.floorHeight)
        this.drawScore(score)
      },

      drawScore (score) {
        this.ctx.font = 'bold 14px verdana, sans-serif'
        this.ctx.fillStyle = '#fff'
        this.ctx.fillText(score, 10, 20)
      }
    },

    mounted () {
      this.ctx = this.$refs.canvas.getContext('2d')
    }
  }
</script>
