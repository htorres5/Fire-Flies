// TODO: Implement Store Scene
class Store extends Phaser.Scene {
   constructor() {
      super({key: 'storeScene'})

      this.VEL = 100;
      this.padding = game.config.width / 100;
   }
   
   init(data) {
      this.music = data.music;
   }

   preload() {
      this.load.path = './assets/'
      this.load.image('dad', '/sprites/dad.png')
      this.load.image('ruby', '/sprites/ruby.png')
      this.load.image('max', '/sprites/max.png')
      this.load.image('exit', '/sprites/change_depth.png')

      // * TileMap
      this.load.image('tilesetImage3', '/tilemaps/interior_tileset.png')
      this.load.tilemapTiledJSON('tilemapJSON3','/tilemaps/store.json')

      // * Music
      this.load.audio('air_raid_siren_start', './audio/air_raid_siren_start.mp3')
      this.load.audio('air_raid_siren_loop', './audio/air_raid_siren_loop.mp3')

   }

   tile(coord) {
      return coord * 32;
   }

   create() {

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
      this.ruby.canMove = true;

      this.ruby.body.setCollideWorldBounds(true)
      
      // * Add Max (real)
      this.maxTheSlime = new Max(this, this.tile(4.5), this.tile(6.5), this.ruby, 90, 'max').setAlpha(0);

      // * Add Path for Max (lil bro)
      this.maxPath = new Phaser.Curves.Path(this.tile(4.5), this.tile(6.5));
      this.maxPath.lineTo(this.tile(4.5), this.tile(5.5));
      this.maxPath.lineTo(this.tile(5.5), this.tile(5.5));
      this.maxPath.lineTo(this.tile(5.5), this.tile(4.5));
      this.maxPath.lineTo(this.tile(16.5), this.tile(4.5));

      // * Add Max
      this.maxTheSlimeActor = this.add.follower(this.maxPath, this.tile(4.5), this.tile(6.5), 'max');

      // * Add Richard (dad)

      // * Add path for Richard (dad)
      this.dadPath = new Phaser.Curves.Path(this.tile(5), this.tile(2));
      this.dadPath.lineTo(this.tile(8), this.tile(2));
      this.dadPath.lineTo(this.tile(8), this.tile(4));
      this.dadPath.lineTo(this.tile(3), this.tile(6));

      this.dadExit = new Phaser.Curves.Path(this.tile(3), this.tile(6));
      this.dadExit.lineTo(this.tile(3), this.tile(10));

      this.dad = this.add.follower(this.dadPath, this.tile(5), this.tile(2), 'dad').setOrigin(0);

      // * Collision
      this.wallsLayer.setCollisionByProperty({ collides: true })
      this.decorationsLayer.setCollisionByProperty({ collides: true })
      this.doorsLayer.setCollisionByProperty({ collides: true })
      this.physics.add.collider(this.ruby, this.wallsLayer)
      this.physics.add.collider(this.ruby, this.decorationsLayer)
      this.physics.add.collider(this.ruby, this.doorsLayer)

      // * Add Exit Collider
      this.exit = this.physics.add.sprite(this.tile(3), this.tile(7.5), 'exit', '0').setOrigin(0);

      this.exitCollider = this.physics.add.overlap(this.ruby, this.exit, () => {
         this.exitCollider.active = false;
         this.ruby.canMove = false;
         this.ruby.setVelocity(0, 0);
         this.maxTheSlime.setVelocity(0, 0);
         this.cameras.main.fadeOut(1000, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
             this.scene.start('airRaidScene', {music: this.siren});
         });
      });
      this.exitCollider.active = false;


      // * Opening Cutscene in Checkout Room Flag
      this.cutsceneFlag = this.add.rectangle(0, 0, this.tile(9), this.tile(5), 0x000000, 0).setOrigin(0);
      this.physics.add.existing(this.cutsceneFlag);
      this.startCutscene = false;
      this.cutsceneCollider = this.physics.add.overlap(this.ruby, this.cutsceneFlag, () => this.startCutscene = true)

