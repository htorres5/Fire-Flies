class Futbol extends Phaser.Scene {
   constructor() {
      super({key: 'futbolScene'})

      this.padding = game.config.width / 100;
      this.VEL = 140;
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

      // * Futbol Quest Assets

      // * Quest Giver 2: Adrian
      this.load.spritesheet('adrian', './sprites/adrian.png', {
         frameWidth: 16,
         frameHeight: 16,
      })

      // * Futbol Music
      this.load.audio('radiant_sunshine', './audio/music/radiant_sunshine.mp3');

      // * Penalty Arrow
      this.load.image('shooting_arrow', './sprites/arrow.png')

      // * Fut Ball 
      this.load.image('fut_ball', './sprites/fut_ball.png')

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

      // * Add Characters

      // * Add Ruby (Protaganist)
      this.ruby = new Ruby(this, this.tile(31), this.tile(21), this.VEL);

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

      // * World Collision
      this.riverLayer.setCollisionByProperty({ collides: true })
      this.underLayer.setCollisionByProperty({ collides: true })
      this.elevationLayer.setCollisionByProperty({ collides: true })
      this.bgLayer.setCollisionByProperty({ collides: true })
      this.pathsLayer.setCollisionByProperty({ collides: true })
      this.housesLayer.setCollisionByProperty({ collides: true })
      this.decorationsLayer.setCollisionByProperty({ collides: true })
      this.treesBehindLayer.setCollisionByProperty({ collides: true })
      this.treesLayer.setCollisionByProperty({ collides: true })
      this.trees2Layer.setCollisionByProperty({ collides: true })
      this.houseDecLayer.setCollisionByProperty({ collides: true})
      this.bridgeLayer.setCollisionByProperty({ collides: true})


      // * Cameras
      this.cameras.main.setScroll(this.tile(26.5), this.tile(37.5));

      // * Input
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

      // * Futbol

      // * Add Questgiver Adrian
      this.adrian = this.physics.add.sprite(this.tile(31), this.tile(39), 'adrian', 0).setOrigin(0);
      this.adrian.setImmovable();

      // * Add Adrians's Animations
      this.anims.create({
         key: 'juggle',
         frameRate: 4,
         repeat: -1,
         frames: this.anims.generateFrameNumbers('adrian', {
            start: 0,
            end: 1
         })
      })
      this.adrian.anims.play('juggle')

      // * Move Players
      this.maxTheSlime.setPosition(this.tile(31.25), this.tile(39))
      this.ruby.setPosition(this.tile(34), this.tile(41))
      this.ruby.flipX = false;
      this.ruby.anims.play('idle_side')
      this.adrian.setPosition(this.tile(30.15), this.tile(42.75))

      // * Futbol Music
      this.futbolMusic = this.sound.add('radiant_sunshine', {volume: 0.25, loop: true})
      this.futbolMusic.play();

      // * Quest Logic

      // * Disable Button to Shoot if Kicked
      this.shotBall = false;

      // * Goals Scored

      // * Number of Goals Scored
      this.goals = 0;

      // * Current Round
      this.round = 1;
      this.maxRounds = 10;

      // * Penalties
      
      this.futBall = this.physics.add.sprite(this.tile(31.25), this.tile(40), 'fut_ball').setOrigin(0).setDepth(6);

      this.shootingArrow = this.physics.add.sprite(this.tile(31.5), this.tile(40), 'shooting_arrow').setOrigin(0, 0.5).setDepth(5).setAngle(2);

      this.goalPost = this.add.rectangle(this.tile(30), this.tile(44), this.tile(3), this.tile(1), 0x000000, 0).setOrigin(0);
      this.physics.add.existing(this.goalPost, true);

      this.goalCollider = this.physics.add.overlap(this.futBall, this.goalPost, () => {
         this.sound.play('passed');
         this.resetPenaltyTimer.remove();
         this.goalCollider.active = false;
         this.goals += 1;
         if(this.round == this.maxRounds) {
            this.resultsScreen();
         } else {
            this.resetPenalty();
         }
      })

      // * Add Goalie
      this.goalie = this.physics.add.collider(this.adrian, this.futBall);

      /// * Add Posts Collider
      this.postsCollider = this.physics.add.collider(this.futBall, this.decorationsLayer)

      /// * Add Max and Ruby Collider
      this.futbolMaxCollider = this.physics.add.collider(this.futBall, this.maxTheSlime)
      this.futbolRubyCollider = this.physics.add.collider(this.futBall, this.ruby)

      // * Switch Players
      this.events.once('switchPlayer', () => {
         this.ruby.setPosition(this.tile(31), this.tile(39))
         this.ruby.anims.play('idle_down')
         this.maxTheSlime.setPosition(this.tile(34), this.tile(41))
      })

      // * UI

      // * Objective
      this.objectiveTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '10px',
         color: 'yellow',
         align: 'left'
      }

      this.objectiveUI = this.add.text(1, 1, `Objective:\nScore Goals.\nRound ${this.round} of ${this.maxRounds}\nScored: ${this.goals}/${this.maxRounds}`, this.objectiveTextConfig).setStroke(0xFFFFFF, 3).setOrigin(0, 0).setDepth(10);
      this.objectiveUI.scrollFactorX = 0;
      this.objectiveUI.scrollFactorY = 0;

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
         fontSize: '80px',
         color: this.sRankColor,
         align: 'left'
      }

      // * Results Text Formatting
      this.resultsTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '30px',
         color: 'yellow',
         align: 'left'
      }

      // * Final Score UI
      this.finalScoreUI = this.add.text(game.config.width/2, game.config.height/2, ``, this.resultsTextConfig).setAlpha(0);
      this.finalScoreUI.setScrollFactor(0, 0).setStroke(0xFFFFFF, 5).setOrigin(0.5);

      // * Rank UI
      this.rankUI = this.add.text(this.finalScoreUI.x - this.finalScoreUI.width/2, this.finalScoreUI.y, `S`, this.rankConfig).setOrigin(0.5, 0.5).setAlpha(0).setScrollFactor(0, 0).setStroke('#FFF', 3);

   }

   update() {
      // * Soccer Quest
      if(this.round <= this.maxRounds) {

         // * Move Shooting Arrow
         if((this.shootingArrow.angle >= 0) && (this.shootingArrow.angle <= 3)) {
            this.tweens.add({
               targets: this.shootingArrow,
               angle: 179,
               duration: 1500/(this.round*0.3),
           });
         } else if((this.shootingArrow.angle >= 177) && (this.shootingArrow.angle <= 180)) {
            this.tweens.add({
               targets: this.shootingArrow,
               angle: 0,
               duration: 1500/(this.round*0.3),
           });
         }

         // * Kick the Ball
         if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.shotBall) {
            this.shotBall = true;
            this.physics.velocityFromAngle(this.shootingArrow.angle, 100, this.futBall.body.velocity)
            this.resetPenaltyTimer = this.time.delayedCall(5000, () => {
               if(this.round == this.maxRounds) {
                  this.resultsScreen();
               } else {
                  this.resetPenalty();
               }
            })
         }

         // * Make Adrian Move
         if((this.adrian.body.position.x >= this.tile(29.75)) && (this.adrian.body.position.x <= this.tile(30.25))) {
            this.tweens.add({
               targets: this.adrian,
               x: this.tile(33.25),
               duration: 1500/(this.round*0.2),
           });
         } else if((this.adrian.body.position.x >= this.tile(32.75)) && (this.adrian.body.position.x <= this.tile(33.25))) {
            this.tweens.add({
               targets: this.adrian,
               x: this.tile(30),
               duration: 1500/(this.round*0.2),
           });
         }
      }

      // * On Round 6, Switch Players
      if(this.round == 6) {
         this.events.emit('switchPlayer')
      }

      // * Quit to Minigames Scene
      if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
         this.futbolMusic.stop();
         this.scene.start('titleScene');
      }
      // * Restart Scene
      if (Phaser.Input.Keyboard.JustDown(keyR)) {
         this.futbolMusic.stop();
         this.scene.restart();
      }
   }

   
   // * FUTBOL

   resetPenalty() {
      // * Reset Ball
      this.futBall.setPosition(this.tile(31.25), this.tile(40)).setAlpha(1);
      this.futBall.setVelocity(0, 0);
      // * Reset Collider
      this.goalCollider.active = true;
      // * Allow Ball to be kicked again
      this.shotBall = false;
      // * Next Round
      this.round += 1;
      // * Update Objective Text
      this.objectiveUI.setText(`Objective:\nScore Goals.\nRound ${this.round} of ${this.maxRounds}\nScored: ${this.goals}/${this.maxRounds}`)
   }

   resultsScreen() {
      // * Used to Stop Game Update
      this.round += 1;

      this.updateRank();
      // * Show Results
      if (this.goals == this.maxRounds) {
         this.finalScoreUI.setText(`PERFECT`).setAlpha(1)
      } else {
         this.finalScoreUI.setText(`${this.goals}/${this.maxRounds} Scored!`).setAlpha(1)
      }
      // * Show Rank
      this.rankUI.setAlpha(1).setY(this.finalScoreUI.y + this.finalScoreUI.height);

      // * Player Controls
      this.objectiveUI.setText('Press SPACE to Quit.\nPress R to Restart.')
      
      // * Victory Jingle
      if(this.goals > 7) {
         this.sound.play('won_race')
      }
   }

   updateRank() {
      if(this.goals == this.maxRounds) {
         this.rankUI.setText('S').setColor(this.sRankColor);
      } else if(this.goals == 9) {
         this.rankUI.setText('A').setColor(this.aRankColor);
      } else if(this.goals == 8) {
         this.rankUI.setText('B').setColor(this.bRankColor);
      } else if(this.goals >= 6) {
         this.rankUI.setText('C').setColor(this.cRankColor);
      } else if(this.goals >= 4) {
         this.rankUI.setText('D').setColor(this.dRankColor);
      } else {
         this.rankUI.setText('F').setColor(this.fRankColor);
      }
   }
}
