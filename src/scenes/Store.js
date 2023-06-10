// TODO: Implement Store Scene
class Store extends Phaser.Scene {
   constructor() {
      super({key: 'storeScene'})

      this.padding = game.config.width / 100;
   }
   
   // init(data) {
   //    this.music = data.music;
   // }

   preload() {
      this.load.path = './assets/'
      this.load.image('dad', '/sprites/dad.png')
      this.load.image('ruby', '/sprites/riku.png')
      this.load.image('max', '/sprites/max.png')
      this.load.image('exit', '/sprites/change_depth.png')

      // * TileMap
      this.load.image('tilesetImage3', '/tilemaps/interior_tileset.png')
      this.load.tilemapTiledJSON('tilemapJSON3','/tilemaps/store.json')

   }

   tile(coord) {
      return coord * 32;
   }

   create() {
      // ! remove this and replace with data
      // * Music
      this.music = this.sound.add('windmill_village', {volume: 0.25, loop: true})
      this.music.play();

      // * Add Tilemap
      this.map = this.add.tilemap('tilemapJSON3')
      this.tileset = this.map.addTilesetImage('interior_tileset', 'tilesetImage3')

      // * Add Layers
      this.floorLayer = this.map.createLayer('floor', this.tileset, 0, 0);
      this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);
      this.rugsLayer = this.map.createLayer('rugs', this.tileset, 0, 0);
      this.decorationsLayer = this.map.createLayer('decorations', this.tileset, 0, 0);
      this.doorsLayer = this.map.createLayer('doors', this.tileset, 0, 0);

      // * Add Ruby (Protaganist)
      this.ruby = this.physics.add.sprite(this.tile(3), this.tile(6), 'ruby', 0).setDepth(1).setScale(0.8).setOrigin(0);
      this.ruby.canMove = false;

      this.ruby.body.setCollideWorldBounds(true)
      
      // * Add Path for Max (lil bro)
      this.maxPath = new Phaser.Curves.Path(this.tile(3.5), this.tile(7.5));
      this.maxPath.lineTo(this.tile(3.5), this.tile(5.5));
      this.maxPath.lineTo(this.tile(4.5), this.tile(5.5));
      this.maxPath.lineTo(this.tile(4.5), this.tile(4.5));
      this.maxPath.lineTo(this.tile(16.5), this.tile(4.5));

      // * Add Richard (dad)
      this.dad = this.physics.add.sprite(this.tile(5), this.tile(2), 'dad', 0).setOrigin(0);

      // * Collision
      this.wallsLayer.setCollisionByProperty({ collides: true })
      this.decorationsLayer.setCollisionByProperty({ collides: true })
      this.doorsLayer.setCollisionByProperty({ collides: true })
      this.physics.add.collider(this.ruby, this.wallsLayer)
      this.physics.add.collider(this.ruby, this.decorationsLayer)
      this.physics.add.collider(this.ruby, this.doorsLayer)

      // * Add Exit Collider
      this.exit = this.physics.add.sprite(this.tile(3), this.tile(7.5), 'exit', '0').setOrigin(0);
      this.exitCollider.active = false;

      this.exitCollider = this.physics.add.overlap(this.ruby, this.exit, () => {
         this.exitCollider.active = false;
         this.ruby.canMove = false;
         this.ruby.setVelocity(0, 0);
         this.cameras.main.fadeOut(1000, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('overworldScene', {music: this.music});
         });
      });

      // * Opening Cutscene in Kitchen Flag
      this.cutsceneFlag = this.add.rectangle(0, 0, this.tile(9), this.tile(5), 0x000000, 0).setOrigin(0);
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
      this.siren = this.sound.add('air_raid_siren_loop', {volume: 1, loop: true});
      this.sirenStart = this.sound.add('air_raid_siren_start', {volume: 1, loop: false}).on('complete', () => {
         this.siren.play();
      });

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
      this.cutsceneCollider = this.physics.add.overlap(this.ruby, this.cutsceneFlag, () => { 
         this.cutsceneCollider.active = false;
         console.log('hi');
         this.start();
         //this.startCutscene = true;
      })
      
   }

   update() {
       // * Ruby Controls/Movement
       if(this.ruby.canMove) {
         this.direction = new Phaser.Math.Vector2(0)
         if(keyLEFT.isDown) {
            this.direction.x = -1;
         } else if (keyRIGHT.isDown) {
            this.direction.x = 1;
         }
         if(keyUP.isDown) {
            this.direction.y = -1;
         } else if (keyDOWN.isDown) {
            this.direction.y = 1;
         }
   
         this.direction.normalize();
         this.ruby.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
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
            this.maxTheSlime = new Max(this, this.tile(5.5), this.tile(3.5), this.ruby, 90, 'max');
         }
      }.bind(this);
   }

   start() {
      this.ruby.canMove = false;
      this.dialogue.text = 'ok ima go look at the tomatoes!'
      this.ruby.setVelocity(0, 0);
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setAlpha(1);
      keySPACE.once('down', () => {
         // ! UNCOMMENT THIS FOR PLAYTEST BUILD
         cutscene[0].call(this, this.chain(1));
         // ! DELETE THIS
         // this.cameras.main.fadeOut(2500, 0, 0, 0);
         // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
         //     this.scene.start('overworldScene');
         // });
      }, this);
   }
}

var cutscene = [
   function(fn) {
      this.maxTheSlimeActor = this.add.follower(this.maxPath, this.tile(3.5), this.tile(7.5), 'max');
      this.maxTheSlimeActor.startFollow({
          duration: 3000,
          rotateToPath: false,
          verticalAdjust: true
      });
      this.dialogue.setAlpha(0);
      this.textBox.setAlpha(0);
      this.portrait.setAlpha(0);
      // this.time.delayedCall(3500, () => {
      //    fn();
      // })
   },

   function(fn) {
      this.ruby.canMove = true;
      this.dialogue.setAlpha(0);
      this.textBox.setAlpha(0);
      this.portrait.setAlpha(0);
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
      this.maxTheSlimeActor = this.add.follower(this.maxPath, this.tile(3.5), this.tile(9), 'max');
      this.maxTheSlimeActor.startFollow({
          duration: 5000,
          rotateToPath: false,
          verticalAdjust: true
      });
      this.dialogue.setAlpha(0);
      this.textBox.setAlpha(0);
      this.portrait.setAlpha(0);
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
      this.sirenStart.play();
      this.dialogue.text = 'ok we go after!'
      this.portrait.setTexture('max');
      keySPACE.once('down', () => {
         fn();
      })
   },
]