let AuthModel = require('../models/auth.model')

exports.getSignup = (req, res, next) => {
    res.render('signup')
}

exports.postSignup = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    AuthModel.createNewUser({
        username,
        email,
        password
    }).then(() => {
        res.redirect('/login')
    }).catch((err) => {
        console.log(err);
        res.redirect('/signup')
    })

}

exports.getLogin = (req, res, next) => {
    res.render('login')
}

exports.postLogin = (req, res, next) => {
    let email = req.body.email,
        password = req.body.password
    AuthModel.login(email, password).then((id) => {
        req.session.userID = id;
        res.redirect('/')
    }).catch((err) => {
        console.log(err);
        res.redirect('/login')
    })
}