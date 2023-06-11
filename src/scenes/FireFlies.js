class FireFlies extends Phaser.Scene {
   constructor() {
      super({key: 'firefliesScene'})

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

      // * Quests

      // * Dialogue Box
      this.load.spritesheet('dialog', './sprites/dialog_info.png', {
         frameWidth: 40,
         frameHeight: 32,
      })

      // * Race Quest Assets

      // * Quest Giver 1: Seargent Jin
      this.load.spritesheet('army', './sprites/army.png', {
         frameWidth: 32,
         frameHeight: 32,
      })

      // * Race Music
      this.load.audio('vs_jin', './audio/music/battle_2.mp3');

      // * Checkpoint for Race
      this.load.spritesheet('checkpoint', './sprites/checkpoint.png', {
         frameWidth: 96,
         frameHeight: 32,
      })

      // * Checkpoint Sound
      this.load.audio('passed', './audio/coin.wav')

      // * Won Race Sound
      this.load.audio('won_race', './audio/won_race.wav')

      // * TileMaps
      
      // * TileMap
      this.load.image('fireFliesTileset', '/tilemaps/world_tileset.png')
      this.load.tilemapTiledJSON('fireFliesTilemap','/tilemaps/scene_3_map.json')

      // * Loading Zone Sprite
      this.load.image('placeholder', '/sprites/change_depth.png')

      // * Music
      this.load.audio('glimmering_woods', './audio/music/glimmering_woods.mp3')
   }

   tile(coord) {
      return coord * 32;
   }

   create() {
      
      // * Fade In Scene
      this.cameras.main.fadeIn(2500, 0, 0, 0)

      // * Add Characters

      // * Add Ruby (Protaganist)
      this.ruby = new Ruby(this, this.tile(31), this.tile(21), this.VEL);

      this.ruby.body.setCollideWorldBounds(true);

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

      // TODO: Remove When Using Prior Scenes
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
      this.treesLayer = this.map.createLayer('trees', this.tileset, 0, 0).setDepth(2);
      this.houseDecLayer = this.map.createLayer('house_decorations', this.tileset, 0, 0).setDepth(3);

      // * Stairs

      // * Group That Will Change Depth/Enable Colliders for Regular Area
      this.changeToRegularArea = this.add.group({
         runChildUpdate: true
      })

      // * Left of West Bridge
      this.toRegularArea4 = this.add.rectangle(this.tile(43), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea4);
      this.changeToRegularArea.add(this.toRegularArea4, true);

      // * Right of West Bridge
      this.toRegularArea3 = this.add.rectangle(this.tile(34), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea3);
      this.changeToRegularArea.add(this.toRegularArea3, true);

      // * Left of East Bridge
      this.toRegularArea2 = this.add.rectangle(this.tile(27), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea2);
      this.changeToRegularArea.add(this.toRegularArea2, true);

      // * Right of East Bridge
      this.toRegularArea1 = this.add.rectangle(this.tile(18), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea1);
      this.changeToRegularArea.add(this.toRegularArea1, true);

      // * Group That Will Change Depth/Enable Colliders for River Area
      this.changeToRiverArea = this.add.group({
         runChildUpdate: true
      })

      // * Left of West Bridge
      this.toRiverArea4 = this.add.rectangle(this.tile(43), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea4);
      this.changeToRiverArea.add(this.toRiverArea4, true);

      // * Right of West Bridge
      this.toRiverArea3 = this.add.rectangle(this.tile(34), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea3);
      this.changeToRiverArea.add(this.toRiverArea3, true);

      // * Left of East Bridge
      this.toRiverArea2 = this.add.rectangle(this.tile(27), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea2);
      this.changeToRiverArea.add(this.toRiverArea2, true);

      // * right of East Bridge
      this.toRiverArea1 = this.add.rectangle(this.tile(18), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea1);
      this.changeToRiverArea.add(this.toRiverArea1, true);

      // * World Collision
      this.riverLayer.setCollisionByProperty({ collides: true })
      this.underLayer.setCollisionByProperty({ collides: true })
      this.elevationLayer.setCollisionByProperty({ collides: true })
      this.pathsLayer.setCollisionByProperty({ collides: true })
      this.housesLayer.setCollisionByProperty({ collides: true })
      this.decorationsLayer.setCollisionByProperty({ collides: true })
      this.treesBehindLayer.setCollisionByProperty({ collides: true })
      this.treesLayer.setCollisionByProperty({ collides: true })
      this.bridgeLayer.setCollisionByProperty({ collides: true})
      this.physics.add.collider(this.ruby, this.decorationsLayer)
      this.physics.add.collider(this.ruby, this.treesBehindLayer)
      this.physics.add.collider(this.ruby, this.elevationLayer)
      this.physics.add.collider(this.ruby, this.riverLayer)
      this.physics.add.collider(this.ruby, this.pathsLayer)
      this.physics.add.collider(this.ruby, this.housesLayer)
      this.physics.add.collider(this.ruby, this.treesLayer)


      this.isInRiverLayer = true;
      // * Bridge Collision
      this.bridgeCollider = this.physics.add.collider(this.ruby, this.bridgeLayer)

      this.underCollider = this.physics.add.collider(this.ruby, this.underLayer)
      this.underCollider.active = false;

      // * Music
      this.music = this.sound.add('glimmering_woods', {volume: 0.25, loop: true});
      this.music.play();
      // this.tweens.add({
      //    target: this.music,
      //    volume: 0.25,
      //    duration: 5000
      // })

      // * Cameras
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      this.cameras.main.startFollow(this.ruby, true, 0.25, 0.25)
      this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)

      // * Input
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      // * UI

      // * FireFly Count
      this.fireFlies = 0;
      this.maxFireFlies = 4;

      // * Objective
      this.objectiveTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '10px',
         color: 'yellow',
         align: 'left'
      }

      this.objectiveText = `Find Fireflies. ${this.fireFlies}/${this.maxFireFlies}`
      this.objectiveUI = this.add.text(1, 1, `Objective:\n${this.objectiveText}`, this.objectiveTextConfig).setStroke(0xFFFFFF, 3).setOrigin(0, 0).setDepth(10);
      this.objectiveUI.scrollFactorX = 0;
      this.objectiveUI.scrollFactorY = 0;

      // * Arrow That Shows You Where to Go
      this.waypoint = this.add.sprite(16, 42, 'waypoint', this.objectiveTextConfig).setOrigin(0.5).setDepth(10).setScale(0.5).setAlpha(0);
      this.waypoint.scrollFactorX = 0;
      this.waypoint.scrollFactorY = 0;

      // * Distance to Destination
      this.distanceToLocation = 0;
      this.distanceUI = this.add.text(32, 42, `${this.distanceToLocation} m`, this.objectiveTextConfig).setOrigin(0, 0.5).setDepth(10).setStroke(0xFFFFFF, 3).setAlpha(0);

      this.distanceUI.scrollFactorX = 0;
      this.distanceUI.scrollFactorY = 0;

      // * QUESTS

      // * Add Speech Bubble (Quest Indicator)
      this.speech = this.add.sprite(this.tile(48.5), this.tile(10), 'dialog', 0).setOrigin(0).setDepth(5);
      // * Add SpeechBubble Animation
      this.anims.create({
         key: 'speech',
         frameRate: 6,
         repeat: -1,
         frames: this.anims.generateFrameNumbers('dialog', {
            start: 0,
            end: 3
         })
      })
      this.speech.anims.play('speech');


      // * Dialogue

      // * Dialogue Box
      this.textBox = this.add.rectangle(this.padding*2, game.config.height / 1.5, game.config.width - this.padding*4, (game.config.height / 3 ) - this.padding*2, 0x000000, 1).setStrokeStyle(this.padding, 0xFFFFFF, 1).setOrigin(0).setAlpha(0).setDepth(6);
      this.textBox.setScrollFactor(0, 0);

      this.dialogueConfig = {
         fontFamily: 'Hanyi',
         fontSize: '12px',
         color: '#fff',
         align: 'left'
     }

      // * Dialogue Text
      this.dialogue = this.add.text(game.config.width / 4, game.config.height / 1.5 + this.padding*4, "", this.dialogueConfig).setAlpha(0).setDepth(6);
      this.dialogue.setScrollFactor(0, 0);
      
      // * Dialogue Portrait
      this.portrait = this.add.sprite(game.config.width / 8, game.config.height / 1.3 + this.padding*4, 'ruby').setOrigin(0.5).setAlpha(0).setDepth(6);
      this.portrait.setScrollFactor(0, 0);

      // * RACE QUEST

      // * Add Questgiver: Seargent Jin

      // * Add Path for Seargent Jin
      this.armySlimePath = new Phaser.Curves.Path(this.tile(48.5), this.tile(11)); 
      this.armySlimePath.lineTo(this.tile(48.5), this.tile(15));
      this.armySlimePath.lineTo(this.tile(58.5), this.tile(15));
      this.armySlimePath.lineTo(this.tile(58.5), this.tile(6));
      this.armySlimePath.lineTo(this.tile(39.5), this.tile(6));
      this.armySlimePath.lineTo(this.tile(39.5), this.tile(15));
      this.armySlimePath.lineTo(this.tile(48.5), this.tile(15));
      this.armySlimePath.lineTo(this.tile(48.5), this.tile(11));

      // * Add Seargent Jin
      this.army = this.add.follower(this.armySlimePath, this.tile(48.5), this.tile(11), 'army', 1).setOrigin(0);
      this.physics.add.existing(this.army, true);

      // * Add Jin's Animations
      this.anims.create({
         key: 'vibrate',
         frameRate: 4,
         repeat: -1,
         frames: this.anims.generateFrameNumbers('army', {
            start: 0,
            end: 1
         })
      })
      this.army.anims.play('vibrate')

      // * Race Checkpoints

      // * Checkpoint Animation
      this.anims.create({
         key: 'flags',
         frameRate: 12,
         repeat: -1,
         frames: this.anims.generateFrameNumbers('checkpoint', {
            start: 0,
            end: 3
         })
      })

      // * Add Checkpoints
      this.checkpoint1 = this.physics.add.sprite(this.tile(57), this.tile(13), 'checkpoint', 0).setOrigin(0).setAlpha(0);
      this.checkpoint1.play('flags');

      this.checkpoint2 = this.physics.add.sprite(this.tile(57), this.tile(8), 'checkpoint', 0).setOrigin(0).setAlpha(0);
      this.checkpoint2.play('flags');

      this.checkpoint3 = this.physics.add.sprite(this.tile(38), this.tile(8), 'checkpoint', 0).setOrigin(0).setAlpha(0);
      this.checkpoint3.play('flags');

      this.checkpoint4 = this.physics.add.sprite(this.tile(38), this.tile(13), 'checkpoint', 0).setOrigin(0).setAlpha(0);
      this.checkpoint4.play('flags')

      this.checkpoint5 = this.physics.add.sprite(this.tile(47.5), this.tile(13), 'checkpoint', 0).setOrigin(0);
      this.checkpoint5.play('flags').setAlpha(0);

      // * Race Music
      this.raceMusic = this.sound.add('vs_jin', {volume: 0.25, loop: true});

      // * Quest Logic

      // * Detect if Started Quest
      this.startedQuest = false;

      // * Detect if Won Race
      this.completedRace = false;
      this.timerEnded = false;
      this.wonRace = false;


      // * Add Race Quest Starter Collider
      this.raceQuestCollider = this.physics.add.collider(this.ruby, this.army, () => {
         this.raceQuestCollider.active = false;
         this.startRaceQuest();
      })

      // * Add Won Race Starter Collider
      this.wonRaceCollider = this.physics.add.collider(this.ruby, this.army, () => { 
         this.wonRaceCollider.active = false;
         this.startWonRaceQuest();
      })
      this.wonRaceCollider.active = false;

   }

   update() {
      if(this.ruby.canMove) {
         // * Ruby Controls/Movement
         this.ruby.update();

         // * Max Movment
         this.maxTheSlime.update();
      }

      
      // * Colliders
      this.riverAreaCollider = this.physics.world.overlap(this.ruby, this.changeToRiverArea, () => {
         this.isInRiverLayer = true;
         console.log(`Collider callback function: ${this.isInRiverLayer}`)
      }, null, this)
      this.regularAreaCollider = this.physics.world.overlap(this.ruby, this.changeToRegularArea, () => {
         this.isInRiverLayer = false;
         console.log(`Collider callback function: ${this.isInRiverLayer}`)
      }, null, this)

      // * If is in River Layer...
      if(this.isInRiverLayer) {
         // * Change Depth to River Layer
         this.maxTheSlime.setDepth(-1);
         this.ruby.setDepth(-1);
         
         console.log(this.ruby.depth)
         // * Disable Bridge Collider & Enable River Collider
         this.underCollider.active = true;
         this.bridgeCollider.active = false;
      } else {
         // * Change depth to Regular Layer
         this.maxTheSlime.setDepth(1);
         this.ruby.setDepth(1);
         // * Disable River Colliders & Enable Bridge Colliders
         this.underCollider.active = false;
         this.bridgeCollider.active = true;

         // * Race Quest
         if(this.timerEnded && this.completedRace && this.wonRace) {
            this.completedRace = false;
            this.wonRaceCollider.active = true;
         }

      }

      console.log(`update function: ${this.isInRiverLayer}`)

   }

   dialogBox(text, portrait, alpha) {
      this.textBox.setAlpha(alpha);
      this.dialogue.setText(text).setAlpha(alpha);
      this.portrait.setTexture(portrait).setAlpha(alpha);
   }

   // * Race Quest
   raceQuestChain(i) {
      return function() {
         // * Start of Quest
         if (raceQuest[i]) {
            raceQuest[i].call(this, this.raceQuestChain(++i));
         // * End of Quest
         } else {
            this.ruby.canMove = true;
            this.dialogBox('', 'placeholder', 0);
            if(this.timerEnded) {
               this.objectiveUI.setText('Checkpoints: 5/5')

               this.wonRace = false;
               this.time.delayedCall(500, () => {
                  this.objectiveUI.setText('Objective:\nTalk to Seargent Jin.')
                  this.raceMusic.stop();
                  this.music.resume();
               });
               console.log(this.wonRace);
            } else {
               this.wonRace = true;
               this.completedRace = true;
               this.objectiveUI.setText('Checkpoints: 5/5')

               // * Hide Checkpoints
               this.checkpoint1.setAlpha(0);
               this.checkpoint2.setAlpha(0);
               this.checkpoint3.setAlpha(0);
               this.checkpoint4.setAlpha(0);
               this.checkpoint5.setAlpha(0);

               this.time.delayedCall(500, () => {
                  this.objectiveUI.setText('Objective:\nTalk to Seargent Jin.')
                  this.raceMusic.stop();
                  this.music.resume();
                  this.sound.play('won_race');
               });

               console.log(this.wonRace);
            }
         }
      }.bind(this);
   }

   startRaceQuest() {
      this.startedQuest = true;
      this.ruby.stopMoving('idle_up');
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogBox('yo i heard you was looking\nfor fireflies', 'army', 1);
      keySPACE.once('down', () => {
         raceQuest[0].call(this, this.raceQuestChain(1));
      }, this);
   }

   // * Won the Race Quest
   wonRaceQuestChain(i) {
      return function() {
         // * Start of Quest
         if (wonRaceQuest[i]) {
            wonRaceQuest[i].call(this, this.wonRaceQuestChain(++i));
         // * End of Quest
         } else {
            this.ruby.canMove = true;
            this.dialogBox('', 'placeholder', 0)
            this.fireFlies += 1;
            this.objectiveUI.setText(`Objective:\nFind Fireflies. ${this.fireFlies}/${this.maxFireFlies}`);

            // * Destroy Checkpoints
            this.checkpoint1.destroy();
            this.checkpoint2.destroy();
            this.checkpoint3.destroy();
            this.checkpoint4.destroy();
            this.checkpoint5.destroy();
         }
      }.bind(this);
   }

   startWonRaceQuest() {
      //this.startedQuest = true;
      this.ruby.stopMoving('idle_up');
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogBox('yeah I\'m more of a sprinter\nnot much of a long-distance\nrunner.', 'army', 1);
      keySPACE.once('down', () => {
         wonRaceQuest[0].call(this, this.wonRaceQuestChain(1));
      }, this);
   }
}