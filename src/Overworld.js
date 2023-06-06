class Overworld extends Phaser.Scene {
   constructor() {
      super({key: 'overworldScene'})

      this.VEL = 500;
   }

   preload() {
      this.load.path = './assets/'
      this.load.image('riku', '/sprites/riku.png')
      this.load.image('tilesetImage', '/tilemaps/tileset.png')
      this.load.tilemapTiledJSON('tilemapJSON','/tilemaps/prologue_map.json')
   }

   tile(coord) {
      return coord * 32;
   }

   create() {
      const map = this.add.tilemap('tilemapJSON')
      const tileset = map.addTilesetImage('tileset', 'tilesetImage')

      // add layer
      this.elevationLayer = map.createLayer('elevation', tileset, 0, 0).setDepth(-1);
      this.riverLayer = map.createLayer('river', tileset, 0, 0).setDepth(-1);
      this.underLayer = map.createLayer('under', tileset, 0, 0).setDepth(0);
      this.bgLayer = map.createLayer('background', tileset, 0, 0);
      this.pathsLayer = map.createLayer('paths', tileset, 0, 0);
      this.bridgeLayer = map.createLayer('bridge', tileset, 0, 0);
      this.decorationsLayer = map.createLayer('decorations', tileset, 0, 0);
      this.housesLayer = map.createLayer('houses', tileset, 0, 0).setDepth(0);
      this.treesLayer = map.createLayer('trees', tileset, 0, 0).setDepth(1);

      // * Toggle Layer
      this.regularArea = this.add.rectangle(this.tile(44), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.regularArea);

      this.riverArea = this.add.rectangle(this.tile(44), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.riverArea);

      this.underRightBridgeCollider = this.add.rectangle(this.tile(37), this.tile(19), this.tile(5), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.underRightBridgeCollider, true);

      // add player
      this.riku = this.physics.add.sprite(this.tile(57), this.tile(40), 'riku', 0).setDepth(0);


      // this.anims.create({
      //    key: 'jiggle',
      //    frameRate: 8,
      //    repeat: -1,
      //    frames: this.anims.generateFrameNumbers('riku', {
      //       start: 0,
      //       end: 1
      //    })
      // })
      // this.riku.play('jiggle')

      this.riku.body.setCollideWorldBounds(true)

      // enable collision
      this.riverLayer.setCollisionByProperty({ collides: true })
      this.underLayer.setCollisionByProperty({ collides: true })
      this.pathsLayer.setCollisionByProperty({ collides: true })
      this.housesLayer.setCollisionByProperty({ collides: true })
      this.treesLayer.setCollisionByProperty({ collides: true })
      this.bridgeLayer.setCollisionByProperty({ collides: true})
      this.physics.add.collider(this.riku, this.riverLayer)
      this.physics.add.collider(this.riku, this.pathsLayer)
      this.physics.add.collider(this.riku, this.housesLayer)
      this.physics.add.collider(this.riku, this.treesLayer)

      this.isInRiverLayer = false;
      // * Bridge Collision
      this.bridgeCollider = this.physics.add.collider(this.riku, this.bridgeLayer)

      this.underCollider = this.physics.add.collider(this.riku, this.underLayer)
      this.underCollider.active = false;

      this.riverAreaCollider = this.physics.add.overlap(this.riku, this.riverArea, () => {
         this.isInRiverLayer = true;
         console.log(`Collider callback function: ${this.isInRiverLayer}`)
      })
      this.regularAreaCollider = this.physics.add.overlap(this.riku, this.regularArea, () => {
         this.isInRiverLayer = false;
         console.log(`Collider callback function: ${this.isInRiverLayer}`)
      })

      // cameras
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      this.cameras.main.startFollow(this.riku, true, 0.25, 0.25)
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

      if(this.isInRiverLayer) {
         this.riku.setDepth(-1);
         console.log(this.riku.depth)
         this.underCollider.active = true;
         this.bridgeCollider.active = false;
      } else {
         this.riku.setDepth(1);
         this.underCollider.active = false;
         this.bridgeCollider.active = true;
      }

      console.log(`update function: ${this.isInRiverLayer}`)

      this.direction.normalize();
      this.riku.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
   }
}