      // yo i heard you was looking for fireflies
      // ?
      // From who?
      // oh he was outside our cave the whole time
      // You never left?
      // here's the deal:
      // if you want these fireflies, you gotta beat me in a race.
      // A race?
      // ye ye a race. is that too hard for you or what?
      // i love races!
      // see this kid gets it.
      // so you in or what?
      // Sure.
      // i wasn't asking you.
      // ? You want to race him?
      // yes. i don't race females.
      // Why not?
      // as a male, we are biologically faster than females.
      // so you're not worth my time.
      // my sister isn't slow! she used to do track!
      // oh really?
      // name three track and field runners.
      // I don't need too.
      // I'll prove it to you in a race.
      // haha, ok buddy
      // I, daughter of the late Slippy Richard, will make sure you never set foot in a race again.
      // wait, daughter of...?
      // We will race around the town. 
      // If you lose, you must admit that women are better runners than men, 
      // and hand over those fireflies. 
      // Deal?
      // and if I win?
      // You won't win.
      // so just around the town?
      // Yes, you cannot cut corners or anything.
      // Just purely around town.
      // pff, easy peasy.
      // Ok, we will go on Go.
      // Ready...
      // Set...
      // GO!

      // yeah I'm more of a sprinter, not much of a long-distance runner
      // That was only 400 meters...
      // but wow you are fast!
      // the daughter of the legendary of Slippy Richard...
      // i had no chance.
      // Good game.
      // ok it was nice meeting you two.
      // come back.
      // ? why?
      // I think you are forgetting something.
      // Oh right, here you go.
      // Obtained a FIREFLY.
      // ok bye!
      // One more thing.
      // ...
      // okok fine, you are faster than me.
      // *pause*
      // and women are faster.
      // Thank you.
      // You may go now.

      // see I told you so.
      // mom was right, you do need to do exercise...
      // Rematch.
      // why? just so you could lose again?
      // Around the town again, no cutting corners.
      // but I didnt agree to-
      // Ready...
      // Set..
      // GO!
      
var wonRaceQuest = [
   function(fn) {
      this.dialogBox('That was only 400 meters...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('but wow you are fast!', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('the daughter of the legendary\nSlippy Richard...', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('i stood no chance.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Good game.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('ok it was nice meeting you two.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.army.startFollow({
         duration: 3000,
         rotateToPath: false,
         verticalAdjust: true
      });
      this.time.delayedCall(1000, () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Coward.', 'Ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('he swindled us!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Do not worry Max,', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('He forgot to take the jar with him.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Obtained FIREFLY', '', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('you ran so fast!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('why don\'t you run anymore?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I hate running.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Well, a little bit less now...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
]