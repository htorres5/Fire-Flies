// HELP!
// MY FARM IS BEING INVADED!
// ...
// his farm is being invaded!
// we have to go help him!
// Shh
// Just ignore him.
// but!
// We must not stray from our Firefly goal Max.
// We have to stay determined.
// YOUNG LADY STOP IGNORING ME
// I CAN HEAR YOU
// He's onto us!
// I CAN GIVE YOU TWO WHAT YOU NEED!
// you have fireflies?!
// YES! TONS OF THEM!
// JUST PLEASE FOR THE LOVE OF GOD
// How many?
// AAAAAAAAAAAAAAAAAAAAAAAAA
// STOP ASKING SO MANY QUESTIONS
// HERE!
// Nathan hands you a Mallet.
// TAKE THIS MALLET.
// I am not-
// YES! YOU! ARE!
// GET RID OF ALL OF THESE TANOOKIS RAVAGING MY FARM!
// Tanookis eat rice?
// YES! THOSE STUPID AMERICANS DESTROYED THEIR HABITAT!
// SO NOW THEY ARE FINDING OTHER SOURCES OF FOOD!
// I CANT TAKE IT ANYMORE! WHEN WILL THE RAIDS STOP???
// are you ok sir?
// *breathes in*
// Yes, sorry.
// I just had to let it all out.
// Just tap on the Tanookis with LEFT CLICK on your mouse.
// That's it?
// Yes, but trust me, those sneaksters are fast...
// Let me know when they're all gone.
// Good luck!
// *he runs off somewhere*
// what happened?
// We have been taken hostage Max.

