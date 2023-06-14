
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
      this.time.delayedCall(3000, () => {
         fn();
      })
   },

   function(fn) {
      
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