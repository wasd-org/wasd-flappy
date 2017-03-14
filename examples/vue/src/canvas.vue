<template>
  <canvas class="canvas" ref="canvas" v-bind="$props">
    <slot :ctx="ctx"></slot>
  </canvas>
</template>

<script>
  export default {
    name: 'canvas',

    props: ['width', 'height'],

    data () {
      return {
        ctx: {}
      }
    },

    methods: {
      clear () {
        this.ctx.clearRect(0, 0, this.width, this.height)
      }
    },

    mounted () {
      this.ctx = this.$refs.canvas.getContext('2d')
    }
  }
</script>

<style scoped>
  .canvas {
    border: 1px solid #ccc;
  }
</style>
