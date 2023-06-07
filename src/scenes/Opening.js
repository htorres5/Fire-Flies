class Opening extends Phaser.Scene {
   constructor() {
      super({key: 'openingScene'})

      this.padding = game.config.width / 100;
   }

   preload() {
      this.load.path = './assets/'
      this.load.image('mom', '/sprites/mom.png')
      this.load.image('ruby', '/sprites/riku.png')
      this.load.image('max', '/sprites/max.png')

   }

   create() {
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.textBox = this.add.rectangle(this.padding*2, game.config.height / 1.5, game.config.width - this.padding*4, (game.config.height / 3 ) - this.padding*2, 0x000000, 1).setStrokeStyle(this.padding, 0xFFFFFF, 1).setOrigin(0);

      this.dialogueConfig = {
         fontFamily: 'Hanyi',
         fontSize: '12px',
         color: '#fff',
         align: 'left'
     }
      this.dialogue = this.add.text(game.config.width / 4, game.config.height / 1.5 + this.padding*4, "Press Space!", this.dialogueConfig)

      this.portrait = this.add.sprite(game.config.width / 8, game.config.height / 1.3+ this.padding*4, 'ruby').setOrigin(0.5);

     this.start();
   }

   chain(i) {
      return function() {
         if (events[i]) {
            events[i].call(this, this.chain(++i));
         } else {
            console.log(events[i])
            this.cameras.main.fadeOut(2500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('overworldScene');
            });
         }
      }.bind(this);
   }

   start() {
      this.dialogue.setText("Press Space!");
      this.portrait.setAlpha(0);
      keySPACE.once('down', () => {
         // ! UNCOMMENT THIS FOR PLAYTEST BUILD
         events[0].call(this, this.chain(1));
         // ! DELETE THIS
         // this.cameras.main.fadeOut(2500, 0, 0, 0);
         // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
         //     this.scene.start('overworldScene');
         // });
      }, this);
   }
}

var events = [
   function(fn) {
      this.dialogue.text = 'RUBYYYYYYYYYYY!!!'
      this.portrait.setTexture('mom').setAlpha(1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'COME FOR DINNERRRRRRRRRRR'
      this.portrait.setTexture('mom');
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'You go to the Kitchen...'
      this.portrait.setAlpha(0);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = '?'
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
      this.dialogue.text = '*Max Appears Stage Left*'
      this.portrait.setAlpha(0);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogue.text = 'Ah there you are!'
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
      this.dialogue.text = 'Anyways, now that you\'re both here,\ncan you go to store and \nget Rice?'
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