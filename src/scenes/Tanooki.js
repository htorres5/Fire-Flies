class Tanooki extends Phaser.Scene {
   constructor() {
      super({key: 'tanookiScene'})

      this.padding = game.config.width / 100;
   }

   preload() {
      this.load.path = './assets/'

      // * Checkpoint Sound
      this.load.audio('passed', './audio/coin.wav')

      // * Won Race Sound
      this.load.audio('won_race', './audio/won_race.wav')

      // * Tanooki Quest Assets

      // * Quest Giver 3: Nathan the Farmer
      this.load.spritesheet('nathan', './sprites/nathan.png', {
         frameWidth: 32,
         frameHeight: 32,
      })

      // * Tanooki Sprite
      this.load.image('tanooki', './sprites/tanooki.png')

      // * Mallet Sprite
      this.load.image('mallet', './sprites/mallet.png')

      // * Tanooki Music
      this.load.audio('folk_roma', './audio/music/folk_roma2.mp3');

      // * Hitsounds
      this.load.audio('pop01', './audio/pop01.mp3');

      // * Countdown Sound
      this.load.audio('countdown', './audio/countdown.mp3')

      // * TileMaps
      
      // * TileMap
      this.load.image('fireFliesTileset', '/tilemaps/world_tileset.png')
      this.load.tilemapTiledJSON('fireFliesTilemap','/tilemaps/scene_3_map.json')

      // * Blank Sprite
      this.load.image('placeholder', '/sprites/change_depth.png')
   }

   tile(coord) {
      return coord * 32;
   }

   randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
   }

   create() {
      
      // * Fade In Scene
      this.cameras.main.fadeIn(2500, 0, 0, 0)

      // * TileMaps 

      // * Add Tilemap
      this.map = this.add.tilemap('fireFliesTilemap')
      this.tileset = this.map.addTilesetImage('world_tileset', 'fireFliesTileset')

      // * Add Layers
      this.underLayer = this.map.createLayer('under', this.tileset, 0, 0).setDepth(-5);
      this.elevationLayer = this.map.createLayer('elevation', this.tileset, 0, 0).setDepth(-3);
      this.riverLayer = this.map.createLayer('river', this.tileset, 0, 0).setDepth(-4);
      this.stairsLayer = this.map.createLayer('stairs', this.tileset, 0, 0).setDepth(-2);
      this.bgLayer = this.map.createLayer('background', this.tileset, 0, 0);
      this.pathsLayer = this.map.createLayer('paths', this.tileset, 0, 0);
      this.bridgeLayer = this.map.createLayer('bridge', this.tileset, 0, 0).setDepth(3);
      this.decorationsLayer = this.map.createLayer('decorations', this.tileset, 0, 0);
      this.treesBehindLayer = this.map.createLayer('trees_behind', this.tileset, 0, 0);
      this.housesLayer = this.map.createLayer('houses', this.tileset, 0, 0);
      this.trees2Layer = this.map.createLayer('trees2', this.tileset, 0, 0).setDepth(2);
      this.treesLayer = this.map.createLayer('trees', this.tileset, 0, 0).setDepth(2);
      this.houseDecLayer = this.map.createLayer('house_decorations', this.tileset, 0, 0).setDepth(3);


      // * Cameras
      this.cameras.main.stopFollow();
      this.cameras.main.setScroll(this.tile(9), this.tile(30.5));

      // * Input
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

      // * TAPPING TANOOKIS

      // * Add Mallet Sprite
      this.mallet = this.add.sprite(this.tile(14), this.tile(42), 'mallet', 0).setVisible(false).setDepth(5).setScrollFactor(0, 0);

      // * Add Tanooki Group
      this.tanookiGroup = this.add.group({
         runChildUpdate: true
      })

      // * Add Tanooki Music
      this.tanookiMusic = this.sound.add('folk_roma', {volume: 0.25})

      // * Game Logics
      this.tanookiHitCount = 1;
      this.tanookiTotalCount = 1;

      // * Set Objective

      this.objectiveTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '10px',
         color: 'yellow',
         align: 'left'
      }

      this.objectiveUI = this.add.text(1, 1, `Objective: Tap on the Tanookis before they hide.\nAccuracy: ${Math.trunc((this.tanookiHitCount/this.tanookiTotalCount)*100)}%`, this.objectiveTextConfig).setStroke(0xFFFFFF, 3).setOrigin(0, 0).setDepth(10);
      this.objectiveUI.scrollFactorX = 0;
      this.objectiveUI.scrollFactorY = 0;

      // * Enable Mouse Input
      this.input.on('pointermove', (pointer) => {
         this.mallet.setVisible(true).copyPosition(pointer);
      });

      // * Countdown Text Formatting
      this.countdownTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '30px',
         color: 'yellow',
         align: 'left'
      }

      // * Countdown UI
      this.countdown = 4;
      this.countdownToStart = this.add.text(game.config.width/2, game.config.height/2, `${this.countdown}`, this.countdownTextConfig).setAlpha(0);
      this.countdownToStart.setScrollFactor(0, 0).setStroke(0xFFFFFF, 5).setOrigin(0.5);

      // * Play Countdown Sound
      this.time.delayedCall(1000, () => this.sound.play('countdown'))

      // * Start Countdown
      this.countdownUpdater = this.time.addEvent({
         delay: 1000,         
         callback: () => {
            this.countdown -= 1;
            this.countdownToStart.setText(`${this.countdown}`).setAlpha(1);
         },
         repeat: 2,
      })
      // * Rank Colors
      this.sRankColor = '#ffd700';
      this.aRankColor = '#54e354';
      this.bRankColor = '#285feb';
      this.cRankColor = '#ac55ad';
      this.dRankColor = '#f50535';
      this.fRankColor = '#adadad';

      // * Rank Formatting
      this.rankConfig = {
         fontFamily: 'GrapeSoda',
         fontSize: '40px',
         color: this.sRankColor,
         align: 'left'
      }

      // * Rank UI
      this.rankUI = this.add.text(this.padding + 10, this.objectiveUI.y + 45, `S`, this.rankConfig).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setStroke('#FFF', 3);

      // * Start Game and Song
      this.startSong = this.time.delayedCall(4000, () => {
         this.tanookiMusic.play();
         this.countdownToStart.setAlpha(0);
         this.showTanookiTimer = this.time.addEvent({
            delay: 3000,         
            callback: this.showTanooki,
            repeat: 80,
            startAt: 1,
            callbackScope: this
         })
      })
      // * Finish Game
      this.finished = false;
      this.tanookiMusic.on('complete', () => {
        this.resultsScreen();
      })
}

   update() {
      if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
         this.tanookiMusic.stop();
         this.scene.start('titleScene');
      }
      if (Phaser.Input.Keyboard.JustDown(keyR)) {
         this.tanookiMusic.stop();
         this.scene.restart();
      }
   }

   resultsScreen() {
      this.hitAccuracy = (this.tanookiHitCount/this.tanookiTotalCount)*100;
      if (this.hitAccuracy == 100) {
         this.countdownToStart.setText(`FULL\nCOMBO!`).setAlpha(1)
      } else {
         this.countdownToStart.setText(`${Math.trunc(this.hitAccuracy)}%`).setAlpha(1)
      }
      this.rankUI.setFontSize('65px').setX(this.countdownToStart.x - this.countdownToStart.width/2).setY(this.countdownToStart.y).setOrigin(1, 0.5)

      this.objectiveUI.setText('Press SPACE to Continue.\nPress R to Restart.')
      if(this.hitAccuracy > 85) {
         this.sound.play('won_race')
      }
      this.finished = true;
   }

   // * TANOOKI QUEST

   showTanooki() {
      // * Place Tanooki in Random Location
      let randomLocationX = this.randomIntFromInterval(10, 17)
      let randomLocationY = this.randomIntFromInterval(31, 37)
      let tanooki = this.tanookiGroup.create(this.tile(randomLocationX), this.tile(randomLocationY), 'tanooki', 0).setOrigin(0);

      // * Add Tanooki to Total Tanookis
      this.tanookiTotalCount += 1;

      // * Lower Delay
      if(this.tanookiTotalCount == 5) {
         this.showTanookiTimer.delay = 2500;
      } else if(this.tanookiTotalCount == 10) {
         this.showTanookiTimer.delay = 2000;
      } else if(this.tanookiTotalCount == 20) {
         this.showTanookiTimer.delay = 1500;
      } else if(this.tanookiTotalCount == 35) {
         this.showTanookiTimer.delay = 1250;
      } else if(this.tanookiTotalCount == 50) {
         this.showTanookiTimer.delay = 1000;
      }

      this.hideTanookiTimer = this.time.delayedCall(this.showTanookiTimer.delay/2, () => {
         tanooki.destroy();
         this.objectiveUI.setText(`Objective: Tap on the Tanookis before they hide.\nAccuracy: ${Math.trunc((this.tanookiHitCount/this.tanookiTotalCount)*100)}%`)
         this.updateRank();
      });
      // make circle interactive so we can click (and remove) it
      // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html#setInteractive
      tanooki.setInteractive({
         useHandCursor: true,
      });
      // call a function when the mouse clicks on the interactive object
      // https://photonstorm.github.io/phaser3-docs/Phaser.Input.Events.html#event:GAMEOBJECT_POINTER_DOWN__anchor
      tanooki.on('pointerdown', this.hideTanooki);
   }  

   hideTanooki(pointer, localX, localY, event) {
      let sceneContext = this.scene;  // get scene context before we kill the object
      sceneContext.hideTanookiTimer.remove();

      // * Add to Score/Hit Accuracy
      sceneContext.tanookiHitCount += 1;
      sceneContext.objectiveUI.setText(`Objective: Tap on the Tanookis before they hide.\nAccuracy: ${Math.trunc((sceneContext.tanookiHitCount/sceneContext.tanookiTotalCount)*100)}%`)
       
      sceneContext.sound.play('pop01', {volume: 0.75});         // play pop sound

      // * Update Rank
      sceneContext.updateRank();

      this.destroy();             // destroy the child obj
   }

   updateRank() {
      if(((this.tanookiHitCount/this.tanookiTotalCount)*100) == 100) {
         this.rankUI.setText('S').setColor(this.sRankColor);
      } else if(((this.tanookiHitCount/this.tanookiTotalCount)*100) >= 92) {
         this.rankUI.setText('A').setColor(this.aRankColor);
      } else if(((this.tanookiHitCount/this.tanookiTotalCount)*100) >= 85) {
         this.rankUI.setText('B').setColor(this.bRankColor);
      } else if(((this.tanookiHitCount/this.tanookiTotalCount)*100) >= 75) {
         this.rankUI.setText('C').setColor(this.cRankColor);
      } else if(((this.tanookiHitCount/this.tanookiTotalCount)*100) >= 50) {
         this.rankUI.setText('D').setColor(this.dRankColor);
      } else {
         this.rankUI.setText('F').setColor(this.fRankColor);
      }
   }
}
