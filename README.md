# wasd-flappy
[![Build Status](https://travis-ci.org/QingWei-Li/wasd-flappy.svg?branch=master)](https://travis-ci.org/QingWei-Li/wasd-flappy)
[![Coverage Status](https://coveralls.io/repos/github/QingWei-Li/wasd-flappy/badge.svg?branch=master)](https://coveralls.io/github/QingWei-Li/wasd-flappy?branch=master)
[![npm](https://img.shields.io/npm/v/wasd-flappy.svg)](https://www.npmjs.com/package/wasd-flappy)

> 🐦 Create your own flappy.

## Installation
```shell
npm i wasd-flappy -S
```

## Usage
```javascript
import Flappy, { Player, Block } from 'wasd-flappy'

new Block({
  height: 10,
  width: 10,
  placement: 'top/bottom/random',
  padding: 10
})

new Flappy({
  canvas: {
    width: 300,
    height: 400
  },
  player: new Player({
    sizeHeight: 30,
    sizeWidth: 30,
    jumpHeight: 10,
    g: 5 // gravitational
  }),
  levels: [
    {
      score: 0,
      speed: 4,
      blocks: [],
      blockDistance: 4/[1, 10],
      blockRandom: true
    },
    {
      score: 100,
      speed: 6
    }
  ]
})

```

## API
### method

#### Flappy
- Flappy#start
- Flappy#pause
- Flappy#continue
- Flappy#stop

#### Player
- Player#jump

### event
- progress
- started
- gameover
- pause
- collide

## hook

## License
MIT
