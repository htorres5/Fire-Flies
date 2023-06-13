class FireFlies extends Phaser.Scene {
   constructor() {
      super({key: 'fireFliesScene'})

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

      // * Loading Zone Sprite
      this.load.image('placeholder', '/sprites/change_depth.png')

      // * Music
      this.load.audio('glimmering_woods', './audio/music/glimmering_woods.mp3')

      // * UI
      this.load.image('waypoint', './sprites/waypoint.png')
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
      this.bgLayer.setCollisionByProperty({ collides: true })
      this.pathsLayer.setCollisionByProperty({ collides: true })
      this.housesLayer.setCollisionByProperty({ collides: true })
      this.decorationsLayer.setCollisionByProperty({ collides: true })
      this.treesBehindLayer.setCollisionByProperty({ collides: true })
      this.treesLayer.setCollisionByProperty({ collides: true })
      this.houseDecLayer.setCollisionByProperty({ collides: true})
      this.bridgeLayer.setCollisionByProperty({ collides: true})
      this.physics.add.collider(this.ruby, this.bgLayer)
      this.physics.add.collider(this.ruby, this.decorationsLayer)
      this.physics.add.collider(this.ruby, this.treesBehindLayer)
      this.physics.add.collider(this.ruby, this.elevationLayer)
      this.physics.add.collider(this.ruby, this.riverLayer)
      this.physics.add.collider(this.ruby, this.pathsLayer)
      this.physics.add.collider(this.ruby, this.housesLayer)
      this.physics.add.collider(this.ruby, this.houseDecLayer)
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
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

      // * UI

      // * FireFly Count
      // ! CHANGE BACK TO 0
      this.fireFlies = 3;
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

      // * Add Speech Bubble (Quest Indicator)
      this.speech = this.add.sprite(this.tile(48.5), this.tile(10), 'dialog', 0).setOrigin(0).setDepth(5);
      this.speech.anims.play('speech');

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
         if(!this.startedQuest) {
            this.raceQuestCollider.active = false;
            this.startRaceQuest();
         }
      })

      // * Add Won Race Starter Collider
      this.wonRaceCollider = this.physics.add.collider(this.ruby, this.army, () => { 
         this.wonRaceCollider.active = false;
         this.startWonRaceQuest();
      })
      this.wonRaceCollider.active = false;

      // * Add Lost Race Starter Collider
      this.lostRaceCollider = this.physics.add.collider(this.ruby, this.army, () => { 
         this.lostRaceCollider.active = false;
         this.startLostRaceQuest();
      })
      this.lostRaceCollider.active = false;


      // * FUTBOL QUEST

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

      // * Add Speech Bubble (Quest Indicator)
      this.speech1 = this.add.sprite(this.tile(30.5), this.tile(38), 'dialog', 0).setOrigin(0).setDepth(5);
      this.speech1.anims.play('speech');

      // * Add Futbol Start Quest Collider
      this.futbolQuestCollider = this.physics.add.collider(this.ruby, this.adrian, () => {
         if(!this.startedQuest) {
            this.futbolQuestCollider.active = false;
            this.startFutbolQuest();
         }
      })

      // * Futbol Music
      this.futbolMusic = this.sound.add('radiant_sunshine', {volume: 0.25, loop: true})

      // * Quest Logic

      // * Start Penalties
      this.doingPenalties = false;
      this.maxFinishedPenalties = true;
      
      // * Goals Scored

      // * Number of Goals Scored
      this.goals = 0;

      // * Current Round
      this.round = 1;
      this.maxRounds = 5;

      // * Penalties
      this.shootingArrow = this.physics.add.sprite(this.tile(31.5), this.tile(41), 'shooting_arrow').setAlpha(0).setOrigin(0, 0.5).setDepth(5).setAngle(2);

      this.futBall = this.physics.add.sprite(this.tile(31.25), this.tile(40), 'fut_ball').setAlpha(0).setOrigin(0);

      this.goalPost = this.add.rectangle(this.tile(30), this.tile(44), this.tile(3), this.tile(1), 0x000000, 0).setOrigin(0);
      this.physics.add.existing(this.goalPost, true);

      this.goalCollider = this.physics.add.overlap(this.futBall, this.goalPost, () => {
         this.sound.play('passed');
         this.resetPenaltyTimer.remove();
         this.goalCollider.active = false;
         this.goals += 1;
         console.log(this.goals)
         console.log(this.round)
         if(this.round == this.maxRounds) {
            this.endPenaltyTurn();
         } else {
            this.resetPenalty();
         }
      })

      // * Add Goalie
      this.goalie = this.physics.add.collider(this.adrian, this.futBall);

      /// * Add Posts Collider
      this.postsCollider = this.physics.add.collider(this.futBall, this.decorationsLayer)

      /// * Add Max and Ruby Collider
      this.fubolMaxCollider = this.physics.add.collider(this.futBall, this.maxTheSlime)
      this.fubolRubyCollider = this.physics.add.collider(this.futBall, this.ruby)

      // * TANOOKI QUEST

      // * Add QuestGiver Nathan
      this.nathan = this.physics.add.sprite(this.tile(15.5), this.tile(42), 'nathan', 0).setOrigin(0);
      this.nathan.setImmovable();

      // * Add Nathan's Animations
      this.anims.create({
         key: 'jello',
         frameRate: 4,
         repeat: -1,
         frames: this.anims.generateFrameNumbers('nathan', {
            start: 0,
            end: 1
         })
      })
      this.nathan.anims.play('jello')

      // * Add Speech Bubble (Quest Indicator)
      this.speech2 = this.add.sprite(this.tile(15.5), this.tile(41), 'dialog', 0).setOrigin(0).setDepth(5);
      this.speech2.anims.play('speech');

      // * Add Mallet Sprite
      this.mallet = this.add.sprite(this.tile(14), this.tile(42), 'mallet', 0).setVisible(false).setDepth(5).setScrollFactor(0, 0);

      // * Add Tanooki Start Quest Collider
      this.tanookiQuestCollider = this.physics.add.collider(this.ruby, this.nathan, () => {
         if(!this.startedQuest) {
            this.tanookiQuestCollider.active = false;
            this.startTanookiQuest();
         }
      })

      // * Add Tanooki Group
      this.tanookiGroup = this.add.group({
         runChildUpdate: true
      })

      // * Add Tanooki Music
      this.tanookiMusic = this.sound.add('folk_roma', {volume: 0.25})

      // * Quest Logics
      this.tanookiHitCount = 1;
      this.tanookiTotalCount = 1;

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

      // * Add Speech Bubble (Quest Indicator)
      this.speech3 = this.add.sprite(this.tile(10), this.tile(6), 'dialog', 0).setOrigin(0).setDepth(5);
      this.speech3.anims.play('speech');

      // * Add Tanooki Start Quest Collider
      this.lumberQuestCollider = this.physics.add.collider(this.ruby, this.jack, () => {
         if(!this.startedQuest) {
            this.lumberQuestCollider.active = false;
            this.startLumberQuest();
         }
      })

      // * Add Lumber Music
      this.lumberMusic = this.sound.add('battlefield5', {volume: 0.25, loop: true});

      // * Quest Logicssx

      // * To Start Chopping Mayhem
      this.choppingWood = false;

      // * Set Winner
      this.declaredWinner = '';

      // * Max's Tree
      this.maxsTree = this.physics.add.sprite(this.tile(19), this.tile(11), 'dead_tree', 0).setOrigin(0).setScale(0.75, 0.75);
      this.maxsTree.currentFrame = 0;
      this.maxsTree.chopCount = 0;
      // * Max's Axe
      this.maxsAxe = this.add.sprite(this.tile(18.75), this.tile(11.75), 'axe', 0).setOrigin(0).setDepth(2).setScale(0.75, 0.75).setVisible(false);

      // * Collider For Overworld
      this.maxsTree.setImmovable();
      this.physics.add.collider(this.ruby, this.maxsTree);

      // * Jack's Tree
      this.jacksTree = this.physics.add.sprite(this.tile(21), this.tile(8), 'dead_tree', 0).setOrigin(0);
      this.jacksTree.currentFrame = 0;
      this.jacksTree.chopCount = 0;

      // * Jack's Axe
      this.jacksAxe = this.add.sprite(this.tile(20.75), this.tile(9), 'axe', 0).setOrigin(0).setDepth(2).setVisible(false);

      // * Collider For Overworld
      this.jacksTree.setImmovable();
      this.physics.add.collider(this.ruby, this.jacksTree);
      
      // * Ruby's Tree
      this.rubysTree = this.physics.add.sprite(this.tile(26), this.tile(10), 'dead_tree', 0).setOrigin(0);
      this.rubysTree.currentFrame = 0;
      // * Number of Times Ruby Chopped
      this.rubysTree.chopCount = 0;

      // * Collider For Overworld
      this.rubysTree.setImmovable();
      this.physics.add.collider(this.ruby, this.rubysTree);

      // * Ruby's Axe
      this.rubysAxe = this.add.sprite(this.tile(25.75), this.tile(11), 'axe', 0).setOrigin(0).setDepth(2).setVisible(false);
      this.rubysAxe.currentFrame = 0;

      // * Max Chop Count to Victory
      this.maxChopCount = 200;

      // * FINAL QUEST

      // * Place Cave Entrance
      this.caveEntrance = this.physics.add.sprite(this.tile(31), this.tile(20), 'placeholder').setOrigin(0).setAlpha(0).setImmovable();
      this.caveEntranceCollider = this.physics.add.overlap(this.ruby, this.caveEntrance, () => {
         // * On collision, exit scene.
         this.exitScene();
      })

      // * Disable until Final Quest is Started
      this.caveEntranceCollider.active = false;
   }

   update() {
      if(this.ruby.canMove) {
         // * Ruby Controls/Movement
         this.ruby.update();

         // * Max Movment
         this.maxTheSlime.update();
      }

      // * World Colliders
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

      }

      // * Race Quest
      if(this.timerEnded && this.completedRace && this.wonRace) {
         this.completedRace = false;
         this.wonRaceCollider.active = true;
      }

      if(this.timerEnded && this.completedRace && !this.wonRace) {
         this.completedRace = false;
         this.lostRaceCollider.active = true;
      }

      // * Soccer Quest
      if(this.doingPenalties && (this.round <= this.maxRounds)) {

         // * Move Shooting Arrow
         if((this.shootingArrow.angle >= 0) && (this.shootingArrow.angle <= 3)) {
            this.tweens.add({
               targets: this.shootingArrow,
               angle: 179,
               duration: 1500/(this.round*0.6),
           });
         } else if((this.shootingArrow.angle >= 177) && (this.shootingArrow.angle <= 180)) {
            this.tweens.add({
               targets: this.shootingArrow,
               angle: 0,
               duration: 1500/(this.round*0.6),
           });
         }

         // * Kick the Ball
         if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.shotBall) {
            this.shotBall = true;
            this.physics.velocityFromAngle(this.shootingArrow.angle, 100, this.futBall.body.velocity)
            this.resetPenaltyTimer = this.time.delayedCall(5000, () => {
               console.log(this.round)
               if(this.round == this.maxRounds) {
                  this.endPenaltyTurn();
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
               duration: 1500/(this.round*0.6),
           });
         } else if((this.adrian.body.position.x >= this.tile(32.75)) && (this.adrian.body.position.x <= this.tile(33.25))) {
            this.tweens.add({
               targets: this.adrian,
               x: this.tile(30),
               duration: 1500/(this.round*0.6),
           });
         }
      }

      // * Lumber Quest
      if(this.choppingWood) {
         // * Show Timer
         this.timeToFinish.setText(`${90 - Math.trunc(this.rubyCutTree.getElapsedSeconds())}`);
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

      // * Final Quest
      if(this.completedAllQuests) {
         this.distanceToLocation = Math.trunc(Phaser.Math.Distance.Between(this.ruby.x, this.ruby.y, this.caveEntrance.x, this.caveEntrance.y)/4);
         this.distanceUI.text = `${this.distanceToLocation}m`
         
         var rotation = Phaser.Math.Angle.Between(this.ruby.x, this.ruby.y, this.caveEntrance.x, this.caveEntrance.y);
         this.waypoint.rotation = rotation;
   
         if(this.distanceToLocation < 40) {
            this.waypoint.setAlpha(0);
            this.distanceUI.setAlpha(0);
         } else {
            this.waypoint.setAlpha(1);
            this.distanceUI.setAlpha(1);
         }
      }
      console.log(`update function: ${this.isInRiverLayer}`)

   }

   dialogBox(text, portrait, alpha) {
      this.textBox.setAlpha(alpha);
      this.dialogue.setText(text).setAlpha(alpha);
      this.portrait.setTexture(portrait).setAlpha(alpha);
   }

   endQuest() {
      // * Add to Fireflies
      this.fireFlies += 1;

      // * Update UI
      this.objectiveUI.setText(`Objective:\nFind Fireflies. ${this.fireFlies}/${this.maxFireFlies}`);

      // * Allow other Quests to be Started
      this.startedQuest = false;

      // * If Max Fireflies, start final Quest.
      if(this.fireFlies == this.maxFireFlies) {
         this.startFinalQuest();
      } else {
         // * Else Continue on as normal.
         this.ruby.canMove = true;
         this.dialogBox('', 'placeholder', 0)
      }
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

            // * If Lost Race...
            if(this.timerEnded) {
               this.objectiveUI.setText('Checkpoints: 5/5')

               this.completedRace = true;
               this.wonRace = false;

               this.time.delayedCall(500, () => {
                  this.objectiveUI.setText('Objective:\nTalk to Seargent Jin.')
                  this.raceMusic.stop();
                  this.music.resume();
               });

               // * Hide Checkpoints
               this.checkpoint1.setAlpha(0);
               this.checkpoint2.setAlpha(0);
               this.checkpoint3.setAlpha(0);
               this.checkpoint4.setAlpha(0);
               this.checkpoint5.setAlpha(0);
               console.log(this.wonRace);

            // * If Won Race...
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

   // * Won the Race
   wonRaceQuestChain(i) {
      return function() {
         // * Start of Quest
         if (wonRaceQuest[i]) {
            wonRaceQuest[i].call(this, this.wonRaceQuestChain(++i));
         // * End of Race Quest
         } else {
            // * Destroy Quest Assets
            this.checkpoint1.destroy();
            this.checkpoint2.destroy();
            this.checkpoint3.destroy();
            this.checkpoint4.destroy();
            this.checkpoint5.destroy();

            // * End Quest
            this.endQuest();
         }
      }.bind(this);
   }

   startWonRaceQuest() {
      this.ruby.stopMoving('idle_up');
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogBox('yeah I\'m more of a sprinter\nnot much of a long-distance\nrunner.', 'army', 1);
      keySPACE.once('down', () => {
         wonRaceQuest[0].call(this, this.wonRaceQuestChain(1));
      }, this);
   }

   // * Lost the Race
   lostRaceQuestChain(i) {
      return function() {
         // * Start of Quest
         if (lostRaceQuest[i]) {
            lostRaceQuest[i].call(this, this.lostRaceQuestChain(++i));
         // * End of Quest
         } else {
            this.ruby.canMove = true;
            this.dialogBox('', 'placeholder', 0);

            // * If Lost Race...
            if(this.timerEnded) {
               this.objectiveUI.setText('Checkpoints: 5/5')
               this.completedRace = true;

               this.wonRace = false;

               this.time.delayedCall(500, () => {
                  this.objectiveUI.setText('Objective:\nTalk to Seargent Jin.')
                  this.raceMusic.stop();
                  this.music.resume();
               });

               // * Hide Checkpoints
               this.checkpoint1.setAlpha(0);
               this.checkpoint2.setAlpha(0);
               this.checkpoint3.setAlpha(0);
               this.checkpoint4.setAlpha(0);
               this.checkpoint5.setAlpha(0);

            // * If Won Race...
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

   startLostRaceQuest() {
      this.timerEnded = false;
      this.ruby.stopMoving('idle_up');
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogBox('see I told you so.', 'army', 1);
      keySPACE.once('down', () => {
         lostRaceQuest[0].call(this, this.lostRaceQuestChain(1));
      }, this);
   }

   // * FUTBOL QUEST

   futbolQuestChain(i) {
      return function() {
         // * Start of Quest
         if (futbolQuest[i]) {
            futbolQuest[i].call(this, this.futbolQuestChain(++i));
         // * End of Quest
         } else {
            
            // * Make Camera Follow Ruby Again
            this.cameras.main.startFollow(this.ruby, true, 0.25, 0.25)

            // * Destroy Quest Assets
            this.futBall.destroy();
            this.goalPost.destroy();
            this.shootingArrow.destroy();

            // * End Quest
            this.endQuest();
         }
      }.bind(this);
   }

   startFutbolQuest() {
      this.startedQuest = true;
      this.ruby.stopMoving('idle_down');
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogBox('Hey guys! Wanna play futbol? ⚽!', 'adrian', 1);
      keySPACE.once('down', () => {
         futbolQuest[0].call(this, this.futbolQuestChain(1));
      }, this);
   }

   endPenaltyTurn() {
      this.round += 1;
      this.shootingArrow.setAlpha(0);
      this.objectiveUI.setText(`Objective:\nScore Goals.\nScored: ${this.goals}/${this.maxRounds}`)
      this.events.emit('endedTurn');
   }

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

   // * TANOOKI QUEST

   tanookiQuestChain(i) {
      return function() {
         // * Start of Quest
         if (tanookiQuest[i]) {
            tanookiQuest[i].call(this, this.tanookiQuestChain(++i));
         // * End of Quest
         } else {
            // * End Quest
            this.endQuest();
         }
      }.bind(this);
   }

   startTanookiQuest() {
      this.startedQuest = true;
      this.ruby.stopMoving('idle_up');
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogBox('RUBY!', 'nathan', 1);
      keySPACE.once('down', () => {
         tanookiQuest[0].call(this, this.tanookiQuestChain(1));
      }, this);
   }

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
      } else if(this.tanookiTotalCount == 25) {
         this.showTanookiTimer.delay = 1500;
      } else if(this.tanookiTotalCount == 45) {
         this.showTanookiTimer.delay = 1250;
      } else if(this.tanookiTotalCount == 60) {
         this.showTanookiTimer.delay = 1000;
      }
      console.log(this.showTanookiTimer.delay)

      this.hideTanookiTimer = this.time.delayedCall(this.showTanookiTimer.delay/2, () => {
         tanooki.destroy();
         this.objectiveUI.setText(`Objective: Tap on the Tanookis before they hide.\nAccuracy: ${Math.trunc((this.tanookiHitCount/this.tanookiTotalCount)*100)}%`)
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
      this.destroy();             // destroy the child obj
   }

   // * LUMBER QUEST

   lumberQuestChain(i) {
      return function() {
         // * Start of Quest
         if (lumberQuest[i]) {
            lumberQuest[i].call(this, this.lumberQuestChain(++i));
         // * End of Quest
         } else {
            // * End Quest
            this.endQuest();
         }
      }.bind(this);
   }

   startLumberQuest() {
      this.startedQuest = true;
      this.ruby.stopMoving('idle_up');
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogBox('WE ARE RECRUITING HERE\nAT JACK\'S LUMBER YARD!', 'jack', 1);
      keySPACE.once('down', () => {
         lumberQuest[0].call(this, this.lumberQuestChain(1));
      }, this);
   }

   chopTree(lumberjack, tree, axe) {
      tree.chopCount += 1;
      console.log('tree cut progress: ' + tree.currentFrame);
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
         this.choppingTreeWinner();
      }
      console.log('chop count: ' + tree.chopCount);
      console.log('max chop count: ' + tree.chopCount);
   }

   choppingTreeWinner() {
      console.log('rubysTreeIsCut')
      this.lumberMusic.stop();
      this.treeCutTime = this.rubyCutTree.getElapsedSeconds();
      this.rubyCutTree.remove();
      this.maxCutTree.remove();
      this.jackCutTree.remove();
      this.choppingWood = false;
      if(this.treeCutTime < 90) {
         this.time.delayedCall(3175, () => {
            this.cameras.main.shake(300, 0.0075);
            this.events.emit('rubysTreeIsCut');
         })
      } else {
         this.events.emit('rubysTreeIsCut');
      }

   }


   // * FINAL QUEST

   // * Enables UI & Logic For Final Quest
   setupFinalQuest() {
      this.objectiveUI.setText('Objective:\nHead back to the Cave.')
      this.caveEntranceCollider.active = true;
      this.waypoint.setAlpha(1);
      this.distanceUI.setAlpha(1);
      this.completedAllQuests = true;
   }

   // * Final Quest Starting Dialogue
   startFinalQuest() {
      this.dialogBox('', 'placeholder', 0);
      this.ruby.stopMoving('idle_up');
      this.maxTheSlime.setVelocity(0, 0);

      this.time.delayedCall(1000, () => {
         this.dialogBox('Ok, that should be enough fireflies.', 'ruby', 1);
         keySPACE.once('down', () => {
            this.dialogBox('Ready to head back?', 'ruby', 1);
            keySPACE.once('down', () => {
               this.dialogBox('yes! let\'s go!', 'max', 1);
               keySPACE.once('down', () => {
                  this.ruby.canMove = true;
                  this.dialogBox('', 'placeholder', 0);
                  this.setupFinalQuest();
               })
            })
         })

      })
   }

   exitScene() {
      // * Disable Collider
      this.caveEntranceCollider.active = false;

      // * Stop Music
      this.tweens.add({
         targets: this.music,
         duration: 2500,
         volume: 0
      })

      // * Stop Player Movement
      this.ruby.stopMoving('idle_up');
      this.maxTheSlime.setVelocity(0, 0);

      // * Fade out Camera and enter next Scene
      this.cameras.main.fadeOut(2500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('finalScene');
      });
   }
}
