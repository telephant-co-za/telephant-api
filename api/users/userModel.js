import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    password: {type: String, required: true }
  });

UserSchema.statics.findByUserName = function(username) { 
    return this.findOne({ username: username});
};

UserSchema.methods.comparePassword = function (passw, callback) {
bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
    return callback(err);
    }
    callback(null, isMatch);
});
};

UserSchema.pre('save', function (next) {
const user = this;
if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
        return next(err);
    }
    console.log(hash);
    user.password = hash;
    next();
    });
}
else {
    return next();
}
});

export default mongoose.model('User', UserSchema);