let config = {
   type: Phaser.WEBGL,
   render: {
      pixelArt: true
   },
   width: 320,
   height: 240,
   physics: {
      default: 'arcade',
      arcade: {
         debug: true,
      }
   },
   zoom: 2,
   scene: [FireFlies, Opening, Overworld, Store, AirRaid, Cave]
}

// reserve keyboard vars
let keyESC, keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyF, keyC, keyE;

const game = new Phaser.Game(config);