const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const DB_URL = 'mongodb://127.0.0.1:27017/online-shop';

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model('user', userSchema);

exports.createNewUser = ({
    username,
    email,
    password
}) => {
    // check if email exists
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({
                email
            });
        }).then((user) => {
            if (user) {
                mongoose.disconnect();
                reject('this email is used.')
            } else {
                return bcrypt.hash(password, 10)
            }
        }).then((hashedPassword) => {
            let user = new User({
                name: username,
                email,
                password: hashedPassword
            })
            console.log(username,
                email,
                hashedPassword);
            return user.save()
        }).then(() => {
            mongoose.disconnect();
            resolve('account created')
        }).catch((err) => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            User.findOne({
                email
            }).then((user) => {
                if (!user) {
                    mongoose.disconnect();
                    reject('there is no user matches this email')
                } else {
                    bcrypt.compare(password, user.password).then((same) => {
                        if (!same) {
                            mongoose.disconnect();
                            reject('Password is incorrect')
                        } else {
                            mongoose.disconnect();
                            resolve(user._id)
                        }
                    })
                }
            }).catch((err) => {
                mongoose.disconnect();
                reject(err)
            })
        })
    })
}