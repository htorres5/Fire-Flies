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
      this.load.image('ruby', '/sprites/sheets/ruby/idle.png')
      
      // * Max
      this.load.spritesheet('max', '/sprites/max.png', {
         frameWidth: 16,
         frameHeight: 16,
      })

      // * Ruby Texture Atlas
      this.load.atlas('ruby_sheet', '/sprites/sheets/ruby/ruby.png', '/sprites/sheets/ruby/ruby.json')

      // * Tilemap
      this.load.image({
         key: 'finaleTileset',
         url: '/tilemaps/interior_tileset.png',
         normalMap: '/tilemaps/interior_tileset_n.png'});
      this.load.tilemapTiledJSON('finaleTilemap','/tilemaps/finale.json')
   }

   tile(coord) {
      return coord * 32;
   }

   create() {

      // * Fade In Scene
      this.cameras.main.fadeIn(2500, 0, 0, 0)

      // * Enable Lights
      this.lights.enable().setAmbientColor('dfffc0');

      // * Add Characters

      // * Add Ruby (Protaganist)
      this.ruby = new Ruby(this, this.tile(10), this.tile(4), this.VEL);

      // * Add Max (lil bro)
      this.maxTheSlime = new Max(this, this.tile(8), this.tile(4), this.ruby, this.VEL * .98, 'max').setDepth(1).setOrigin(0);

      this.maxTheSlime.play('jiggle')

      // * Add Tilemap
      this.map = this.add.tilemap('finaleTilemap')
      this.tileset = this.map.addTilesetImage('interior_tileset', 'fireFliesTileset')



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