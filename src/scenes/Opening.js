class Opening extends Phaser.Scene {
   constructor() {
      super({key: 'openingScene'})

      this.padding = game.config.width / 100;
      this.VEL = 100;
   }

   preload() {
      this.load.path = './assets/'
      this.load.image('mom', '/sprites/mom.png')
      this.load.image('ruby', '/sprites/sheets/ruby/idle.png')
      this.load.spritesheet('max', '/sprites/max.png', {
         frameWidth: 16,
         frameHeight: 16,
      })

      // * Blank Sprite
      this.load.image('exit', '/sprites/change_depth.png')

      // * Ruby Texture Atlas
      this.load.atlas('ruby_sheet', '/sprites/sheets/ruby/ruby.png', '/sprites/sheets/ruby/ruby.json')

      // * Controls Sprite
      this.load.image('controls', '/sprites/controls.png')

      // * TileMap
      this.load.image('tilesetImage1', '/tilemaps/interior_tileset.png')
      this.load.tilemapTiledJSON('tilemapJSON1','/tilemaps/opening.json')

      // * Music
      this.load.audio('windmill_village', './audio/music/windmill_village.mp3')

   }

   tile(coord) {
      return coord * 32;
   }

   create() {
      // * Add Tilemap
      this.map = this.add.tilemap('tilemapJSON1')
      this.tileset = this.map.addTilesetImage('interior_tileset', 'tilesetImage1')

      // * Add Layers
      this.floorLayer = this.map.createLayer('floor', this.tileset, 0, 0);
      this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);
      this.rugsLayer = this.map.createLayer('rugs', this.tileset, 0, 0);
      this.decorationsLayer = this.map.createLayer('decorations', this.tileset, 0, 0);
      this.doorsLayer = this.map.createLayer('doors', this.tileset, 0, 0);

      // * Add Ruby (Protaganist)
      this.ruby = new Ruby(this, this.tile(15), this.tile(3.5), this.VEL);

      // * Add Ruby's Animations

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

      this.ruby.body.setCollideWorldBounds(true)

      // * Add Max (real)
      this.maxTheSlime = new Max(this, this.tile(16), this.tile(3.5), this.ruby, 90, 'max').setAlpha(0);

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
      
      // * Add Path for Max (lil bro)
      this.maxPath = new Phaser.Curves.Path(this.tile(3.5), this.tile(9));
      this.maxPath.lineTo(this.tile(3.5), this.tile(6.5));
      this.maxPath.lineTo(this.tile(5.5), this.tile(6.5));
      this.maxPath.lineTo(this.tile(5.5), this.tile(3.5));

      // * Add Miku (mom)
      this.mom = this.physics.add.sprite(this.tile(3), this.tile(2), 'mom', 0).setOrigin(0);

      // * Collision
      this.wallsLayer.setCollisionByProperty({ collides: true })
      this.decorationsLayer.setCollisionByProperty({ collides: true })
      this.doorsLayer.setCollisionByProperty({ collides: true })
      this.physics.add.collider(this.ruby, this.wallsLayer)
      this.physics.add.collider(this.ruby, this.decorationsLayer)
      this.physics.add.collider(this.ruby, this.doorsLayer)

      // * Add Exit Collider
      this.exit = this.physics.add.sprite(this.tile(3), this.tile(7.5), 'exit', '0').setOrigin(0).setAlpha(0);
      this.exitCollider = this.physics.add.overlap(this.ruby, this.exit, () => {
         this.exitCollider.active = false;
         this.ruby.canMove = false;
         this.ruby.setVelocity(0, 0);
         this.ruby.anims.play('idle_down');
         this.maxTheSlime.setVelocity(0, 0);
         this.cameras.main.fadeOut(1000, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('overworldScene', {music: this.music});
         });
      });

      // * Opening Cutscene in Kitchen Flag
      this.cutsceneFlag = this.add.rectangle(0, 0, this.tile(6), this.tile(10), 0x000000, 0).setOrigin(0);
      this.physics.add.existing(this.cutsceneFlag);
      this.startCutscene = false;
      this.cutsceneCollider = this.physics.add.overlap(this.ruby, this.cutsceneFlag, () => this.startCutscene = true)


      // cameras
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      this.cameras.main.startFollow(this.ruby, true, 0.25, 0.25)
      this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)

      // input
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      // * Music
      this.music = this.sound.add('windmill_village', {volume: 0.25, loop: true})

      // * Dialogue

      this.textBox = this.add.rectangle(this.padding*2, game.config.height / 1.5, game.config.width - this.padding*4, (game.config.height / 3 ) - this.padding*2, 0x000000, 1).setStrokeStyle(this.padding, 0xFFFFFF, 1).setOrigin(0).setAlpha(0).setDepth(3);
      this.textBox.setScrollFactor(0, 0);

      this.dialogueConfig = {
         fontFamily: 'Hanyi',
         fontSize: '12px',
         color: '#fff',
         align: 'left'
     }
      this.dialogue = this.add.text(game.config.width / 4, game.config.height / 1.5 + this.padding*4, "You are in a room,\nsleeping soundly...\n(Press SPACE)", this.dialogueConfig).setAlpha(0).setDepth(3);
      this.dialogue.setScrollFactor(0, 0);
      
      this.portrait = this.add.sprite(game.config.width / 8, game.config.height / 1.3 + this.padding*4, 'mom').setOrigin(0.5).setAlpha(0).setDepth(3);
      this.portrait.setScrollFactor(0, 0);

      // * Show Controls
      this.controls = this.add.image(this.tile(13.5), this.tile(0.25), 'controls', 0).setAlpha(0).setOrigin(0);

      this.tweens.add({
         targets: this.controls,
         alpha: 1,
         duration: 500
      })

      // * On Movement, Start Cutscene
      this.moved = false;
   }
   
   update() {
      // * On Movement, Start Music Cutscene
      if((Phaser.Input.Keyboard.JustDown(keyUP) || (Phaser.Input.Keyboard.JustDown(keyDOWN)) || (Phaser.Input.Keyboard.JustDown(keyLEFT)) || (Phaser.Input.Keyboard.JustDown(keyRIGHT))) && !this.moved) {
         this.moved = true;
         this.controls.destroy();
         this.music.play()
         this.start();
      }
       // * Ruby Controls/Movement
       if(this.ruby.canMove) {
         this.ruby.update();
         this.maxTheSlime.update();
       }

   }

   chain(i) {
      return function() {
         if (cutscene[i]) {
            cutscene[i].call(this, this.chain(++i));
         } else {
            this.ruby.canMove = true;
            this.dialogue.setAlpha(0);
            this.textBox.setAlpha(0);
            this.portrait.setAlpha(0);

            this.maxTheSlimeActor.destroy();
            this.maxTheSlime.setAlpha(1);
         }
      }.bind(this);
   }

   start() {
      this.ruby.canMove = false;
      this.dialogue.text = 'RUBYYYYYYYYYYY!!!\n\n(Press SPACE)'
      this.ruby.setVelocity(0, 0);
      this.ruby.anims.play('idle_side');
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setAlpha(1);
      keySPACE.once('down', () => {
         cutscene[0].call(this, this.chain(1));
      }, this);
   }
}

