
var futbolQuest = [
   function(fn) {
      this.dialogBox('Sorry, busy looking for fireflies.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Oh ok, understandable.', 'adrian', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('i wanna play!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Ok great!', 'adrian', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Since it\'s only three of us\nlet\'s do some penalties.', 'adrian', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Where\'s Thomas?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Oh...', 'adrian', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I haven\'t heard from him\nsince the last air raid.', 'adrian', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Alright, let\'s just do some\npenalties then.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I call goalie!', 'adrian', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('ok I will shoot first!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('...', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('How do I shoot?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Press W to Shoot.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {

      // * Start Max's Turn

      // * Change Objective
      this.objectiveUI.setText(`Objective:\nScore Goals.\nRound ${this.round} of ${this.maxRounds}\nScored: ${this.goals}/${this.maxRounds}`)
      
      // * Hide Dialog
      this.dialogBox('', 'placeholder', 0);
      this.speech1.setAlpha(0);

      // * Move Camera
      this.cameras.main.stopFollow();
      this.cameras.main.setScroll(this.tile(26.5), this.tile(37.5));

      // * Move Players
      this.maxTheSlime.setPosition(this.tile(31.25), this.tile(39))
      this.ruby.setPosition(this.tile(34), this.tile(41))
      this.ruby.flipX = false;
      this.ruby.anims.play('idle_side')
      this.adrian.setPosition(this.tile(30.15), this.tile(42.75))

      // * Move Ball
      this.futBall.setPosition(this.tile(31.25), this.tile(40)).setAlpha(1);
      this.futBall.setVelocity(0, 0);

      // * Start Penalties
      this.doingPenalties = true;
      this.shootingArrow.setAlpha(1);

      // * Start Music
      this.music.pause();
      this.futbolMusic.play();

      this.events.once('endedTurn', () => {
         fn();
      })

   },
   
   function(fn) {
      this.futbolMusic.pause();
      this.music.resume();
      if(this.goals <= 2) {
         this.dialogBox('*laughs*', 'ruby', 1);
         keySPACE.once('down', () => {
            this.dialogBox('i suck :(', 'max', 1);
            keySPACE.once('down', () => {
               this.dialogBox('It\'s ok,\nyou are just starting out.', 'ruby', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('Let me show you how\nit\'s done though.', 'ruby', 1);
                  keySPACE.once('down', () => {
                     fn();
                  })
               })
            })
         })
      } else if((this.goals == 3)) {
         this.dialogBox('Ok, not bad!', 'ruby', 1);
         keySPACE.once('down', () => {
            this.dialogBox('Let me show you how\nit\'s done though.', 'ruby', 1);
            keySPACE.once('down', () => {
               fn();
            })
         })
      } else {
         this.sound.play('won_race');
         this.dialogBox('is that good for my first try?', 'max', 1);
         keySPACE.once('down', () => {
            this.dialogBox('😮', 'adrian', 1);
            keySPACE.once('down', () => {
               this.dialogBox('You did amazing!', 'ruby', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('Way better than\nwhen I started...', 'ruby', 1);
                  keySPACE.once('down', () => {
                     this.dialogBox('Let me show you how\nit\'s done though.', 'ruby', 1);
                     keySPACE.once('down', () => {
                        fn();
                     })
                  })
               })
            })
         })
      }
   },

   function(fn) {

      // * Start Ruby's Turn
      
      // * Hide Dialog
      this.dialogBox('', 'placeholder', 0);
      this.speech1.setAlpha(0);

      // * Move Players
      this.ruby.setPosition(this.tile(31), this.tile(39))
      this.ruby.anims.play('idle_down')
      this.maxTheSlime.setPosition(this.tile(34), this.tile(41))
      this.adrian.setPosition(this.tile(30.15), this.tile(42.75))

      // * Move Ball
      this.futBall.setPosition(this.tile(31.25), this.tile(40)).setAlpha(1);
      this.futBall.setVelocity(0, 0);

      // * Logic
      this.goalCollider.active = true;
      this.shotBall = false;
      this.round = 1;
      this.goals = 0;

      // * Change Objective
      this.objectiveUI.setText(`Objective:\nScore Goals.\nRound ${this.round} of ${this.maxRounds}\nScored: ${this.goals}/${this.maxRounds}`)

      // * Start Penalties
      this.doingPenalties = true;
      this.shootingArrow.setAlpha(1);

      // * Resume Music
      this.music.pause();
      this.futbolMusic.resume();

      this.events.once('endedTurn', () => {
         fn();
      })
   },
   
   function(fn) {
      // * Stop Music
      this.futbolMusic.stop();
      this.music.resume();

      if(this.goals <= 2) {
         this.dialogBox('u suck!', 'max', 1);
         keySPACE.once('down', () => {
            this.dialogBox('Yeah I think your ball\nneeds some air...', 'ruby', 1);
            keySPACE.once('down', () => {
               this.dialogBox('Nah I\'m just a god goalie,\nthat\'s all it was.', 'adrian', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('Good tries though!', 'adrian', 1);
                  keySPACE.once('down', () => {
                     fn();
                  })
               })
            })
         })
      } else if((this.goals == 3)) {
         this.dialogBox('Yeah I think your ball\nneeds some air...', 'ruby', 1);
         keySPACE.once('down', () => {
            this.dialogBox('Sounds like a skill issue\nto me!', 'adrian', 1);
            keySPACE.once('down', () => {
               fn();
            })
         })
      } else {
         this.sound.play('won_race');
         this.dialogBox('I am a shooting fiend.', 'ruby', 1);
         keySPACE.once('down', () => {
            this.dialogBox('how are u so good!', 'max', 1);
            keySPACE.once('down', () => {
               this.dialogBox('Years of practice Max.', 'ruby', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('but you never play...', 'max', 1);
                  keySPACE.once('down', () => {
                     fn();
                  })
               })
            })
         })
      }
   },
   
   function(fn) {
      this.dialogBox('Ok, looks like it\'s\ngetting pretty late.', 'adrian', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Have a\ngood night guys!', 'adrian', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('', 'placeholder', 0);
      this.adrian.setVelocity(0, -100);
      this.time.delayedCall(3000, () => {
         this.adrian.destroy();
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('that was fun!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('oh no!\nthe firefly game!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Looks like Adrian distracted us\nfrom our main goal...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('he is an enemy!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('No, the real enemies\nare the Americans,', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('because look what I found.', 'ruby', 1);
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
      this.dialogBox('nice! where did u find it?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('He was attracted by your\nsmelly sweat.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('im not sweating!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('you are!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I don\'t know what\nyou\'re talking about?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox(';)', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
]