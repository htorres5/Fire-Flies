class Overworld extends Phaser.Scene {
   constructor() {
      super({key: 'overworldScene'})

      this.VEL = 500;
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
      this.elevationLayer = map.createLayer('elevation', tileset, 0, 0);
      this.riverLayer = map.createLayer('river', tileset, 0, 0).setDepth(-1)
      this.bgLayer = map.createLayer('background', tileset, 0, 0)
      this.pathsLayer = map.createLayer('paths', tileset, 0, 0)
      this.bridgeLayer = map.createLayer('bridge', tileset, 0, 0)
      this.decorationsLayer = map.createLayer('decorations', tileset, 0, 0)
      this.housesLayer = map.createLayer('houses', tileset, 0, 0).setDepth(0);
      this.treesLayer = map.createLayer('trees', tileset, 0, 0).setDepth(1);



      // add player
      this.slime = this.physics.add.sprite(32*57, 32*40, 'slime', 0).setDepth(0);

      // add overlap collider
      this.changeDepthArea = this.physics.add.staticBody(28*32, 20*32, 64, 32)

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
      this.isInRiverLayer = false;

      // enable collision
      this.riverLayer.setCollisionByProperty({ collides: true })
      this.pathsLayer.setCollisionByProperty({ collides: true })
      this.housesLayer.setCollisionByProperty({ collides: true })
      this.treesLayer.setCollisionByProperty({ collides: true })
      this.bridgeLayer.setCollisionByProperty({ collides: true})
      this.physics.add.collider(this.slime, this.riverLayer)
      this.physics.add.collider(this.slime, this.bridgeLayer)
      this.physics.add.collider(this.slime, this.pathsLayer)
      this.physics.add.collider(this.slime, this.housesLayer)
      this.physics.add.collider(this.slime, this.treesLayer)

      this.physics.add.overlap(this.slime, this.changeDepthArea, () => {
         console.log("hi");
         this.isInRiverLayer = !this.isInRiverLayer
         if(this.isInRiverLayer) {
            this.slime.setDepth(-1);
         } else {
            this.slime.setDepth(0);
         }
      })

      // cameras
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)
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
      if(this.slime.depth == -1) {
         console.log(this.slime.depth)
         this.bridgeLayer.setCollisionByProperty({ collides: false})
      } else {
         this.bridgeLayer.setCollisionByProperty({ collides: true})
      }
      console.log(this.isInRiverLayer);
      // if(this.isInRiverLayer) {
      //    this.slime.setDepth(-1);
      // } else {
      //    this.slime.setDepth(0);
      // }

      this.direction.normalize();
      this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
   }
}