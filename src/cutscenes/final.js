   // Ok, that should be enough fireflies.
   // Ready to head back?
   // yes! let's go!

   // *goes to cave * //
   // Look Max...
   // ?
   // I should not have held this from you for so long...
   // But both mom and dad are—
   // gone?
   // ...
   // Yes...
   // are you sad?
   // It has been destroying me inside,
   // But spending time with you today made me realize that,
   // As long as we have each other, 
   // We will be fine no matter what.
   // yes! i had fun too!
   // oh! and look what I found!
   // obtained RICE
   //  !
   // ^-^ Rice!
   // Where did you find it!?
   // the army guy left it when he ran away...
   // I love you Max.
   // i love you too Ruby!
   // Fin (spanish)

var finalScene = [
   function(fn) {
      this.dialog('?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('I should not have held this\nfrom you for so long...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('But both mom and dad are—', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('gone?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('Yes...', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('are you sad?', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('It has been\ndestroying me inside,', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('But spending time with you\ntoday made me realize that,', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('As long as we have each other,', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('We will be fine no matter what.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('yes! i had fun too!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('oh! and look what I found!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('', 'placeholder', 0);
      this.textBox.setAlpha(1);
      this.prompt.setText('Obtained RICE').setAlpha(1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.textBox.setAlpha(0);
      this.prompt.setText('').setAlpha(0);
      this.dialog('!', 'ruby_suprised', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('Rice!', 'ruby_happy', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('Where did you find it?', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('the army guy left it\n when he ran away!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('I love you Max.', 'ruby', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      this.dialog('i love you too Ruby!', 'max', 1);
      keySPACE.once('down', () => {
         fn();
      })
   },

   function(fn) {
      // * Set That Player Completed Game
      if (this.supportsLocalStorage()) {
          this.completedGame = true;
          localStorage.setItem('completedGame', `${this.completedGame}`);
      }

      // * Roll Credits :)
      this.tweens.add({
         targets: this.titleBg,
         alpha: 1,
         duration: 2500
      })
      this.time.delayedCall(2500, () => {
         fn();
      })
   },

   function(fn) {
      this.tweens.add({
         targets: this.title,
         alpha: 1,
         duration: 2500
      })
      this.time.delayedCall(5000, () => {
         fn();
      })
   },

   function(fn) {
      this.tweens.add({
         targets: this.credits,
         y: -1000,
         duration: 60000
      })
      this.time.delayedCall(61000, () => {
         fn();
      })
   },
]