class Chop extends Phaser.Scene {
   constructor() {
      super({key: 'chopScene'})

      this.padding = game.config.width / 100;
   }

   supportsLocalStorage() {
      try {
          return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
          return false;
      }
  }

   preload() {
      this.load.path = './assets/'

      // * Characters

      // * Ruby
      this.load.image('ruby', '/sprites/sheets/ruby/idle.png')
      
      // * Max
      this.load.spritesheet('max', '/sprites/max.png', {
         frameWidth: 16,
         frameHeight: 16,
      })

      // * Ruby Texture Atlas
      this.load.atlas('ruby_sheet', '/sprites/sheets/ruby/ruby.png', '/sprites/sheets/ruby/ruby.json')

      // * Checkpoint Sound
      this.load.audio('passed', './audio/coin.wav')

      // * Won Race Sound
      this.load.audio('won_race', './audio/won_race.wav')

      // * Countdown Sound
      this.load.audio('countdown', './audio/countdown.mp3')

      // * Lumber Quest Assets
      
      // * Quest Giver 4: Jack the Lumberjack
      this.load.spritesheet('jack', './sprites/jack.png', {
         frameWidth: 32,
         frameHeight: 32,
      })

      // * Dead Tree
      this.load.spritesheet('dead_tree', './sprites/life.png', {
         frameWidth: 64,
         frameHeight: 64,
      })

      // * Axe
      this.load.spritesheet('axe', './sprites/axe.png', {
         frameWidth: 28,
         frameHeight: 28,
      })

      // * Lumber Music
      this.load.audio('battlefield5', './audio/music/battlefield5.mp3')

      // * Hatchet Sound Effects
      this.load.audio('hatchet01', './audio/hatchet01.mp3')
      this.load.audio('hatchet02', './audio/hatchet02.mp3')
      this.load.audio('hatchet03', './audio/hatchet03.mp3')

      // * Tree Falling Sound Effect
      this.load.audio('tree_falling', './audio/tree_falling.mp3')

      // * TileMaps
      
      // * TileMap
      this.load.image('fireFliesTileset', '/tilemaps/world_tileset.png')
      this.load.tilemapTiledJSON('fireFliesTilemap','/tilemaps/scene_3_map.json')

      // * Blank Sprite
      this.load.image('placeholder', '/sprites/change_depth.png')

      // * Results Music
      this.load.audio('glimmering_woods', './audio/music/glimmering_woods.mp3')
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

      // * Add Characters

      // * Add Ruby (Protaganist)
      this.ruby = new Ruby(this, this.tile(31), this.tile(21), this.VEL);

      // TODO: Remove When Using Prior Scenes
      // * Ruby Animations
      
      // * Idle-Down Animation
      this.anims.create({
         key: 'idle_down',
         frames: this.anims.generateFrameNames('ruby_sheet', {
            prefix: 'down',
            start: 1,
            end: 1
         }),
         repeat: -1,
         frameRate: 6,
      })

      // * Idle-Up Animation
      this.anims.create({
         key: 'idle_up',
         frames: this.anims.generateFrameNames('ruby_sheet', {
            prefix: 'up',
            start: 1,
            end: 1
         }),
         repeat: -1,
         frameRate: 6,
      })

      // * Idle-Side Animation
      this.anims.create({
         key: 'idle_side',
         frames: this.anims.generateFrameNames('ruby_sheet', {
            prefix: 'side',
            start: 1,
            end: 1
         }),
         repeat: -1,
         frameRate: 6,
      })

      // * Down Animation
      this.anims.create({
         key: 'down',
         frames: this.anims.generateFrameNames('ruby_sheet', {
            prefix: 'down',
            start: 1,
            end: 4
         }),
         repeat: -1,
         frameRate: 6,
      })

      // * Side Animation
      this.anims.create({
         key: 'side',
         frames: this.anims.generateFrameNames('ruby_sheet', {
            prefix: 'side',
            start: 1,
            end: 4
         }),
         repeat: -1,
         frameRate: 6,
      })

      // * Up Animation
      this.anims.create({
         key: 'up',
         frames: this.anims.generateFrameNames('ruby_sheet', {
            prefix: 'up',
            start: 1,
            end: 4
         }),
         repeat: -1,
         frameRate: 6,
      })

      // * Add Max (lil bro)
      this.maxTheSlime = new Max(this, this.tile(32), this.tile(21), this.ruby, this.VEL * .98, 'max').setDepth(1).setOrigin(0);

      // * Add Max Animation
      this.anims.create({
         key: 'jiggle',
         frameRate: 6,
         repeat: -1,
         frames: this.anims.generateFrameNumbers('max', {
            start: 0,
            end: 1
         })
      })

      this.maxTheSlime.play('jiggle')

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
      this.cameras.main.setScroll(this.tile(18.25), this.tile(7.5));

      // * Input
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

      // * UI

      // * Objective
      this.objectiveTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '10px',
         color: 'yellow',
         align: 'left'
      }
      this.objectiveUI = this.add.text(1, 1, `Objective:\nChop your tree as fast as possible.`, this.objectiveTextConfig).setStroke(0xFFFFFF, 3).setOrigin(0, 0).setDepth(10);
      this.objectiveUI.scrollFactorX = 0;
      this.objectiveUI.scrollFactorY = 0;

