import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const validateTelephoneNumber = telephoneNumber => {
    const re = /^(27)[0-9]{9}$/;
    return re.test(telephoneNumber);
};

const validatePassword = password => {
    const re = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return re.test(password);
};

const UserSchema = new mongoose.Schema({
    telephoneNumber: {
        type: String,
        unique: [true],
        required: [true, 'A telephone number is required.'],
        validate: [validateTelephoneNumber, 'The telephone number does not conform to the South African format (27XXXXXXXXX).']
    },
    password: {
        type: String,
        required: true,
        validate: [validatePassword, 'Password not complex enough.']
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
       }
});

UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ telephoneNumber: username });
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
            user.password = hash;
            next();
        });
    }
    else {
        return next();
    }
});

export default mongoose.model('User', UserSchema);