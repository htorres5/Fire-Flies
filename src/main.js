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
         debug: false,
      }
   },
   zoom: 2.5,
   scene: [Futbol, Tanooki, Title, Opening, Overworld, Store, AirRaid, Cave, FireFlies, Finale, Chop]
}

// reserve keyboard vars
let keyESC, keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyF, keyC, keyE, keyR;

const game = new Phaser.Game(config);