var cutscene = [
   function(fn) {
      this.dialogue.text = 'COME FOR DINNERRRRRRRRRRR'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.ruby.canMove = true;
      this.dialogue.setAlpha(0);
      this.textBox.setAlpha(0);
      this.portrait.setAlpha(0);
      this.cutsceneCollider = this.physics.add.overlap(this.ruby, this.cutsceneFlag, () => { 
         this.ruby.setVelocity(0, 0);
         this.ruby.anims.play('idle_up');
         this.maxTheSlime.setVelocity(0, 0);
         this.cutsceneCollider.active = false;
         console.log('hi');
         fn();
         //this.startCutscene = true;
      })
   },

   function(fn) {
      this.dialogue.text = '?'
      this.ruby.canMove = false;
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setAlpha(1);
      this.portrait.setTexture('mom').setAlpha(1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'What?'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Where\'s Max?'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'idk'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'How do you not know where your\nbrother is?'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'So irresponsible!'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = '...'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.maxTheSlimeActor = this.add.follower(this.maxPath, this.tile(3.5), this.tile(9), 'max', 0);
      this.maxTheSlimeActor.anims.play('jiggle');
      this.maxTheSlimeActor.startFollow({
          duration: 5000,
          rotateToPath: false,
          verticalAdjust: true
      });
      this.dialogue.setAlpha(0);
      this.textBox.setAlpha(0);
      this.portrait.setAlpha(0);
      this.time.delayedCall(5500, () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Ah there you are!'
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setAlpha(1);
      this.portrait.setTexture('mom').setAlpha(1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'hi mom! hi Ruby!'
      this.portrait.setTexture('max').setAlpha(1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Where were you!?'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'DID YOU GO TO THE CAVE AGAIN???'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'ummm...'
      this.portrait.setTexture('max');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'no! it was very dark this time :3'
      this.portrait.setTexture('max');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = '*sighs*'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Well, just be careful.'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Anyways, now that you\'re both here,\ncan you go to the store and \nget Rice?'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Why do you do this...'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'You never leave room unless I say\ndinner!'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'You\'re gonna get fat!\nGo exercise with your brother!'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'cave :D'
      this.portrait.setTexture('max');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'NO! Get food first,\nor we starve to death!'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'ok we go after!'
      this.portrait.setTexture('max');
      keySPACE.once('down', () => {
         fn();
      })
   },
]