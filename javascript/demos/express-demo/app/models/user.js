var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number
});

UserSchema.methods = {
  sayHello: function () {
    console.log("Hi! I'm " + this.name + ".");
  }
}

mongoose.model('User', UserSchema);

