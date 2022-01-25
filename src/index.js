const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const database = require('./database');
const routes = require('./routes');

const session = require('express-session')
const cookieParser = require('cookie-parser')

const passport = require('passport');
const Strategy = require('passport-local')
const AccountRepository = require('./database/repository/account_repo');
const bcrypty = require('bcrypt');
const flash = require('connect-flash')

passport.use(new Strategy(
	async (username, password, done) =>{
		let aRepo = new AccountRepository();
		let account = await aRepo.findByUsername(username);

		if(account.length == 0) {
			return done(null, false, {message: 'Usuário não encontrado'})
		}

		bcrypty.compare(password, account[0].password, (err, result)=>{
			if(err){
				return done(err);
			}

			if(!result){
				return done(null, false, {message: 'Senha inválida'});
			}
			return done(null, account[0]);
		})
		}
	));
	
		passport.serializeUser((user, done) =>{
			done(null, {id: user.id})
		});

		passport.deserializeUser(async(obj, done)=>{
			let aRepo = new AccountRepository();
			let account = await aRepo.findById(obj.id);
			done(null, account[0]);
		})

const app = express()
const port = 3000

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: 's3cr3t',
	resave: false,
	saveUninitialized: true,
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes)



app.listen(port, async() => {
	await database.sync({force: true});
	console.log("Application is running...")

})