      // * LUMBER QUEST

      // * Add QuestGiver Jack
      this.jack = this.physics.add.sprite(this.tile(10), this.tile(7), 'jack', 0).setOrigin(0);
      this.jack.setImmovable();

      // * Add Jack's Animations
      this.anims.create({
         key: 'convulse',
         frameRate: 4,
         repeat: -1,
         frames: this.anims.generateFrameNumbers('jack', {
            start: 0,
            end: 1
         })
      })
      this.jack.anims.play('convulse')

      // * Set Players
      this.maxTheSlime.setPosition(this.tile(18.5), this.tile(12))
      this.ruby.setPosition(this.tile(25), this.tile(11))
      this.ruby.flipX = true;
      this.ruby.anims.play('idle_side')
      this.jack.setPosition(this.tile(20), this.tile(9))

      // * Add Lumber Music
      this.lumberMusic = this.sound.add('battlefield5', {volume: 0.25, loop: true});

      // * Add Results Music
      this.resultsMusic = this.sound.add('glimmering_woods', {volume: 0.25, loop: true})

      // * Quest Logicssx

      // * To Start Chopping Mayhem
      this.choppingWood = false;

      // * Max's Tree
      this.maxsTree = this.physics.add.sprite(this.tile(19), this.tile(11), 'dead_tree', 0).setOrigin(0).setScale(0.75, 0.75);
      this.maxsTree.currentFrame = 0;
      this.maxsTree.chopCount = 0;
      // * Max's Axe
      this.maxsAxe = this.add.sprite(this.tile(18.75), this.tile(11.75), 'axe', 0).setOrigin(0).setDepth(2).setScale(0.75, 0.75);

      // * Jack's Tree
      this.jacksTree = this.physics.add.sprite(this.tile(21), this.tile(8), 'dead_tree', 0).setOrigin(0);
      this.jacksTree.currentFrame = 0;
      this.jacksTree.chopCount = 0;
      // * Jack's Axe
      this.jacksAxe = this.add.sprite(this.tile(20.75), this.tile(9), 'axe', 0).setOrigin(0).setDepth(2);
      
      // * Ruby's Tree
      this.rubysTree = this.physics.add.sprite(this.tile(26), this.tile(10), 'dead_tree', 0).setOrigin(0);
      this.rubysTree.currentFrame = 0;
      // * Number of Times Ruby Chopped
      this.rubysTree.chopCount = 0;
      // * Ruby's Axe
      this.rubysAxe = this.add.sprite(this.tile(25.75), this.tile(11), 'axe', 0).setOrigin(0).setDepth(2);
      this.rubysAxe.currentFrame = 0;

      // * Max Chop Count to Victory
      this.maxChopCount = 200;

