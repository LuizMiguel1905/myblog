const bcrypt = require('bcrypt')
const express = require("express");
const route = express.Router();
const passport = require('passport');

const Account = require('../model/account');
const AccountRepository = require('../database/repository/account_repo');

const saltRounds = 12;
const aRepo = new AccountRepository()

route.get('/', (req,res)=>{
    res.render('pages/home', {user: req.user})
});

route.get('/signin', (req,res)=>{
    res.render('pages/signin', {user: req.user, error: req.flash('error')[0], values: null})
});

route.post('/signin',passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/signin",
        failureFlash: true
    })
);

route.get('/signup', (req,res)=>{
    res.render('pages/signup', {user: req.user ,error:null, values: null})
});

route.post('/signup', async(req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation

    if(password == passwordConfirmation){
        
        let ac = await aRepo.findByUsername(username);
        console.log(ac)

        if(ac.length == 0){

            bcrypt.hash(password, saltRounds, (_, hash) =>{

                let account = {
                    username: username, 
                    password: hash
        };

            aRepo.insert(account) 
            })
            
        } else {
            //Tratar erro nome de usuarioo existente
            let error = {
                message: "O nome de usuário já existe"
            }

            let values = {
                username: username,
                password: password,
                passwordConfirmation: passwordConfirmation
            }
            res.render('pages/signup', {user: req.user, error:error, values: values})
        }
        
    } else {
        //Tratar erro senhas diferentes
        let error = {
            message: "As senhas não coincidem"
        }
        let values = {
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation
        }
        res.render('pages/signup', {user: req.user, error:error, values: values})
    }
    res.render('pages/signup_ok', {user: req.user})
});
module.exports = route;