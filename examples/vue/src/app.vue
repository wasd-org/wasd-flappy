<template>
  <main class="app" :class="{ 'mobile': isMobile }">
    <h1 v-if="!isMobile">Vue.js Flappy Bird</h1>

    <p>
      High Score: {{ highScore }}
      <a
        @click="flappy.restart()"
        v-if="gameState === 'OVER'">Restart</a>
    </p>

    <f-canvas
      :bg-image="images[0]"
      :ground-image="images[3]"
      ref="canvas"
      :score="score"
      v-bind="flappy._canvas">
      <template scope="props">
        <f-bird
          :image="images[1]"
          :state="birdState"
          :ctx="props.ctx"
          :data="bird" />
        <f-tube
          :key="tube.id"
          :image="images[2]"
          v-for="tube in tubes"
          :ctx="props.ctx"
          :data="tube"
        />
      </template>
    </f-canvas>

    <p v-if="!isMobile">Powered by
      <a href="https://github.com/wasd-org/wasd-flappy">wasd-flappy</a>
    </p>
  </main>
</template>

<script>
  import FBird from './bird'
  import FTube from './tube'
  import FCanvas from './canvas.vue'
  import loadImage from 'image-promise'

  const promise = loadImage([
    require('./assets/bg.png'),
    require('./assets/bird.png'),
    require('./assets/tube.png'),
    require('./assets/ground.png')
  ])

  export default { // eslint-disable-line
    components: { FCanvas, FBird, FTube },

    props: ['flappy', 'player', 'isMobile'],

    data () {
      return {
        score: 0,
        lastScore: 0,
        gameState: '',
        birdState: '',
        bird: {},
        tubes: [],
        images: []
      }
    },

    computed: {
      highScore () {
        return this.lastScore > this.score ? this.lastScore : this.score
      }
    },

    mounted () {
      promise.then(all => {
        const canvas = this.$refs.canvas

        this.images = all
        this.flappy.on(['game:progress', 'game:ready'], stats => {
          canvas.reset()
          this.bird = stats.player
          this.tubes = stats.blocks
          this.score = stats.score
          this.gameState = stats.state
        })
        this.flappy.on(['player:hitblock', 'player:hitfloor'], stats => {
          this.flappy.gameover()
          this.lastScore = this.score
        })
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
    overflow: hidden;
  }

  a {
    color: #42b983;
    cursor: pointer;
  }

  .app:not(.mobile) {
    margin-top: 10vh;
  }
</style>
