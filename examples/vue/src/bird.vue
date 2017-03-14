<template>
  <div class="bird">
    <img ref="image" src="./assets/bird.png" @load="drawBird">
  </div>
</template>

<script>
  const STATE = {
    QUIET: 'QUIET',
    DEATH: 'DEATH',
    MOTION: 'MOTION'
  }

  export default {
    name: 'bird',

    props: {
      data: Object,
      ctx: {},
      state: {
        type: String,
        default: STATE.QUIET
      }
    },

    created () {
      this.count = 0
    },

    methods: {
      drawBird () {
        this.$watch('data', _ => {
          const { startX, startY, width, height, offset } = this.data
          const cur = parseInt(this.count++ / 10, 10) % 3 * 36
          const angle = offset * Math.PI / 180
          const cosA = Math.cos(angle)
          const sinA = Math.sin(angle)
          const x = cosA * startX - sinA * startY
          const y = cosA * startY + sinA * startX

          this.ctx.save()
          this.ctx.rotate(-angle)
          this.ctx.drawImage(this.$refs.image,
            cur, 0,
            36, height,
            x, y,
            width, height)
          this.ctx.restore()
        }, { deep: true, immediate: true })
      }
    },

    watch: {
      state (val) {

      }
    }
  }
</script>

<style scoped>

</style>
