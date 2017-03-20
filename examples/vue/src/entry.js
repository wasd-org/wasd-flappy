import Vue from 'vue'
import App from './app.vue'
import Flappy, { Player, Block } from '@'

const isMobile = /mobile/i.test(navigator.userAgent)

// 获取画布宽高
const canvas = {
  height: 384,
  width: 288,
  floorHeight: 55,
  fps: 50
}

// 创建角色
const player = new Player({
  height: 26,
  width: 36,
  startX: 50,
  velocity: 10,
  pop: 10,
  reverse: true
})

// 创建敌人，随机位置、高度随机生成
const block = new Block({
  name: 'tube',
  width: 52,
  padding: [100, 150],
  height: [100, 150]
})

// 创建 flappy 游戏
const flappy = new Flappy({
  canvas,
  player,
  levels: [
    {
      score: 0,
      blocks: [block],
      blockDistance: [30, 60]
    }
  ]
})

document.addEventListener('keydown', e => {
  if (flappy.state === 'OVER') return
  // space, up, w
  if (e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 87) {
    if (flappy.state === 'READY') {
      flappy.start()
    }
    player.jump()
  }
})

new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App, {
    props: { player, flappy, isMobile }
  })
})
