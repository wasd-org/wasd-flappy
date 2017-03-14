<template>
  <main class="app" :class="{ 'mobile': isMobile }">
    <h1 v-if="!isMobile">Flappy Bird for Vue.js</h1>

    <f-canvas ref="canvas" v-bind="flappy._canvas">
      <template scope="props">
        <f-bird
          :state="birdState"
          :ctx="props.ctx"
          :data="bird" />
      </template>
    </f-canvas>

    <p v-if="!isMobile">Powered by
      <a href="https://github.com/wasd-org/wasd-flappy">wasd-flappy</a>
    </p>
  </main>
</template>

<script>
  import FBird from './bird.vue'
  import FTube from './tube.vue'
  import FCanvas from './canvas.vue'

  export default { // eslint-disable-line
    components: { FCanvas, FBird, FTube },

    props: ['flappy', 'player', 'isMobile'],

    data () {
      return {
        score: 0,
        gameState: '',
        birdState: '',
        bird: {}
      }
    },

    mounted () {
      const canvas = this.$refs.canvas

      this.flappy.on(['game:progress', 'game:ready'], stats => {
        canvas.clear()
        this.bird = stats.player
        this.score = stats.score
        this.gameState = stats.state
      })
      this.flappy.on(['game:hitblock', 'game:hitfloor'], stats => {
        console.log('done')
        this.flappy.pause()
      })
      this.flappy.on('game:start', _ => {
        this.birdState = 'MOTION'
        this.gameState = 'PROGRESS'
      })
    }
  }
</script>

<style>
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }

  a {
    color: #42b983;
  }

  .app:not(.mobile) {
    margin-top: 10vh;
  }

</style>
