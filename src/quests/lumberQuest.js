// WE ARE RECRUITING HERE AT JACK'S LUMBER YARD!
// WE NEED STRONG AND CAPABLE WORKERS WHO CAN CHOP WOOD LIKE IT'S BUTTER!
// Yes, that means you young lady!
// Sorry, I am a young and frail girl.
// Oh, have a good day then!
// WE WILL OFFER FIREFLIES TO ANYONE WHO APPLIES!
// I am the strongest woman to exist on this planet.
// Oh really?
// You wanna try and see if you got what it takes?
// can i try too!
// Sure! Everyone is welcome to test out their skills!
// Come with me to the forest!

// beat everyone:
// 
// Your chopping technique reminds of a certain someone...
// beat max:
// Not bad young lady!
// I think you got what it takes! 
// Hmmm...
// Your chopping technique reminds of a certain someone...
// lost:
// 
// Hmmm... you remind me of someone...
// less than 15 chops:
// Ummm... did you even try?
// I am against deforestation.
// 

// That would be my mom.
// Oh yeah!
// She is the best lumber jack I have seen in years!
// I have not seen her for over a week though...
// which is unlike her.
// Is she alright?
// she is at the hospital with dad...
// Oh, well hopefully they recover soon!
// Tell her that she can comeback whenever she feels up to it.
// Meanwhile... Do you wanna work for us?
// ...
// Do you guys offer Dental?
// No.
// Ok I think I will apply somewhere else then.
// Sounds good! 
// There's some fireflies hanging around inside the Lumber Yard...
// Just go in and get what you need!
// Sounds good.
// Anyways it was nice meeting you! Good luck to your parents!
// *he slimes away*
// look ruby! i caught one!
// Obtained FIREFLY
// Nice work Max.
// why is it off and not moving?
// He is just sleeping, do not worry.

