class Finale extends Phaser.Scene {
   constructor() {
      super({key: 'finalScene'});

      this.VEL = 100;
      this.padding = game.config.width / 100;
   }

   preload() {
      this.load.path = './assets/'

      // * Characters

      // * Ruby
      this.load.image({
         key:'ruby', 
         url: '/sprites/sheets/ruby/down1.png',
      });

      // * Ruby (Shaded)
      this.load.image({
         key:'ruby_shaded', 
         url: '/sprites/sheets/ruby/idle.png',
         normalMap: '/sprites/sheets/ruby/idle_n.png'
      });

      // * Ruby (Suprised)
      this.load.image({
         key:'ruby_suprised', 
         url: '/sprites/sheets/ruby/ruby_suprised.png',
      });

      // * Ruby (Happy)
      this.load.image({
         key:'ruby_happy', 
         url: '/sprites/sheets/ruby/ruby_happy.png',
      });
      
      // * Max
      this.load.spritesheet({
         key: 'max',
         url: '/sprites/max.png', 
         frameConfig: {
            frameWidth: 16,
            frameHeight: 16,
         }
      })

      // * Max (Shaded)
      this.load.spritesheet({
         key: 'max_shaded',
         url: '/sprites/max.png', 
         normalMap: '/sprites/max_n.png',
         frameConfig: {
            frameWidth: 16,
            frameHeight: 16,
         }
      })

      // * Ruby Texture Atlas
      this.load.atlas('ruby_sheet', '/sprites/sheets/ruby/ruby.png', '/sprites/sheets/ruby/ruby.json')

      // * Firefly
      this.load.image('firefly', './sprites/firefly.png')

      // * Blank Sprite
      this.load.image('placeholder', '/sprites/change_depth.png')
      
      // * Music
      this.load.audio('dawning_tale', './audio/music/dawning_tale.mp3')
      this.load.audio('limpid_water', './audio/music/limpid_water.mp3')

      // * Tilemap
      this.load.image({
         key: 'finaleTileset',
         url: '/tilemaps/interior_tileset.png',
         normalMap: '/tilemaps/interior_tileset_n.png'});
      this.load.tilemapTiledJSON('finaleTilemap','/tilemaps/finale.json')
   }

   randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
   }

   tile(coord) {
      return coord * 32;
   }

   create() {

      // * Fade In Scene
      this.cameras.main.fadeIn(2500, 0, 0, 0)

      // * Enable Lights
      // 0x34416e
      this.lights.enable().setAmbientColor(0x001459);

      // * Add Characters

      // * Add Ruby (Protaganist)
      this.ruby = this.add.sprite(this.tile(8.5), this.tile(4.25), 'ruby_shaded', 0).setOrigin(0).setDepth(1);
      // * Enable Shading
      this.ruby.setPipeline('Light2D');

      // * Add Max (lil bro)
      this.maxTheSlime = new Max(this, this.tile(9.75), this.tile(4.91), this.ruby, this.VEL * .98, 'max_shaded').setDepth(1).setOrigin(0);
      // * Enable Shading
      this.maxTheSlime.setPipeline('Light2D');

      this.maxTheSlime.play('jiggle');

      // * Add Tilemap
      this.map = this.add.tilemap('finaleTilemap');
      this.tileset = this.map.addTilesetImage('interior_tileset', 'finaleTileset');

      // * Add Layers
      this.caveLayer = this.map.createLayer('cave', this.tileset, 0, 0).setPipeline('Light2D');
      this.decorationsLayer = this.map.createLayer('decorations', this.tileset, 0, 0).setPipeline('Light2D');
      this.wellLayer = this.map.createLayer('well', this.tileset, 0, 0).setPipeline('Light2D');

      // * Camera
      this.cameras.main.setScroll(this.tile(4.5), this.tile(1));

      // * Input
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      // * Music

      // * Credits Music
      this.creditsMusic = this.sound.add('limpid_water', {volume: 0.25, loop: true});
      
      // * CutsceneMusic
      this.cutsceneMusic = this.sound.add('dawning_tale', {volume: 0.25}).on("complete", () => {
         this.creditsMusic.play();
      });



      // * Fireflies

      // * I tried making this a prefab but it did not work :)

      // * Firefly Physics Variables
      this.SPEED = 50;
      this.ROTATION_SPEED = 2 * Math.PI; // 0.5 turn per sec, 2 sec per turn
      this.ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(this.ROTATION_SPEED);
      this.TOLERANCE = 0.02 * this.ROTATION_SPEED;

      // * Light Properties
      // b8bd68
      this.COLOR = 0x6f9945;
      this.RADIUS = 2000;
      this.INTENSITY = 1.5;

      // * Target that Firefly flys around
      this.fireflyTargets = this.add.group({
         runChildUpdate: true
      })

      // * Top Left Firefly
      this.fireflySprite0 = this.add.sprite(this.tile(7), this.tile(3), 'firefly', 0).setScale(0.25).setDepth(5);
      this.firefly0 = this.lights.addLight(this.tile(7), this.tile(3), this.RADIUS, this.COLOR, this.INTENSITY);
      this.setUpFireFly(this.firefly0, this.SPEED);

      // * Top Right Firefly
      this.fireflySprite1 = this.add.sprite(this.tile(11), this.tile(3), 'firefly', 0).setScale(0.25).setDepth(5);
      this.firefly1 = this.lights.addLight(this.tile(11), this.tile(3), this.RADIUS, this.COLOR, this.INTENSITY);
      this.setUpFireFly(this.firefly1, this.SPEED);
      
      // * Bottom Left Firefly
      this.fireflySprite2 = this.add.sprite(this.tile(6), this.tile(6), 'firefly', 0).setScale(0.25).setDepth(5);
      this.firefly2 = this.lights.addLight(this.tile(6), this.tile(6), this.RADIUS, this.COLOR, this.INTENSITY);
      this.setUpFireFly(this.firefly2, this.SPEED);
      
      // * Bottom Right Firefly
      this.fireflySprite3 = this.add.sprite(this.tile(12), this.tile(6), 'firefly', 0).setScale(0.25).setDepth(5);
      this.firefly3 = this.lights.addLight(this.tile(12), this.tile(6), this.RADIUS, this.COLOR, this.INTENSITY);
      this.setUpFireFly(this.firefly3, this.SPEED);

      // * Title Screen
      const titleTextConfig = {
         fontFamily: 'Alkhemikal',
         fontSize: '75px',
         color: '#0a0b14',
         align: 'center'
      }

      this.titleBg = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000, 1).setScrollFactor(0,0).setOrigin(0).setDepth(3).setAlpha(0).setPipeline('Light2D');
      this.title = this.add.text(game.config.width/2, game.config.height/2, 'FireFlies', titleTextConfig).setOrigin(0.5).setDepth(4).setAlpha(0);
      this.title.setScrollFactor(0, 0);
      this.title.setShadow(1, 1, '#FFF', 2, false, true);
      this.title.setStroke('#b93281', 5);
      this.title.setPipeline('Light2D');

      // * Dialog

      this.dialogueConfig = {
         fontFamily: 'Hanyi',
         fontSize: '12px',
         color: '#fff',
         align: 'left'
     }

      // * Container Holding Portrait and Text
      this.dialogBox = this.add.container(game.config.width / 2, game.config.height - this.padding*2);
      
      // * Box
      this.textBox = this.add.rectangle(this.padding*2, game.config.height / 1.5, game.config.width - this.padding*4, (game.config.height / 3 ) - this.padding*2, 0x000000, 1).setStrokeStyle(this.padding, 0xFFFFFF, 1).setOrigin(0).setAlpha(0).setDepth(6);
      this.textBox.setScrollFactor(0, 0);

      // * Prompt Text
      this.prompt = this.add.text(game.config.width / 4, game.config.height / 1.5 + this.padding*4, "", this.dialogueConfig).setAlpha(0).setDepth(6);
      this.prompt.setScrollFactor(0, 0);

      // * Dialogue Text
      this.dialogue = this.add.text(0, 0, "", this.dialogueConfig).setAlpha(0).setDepth(2).setOrigin(0.5, 1);
      this.dialogue.setScrollFactor(0, 0);
      
      // * Dialogue Portrait
      this.portrait = this.add.sprite(this.dialogue.x - this.dialogue.width, this.dialogue.y, 'ruby').setOrigin(1, 1).setAlpha(0).setDepth(2);
      this.portrait.setScrollFactor(0, 0);

      this.dialogBox.add([this.portrait, this.dialogue])

      // * Credits
     this.credits = this.add

      // * Start Cutscene
      this.time.delayedCall(1000, () => {
         this.cutsceneMusic.play();
         this.startFinalScene();
      })
   }

   update() {
         this.updateFireFly(this.firefly0, this.fireflyTargets.children.entries[0], this.SPEED, this.randomIntFromInterval(1.8, 2.1), this.TOLERANCE);
         this.updateFireFly(this.firefly1, this.fireflyTargets.children.entries[1], this.SPEED, this.randomIntFromInterval(1.8, 2.1), this.TOLERANCE);
         this.updateFireFly(this.firefly2, this.fireflyTargets.children.entries[2], this.SPEED, this.randomIntFromInterval(1.8, 2.1), this.TOLERANCE);
         this.updateFireFly(this.firefly3, this.fireflyTargets.children.entries[3], this.SPEED, this.randomIntFromInterval(1.8, 2.1), this.TOLERANCE);

         this.fireflySprite0.setPosition(this.firefly0.x, this.firefly0.y)
         this.fireflySprite1.setPosition(this.firefly1.x, this.firefly1.y)
         this.fireflySprite2.setPosition(this.firefly2.x, this.firefly2.y)
         this.fireflySprite3.setPosition(this.firefly3.x, this.firefly3.y)
   }

   setUpFireFly(firefly, speed) {
      this.physics.add.existing(firefly);
      firefly.body.setVelocity(speed, 0)

      let fireflyTarget = this.physics.add.sprite(firefly.x, firefly.y, 'placholder', 0).setAlpha(0).setOrigin(0);
      this.fireflyTargets.add(fireflyTarget, true);
   }

   updateFireFly(firefly, fireflyTarget, SPEED, ROTATION_SPEED, TOLERANCE) {
      let ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
      let angleToPointer = Phaser.Math.Angle.Between(firefly.x, firefly.y, fireflyTarget.x, fireflyTarget.y);
      let angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - firefly.rotation);
        
      if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TOLERANCE)) {
        firefly.rotation = angleToPointer;
        firefly.body.setAngularVelocity(0);
      } else {
        firefly.body.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES);
      }

      this.physics.velocityFromRotation(firefly.rotation, SPEED, firefly.body.velocity);
   }

   dialog(text, portrait, alpha) {
      this.dialogue.setText(text).setAlpha(alpha).setX(this.portrait.width - 15);
      console.log(this.dialogue.width);
      this.portrait.setTexture(portrait).setAlpha(alpha).setPosition(this.dialogue.x - this.dialogue.width/2 - 15, this.dialogue.y);
   }

   finalSceneChain(i) {
      return function() {
         // * Start of Cutscene
         if (finalScene[i]) {
            finalScene[i].call(this, this.finalSceneChain(++i));
         // * End of Quest
         } else {
            // * End Quest
            this.endQuest();
         }
      }.bind(this);
   }

   startFinalScene() {
      this.dialog('Max...', 'ruby', 1);
      keySPACE.once('down', () => {
         finalScene[0].call(this, this.finalSceneChain(1));
      }, this);
   }
}
   
   // Ok, that should be enough fireflies.
   // Ready to head back?
   // yes! let's go!

   // *goes to cave * //
   // Look Max...
   // ?
   // I should not have held this from you for so long...
   // But both mom and dad are—
   // gone?
   // ...
   // Yes...
   // are you sad?
   // It has been destroying me inside,
   // But spending time with you today made me realize that,
   // As long as we have each other, 
   // We will be fine no matter what.
   // yes! i had fun too!
   // oh! and look what I found!
   // obtained RICE
   //  !
   // ^-^ Rice!
   // Where did you find it!?
   // the army guy left it when he ran away...
   // I love you Max.
   // i love you too Ruby!
   // Fin (spanish)