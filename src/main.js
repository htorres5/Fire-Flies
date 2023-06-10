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
   scene: [Store, Opening, Overworld, AirRaid]
}

// reserve keyboard vars
let keyESC, keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyF, keyC;

const game = new Phaser.Game(config);