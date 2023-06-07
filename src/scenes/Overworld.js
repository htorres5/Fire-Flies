class Overworld extends Phaser.Scene {
   constructor() {
      super({key: 'overworldScene'})

      this.VEL = 200;
   }

   preload() {
      this.load.path = './assets/'
      this.load.image('ruby', '/sprites/ruby.png')
      this.load.image('max', './sprites/max.png')
      this.load.image('waypoint', './sprites/waypoint.png')
      this.load.image('store_location', './sprites/change_depth.png')
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

      // * Add Ruby (Protaganist)
      this.ruby = this.physics.add.sprite(this.tile(57), this.tile(40), 'ruby', 0).setDepth(1);

      // this.anims.create({
      //    key: 'jiggle',
      //    frameRate: 8,
      //    repeat: -1,
      //    frames: this.anims.generateFrameNumbers('ruby', {
      //       start: 0,
      //       end: 1
      //    })
      // })
      // this.ruby.play('jiggle')

      this.ruby.body.setCollideWorldBounds(true);

      // * Add Max (Protaganist lil bro)
      this.maxTheSlime = new Max(this, this.tile(58), this.tile(40), this.ruby, 'max');

      this.maxTheSlime.body.setCollideWorldBounds(true);

      // * World Collision
      this.riverLayer.setCollisionByProperty({ collides: true })
      this.underLayer.setCollisionByProperty({ collides: true })
      this.pathsLayer.setCollisionByProperty({ collides: true })
      this.housesLayer.setCollisionByProperty({ collides: true })
      this.treesLayer.setCollisionByProperty({ collides: true })
      this.bridgeLayer.setCollisionByProperty({ collides: true})
      this.physics.add.collider(this.ruby, this.riverLayer)
      this.physics.add.collider(this.ruby, this.pathsLayer)
      this.physics.add.collider(this.ruby, this.housesLayer)
      this.physics.add.collider(this.ruby, this.treesLayer)


      this.isInRiverLayer = false;
      // * Bridge Collision
      this.bridgeCollider = this.physics.add.collider(this.ruby, this.bridgeLayer)

      this.underCollider = this.physics.add.collider(this.ruby, this.underLayer)
      this.underCollider.active = false;

      // cameras
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      this.cameras.main.startFollow(this.ruby, true, 0.25, 0.25)
      this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)

      // input
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

      // * UI
      this.objectiveTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '10px',
         color: 'yellow',
         align: 'left'
     }
      this.objectiveText = 'Go to the Store and get Rice.'
      this.objectiveUI = this.add.text(1, 1, `Objective:\n${this.objectiveText}`, this.objectiveTextConfig).setStroke(0xFFFFFF, 3).setOrigin(0, 0).setDepth(10);
      this.objectiveUI.scrollFactorX = 0;
      this.objectiveUI.scrollFactorY = 0;

      this.storeLocation = this.add.sprite(this.tile(48) + 16, this.tile(4), 'store_location').setOrigin(0).setDepth(-5);

      this.waypoint = this.add.sprite(16, 42, 'waypoint', this.objectiveTextConfig).setOrigin(0.5).setDepth(10).setScale(0.5);
      this.waypoint.scrollFactorX = 0;
      this.waypoint.scrollFactorY = 0;

      this.distanceToLocation = 0;
      this.distanceUI = this.add.text(32, 42, `${this.distanceToLocation} m`, this.objectiveTextConfig).setOrigin(0, 0.5).setDepth(10).setStroke(0xFFFFFF, 3);
      this.distanceUI.scrollFactorX = 0;
      this.distanceUI.scrollFactorY = 0;
   }

   update() {
      // * Ruby Controls/Movement
      this.direction = new Phaser.Math.Vector2(0)
      if(keyLEFT.isDown) {
         this.direction.x = -1;
      } else if (keyRIGHT.isDown) {
         this.direction.x = 1;
      }
      if(keyUP.isDown) {
         this.direction.y = -1;
      } else if (keyDOWN.isDown) {
         this.direction.y = 1;
      }

      this.direction.normalize();
      this.ruby.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);

      // * Max Movment
      this.maxTheSlime.update();
      
      // * Colliders
      this.riverAreaCollider = this.physics.world.overlap(this.ruby, this.changeToRiverArea, () => {
         this.isInRiverLayer = true;
         console.log(`Collider callback function: ${this.isInRiverLayer}`)
      }, null, this)
      this.regularAreaCollider = this.physics.world.overlap(this.ruby, this.changeToRegularArea, () => {
         this.isInRiverLayer = false;
         console.log(`Collider callback function: ${this.isInRiverLayer}`)
      }, null, this)

      // * If is in River Layer...
      if(this.isInRiverLayer) {
         // * Change Depth to River Layer
         this.maxTheSlime.setDepth(-1);
         this.ruby.setDepth(-1);
         
         console.log(this.ruby.depth)
         // * Disable Bridge Collider & Enable River Collider
         this.underCollider.active = true;
         this.bridgeCollider.active = false;
      } else {
         // * Change depth to Regular Layer
         this.maxTheSlime.setDepth(1);
         this.ruby.setDepth(1);
         // * Disable River Colliders & Enable Bridge Colliders
         this.underCollider.active = false;
         this.bridgeCollider.active = true;
      }

      // * UI

      this.distanceToLocation = Math.trunc(Phaser.Math.Distance.Between(this.ruby.x, this.ruby.y, this.storeLocation.x, this.storeLocation.y)/4);
      this.distanceUI.text = `${this.distanceToLocation}m`
      
      var rotation = Phaser.Math.Angle.Between(this.ruby.x, this.ruby.y, this.storeLocation.x, this.storeLocation.y);
      this.waypoint.rotation = rotation;

      if(this.distanceToLocation < 40) {
         this.waypoint.setAlpha(0);
         this.distanceUI.setAlpha(0);
      } else {
         this.waypoint.setAlpha(1);
         this.distanceUI.setAlpha(1);
      }

      console.log(`update function: ${this.isInRiverLayer}`)
   }
}