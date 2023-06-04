class Overworld extends Phaser.Scene {
   constructor() {
      super({key: 'overworldScene'})

      this.VEL = 100;
   }

   preload() {
      this.load.path = './assets/'
      this.load.spritesheet('slime', 'slime.png', {
         frameWidth: 16,
         frameHeight: 16,
      })
      this.load.image('tilesetImage', 'tileset.png')
      this.load.tilemapTiledJSON('tilemapJSON','prologue_map.json')
   }

   create() {
      const map = this.add.tilemap('tilemapJSON')
      const tileset = map.addTilesetImage('tileset', 'tilesetImage')

      // add layer
      const elevationLayer = map.createLayer('elevation', tileset, 0, 0)
      const riverLayer = map.createLayer('river', tileset, 0, 0)
      const bgLayer = map.createLayer('background', tileset, 0, 0)
      const pathsLayer = map.createLayer('paths', tileset, 0, 0)
      const decorationsLayer = map.createLayer('decorations', tileset, 0, 0)
      const housesLayer = map.createLayer('houses', tileset, 0, 0)
      const treesLayer = map.createLayer('trees', tileset, 0, 0)

      // add player
      this.slime = this.physics.add.sprite(32*57, 32*40, 'slime', 0)
      this.anims.create({
         key: 'jiggle',
         frameRate: 8,
         repeat: -1,
         frames: this.anims.generateFrameNumbers('slime', {
            start: 0,
            end: 1
         })
      })
      this.slime.play('jiggle')

      this.slime.body.setCollideWorldBounds(true)

      // enable collision
      riverLayer.setCollisionByProperty({ collides: true })
      pathsLayer.setCollisionByProperty({ collides: true })
      housesLayer.setCollisionByProperty({ collides: true })
      treesLayer.setCollisionByProperty({ collides: true })
      this.physics.add.collider(this.slime, riverLayer)
      this.physics.add.collider(this.slime, pathsLayer)
      this.physics.add.collider(this.slime, housesLayer)
      this.physics.add.collider(this.slime, treesLayer)

      // cameras
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);
      this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)

      // input
      this.cursors = this.input.keyboard.createCursorKeys()
   }

   update() {
      this.direction = new Phaser.Math.Vector2(0)
      if(this.cursors.left.isDown) {
         this.direction.x = -1;
      } else if (this.cursors.right.isDown) {
         this.direction.x = 1;
      }
      if(this.cursors.up.isDown) {
         this.direction.y = -1;
      } else if (this.cursors.down.isDown) {
         this.direction.y = 1;
      }

      this.direction.normalize();
      this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
   }
}