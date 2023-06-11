class Ruby extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, velocity) {
      super(scene, x, y, 'ruby')
      this.parentScene = scene;

      // add object to existing scene
      this.parentScene.add.existing(this);
      this.parentScene.physics.add.existing(this);

      // * Prevent moving in Cutscenes
      this.canMove = true;

      // * For Air Raid Scene
      this.dead = false;

      // * Determine Idle Animation After 
      this.directionFlag = 'down';

      // * Speed
      this.velocity = 500;
      
      // * Set hitbox
      this.setSize(25, 25)

      // * Set Origin
      this.setOrigin(0);

      // * Set Depth
      this.setDepth(1);
   }

   update() {
      this.direction = new Phaser.Math.Vector2(0)
      if(keyLEFT.isDown) {
         this.direction.x = -1;
         this.flipX = false;
      } else if (keyRIGHT.isDown) {
         this.direction.x = 1;
         this.flipX = true;
      }
      if(keyUP.isDown) {
         this.direction.y = -1;
      } else if (keyDOWN.isDown) {
         this.direction.y = 1;
      }

      // * Animations

      // * Left or Right
      if((this.body.velocity.x < 0 || this.body.velocity.x > 0) && this.body.velocity.y == 0){
         this.anims.play('side', true);
         this.directionFlag = "side";
      }
      // * Up, Up Left or Right
      if(this.body.velocity.y < 0 ){
         this.anims.play('up', true);
         this.directionFlag = "up";
      }
      // * Down, Down Left or Right
      if(this.body.velocity.y > 0){
         this.anims.play('down', true);
         this.directionFlag = "down";
      }
      // * Idle
      if(this.body.velocity.x == 0 && this.body.velocity.y == 0){
         this.anims.play('idle_'+this.directionFlag, true);
      }

      this.direction.normalize();
      this.setVelocity(this.velocity * this.direction.x, this.velocity * this.direction.y);
   }
}