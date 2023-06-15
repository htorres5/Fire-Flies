class Title extends Phaser.Scene {
   constructor() {
      super({key: 'titleScene'});

      this.VEL = 100;
      this.padding = game.config.width / 100;
   }

   init(data) {
      this.music = data.music;
   }

   preload() {
      this.load.path = './assets/'

      // * Characters

      // * Firefly
      this.load.image('firefly', './sprites/firefly.png')

      // * Blank Sprite
      this.load.image('placeholder', '/sprites/change_depth.png')

      // * Start Game Sound
      this.load.audio('game_start', './audio/game_start.mp3')

      // * Music
      this.load.audio('limpid_water', './audio/music/limpid_water.mp3')

   }

   randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
   }

   create() {

      // * Fade In Scene
      this.cameras.main.fadeIn(2500, 0, 0, 0)

      // * Enable Lights
      // 0x34416e
      this.lights.enable().setAmbientColor(0x001459);

      // * Input
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      this.keyPressed = false;

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
      // 144
      // * Top Left Firefly
      this.fireflySprite0 = this.add.sprite(80, 64, 'firefly', 0).setScale(0.25).setDepth(5);
      this.firefly0 = this.lights.addLight(80, 64, this.RADIUS, this.COLOR, this.INTENSITY);
      this.setUpFireFly(this.firefly0, this.SPEED);

      // * Top Right Firefly
      this.fireflySprite1 = this.add.sprite(208, 64, 'firefly', 0).setScale(0.25).setDepth(5);
      this.firefly1 = this.lights.addLight(208, 64, this.RADIUS, this.COLOR, this.INTENSITY);
      this.setUpFireFly(this.firefly1, this.SPEED);
      
      // * Bottom Left Firefly
      this.fireflySprite2 = this.add.sprite(48, 160, 'firefly', 0).setScale(0.25).setDepth(5);
      this.firefly2 = this.lights.addLight(48, 160, this.RADIUS, this.COLOR, this.INTENSITY);
      this.setUpFireFly(this.firefly2, this.SPEED);
      
      // * Bottom Right Firefly
      this.fireflySprite3 = this.add.sprite(240, 160, 'firefly', 0).setScale(0.25).setDepth(5);
      this.firefly3 = this.lights.addLight(240, 160, this.RADIUS, this.COLOR, this.INTENSITY);
      this.setUpFireFly(this.firefly3, this.SPEED);

      // * Prompt Text Formatting
      this.promptConfig = {
         fontFamily: 'Hanyi',
         fontSize: '20px',
         color: '#8c9c99',
         align: 'center'
     }

      // * Check if Completed Game Already
      this.completedGame = (localStorage.getItem('completedGame') == "true");

      if(this.completedGame) {
         // * Show Title

         // * Title Text Formatting
         const titleTextConfig = {
            fontFamily: 'KiwiSoda',
            fontSize: '75px',
            color: '#0a0b14',
            align: 'center'
         }

         // * Title
         this.title = this.add.text(game.config.width/2, game.config.height/2, 'FireFlies', titleTextConfig).setOrigin(0.5).setDepth(4).setAlpha(1);
         this.title.setShadow(1, 1, '#FFF', 2, false, true);
         this.title.setStroke('#b93281', 5);
         this.title.setPipeline('Light2D');

         // * Play Music (only if not coming from Credits)
         console.log(this.music)
         if((this.music == undefined) || (this.music == null)) {
            this.music = this.sound.add('limpid_water', {volume: 0.25, loop: true})
            this.music.play();
         }

         // * Show Prompt To Start
         
         // * Prompt Text
         this.prompt = this.add.text(game.config.width/2, game.config.height/1.5, "Press SPACE To Start", this.promptConfig).setDepth(2).setOrigin(0.5, 0).setPipeline('Light2D');

         // * Make Text Smaller
         this.promptConfig.fontSize = '10px'
         this.minigamesPrompt = this.add.text(game.config.width/2, game.config.height/1.25, "Press R for Minigames!", this.promptConfig).setDepth(2).setOrigin(0.5, 0).setPipeline('Light2D');

      } else {
         // * Prompt To Start

         // * Make Text Bigger
         this.promptConfig.fontSize = '24px'

         // * Add Prompt
         this.prompt = this.add.text(game.config.width/2, game.config.height/2, "Press SPACE To Start", this.promptConfig).setDepth(2).setOrigin(0.5, 0.5).setPipeline('Light2D');

      }

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

      if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.keyPressed) {
         this.keyPressed = true;
         this.sound.play('game_start', {volume: 0.25})
         
         // * Stop Music
         this.tweens.add({
            targets: this.music,
            duration: 2500,
            volume: 0
         })

         // * Fade Out To Opening Scene
         this.cameras.main.fadeOut(2500, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.music.stop();
            this.time.delayedCall(1000, () => {
               this.scene.start('openingScene');
            })
         });
      }

      if (Phaser.Input.Keyboard.JustDown(keyR) && !this.keyPressed && this.completedGame) {
         this.keyPressed = true;

         // * Fade Out To Minigames Scene
         this.cameras.main.fadeOut(300, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('minigamesScene', {music: this.music});
         });
      }
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
}
