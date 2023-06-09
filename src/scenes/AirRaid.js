class AirRaid extends Phaser.Scene {
   constructor() {
      super({ key: 'airRaidScene' })

      this.VEL = 150;
   }
   

   preload() {
      this.load.path = './assets/'

      // * Sprites

      // * Characters
      this.load.image('ruby', '/sprites/sheets/ruby/idle.png')
      this.load.image('max', './sprites/max.png')

      // * UI
      this.load.image('waypoint', './sprites/waypoint.png')
      this.load.image('collider', './sprites/change_depth.png')

      // * Objects
      this.load.spritesheet('bomb', './sprites/sheets/bomb.png', { frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 5 });

      // * Effects
      this.load.atlas('explosion', './sprites/sheets/explosion.png', './sprites/sheets/explosion.json');
      this.load.atlas('fire', './sprites/sheets/fire.png', './sprites/sheets/fire.json');

      // * TileMap
      this.load.image('tilesetImage2', './tilemaps/raid_tileset.png')
      this.load.tilemapTiledJSON('tilemapJSON2', './tilemaps/scene_2_map.json')

      // * Audio
      this.load.audio('falling_bomb', './audio/falling_bomb.mp3')
      this.load.audio('explosion', './audio/explosion.mp3')

   
   }

   tile(coord) {
      return coord * 32;
   }

   create() {
      this.map = this.add.tilemap('tilemapJSON2')
      this.tileset = this.map.addTilesetImage('world_tileset', 'tilesetImage2')

      // * Add Layers
      this.elevationLayer = this.map.createLayer('elevation', this.tileset, 0, 0).setDepth(-2);
      this.riverLayer = this.map.createLayer('river', this.tileset, 0, 0).setDepth(-3);
      this.underLayer = this.map.createLayer('under', this.tileset, 0, 0).setDepth(-4);
      this.stairsLayer = this.map.createLayer('stairs', this.tileset, 0, 0).setDepth(-2);
      this.bgLayer = this.map.createLayer('background', this.tileset, 0, 0);
      this.pathsLayer = this.map.createLayer('paths', this.tileset, 0, 0);
      this.bridgeLayer = this.map.createLayer('bridge', this.tileset, 0, 0);
      this.decorationsLayer = this.map.createLayer('decorations', this.tileset, 0, 0);
      this.treesBehindLayer = this.map.createLayer('trees_behind', this.tileset, 0, 0);
      this.housesLayer = this.map.createLayer('houses', this.tileset, 0, 0);
      this.treesLayer = this.map.createLayer('trees', this.tileset, 0, 0).setDepth(2);
      this.houseDecLayer = this.map.createLayer('house_decorations', this.tileset, 0, 0).setDepth(3);

      // * Depth Colliders

      // * Group That Will Change Depth/Enable Colliders for Regular Area
      this.changeToRegularArea = this.add.group({
         runChildUpdate: true
      })
      
      // * Left of West Bridge
      this.toRegularArea4 = this.add.rectangle(this.tile(43), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea4);
      this.changeToRegularArea.add(this.toRegularArea4, true);

      // * Right of West Bridge
      this.toRegularArea3 = this.add.rectangle(this.tile(34), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea3);
      this.changeToRegularArea.add(this.toRegularArea3, true);

      // * Left of East Bridge
      this.toRegularArea2 = this.add.rectangle(this.tile(27), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea2);
      this.changeToRegularArea.add(this.toRegularArea2, true);

      // * Right of East Bridge
      this.toRegularArea1 = this.add.rectangle(this.tile(18), this.tile(19), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRegularArea1);
      this.changeToRegularArea.add(this.toRegularArea1, true);

      // * Group That Will Change Depth/Enable Colliders for River Area
      this.changeToRiverArea = this.add.group({
         runChildUpdate: true
      })

      // * Left of West Bridge
      this.toRiverArea4 = this.add.rectangle(this.tile(43), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea4);
      this.changeToRiverArea.add(this.toRiverArea4, true);

      // * Right of West Bridge
      this.toRiverArea3 = this.add.rectangle(this.tile(34), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea3);
      this.changeToRiverArea.add(this.toRiverArea3, true);

      // * Left of East Bridge
      this.toRiverArea2 = this.add.rectangle(this.tile(27), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea2);
      this.changeToRiverArea.add(this.toRiverArea2, true);

      // * right of East Bridge
      this.toRiverArea1 = this.add.rectangle(this.tile(18), this.tile(20), this.tile(2), this.tile(1), 0x000000, 0 ).setOrigin(0);
      this.physics.add.existing(this.toRiverArea1);
      this.changeToRiverArea.add(this.toRiverArea1, true);

      // * Add Ruby (Protaganist)
      this.ruby = new Ruby(this, this.tile(49), this.tile(5), this.VEL);

      this.ruby.body.setCollideWorldBounds(true);

      // * Add Max (Protaganist lil bro)
      this.maxTheSlime = new Max(this, this.tile(50), this.tile(5), this.ruby, 140, 'max').setDepth(1).setOrigin(0);
      this.maxTheSlime.play('jiggle');

      this.maxTheSlime.body.setCollideWorldBounds(true);

      // * Animations
      // Explosion Animation
      this.anims.create({
         key: 'explosion',
         frames: this.anims.generateFrameNames('explosion', {
            prefix: 'explosion',
            start: 0,
            end: 15
         }),
         frameRate: 24,
      })

      // Bomb Animation
      this.anims.create({
         key: 'fuse',
         frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 5, first: 0}),
         frameRate: 12,
         repeat: -1
      });
      
      // * Bomb Colliders
      this.bombColliders = this.add.group({
         runChildUpdate: true
      });

      // * Drop Bombs
      this.time.delayedCall(1500,() => {
         this.bombTimer = this.time.addEvent({
            delay: 1500,
            callback: () => {
               let x = this.ruby.x;
               let y = this.ruby.y - game.config.height / 2;
               this.placeBomb(x, y);
            },
            loop: true
         })
      })


      // Fire Animation
      this.anims.create({
         key: 'fire',
         frames: this.anims.generateFrameNames('fire', {
            prefix: 'fire',
            start: 0,
            end: 21
         }),
         frameRate: 24,
         repeat: -1
      })

      // * Fire Colliders
      this.fireColliders = this.add.group({
         runChildUpdate: true
      });

      // * Fire Left of Store
      this.placeFireY(4, 9, 43, .2, 1);
      this.placeFireX(44, 46, 9, .2, 1);
      this.placeFireX(50, 53, 9, .2, 1);

      // * Fire Block Bridges
      this.placeFireX(41, 53, 17, .15, 2);
      this.placeFireX(20, 37, 17, .15, 2);
      this.placeFireX(14, 43, 9, .3, 2);

      // * Block West Side
      this.placeFireY(11, 17, 14, .2, 2)

      // * World Collision
      this.riverLayer.setCollisionByProperty({ collides: true })
      this.underLayer.setCollisionByProperty({ collides: true })
      this.elevationLayer.setCollisionByProperty({ collides: true })
      this.pathsLayer.setCollisionByProperty({ collides: true })
      this.housesLayer.setCollisionByProperty({ collides: true })
      this.decorationsLayer.setCollisionByProperty({ collides: true })
      this.treesBehindLayer.setCollisionByProperty({ collides: true })
      this.treesLayer.setCollisionByProperty({ collides: true })
      this.bridgeLayer.setCollisionByProperty({ collides: true})
      this.physics.add.collider(this.ruby, this.decorationsLayer)
      this.physics.add.collider(this.ruby, this.treesBehindLayer)
      this.physics.add.collider(this.ruby, this.elevationLayer)
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
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      this.cameras.main.startFollow(this.ruby, true, 0.25, 0.25)
      this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)

      // input
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

      // * Music
      this.siren = this.sound.add('air_raid_siren_loop', {volume: 1, loop: true});
      this.siren.play();

      // * Fog
      this.fogSprite = this.add.rectangle(0, 0, game.config.width, game.config.height, 0xf08080, 0.6).setOrigin(0).setDepth(8);
      this.fogSprite.scrollFactorX = 0;
      this.fogSprite.scrollFactorY = 0;

      // * UI
      this.objectiveTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '10px',
         color: 'yellow',
         align: 'left'
      }
      this.objectiveText = 'Get to Shelter.'
      this.objectiveUI = this.add.text(1, 1, `Objective:\n${this.objectiveText}`, this.objectiveTextConfig).setStroke(0xFFFFFF, 3).setOrigin(0, 0).setDepth(10);
      this.objectiveUI.scrollFactorX = 0;
      this.objectiveUI.scrollFactorY = 0;

      this.location = this.physics.add.sprite(this.tile(31), this.tile(20), 'collider').setOrigin(0).setAlpha(0);
      this.location.setImmovable();
      this.locationCollider = this.physics.add.overlap(this.ruby, this.location, () => {
         this.siren.stop();
         this.locationCollider.active = false;
         this.scene.start('caveScene');
      })

      this.waypoint = this.add.sprite(16, 42, 'waypoint', this.objectiveTextConfig).setOrigin(0.5).setDepth(10).setScale(0.5);
      this.waypoint.scrollFactorX = 0;
      this.waypoint.scrollFactorY = 0;

      this.distanceToLocation = 0;
      this.distanceUI = this.add.text(32, 42, `${this.distanceToLocation} m`, this.objectiveTextConfig).setOrigin(0, 0.5).setDepth(10).setStroke(0xFFFFFF, 3);
      this.distanceUI.scrollFactorX = 0;
      this.distanceUI.scrollFactorY = 0;

      // * Game Over Flag
      this.gameOver = false;
   }

   update() {

      if(!this.ruby.dead) {
         // * Ruby Movement
         this.ruby.update();

         // * Max Movment
         this.maxTheSlime.update();
      }

      // * Colliders
      this.riverAreaCollider = this.physics.world.overlap(this.ruby, this.changeToRiverArea, () => {
         this.isInRiverLayer = true;
      }, null, this)
      this.regularAreaCollider = this.physics.world.overlap(this.ruby, this.changeToRegularArea, () => {
         this.isInRiverLayer = false;
      }, null, this)
      this.fireCollider = this.physics.world.collide(this.ruby, this.fireColliders);
      if(!this.ruby.dead) {
         this.bombCollider = this.physics.world.overlap(this.ruby, this.bombColliders, this.bombCollision, null, this);
      }


      // * If is in River Layer...
      if (this.isInRiverLayer) {
         // * Change Depth to River Layer
         this.maxTheSlime.setDepth(-1);
         this.ruby.setDepth(-1);

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

      this.distanceToLocation = Math.trunc(Phaser.Math.Distance.Between(this.ruby.x, this.ruby.y, this.location.x, this.location.y) / 4);
      this.distanceUI.text = `${this.distanceToLocation}m`

      var rotation = Phaser.Math.Angle.Between(this.ruby.x, this.ruby.y, this.location.x, this.location.y);
      this.waypoint.rotation = rotation;

      if (this.distanceToLocation < 40) {
         this.waypoint.setAlpha(0);
         this.distanceUI.setAlpha(0);
      } else {
         this.waypoint.setAlpha(1);
         this.distanceUI.setAlpha(1);
      }

      // * Game Over
      if(this.ruby.dead) {
         this.siren.stop();
         this.bombTimer.remove();
         this.ruby.destroy();
         this.maxTheSlime.destroy();
         this.objectiveUI.destroy();
         this.distanceUI.destroy();
         this.waypoint.destroy();
         this.bombColliders.destroy(true, true);
         this.fogSprite.setFillStyle(0x000000, 1);
         this.time.delayedCall(5000, ()=>{
            this.scene.restart();
         })
      }
   }

   randomIntFromInterval(min, max) { // min and max included 
     return Math.floor(Math.random() * (max - min + 1) + min)
   }

   placeFireX(fromX, toX, y, variance, interval) {
      for(let i = fromX; i <= toX; i+=interval) {
         let y_pos = this.randomIntFromInterval(y-variance, y+variance);
         let fire = this.physics.add.sprite(this.tile(i), this.tile(y_pos), 'collider').setScale(2).setOrigin(0).setDepth(2);
         fire.setImmovable();
         let randomInt = this.randomIntFromInterval(0, 21);
         fire.play({ key: 'fire', startFrame: randomInt }, true);
         this.fireColliders.add(fire)
      }
   }

   placeFireY(fromY, toY, x, variance, interval) {
      for(let i = fromY; i <= toY; i+=interval) {
         let x_pos = this.randomIntFromInterval(x-variance, x+variance);
         let fire = this.physics.add.sprite(this.tile(x_pos), this.tile(i), 'collider').setScale(2).setOrigin(0).setDepth(2);
         fire.setImmovable();
         let randomInt = this.randomIntFromInterval(0, 21);
         fire.play({ key: 'fire', startFrame: randomInt }, true);
         this.fireColliders.add(fire)
      }
   }

   placeBomb(x ,y) {
      let randomXPosition = this.randomIntFromInterval(x - game.config.width / 2, x + game.config.width / 2)
      let randomEndTime = this.randomIntFromInterval(1000, 3000)
      let bomb = this.physics.add.sprite(randomXPosition, y, 'bomb', 0).setDepth(3);
      bomb.anims.play('fuse');
      let fallingSFX = this.sound.add('falling_bomb', {volume: 0.25});
      fallingSFX.play();
      bomb.setVelocityY(75);
      this.time.delayedCall(randomEndTime, () => { 
         if(!this.ruby.dead) {
            this.cameras.main.shake(500, 0.0075);
            this.bombColliders.add(bomb);
            fallingSFX.stop();
            this.sound.play('explosion', {volume: 0.15})
            bomb.setVelocityY(0);
            let boom = bomb.play('explosion', true);
            bomb.setSize(32,32)
            boom.on('animationcomplete', () => {
               bomb.destroy();
           })
         }
     });
   }

   bombCollision() {
      this.ruby.dead = true;
   }
}