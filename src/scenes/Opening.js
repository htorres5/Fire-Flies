class Opening extends Phaser.Scene {
   constructor() {
      super({key: 'openingScene'})

      this.padding = game.config.width / 100;
   }

   preload() {
      this.load.path = './assets/'
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

   }

   start() {
      this.dialogue.setText("Press Space!");
      keySPACE.once('down', () => {
         this.dialogue.text = 'RUBYYYYYYYYYYY!!!'
         this.portrait.setTexture('max');
      })
   }
}