var tanookiQuest = [
   function(fn) {
      this.dialogBox('MY FARM IS BEING INVADED!', 'nathan', 1);
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
      this.dialogBox('uncle Nathan\'s farm\nis being invaded!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('we have to go help him!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Shh', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('but!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Just ignore him.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('We must not stray\nfrom our Firefly goal Max.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('We must stay\ndetermined.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('RUBY STOP IGNORING ME', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I CAN HEAR YOU!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('He\'s onto us!', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('I CAN GIVE YOU TWO\nWHAT YOU NEED!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('you have fireflies?!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('YES! TONS OF THEM!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('How many?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('AAAAAAAAAAAAAAAAAAAAAAAAA', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('STOP ASKING SO MANY QUESTIONS', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('HERE!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Nathan hands you a MALLET', 'placeholder', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('TAKE THIS MALLET.', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I am not—', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('YES YOU ARE!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('GET RID OF ALL OF THESE\nTANOOKIS RAVAGING MY FARM!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Tanookis eat rice?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('YES! THOSE STUPID AMERICANS\nDESTROYED THEIR HABITAT!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('SO NOW THEY ARE FINDING\nOTHER SOURCES OF FOOD!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('I CANT TAKE IT ANYMORE!\nWHEN WILL THE RAIDS STOP???', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('are you ok uncle?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('*breathes in*', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Yes, sorry Max.', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Just tap on the Tanookis\nwith LEFT CLICK on your mouse.', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('That\'s it?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Yes, but trust me,\nthose buggers are fast...', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Let me know when they\'re all gone.', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Good luck!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.speech2.setAlpha(0);
      this.dialogBox('', 'placeholder', 0);
      this.nathan.setVelocity(100, 0);
      this.time.delayedCall(3000, () => {
         this.nathan.setVelocity(0, 0);
         fn();
      })
   },

   function(fn) {
      this.dialogBox('what happened?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Our uncle has taken us\nhostage Max.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   
   function(fn) {

      // * Start Tapping Tanookis!

      // * Change Objective
      this.objectiveUI.setText(`Objective: Tap on the Tanookis before they hide.\nAccuracy: ${Math.trunc((this.tanookiHitCount/this.tanookiTotalCount)*100)}%`)
      // * Hide Dialog
      this.dialogBox('', 'placeholder', 0);

      // * Move Camera
      this.cameras.main.stopFollow();
      this.cameras.main.setScroll(this.tile(9), this.tile(30.5));

      // * Move Players
      this.maxTheSlime.setPosition(this.tile(13), this.tile(41))
      this.ruby.setPosition(this.tile(12), this.tile(41))
      this.nathan.setPosition(this.tile(11), this.tile(41))
      this.ruby.flipX = false;
      this.ruby.anims.play('idle_side')

      // * Start Tapping Tanookis Update()
      this.tappingTanookis = true;
      this.input.on('pointermove', (pointer) => {
          this.mallet.setVisible(true).copyPosition(pointer);
      });

      // * Pause Main Music
      this.music.pause();

      // * Add Countdown

      // * Objective
      this.countdownTextConfig = {
         fontFamily: 'Hanyi',
         fontSize: '30px',
         color: 'yellow',
         align: 'left'
      }

      // * Countdown UI
      this.countdown = 4;
      this.countdownToStart = this.add.text(game.config.width/2, game.config.height/2, `${this.countdown}`, this.countdownTextConfig).setAlpha(0);
      this.countdownToStart.setScrollFactor(0, 0).setStroke(0xFFFFFF, 5).setOrigin(0.5);

      this.countdownUpdater = this.time.addEvent({
         delay: 1000,         
         callback: () => {
            this.countdown -= 1;
            this.countdownToStart.setText(`${this.countdown}`).setAlpha(1);
         },
         repeat: 2,
      })

      // * Start Game and Song
      this.startSong = this.time.delayedCall(4000, () => {
         this.tanookiMusic.play();
         this.countdownToStart.setAlpha(0);
         this.showTanookiTimer = this.time.addEvent({
            delay: 3000,         
            callback: this.showTanooki,
            repeat: 73,
            startAt: 1,
            callbackScope: this
         })
      })
      this.tanookiMusic.on('complete', () => {
         fn();
      })
   },

   function(fn) {
      this.hitAccuracy = (this.tanookiHitCount/this.tanookiTotalCount)*100;
      if (this.hitAccuracy == 100) {
         this.countdownToStart.setText(`FULL COMBO!`).setAlpha(1)
      } else {
         this.countdownToStart.setText(`${Math.trunc(this.hitAccuracy)}%`).setAlpha(1)
      }

      this.objectiveUI.setText('Press SPACE to Continue.')
      if(this.hitAccuracy > 85) {
         this.sound.play('won_race')
      }
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.objectiveUI.setText('Objective: \nTalk to Nathan.')
      this.countdownToStart.destroy();
      this.mallet.destroy();
      this.music.resume();
      this.cameras.main.startFollow(this.ruby, true, 0.25, 0.25)

      if(this.hitAccuracy <= 75) {
         this.dialogBox('Well at least you tried.', 'nathan', 1);
         keySPACE.once('down', () => {
            this.dialogBox('So thank you.', 'nathan', 1);
            keySPACE.once('down', () => {
               this.dialogBox('Sorry, I am against animal abuse...', 'ruby', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('Aren\'t you capturing fireflies?', 'nathan', 1);
                  keySPACE.once('down', () => {
                     fn();
                  })
               })
            })
         })
      } else if((this.hitAccuracy <= 91)) {
         this.dialogBox('Well you got rid of\nmost of em at least.', 'nathan', 1);
         keySPACE.once('down', () => {
            this.dialogBox('More than I could ever.', 'nathan', 1);
            keySPACE.once('down', () => {
               this.dialogBox('So thank you.', 'nathan', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('I understand your pain now.', 'ruby', 1);
                  keySPACE.once('down', () => {
                     fn();
                  })
               })            })
         })
      } else if((this.hitAccuracy == 100 )) {
         this.dialogBox('Lord almighty...', 'nathan', 1);
         keySPACE.once('down', () => {
            this.dialogBox('Never in a million years\nhave I seen something like this...', 'nathan', 1);
            keySPACE.once('down', () => {
               this.dialogBox('Seen what?', 'ruby', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('You wiped out their\nentire population!', 'nathan', 1);
                  keySPACE.once('down', () => {
                     this.dialogBox('Where did you learn\nhow to do this?', 'nathan', 1);
                     keySPACE.once('down', () => {
                        this.dialogBox('Let\'s just say I have a lot of\nexperience in farming...', 'ruby', 1);
                        keySPACE.once('down', () => {
                           fn();
                        })
                     })
                  })
               })
            })
         })
      } else {
         this.dialogBox('Damn woman!\nWhat did they do to you?', 'nathan', 1);
         keySPACE.once('down', () => {
            this.dialogBox('?', 'ruby', 1);
            keySPACE.once('down', () => {
               this.dialogBox('You pleaded me to get rid of them...', 'ruby', 1);
               keySPACE.once('down', () => {
                  this.dialogBox('Yeah but it looked like\nit was personal...', 'nathan', 1);
                  keySPACE.once('down', () => {
                     this.dialogBox('But good job!\nThey will never come back now\nin fear of you!', 'nathan', 1);
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
      this.dialogBox('where did all the tanookis go!?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Oh don\'t worry boy,\nthey just scurried off somewhere.', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Hopefully to my neighbor\'s farm,\nhehe.', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('You got the fireflies?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Oh yeah, they\'re right here\nin my back pocket.', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('But before I give you them—', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('No.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('ok...', 'nathan', 1);
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
      this.dialogBox('But if you ever need work\nor anything,', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('let me know and I can hook you up.', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Pay you actual money, ya know?', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('No thank you.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('All I\'m interested in\nare FireFlies.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   // hey uncle have you heard from dad?
   // Oh, Richard?
   // He's still at the hospital no?
   // ...
   // Well...
   // If anything happens to him, or your mom, I will be more than happy to take care of you both.
   // Good luck on you FireFly adventure!

   function(fn) {
      this.dialogBox('hey uncle,\nhave you heard from dad?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Oh, Richard?', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('He\'s still at the hospital no?', 'nathan', 1);
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
      this.dialogBox('Well,', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('If anything happens to him,\nor your mom,', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
   
   function(fn) {
      this.dialogBox('Just know that\nI will be more than happy\nto take care of you both.', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Good luck on your\nFireFly adventure!', 'nathan', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.speech2.setAlpha(0);
      this.dialogBox('', 'placeholder', 0);
      this.nathan.setVelocity(0, 100);
      this.time.delayedCall(3000, () => {
         this.nathan.destroy();
         fn();
      })
   },

   function(fn) {
      this.dialogBox('Poor tanookis...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },
]