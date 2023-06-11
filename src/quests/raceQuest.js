
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

var raceQuest = [
   function(fn) {
      this.dialogBox('?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('From who?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('oh he was outside our cave\nthe whole time', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('You never left?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('here\'s the deal:', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('if you want these fireflies,\nyou gotta beat me in a race.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('A race?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('yes a race.\nis that too hard for you or what?', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('i love races!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('see this kid gets it.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('so are you in or what?', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Sure.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('i wasn\'t asking you.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('? You want to race him?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('yes. i don\'t race females.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Why not?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('as a male,\nwe are biologically faster\nthan females.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('so you\'re not worth my time.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('my sister isn\'t slow!\nshe used to do track!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('oh really?', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('name three\ntrack and field runners.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I don\'t need too.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I\'ll prove it to you in a race.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('haha, ok buddy', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I, daughter of the late\nSlippy Richard, will make sure you\nnever set foot in a race again.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('wait, daughter of...?', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('ahem, well then I, Seargent Jin,\nCommander of the Slime Army,\nwill prove that men are better!', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('We will race around the town. ', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('If you lose, you must admit that\nwomen are better runners\nthan men,', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('and hand over those fireflies. ', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Deal?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('and if I win?', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('You won\'t win.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('so just around the town?', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Yes, you cannot\ncut corners or anything.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Just purely around town.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('pff, easy peasy.', 'army', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Ok, we will go on Go.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Ready...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Set...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('GO!', 'ruby', 1);
      this.speech.setAlpha(0);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      // * Hide Dialogue Box
      this.dialogBox('', 'placeholder', 0);

      // * Allow Ruby to Move
      this.ruby.canMove = true;

      // * Start Race

      // * Start Race Music
      this.music.pause();
      this.raceMusic.play();
      this.army.startFollow({
         duration: 15000,
         rotateToPath: false,
         verticalAdjust: true
      });

      // * Show Checkpoints
      this.checkpoint1.setAlpha(1);
      this.checkpoint2.setAlpha(1);
      this.checkpoint3.setAlpha(1);
      this.checkpoint4.setAlpha(1);

      // * Change Objective
      this.objectiveUI.setText('Checkpoints: 0/5')

      this.checkpoint1Collider = this.physics.add.overlap(this.ruby, this.checkpoint1, () => {
         this.sound.play('passed')
         this.checkpoint1Collider.active = false;
         fn();
      })

      this.raceTimer = this.time.delayedCall(15000, () => {
         this.timerEnded = true;
      })
   },

   function(fn) {
      this.objectiveUI.setText('Checkpoints: 1/5')
      this.checkpoint2Collider = this.physics.add.overlap(this.ruby, this.checkpoint2, () => {
         this.checkpoint2Collider.active = false;
         this.sound.play('passed')
         fn();
      })
   },

   function(fn) {
      this.objectiveUI.setText('Checkpoints: 2/5')
      this.checkpoint3Collider = this.physics.add.overlap(this.ruby, this.checkpoint3, () => {
         this.checkpoint3Collider.active = false;
         this.sound.play('passed')
         fn();
      })
   },

   function(fn) {
      this.objectiveUI.setText('Checkpoints: 3/5')
      // * Show Final Checkpoint
      this.checkpoint5.setAlpha(1);
      this.checkpoint4Collider = this.physics.add.overlap(this.ruby, this.checkpoint4, () => {
         this.checkpoint4Collider.active = false;
         this.sound.play('passed')
         fn();
      })
   },

   function(fn) {
      this.objectiveUI.setText('Checkpoints: 4/5')
      this.checkpoint5collider = this.physics.add.overlap(this.ruby, this.checkpoint5, () => {
         this.checkpoint5collider.active = false;
         this.sound.play('passed')
         fn();
      })
   },
]
      
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
   this.dialogBox('', 'placeholder', 0);
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
   this.army.destroy();
   this.dialogBox('Coward.', 'ruby', 1);
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