var lumberQuest = [
   function(fn) {
      this.dialogBox('WE NEED STRONG AND CAPABLE\nWORKERS WHO CAN CHOP WOOD\nLIKE IT\'S BUTTER!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Yes, that means you, young lady!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Sorry, I am a frail and\nyoung girl.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Ok, have a good day then!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('WE WILL OFFER FIREFLIES\nTO ANYONE WHO APPLIES!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('I am the strongest woman\nto exist on this planet.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('You want to try and see\nif you got what it takes?', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('can i try too!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Sure! Everyone is welcome\nto test out their abilities!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Come with me to the forest!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {

      // * Start Chopping Mayhem

      // * Change Objective
      this.objectiveUI.setText(`Objective: Chop your tree as fast as possible.`)
      
      // * Hide Dialog
      this.dialogBox('', 'placeholder', 0);
      this.speech3.destroy();

      // * Show Axes
      this.maxsAxe.setVisible(true);
      this.jacksAxe.setVisible(true);
      this.rubysAxe.setVisible(true);

      // * Move Camera
      this.cameras.main.stopFollow();
      this.cameras.main.setScroll(this.tile(18.25), this.tile(7.5));

      // * Move Players
      this.maxTheSlime.setPosition(this.tile(18.5), this.tile(12))
      this.ruby.setPosition(this.tile(25), this.tile(11))
      this.ruby.flipX = true;
      this.ruby.anims.play('idle_side')
      this.jack.setPosition(this.tile(20), this.tile(9))

      this.time.delayedCall(1000, () => {
         fn();
      })

   },

   function(fn) {
      this.dialogBox('Alright, we will chop down\nthese dead trees for our trial.', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Use the E or W key\nto start chopping down the tree!\n(You can use both at the same time!)', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Try to press them\nas fast as possible.', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Your goal is to either\nbeat me, or the\nlil fella over there.', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Alright, Good Luck!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {

      // * Start Chopping Mayhem (Real)

      // * Hide Dialogue
      this.dialogBox('', 'placeholder', 0);

      // * Pause Music
      this.music.pause();

      // * Start Chopping Trees

      // * Countdown UI
      this.countdownTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '24px',
         color: 'yellow',
         align: 'left'
      }

      this.countdown = 4;
      this.countdownToStart = this.add.text(game.config.width/2, game.config.height/2, `${this.countdown}`, this.countdownTextConfig).setAlpha(0);
      this.countdownToStart.setScrollFactor(0, 0).setStroke(0xFFFFFF, 5).setOrigin(0.5).setDepth(10);

      this.timeToFinish = this.add.text(game.config.width- 15, 0, ``, this.countdownTextConfig).setAlpha(0).setScrollFactor(0, 0).setStroke(0xFFFFFF, 5).setOrigin(1, 0).setDepth(10);

      this.countdownUpdater = this.time.addEvent({
         delay: 1000,         
         callback: () => {
            this.countdown -= 1;
            this.countdownToStart.setText(`${this.countdown}`).setAlpha(1);
         },
         repeat: 2,
      })

      // * Start Game and Song
      this.startGame = this.time.delayedCall(4000, () => {
         this.choppingWood = true;
         this.lumberMusic.play();
         this.countdownToStart.setAlpha(0);
         this.timeToFinish.setAlpha(1);

         this.rubyCutTree = this.time.addEvent({
            delay: 90000,
            callback: this.choppingTreeWinner,
            callbackScope: this
         })
         this.maxCutTree = this.time.addEvent({
            delay: 300,
            callback: this.chopTree,
            args: ['Max', this.maxsTree, this.maxsAxe],         
            callbackScope: this,
            repeat: 200
         })
         this.jackCutTree = this.time.addEvent({
            delay: 150,         
            callback: this.chopTree,
            args: ['Jack', this.jacksTree, this.jacksAxe],
            callbackScope: this,
            repeat: 200
         })
      })

      this.events.once('rubysTreeIsCut', () => {
         fn();
      })
   },

   function(fn) {
      // * Start Music
      this.music.resume();
      this.timeToFinish.setAlpha(0);

      if(this.treeCutTime <= 90) {
         this.countdownToStart.setText(`${Math.trunc(this.treeCutTime)} seconds`).setAlpha(1)
      } else {
         this.countdownToStart.setText(`Failed!`).setAlpha(1)
      }

      this.objectiveUI.setText('Press SPACE to Continue.')
      if(this.treeCutTime < 35) {
         this.sound.play('won_race')
      }
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.countdownToStart.setAlpha(0);
      this.objectiveUI.setText('Objective:\nTalk to Jack.')

      // * Hide Axes
      this.maxsAxe.setVisible(false);
      this.jacksAxe.setVisible(false);
      this.rubysAxe.setVisible(false);

      // * Move Camera
      this.cameras.main.startFollow(this.ruby, true, 0.25, 0.25);

      // * Move Players
      this.maxTheSlime.setPosition(this.tile(8), this.tile(7))
      this.ruby.setPosition(this.tile(9), this.tile(7))
      this.jack.setPosition(this.tile(10), this.tile(7))

      if(this.treeCutTime >= 90) {
         this.dialogBox('Did you even try to cut the tree?', 'jack', 1);
         keySPACE.once('down', () => {
            this.dialogBox('I am against deforestation.', 'ruby', 1);
            keySPACE.once('down', () => {
               this.dialogBox('But this is a dead tree...', 'jack', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('It\'s fine though,\nany help is needed here at\nJack\'s Lumberyard!', 'jack', 1);
                  keySPACE.once('down', () => {
                     this.dialogBox('You guys must really want me...', 'ruby', 1);
                     keySPACE.once('down', () => {
                        fn();
                     })
                  })
               })
            })
         })
      } else if(this.treeCutTime >= 60) {
         this.dialogBox('Not bad for your first time!', 'jack', 1);
         keySPACE.once('down', () => {
            this.dialogBox('Thank you.', 'ruby', 1);
            keySPACE.once('down', () => {
               this.dialogBox('hey! this isn\'t your first time!', 'max', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('He is lying.', 'ruby', 1);
                  keySPACE.once('down', () => {
                     this.dialogBox('It\'s fine either way!\nAny help is needed here at\nJack\'s Lumberyard!', 'jack', 1);
                     keySPACE.once('down', () => {
                        fn();
                     })
                  })
               })
            })
         })
      } else if(this.treeCutTime >= 30) {
         this.dialogBox('Wow! You\'re a natural!', 'jack', 1);
         keySPACE.once('down', () => {
            this.dialogBox('You would fit right in with us\nhere at Jack\'s Lumberyard!', 'jack', 1);
            keySPACE.once('down', () => {
               fn();
            })
         })
      } else if(this.treeCutTime >= 15) {
         this.dialogBox('*hard breathing*', 'jack', 1);
         keySPACE.once('down', () => {
            this.dialogBox('How are you so fast!??', 'jack', 1);
            keySPACE.once('down', () => {
               this.dialogBox('she eats rice everyday!', 'max', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('Makes sense,\nrice is objectively the best food.', 'jack', 1);
                  keySPACE.once('down', () => {
                     this.dialogBox('Well we could really use\nsomeone like you!', 'jack', 1);
                     keySPACE.once('down', () => {
                        fn();
                     })
                  })
               })
            })
         })
      } else {
         this.dialogBox('...', 'jack', 1);
         keySPACE.once('down', () => {
            this.dialogBox('Umm. Are you ok?', 'Ruby', 1);
            keySPACE.once('down', () => {
               this.dialogBox('Never in my life have I\nseen someone so fast at cutting wood...', 'max', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('*sniffles*', 'jack', 1);
                  keySPACE.once('down', () => {
                     this.dialogBox('It brings a tear to my eye...', 'jack', 1);
                     keySPACE.once('down', () => {
                        this.dialogBox('Please young lady, work for us!\nI\'m begging!', 'jack', 1);
                        keySPACE.once('down', () => {
                           fn();
                        })
                     })
                  })
               })
            })
         })
      }
   },


