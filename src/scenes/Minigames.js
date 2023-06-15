class Minigames extends Phaser.Scene {
   constructor() {
      super({key: 'minigamesScene'});

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

      // * Tapping Tanookis Logo
      this.load.image('tapping_tanookis', './sprites/tappingTanookisLogo.png')

      // * Chopping Mayhem Logo
      this.load.image('chopping_mayhem', './sprites/chopMayhemLogo.png')

      // * Futbol Logo
      this.load.image('futbol', './sprites/futbolLogo.png')

      // * Back Arrow
      this.load.image('back_arrow', './sprites/back_arrow.png')

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
      this.cameras.main.fadeIn(300, 0, 0, 0)

      // * Enable Lights
      // 0x34416e
      this.lights.enable().setAmbientColor(0x001459);

      // * Input
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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


      // * Show Title

      // * Title Text Formatting
      const titleTextConfig = {
         fontFamily: 'KiwiSoda',
         fontSize: '30px',
         color: '#0a0b14',
         align: 'center'
      }

      // * Title
      this.title = this.add.text(game.config.width/2, this.padding, 'Minigames', titleTextConfig).setOrigin(0.5, 0).setDepth(4).setAlpha(1);
      this.title.setShadow(1, 1, '#FFF', 2, false, true);
      this.title.setStroke('#b93281', 5);
      this.title.setPipeline('Light2D');

      // * Play Music (only if not coming from Minigame)
      console.log(this.music);
      if(this.music == undefined) {
         this.music = this.sound.add('limpid_water', {volume: 0.25, loop: true})
         this.music.play();
      }

      // * Show Prompt To Show How to Select a Minigame

      // * Prompt Text Formatting
      this.promptConfig = {
         fontFamily: 'Hanyi',
         fontSize: '6px',
         color: '#8c9c99',
         align: 'center'
      }

      // * Prompt Text
      this.prompt = this.add.text(game.config.width/2 + 10, this.title.y + this.title.height - 5, "Use MOUSE to Select", this.promptConfig).setDepth(2).setOrigin(0, 0).setPipeline('Light2D');

      // * Create Minigame Containers
      this.minigames = this.add.group({
         runChildUpdate: true
      })

      // * Show Minigame Info
      this.infoBG = this.add.rectangle(game.config.width/2, 4, 280, this.title.height, 0x000000, 1).setStrokeStyle(2, 0xFFFFFF, 1).setOrigin(0.5, 0).setPipeline('Light2D').setVisible(false).setDepth(5);

      const infoStyle = {
         fontFamily: 'Hanyi',
         fontSize: '11px',
         color: '#8c9c99',
         align: 'center'
      }
      this.infoUI = this.add.text(game.config.width/2, 8, '', infoStyle).setOrigin(0.5, 0).setPipeline('Light2D').setVisible(false).setDepth(6);
      
      // * Add Each Minigame

      // * Tapping Tanookis

      // * Get High Score
      this.savedTanookiHighScore = false;
      this.bestAccuracy = parseInt(localStorage.getItem('bestAccuracy'));
      this.tanookiBestRank = localStorage.getItem('tanookiBestRank');
      if (isNaN(this.bestAccuracy)) {
         this.highScore = 0;
         this.savedTanookiHighScore = false;
      } else {
         this.savedTanookiHighScore = true;
      }
            
      this.minigameInfo('tanookiScene', game.config.width*(1/10), this.title.y + this.title.height + 3, 'Tapping Tanookis', 'Tap on the Tanookis before they hide!\nTap and Aim with your MOUSE.', `${this.tanookiBestRank}`, `${this.bestAccuracy}%`, 'tapping_tanookis', this.savedTanookiHighScore)

      // * Chopping Mayhem

      // * Get High Score
      this.savedChopHighScore = false;
      this.bestTime = parseInt(localStorage.getItem('bestTime'));
      this.chopBestRank = localStorage.getItem('chopBestRank');
      if (isNaN(this.highScore)) {
         this.highScore = 0;
         this.savedChopHighScore = false;
      } else {
         this.savedChopHighScore = true;
      }

      this.minigameInfo('chopScene', game.config.width*(1/10), this.title.y + this.title.height + 5 + 64, 'Chopping Mayhem', 'Chop your tree as fast as possible!\nUse E or W to Chop.', `${this.chopBestRank}`, `${this.bestTime} seconds`, 'chopping_mayhem', this.savedFutbolHighScore)

      // * Futbol Frenzy

      // * Get High Score
      this.savedFutbolHighScore = false;
      this.highScore = parseInt(localStorage.getItem('mostGoalsScored'));
      this.futbolBestRank = localStorage.getItem('futbolBestRank');
      if (isNaN(this.highScore)) {
         this.highScore = 0;
         this.savedFutbolHighScore = false;
      } else {
         this.savedFutbolHighScore = true;
      }

      this.minigameInfo('futbolScene', game.config.width*(1/10), this.title.y + this.title.height + 6 + 64*2, 'Futbol Frenzy', 'Score goals!\nW to Shoot.', `${this.futbolBestRank}`, `${this.highScore}/10 Goals`, 'futbol', this.savedFutbolHighScore)

      // * Back Arrow
      this.promptConfig.fontSize = '11px'
      this.backArrow = this.add.image(0, 0, 'back_arrow', 0).setOrigin(0).setPipeline('Light2D');
      this.goBackText = this.add.text(this.backArrow.width + 5, 4, 'Go Back', this.promptConfig).setVisible(false).setPipeline('Light2D');

      this.backArrow.setInteractive({
         useHandCursor: true,
      });

      this.backArrow.on('pointerover', () => {
         this.backArrow.setScale(1.25);
         this.goBackText.setVisible(true)
      });

      this.backArrow.on('pointerout', () => {
         this.backArrow.setScale(1);
         this.goBackText.setVisible(false)
      });

      this.backArrow.once('pointerdown', () => {
         if(!this.keyPressed) {
            this.keyPressed = true;
            // * Fade Out To Opening Scene
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                  this.scene.start('titleScene', {music: this.music});
            });
         }
      });
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

         // * Fade Out To Opening Scene
         this.cameras.main.fadeOut(300, 0, 0, 0);
         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
               this.scene.start('titleScene', {music: this.music});
         });
      }
   }

   minigameInfo(scene, x, y, title, info, rank, score, logo, saved) {
      let minigame = this.add.container(x, y);

      let background = this.add.rectangle(0, 0, 260, 56, 0x000000, 1).setStrokeStyle(1, 0xFFFFFF, 1).setOrigin(0).setPipeline('Light2D');
      background.isStroked = false;
      minigame.add(background);
      
      let logoUI = this.add.sprite(4, 4, logo, 0).setOrigin(0).setPipeline('Light2D');
      minigame.add(logoUI);

      let minigameDetailsXPosition = logoUI.x + logoUI.width + 16;

      let titleStyle = {
         fontFamily: 'Hanyi',
         fontSize: '16px',
         color: '#8c9c99'
      }
      let titleUI = this.add.text(minigameDetailsXPosition, 5, title, titleStyle).setOrigin(0).setPipeline('Light2D');;
      minigame.add(titleUI)

      
      // * Score
      let scoreStyle = {
         fontFamily: 'Hanyi',
         fontSize: '16px',
         color: '#8c9c99',
         align: 'left'
      }
      if(saved) {
         // * Rank Colors
         let rankColor = undefined;
         if (rank == 'S') { rankColor = '#ffd700' }
         if (rank == 'A') { rankColor = '#54e354' }
         if (rank == 'B') { rankColor = '#285feb' }
         if (rank == 'C') { rankColor = '#ac55ad' }
         if (rank == 'D') { rankColor = '#f50535' }
         if (rank == 'F') { rankColor = '#adadad' }

         // * Rank Formatting
         let rankStyle = {
            fontFamily: 'GrapeSoda',
            fontSize: '32px',
            color: rankColor,
            align: 'left'
         }
         let rankUI = this.add.text(minigameDetailsXPosition, titleUI.y + titleUI.height, rank, rankStyle).setOrigin(0).setPipeline('Light2D').setStroke('#FFFFFF', 3);
         minigame.add(rankUI)

         let scoreUI = this.add.text(rankUI.x + rankUI.width + 8, titleUI.y + titleUI.height + 5, score, scoreStyle).setOrigin(0).setPipeline('Light2D');
         minigame.add(scoreUI)
      } else {
         let scoreUI = this.add.text(minigameDetailsXPosition, titleUI.y + titleUI.height + 5, 'No Score Set Yet!', scoreStyle).setOrigin(0).setPipeline('Light2D');
         minigame.add(scoreUI)
      }

      background.setInteractive({
         useHandCursor: true,
      });
      // * On Hover, Show Stroke
      background.on('pointerover', () => {
         background.isStroked = true; 
         this.infoBG.setVisible(true);
         this.infoUI.setVisible(true).setText(info);
      })

      background.on('pointerout', () => {
         background.isStroked = false; 
         this.infoBG.setVisible(false);
         this.infoUI.setVisible(false).setText('');
      })
      
      // * On Click, Go to Scene
      background.once('pointerdown', () => {
         if(!this.keyPressed) {
            this.keyPressed = true;
            this.sound.play('game_start', {volume: 0.25})
         
            // * Stop Music
            this.tweens.add({
               targets: this.music,
               duration: 2500,
               volume: 0
            })
   
            // * Fade Out To Selected Minigame Scene
            this.cameras.main.fadeOut(2500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
               this.music.stop();
               this.time.delayedCall(1000, () => {
                  this.scene.start(scene);
               })
            });
         }

      });

      this.minigames.add(minigame);
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