      // * Countdown UI
      this.countdownTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '24px',
         color: 'yellow',
         align: 'left'
      }

      this.countdown = 4;
      this.countdownToStart = this.add.text(game.config.width/2, game.config.height/2, `${this.countdown}`, this.countdownTextConfig).setAlpha(0);
      this.countdownToStart.setScrollFactor(0, 0).setStroke(0xFFFFFF, 5).setOrigin(0.5).setDepth(10);

      this.timeToFinish = this.add.text(game.config.width- 15, 0, ``, this.countdownTextConfig).setAlpha(0).setScrollFactor(0, 0).setStroke(0xFFFFFF, 5).setOrigin(1, 0).setDepth(10);

      // * Play Countdown Sound
      this.countdownSound = this.sound.add('countdown')
      this.time.delayedCall(1000, () => this.countdownSound.play())
      this.countdownUpdater = this.time.addEvent({
         delay: 1000,         
         callback: () => {
            this.countdown -= 1;
            this.countdownToStart.setText(`${this.countdown}`).setAlpha(1);
         },
         repeat: 2,
      })

      // * Rank

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
         fontSize: '50px',
         color: this.sRankColor,
         align: 'left'
      }

      // * Rank UI
      this.rankUI = this.add.text(this.timeToFinish.x - this.timeToFinish.width - 25, this.timeToFinish.y + this.timeToFinish.height/2, `S`, this.rankConfig).setOrigin(1, 0.5).setScrollFactor(0, 0).setStroke('#FFF', 3).setAlpha(0);

      // * High Score
      this.savedHighScore = false;
      this.highScore = parseInt(localStorage.getItem('bestTime'));
      this.bestRank = localStorage.getItem('chopBestRank');
      if (isNaN(this.highScore)) {
         this.highScore = 0;
         this.savedHighScore = false;
      } else {
         this.savedHighScore = true;
      }

      // * High Score UI
      this.highScoreUI = this.add.text(game.config.width - 5, game.config.height - 15, `${this.highScore} seconds`, this.countdownTextConfig).setAlpha(1).setScrollFactor(0, 0).setStroke(0xFFFFFF, 5).setOrigin(1, 0.5).setDepth(10).setFontSize('18px').setVisible(false);

      // * Best Rank UI
      this.bestRankUI = this.add.text(this.highScoreUI.x - this.highScoreUI.width, this.highScoreUI.y, `${this.bestRank}`, this.rankConfig).setOrigin(1, 0.5).setAlpha(1).setScrollFactor(0, 0).setStroke('#FFF', 3).setFontSize('30px').setDepth(10).setVisible(false);

      // * Set Rank Color
      if(this.bestRankUI.text == 'S') {
         this.bestRankUI.setColor(this.sRankColor);
      } else if(this.bestRankUI.text == 'A') {
         this.bestRankUI.setColor(this.aRankColor);
      } else if(this.bestRankUI.text == 'B') {
         this.bestRankUI.setColor(this.bRankColor);
      } else if(this.bestRankUI.text == 'C') {
         this.bestRankUI.setColor(this.cRankColor);
      } else if(this.bestRankUI.text == 'D') {
         this.bestRankUI.setColor(this.dRankColor);
      } else {
         this.bestRankUI.setColor(this.fRankColor);
      }

      // * Show if High Score Exists
      if(this.savedHighScore) {
         this.highScoreUI.setVisible(true);
         this.bestRankUI.setVisible(true);
      }

      // * Start Game and Song
      this.startGame = this.time.delayedCall(4000, () => {
         this.choppingWood = true;
         this.lumberMusic.play();
         this.countdownToStart.setAlpha(0);
         this.timeToFinish.setAlpha(1);
         this.rankUI.setAlpha(1);
         this.rubyCutTree = this.time.addEvent({
            delay: 90000,
            callback: this.resultsScreen,
            callbackScope: this
         })
         this.maxCutTree = this.time.addEvent({
            delay: 300,
            callback: this.chopTree,
            args: ['Max', this.maxsTree, this.maxsAxe],         
            callbackScope: this,
            repeat: 200
         })
         this.jackCutTree = this.time.addEvent({
            delay: 150,         
            callback: this.chopTree,
            args: ['Jack', this.jacksTree, this.jacksAxe],
            callbackScope: this,
            repeat: 200
         })
         this.rankUI.setX(this.timeToFinish.x - this.timeToFinish.width - 40);
      })



   }

   update() {
      // * Chopping Mayhem

      if(this.choppingWood) {
         // * Show Timer
         this.timeToFinish.setText(`${90 - Math.trunc(this.rubyCutTree.getElapsedSeconds())}`);
         // * Update Rank
         this.updateRank();
         if (Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyE)) {
            this.chopTree('Ruby', this.rubysTree, this.rubysAxe);
         } 

         // * For Axe Animation
         if (keyUP.isDown || keyE.isDown) {
            this.rubysAxe.setFrame(1);
         } else {
            this.rubysAxe.setFrame(0);
         }
      }

      // * Quit to Minigames Scene
      if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
         if(this.resultsMusic.isPlaying) {
            this.resultsMusic.stop();
         }
         if(this.countdownSound.isPlaying) {
            this.countdownSound.stop();
         }
         this.lumberMusic.stop();
         this.scene.start('minigamesScene', {music: undefined});
      }
      // * Restart Scene
      if (Phaser.Input.Keyboard.JustDown(keyR)) {
         if(this.resultsMusic.isPlaying) {
            this.resultsMusic.stop();
         }
         if(this.countdownSound.isPlaying) {
            this.countdownSound.stop();
         }
         this.lumberMusic.stop();
         this.scene.restart();
      }
   }

   chopTree(lumberjack, tree, axe) {
      tree.chopCount += 1;
      if((tree.chopCount) % 50 == 0) {
         this.cameras.main.shake(300, 0.0075);
         tree.currentFrame += 1;
         tree.setFrame(tree.currentFrame);
         if(tree.currentFrame < 4) {
            this.sound.play(`hatchet0${tree.currentFrame}`);
         } else {
            this.sound.play('tree_falling');
            this.sound.play(`hatchet03`);
         }
      }
      if (lumberjack != 'Ruby') {
         axe.setFrame(1);
         this.time.delayedCall(100, () => {
            axe.setFrame(0);
         })
      }

      // * Stop once Ruby Cuts Her Tree Down
      if(this.rubysTree.chopCount == this.maxChopCount) {
         this.choppingWood = false;
         this.lumberMusic.stop();
         this.treeCutTime = this.rubyCutTree.getElapsedSeconds();
         this.rubyCutTree.remove();
         this.maxCutTree.remove();
         this.jackCutTree.remove();
         if(this.treeCutTime < 90) {
            this.time.delayedCall(3175, () => {
               this.cameras.main.shake(300, 0.0075);
               this.resultsScreen();
            })
         } else {
            this.resultsScreen();
         }
         
      }
   }

   resultsScreen() {
      // * Hide Time To Finish
      this.timeToFinish.setAlpha(0);
      
      // * Play Results Music
      this.resultsMusic.play();

      if(this.treeCutTime < 90) {
         this.countdownToStart.setText(`${Math.trunc(this.treeCutTime)} seconds`).setAlpha(1)
      } else {
         this.countdownToStart.setText(`Failed!`).setAlpha(1)
      }
      this.rankUI.setFontSize('80px').setX(this.countdownToStart.x).setY(this.countdownToStart.y + this.countdownToStart.height + 15).setOrigin(0.5, 0.5)

      this.objectiveUI.setText('Press SPACE to Quit.\nPress R to Restart.')

      // * Victory Jingle
      // * Save High Score if New Score
      if (this.highScore < this.treeCutTime) {
         this.highScore = this.treeCutTime;
         this.bestRankUI.setText(this.rankUI.text);
         this.saveHighScore();
      } else if(this.treeCutTime < 35) {
         this.sound.play('won_race')
      }
   }

   updateRank() {
      this.treeCutTime = this.rubyCutTree.getElapsedSeconds();
      if(this.treeCutTime <= 15) {
         this.rankUI.setText('S').setColor(this.sRankColor);
      } else if(this.treeCutTime <= 30) {
         this.rankUI.setText('A').setColor(this.aRankColor);
      } else if(this.treeCutTime <= 45) {
         this.rankUI.setText('B').setColor(this.bRankColor);
      } else if(this.treeCutTime >= 60) {
         this.rankUI.setText('C').setColor(this.cRankColor);
      } else if(this.treeCutTime > 90) {
         this.rankUI.setText('D').setColor(this.dRankColor);
      } else {
         this.rankUI.setText('F').setColor(this.fRankColor);
      }
   }

   saveHighScore () {
      if (!this.supportsLocalStorage()) { return false; }
   
      localStorage.setItem('bestTime', `${this.highScore}`);
      localStorage.setItem('chopBestRank', this.rankUI.text);

      return true;
  }
}
