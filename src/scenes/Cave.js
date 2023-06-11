// TODO: Implement Store Scene
class Cave extends Phaser.Scene {
   constructor() {
      super({key: 'caveScene'})

      this.VEL = 100;
      this.padding = game.config.width / 100;
   }

   preload() {
      this.load.path = './assets/'
      this.load.spritesheet('army', './sprites/army.png', {
         frameWidth: 32,
         frameHeight: 32,
      })
      this.load.image('ruby', '/sprites/sheets/ruby/up1.png')
      this.load.image('max', '/sprites/max.png')
      this.load.image('exit', '/sprites/change_depth.png')

      // * TileMap
      this.load.image('tilesetImage4', '/tilemaps/interior_tileset.png')
      this.load.tilemapTiledJSON('tilemapJSON4','/tilemaps/cave.json')

      // * Music
      this.load.audio('rain_drop', './audio/music/rain_drop.mp3')

   }

   tile(coord) {
      return coord * 32;
   }

   create() {

      // fade in scene
      this.cameras.main.fadeIn(2500, 0, 0, 0)

      // * Add Tilemap
      this.map = this.add.tilemap('tilemapJSON4')
      this.tileset = this.map.addTilesetImage('interior_tileset', 'tilesetImage4')

      // * Add Layers
      this.caveLayer = this.map.createLayer('cave', this.tileset, 0, 0);
      this.decorationsLayer = this.map.createLayer('decorations', this.tileset, 0, 0);

      // * Add Ruby (Protaganist)
      this.ruby = new Ruby(this, this.tile(9), this.tile(4), this.VEL);
      this.ruby.canMove = false;

      this.ruby.body.setCollideWorldBounds(true)
      
      // * Add Max (real)
      this.maxTheSlime = new Max(this, this.tile(10.5), this.tile(4.5), this.ruby, 90, 'max').setAlpha(0);
      this.maxTheSlime.play('jiggle');

      // * Add Path for Max (lil bro)
      this.maxPath = new Phaser.Curves.Path(this.tile(10.5), this.tile(4.5));

      // * Add Max
      this.maxTheSlimeActor = this.add.follower(this.maxPath, this.tile(10.5), this.tile(4.5), 'max', 0);
      this.maxTheSlimeActor.play('jiggle');

      // * Add Jin (Army)

      this.anims.create({
         key: 'vibrate',
         frameRate: 4,
         repeat: -1,
         frames: this.anims.generateFrameNumbers('army', {
            start: 0,
            end: 1
         })
      })

      // * Add Path for Jin (Army)
      this.armySlimePath = new Phaser.Curves.Path(this.tile(9), this.tile(6)); 
      this.armySlimePath.lineTo(this.tile(9), this.tile(9));

      this.armySlime =  this.add.follower(this.armySlimePath, this.tile(9), this.tile(6), 'army', 1).setOrigin(0);
      this.armySlime.anims.play('vibrate');

      // * Collision
      this.caveLayer.setCollisionByProperty({ collides: true })
      this.decorationsLayer.setCollisionByProperty({ collides: true })
      this.physics.add.collider(this.ruby, this.caveLayer)
      this.physics.add.collider(this.ruby, this.decorationsLayer)

      // * Add Exit Collider
      this.exit = this.physics.add.sprite(this.tile(9), this.tile(7.5), 'exit', '0').setOrigin(0).setAlpha(0);

      this.exitCollider = this.physics.add.overlap(this.ruby, this.exit, () => {
         this.exitCollider.active = false;
         this.ruby.canMove = false;
         this.ruby.setVelocity(0, 0);
         this.maxTheSlime.setVelocity(0, 0);
         this.cameras.main.fadeOut(1000, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.dialogue.setAlpha(1).setText('End of Playtest Build.')
             //this.scene.start('airRaidScene', {music: this.siren});
         });
      });
      this.exitCollider.active = false;


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
      this.music = this.sound.add('rain_drop', {volume: 0});

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
      
      this.portrait = this.add.sprite(game.config.width / 8, game.config.height / 1.3 + this.padding*4, 'max').setOrigin(0.5).setAlpha(0).setDepth(3);
      this.portrait.setScrollFactor(0, 0);


      // * Start Cutscene
      this.start();
   }

   update() {
       if(this.ruby.canMove) {
         // * Ruby Controls/Movement
         this.ruby.update();
         // * Max Movement
         this.maxTheSlime.update();
       }

   }

   chain(i) {
      return function() {
         if (caveCutscene[i]) {
            caveCutscene[i].call(this, this.chain(++i));
         } else {
            this.ruby.canMove = true;
            this.dialogue.setAlpha(0);
            this.textBox.setAlpha(0);
            this.portrait.setAlpha(0);
            this.maxTheSlimeActor.destroy();
            this.maxTheSlime.setAlpha(1);
            this.exitCollider.active = true;
         }
      }.bind(this);
   }

   start() {
      this.music.play({volume: 0});
      this.ruby.canMove = false;
      this.ruby.setVelocity(0, 0);
      this.ruby.anims.play('idle_down')
      this.maxTheSlime.setVelocity(0, 0);

      this.time.delayedCall(3000, () => {
         this.dialogue.text = 'I\'m sorry for your loss.'
         this.dialogue.setAlpha(1);
         this.textBox.setAlpha(1);
         this.portrait.setTexture('army').setAlpha(1);
         keySPACE.once('down', () => {
            // ! UNCOMMENT THIS FOR PLAYTEST BUILD
            caveCutscene[0].call(this, this.chain(1));
            // ! DELETE THIS
            // this.cameras.main.fadeOut(2500, 0, 0, 0);
            // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            //     this.scene.start('overworldScene');
            // });
         }, this);
      })


   }
}

var caveCutscene = [
   function(fn) {
      this.armySlime.startFollow({
         duration: 3000,
         rotateToPath: false,
         verticalAdjust: true
      });
      this.tweens.add({
         targets: this.music,
         volume: 0.25,
         duration: 5000
      })
      this.dialogue.setAlpha(0);
      this.textBox.setAlpha(0);
      this.portrait.setAlpha(0);
      this.time.delayedCall(5000, () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = '...'
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setTexture('max').setAlpha(1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'are mom and dad still\nat the hospital?'
      this.portrait.setTexture('max');
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
      this.ruby.flipX = true;
      this.ruby.anims.play('idle_side')
      this.dialogue.text = 'Yes, they still are.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'How about we play a game?'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'is it the be quiet game again?'
      this.portrait.setTexture('max');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'No, it\'s an actual game.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Have you ever caught a\nfirefly before?'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'no! they\'re hard to catch!'
      this.portrait.setTexture('max');
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
      this.dialogue.text = 'Well, we are going to catch\na bunch of them.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'So much that this cave\nwill be as bright as the sun!'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = '😮'
      this.portrait.setTexture('max');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'no more dark?'
      this.portrait.setTexture('max');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'No more dark.\nYou can sleep in peace.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'where are fireflies?'
      this.portrait.setTexture('max');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Let\'s go. I\'ll show you.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

]