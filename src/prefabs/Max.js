// * Following Algorithm From: https://gamemechanicexplorer.com/#follow-3
class Max extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, target, type) {
       // call Phaser Physics Sprite constructor
       super(scene, x, y, type); 

       this.parentScene = scene;
       this.target = target;
   
       // add object to existing scene
       this.parentScene.add.existing(this);
       this.parentScene.physics.add.existing(this);

      // Each Follower will record its position history in
      // an array of point objects (objects with x,y members)
      // This will be used to make each Follower follow the
      // same track as its target
      this.history = [];
      this.HISTORY_LENGTH = 5;

      // Define constants that affect motion
      this.MAX_SPEED = 190; // pixels/second
      this.MIN_DISTANCE = 32; // pixels
   }

   update() {
    // Get the target x and y position.
    //
    // This algorithm will follow targets that may or may not have a position
    // history.
    //
    // The targetMoving flag tells this object when its target is moving
    // so that it knows when to move and when to stop.
    var t = {};
    var targetMoving = false;
    if (this.target.history != undefined && this.target.history.length) {
        // This target has a history so go towards that
        t = this.target.history[0];
        if (this.target.body.velocity.x != 0 ||
            this.target.body.velocity.y != 0) targetMoving = true;
    } else {
        // This target doesn't have a history defined so just
        // follow its current x and y position
        t.x = this.target.x;
        t.y = this.target.y;

        // Calculate distance to target
        // If the position is far enough way then consider it "moving"
        // so that we can get this Follower to move.
        var distance = Phaser.Math.Distance.Between(this.x, this.y , t.x, t.y);
        if (distance > this.MIN_DISTANCE) targetMoving = true;
    }

    // If the distance > MIN_DISTANCE then move
    if (targetMoving) {
        // Add current position to the end of the history array
        this.history.push({ x: this.x, y: this.y });

        // If the length of the history array is over a certain size
        // then remove the oldest (first) element
        if (this.history.length > this.HISTORY_LENGTH) this.history.shift();

        // Calculate the angle to the target
        var rotation = Phaser.Math.Angle.Between(this.x, this.y, t.x, t.y);

        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
        this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
    } else {
        this.body.velocity.setTo(0, 0);
    }
  }

  //  // reset rocket to "ground"
  //  reset() {
  //     this.y = game.config.height - borderUISize - borderPadding;
  //  }
}