// That would be my mom.
// Oh yeah!
// She is the best lumber jack I have seen in years!
// I have not seen her for over a week though...
// which is unlike her.
// Is she alright?
// she is at the hospital with dad...
// Oh, well hopefully they recover soon!
// Tell her that she can comeback whenever she feels up to it.
// Meanwhile... Do you wanna work for us?
// ...
// Do you guys offer Dental?
// No.
// Ok I think I will apply somewhere else then.
// Sounds good! 
// There's some fireflies hanging around inside the Lumber Yard...
// Just go in and get what you need!
// Anyways it was nice meeting you! Good luck to your parents!
// *he slimes away*
// look ruby! i caught one!
// Obtained FIREFLY
// Nice work Max.
// why is his light off?
// He is just sleeping, do not worry.

   function(fn) {
      this.dialogBox('what happened to all the workers?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('*sighs*', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Most of them persished\nin the last air raid...', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Wood is in even higher demand\nnow due to all the\ndestroyed houses...', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('And our best worker, Azula,\nhas not shown up for over a week...', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('My mom?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Oh yeah!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('No wonder you two seemed\nso familiar...', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('She\'s the best lumberjack\nI have ever seen!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Is she alright?', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('our mom is at the hospital\nwith dad...', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Oh, well hopefully they\nrecover soon!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Let her know that she can\ncomeback whenever she feels\nup to it.', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Do you want to work for us\nmeanwhile?', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Hmmm...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Do you guys offer\nany benefits?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Oh yeah we offer\nall kinds of them!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('But you must work over\n80 hours a week on average,', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Have been with us over 3 years,', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('And complete our\nfifty-class course on\nSexual Harassment!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Ok I think I will apply\nsomewhere else then.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Sounds good!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('There\'s some fireflies\nflying around in here...', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Feel free to take\nas many as you need!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Thank you.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Anyways it was nice\nmeeting you two!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },


   function(fn) {
      this.dialogBox('Good luck to your parents!', 'jack', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('', 'placeholder', 0);
      this.jack.setVelocity(0, 100);
      this.time.delayedCall(3000, () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('look ruby! i caught one!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Obtained FIREFLY', 'placeholder', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Nice work Max.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('why is his light off?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('He is just sleeping,\ndo not worry.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
]