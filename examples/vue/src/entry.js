import Vue from 'vue'
import App from './app.vue'
import Flappy, { Player, Block } from '@'

const isMobile = /mobile/i.test(navigator.userAgent)

// 获取画布宽高
const canvas = {
  height: isMobile ? window.screen.height : 600,
  width: isMobile ? window.screen.width : 400,
  fps: 50
}

// 创建角色
const player = new Player({
  height: 26,
  width: 35
})
// 创建 flappy 游戏
const flappy = new Flappy({
  canvas,
  player,
  levels: [
    {
      score: 0,
      blocks: [
        // 创建敌人，随机位置出现
        new Block({
          name: 'tube',
          placement: 'random'
        })
      ]
    }
  ]
})

document.addEventListener('keydown', e => {
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