      this.maxCutsceneFlag = this.add.rectangle(this.tile(15), this.tile(3), this.tile(3), this.tile(2), 0x000000, 0).setOrigin(0);
      this.physics.add.existing(this.maxCutsceneFlag);
      this.maxCutsceneCollider = this.physics.add.overlap(this.ruby, this.cutsceneFlag, () => this.startCutscene = true)


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
         this.maxTheSlime.update();
       }

   }

   chain(i) {
      return function() {
         if (storeCutscene[i]) {
            storeCutscene[i].call(this, this.chain(++i));
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
      this.ruby.canMove = false;
      this.dialogue.text = 'ok ima go look at the tomatoes!'
      this.ruby.setVelocity(0, 0);
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setAlpha(1);
      keySPACE.once('down', () => {
         // ! UNCOMMENT THIS FOR PLAYTEST BUILD
         storeCutscene[0].call(this, this.chain(1));
         // ! DELETE THIS
         // this.cameras.main.fadeOut(2500, 0, 0, 0);
         // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
         //     this.scene.start('overworldScene');
         // });
      }, this);
   }
}

var storeCutscene = [
   function(fn) {
      this.maxTheSlimeActor.startFollow({
          duration: 3000,
          rotateToPath: false,
          verticalAdjust: true
      });
      this.dialogue.setAlpha(0);
      this.textBox.setAlpha(0);
      this.portrait.setAlpha(0);
      this.time.delayedCall(3500, () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Hi Dad.'
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setTexture('ruby').setAlpha(1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = '!'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Ruby!'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'What a suprise to see you!'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Wait, why are you outside?\nAre you ok?'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Mom told me to go get some\nexercise with Max.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Oh nice!'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'You know back in my prime,\nI had a two minute kilometer!'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'I was known as Slippy Richard 😎'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'I\'m not running.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Fair.'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Is that the only reason you two\ncame here for?'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'To say hi and show affection\nto your loveable dad?'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'No.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'We came here for Rice.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Of course, you would do anything\nfor rice!'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Yes, Rice is objectively\nthe best food.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'How much Rice do you need?'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },


   function(fn) {
      this.dialogue.text = '20kg'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = '20kg??? In this economy?'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Is it that bad?'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Yes...'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'The Americans have been doing\nair raids all over our farms.'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Each week we recieve\nless and less at a\ngreater cost.'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'But since you are family,\nI will give you—'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         this.music.stop();
         fn();
      })
   },

   function(fn) {
      this.time.delayedCall(1500, () => {
         this.sirenStart.play();
      })
      this.dialogue.setAlpha(0);
      this.textBox.setAlpha(0);
      this.portrait.setAlpha(0);
      this.portrait.setTexture('dad');
      this.time.delayedCall(4500, () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = '...'
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setAlpha(1);
      this.portrait.setTexture('dad');
      this.time.delayedCall(3000, () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Get your brother.'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dad.startFollow({
         duration: 1500,
         rotateToPath: false,
         verticalAdjust: true
     });
     this.dialogue.setAlpha(0);
     this.textBox.setAlpha(0);
     this.portrait.setAlpha(0);
     this.time.delayedCall(1550, () => {
        fn();
     })
   },

   function(fn) {
      this.dialogue.text = 'Wait!'
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setAlpha(1);
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
     this.dialogue.setAlpha(0);
     this.textBox.setAlpha(0);
     this.portrait.setAlpha(0);
     this.time.delayedCall(1550, () => {
        fn();
     })
   },

   function(fn) {
      this.dialogue.text = 'Where are you going!?'
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setAlpha(1);
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'To get your mom.'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Take your brother\nand head to the shelter.'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Wait but...'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Are you going to head back in time?'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Yes, don\'t doubt Slippy Richard.'
      this.portrait.setTexture('dad');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dad.destroy();
      this.dialogue.setAlpha(0);
      this.textBox.setAlpha(0);
      this.portrait.setAlpha(0);
      this.dadLeaving = this.add.follower(this.dadExit, this.tile(3), this.tile(6), 'dad').setOrigin(0);
      this.dadLeaving.startFollow({
         duration: 500,
         rotateToPath: false,
         verticalAdjust: true
     });
      this.portrait.setTexture('dad');
      this.time.delayedCall(1000, () => {
         fn();
      })
   },

   function(fn) {
      this.ruby.canMove = true;
      this.maxCutsceneCollider = this.physics.add.overlap(this.ruby, this.maxCutsceneFlag, () => {
         this.maxCutsceneCollider.active = false;
         fn();
      })
   },

   function(fn) {
      this.ruby.canMove = false;
      this.dialogue.text = '...'
      this.ruby.setVelocity(0, 0);
      this.maxTheSlime.setVelocity(0, 0);
      this.dialogue.setAlpha(1);
      this.textBox.setAlpha(1);
      this.portrait.setTexture('max').setAlpha(1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'mom said it was over...'
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
      this.dialogue.text = 'Let\'s go.'
      this.portrait.setTexture('ruby');
      keySPACE.once('down', () => {
         fn();
      })
   },
]