class Overworld extends Phaser.Scene {
   constructor() {
      super({key: 'overworldScene'})

      this.VEL = 500;
   }

   preload() {
      this.load.path = './assets/'
      this.load.image('riku', '/sprites/riku.png')
      this.load.image('max', './sprites/max.png')
      this.load.image('tilesetImage', '/tilemaps/tileset.png')
      this.load.tilemapTiledJSON('tilemapJSON','/tilemaps/prologue_map.json')
   }

   tile(coord) {
      return coord * 32;
   }

   create() {
      const map = this.add.tilemap('tilemapJSON')
      const tileset = map.addTilesetImage('tileset', 'tilesetImage')

      // * Add Layers
      this.elevationLayer = map.createLayer('elevation', tileset, 0, 0).setDepth(-1);
      this.riverLayer = map.createLayer('river', tileset, 0, 0).setDepth(-1);
      this.underLayer = map.createLayer('under', tileset, 0, 0).setDepth(0);
      this.bgLayer = map.createLayer('background', tileset, 0, 0);
      this.pathsLayer = map.createLayer('paths', tileset, 0, 0);
      this.bridgeLayer = map.createLayer('bridge', tileset, 0, 0);
      this.decorationsLayer = map.createLayer('decorations', tileset, 0, 0);
      this.housesLayer = map.createLayer('houses', tileset, 0, 0).setDepth(0);
      this.treesLayer = map.createLayer('trees', tileset, 0, 0).setDepth(1);

      // * Depth Colliders

      // * Group That Will Change Depth/Enable Colliders for Regular Area
      this.changeToRegularArea = this.add.group({
         runChildUpdate: true
      })
      
      // * Left of West Bridge
      this.toRegularArea4 = this.add.rectangle(this.tile(44), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea4);
      this.changeToRegularArea.add(this.toRegularArea4, true);

      // * Right of West Bridge
      this.toRegularArea3 = this.add.rectangle(this.tile(33), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea3);
      this.changeToRegularArea.add(this.toRegularArea3, true);

      // * Left of East Bridge
      this.toRegularArea2 = this.add.rectangle(this.tile(28), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea2);
      this.changeToRegularArea.add(this.toRegularArea2, true);

      // * Right of East Bridge
      this.toRegularArea1 = this.add.rectangle(this.tile(16), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea1);
      this.changeToRegularArea.add(this.toRegularArea1, true);

      // * Group That Will Change Depth/Enable Colliders for River Area
      this.changeToRiverArea = this.add.group({
         runChildUpdate: true
      })

      // * Left of West Bridge
      this.toRiverArea4 = this.add.rectangle(this.tile(44), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea4);
      this.changeToRiverArea.add(this.toRiverArea4, true);

      // * Right of West Bridge
      this.toRiverArea3 = this.add.rectangle(this.tile(33), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea3);
      this.changeToRiverArea.add(this.toRiverArea3, true);

      // * Left of East Bridge
      this.toRiverArea2 = this.add.rectangle(this.tile(28), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea2);
      this.changeToRiverArea.add(this.toRiverArea2, true);

      // * right of East Bridge
      this.toRiverArea1 = this.add.rectangle(this.tile(16), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0.2 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea1);
      this.changeToRiverArea.add(this.toRiverArea1, true);

      // * Add Riku (Protaganist)
      this.riku = this.physics.add.sprite(this.tile(57), this.tile(40), 'riku', 0).setDepth(1);

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

      this.riku.body.setCollideWorldBounds(true);

      // * Add Max (Protaganist lil bro)
      this.maxTheSlime = new Max(this, this.tile(58), this.tile(40), this.riku, 'max');

      this.maxTheSlime.body.setCollideWorldBounds(true);

      // * World Collision
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

      // cameras
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      this.cameras.main.startFollow(this.riku, true, 0.25, 0.25)
      this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)

      // input
      this.cursors = this.input.keyboard.createCursorKeys()
   }

   update() {
      // * Riku Controls/Movement
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

      // * Max Movment
      this.maxTheSlime.update();
      
      // * Colliders
      this.riverAreaCollider = this.physics.world.overlap(this.riku, this.changeToRiverArea, () => {
         this.isInRiverLayer = true;
         console.log(`Collider callback function: ${this.isInRiverLayer}`)
      }, null, this)
      this.regularAreaCollider = this.physics.world.overlap(this.riku, this.changeToRegularArea, () => {
         this.isInRiverLayer = false;
         console.log(`Collider callback function: ${this.isInRiverLayer}`)
      }, null, this)

      // * If is in River Layer...
      if(this.isInRiverLayer) {
         // * Change Depth to River Layer
         this.maxTheSlime.setDepth(-1);
         this.riku.setDepth(-1);
         
         console.log(this.riku.depth)
         // * Disable Bridge Collider & Enable River Collider
         this.underCollider.active = true;
         this.bridgeCollider.active = false;
      } else {
         // * Change depth to Regular Layer
         this.maxTheSlime.setDepth(1);
         this.riku.setDepth(1);
         // * Disable River Colliders & Enable Bridge Colliders
         this.underCollider.active = false;
         this.bridgeCollider.active = true;
      }

      console.log(`update function: ${this.isInRiverLayer}`)

      this.direction.normalize();
      this.riku.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
   }
}