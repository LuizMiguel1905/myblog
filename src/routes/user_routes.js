const express = require('express')
const UserRepository = require('../database/repository/user_repo')
const route = express.Router()
let uRepo = new UserRepository()

//Buscar todos os usuários
route.get('/', async(_, res) => {
	
	resp = {
		status: 'OK',
		data: await uRepo.findAll(),
	}
	//res.status(200).send(JSON.stringify(resp))
	res.status(200).json(resp);
})

//Buscar o usuário com um determinado ID

route.get('/:id', async(req, res)=>{
	
	let id = req.params["id"];
	let user = await uRepo.findById(id);

	if(user.length > 0){
		resp = {
			status : 'OK',
			data: user[0]
		}
		res.status(200).json(resp);
	} else {
		let resp = {
			status: "ERROR",
			description: `User with id ${id} not found.`
		};
		res.status(404).json(resp)
	}
})

//Cadastrar um novo usuário
route.post('/', async(req, res) => {

	let u = req.body

	
	if( u.nome == undefined || u.email == undefined){
		resp = {
			status : 'ERROR',
			description: `User JSON with id, nome, and email fields must be provided.`
		}
		res.status(400).json(resp);
		return;
	}
	let user = await uRepo.insert(u);

	let resp = {
		status: 'OK',
		data: `User with id ${user.id} inserted with sucess.`
	}
	res.status(200).json(resp)
})

//Atualizar um usuário existente com um determinado ID
route.put('/:id', async(req, res) => {

	let id = req.params["id"]
	let u = req.body

	let user = await uRepo.findById(id);

	if(user.length> 0){
		if(u.nome == undefined || u.email == undefined){
			resp = {
				status : 'ERROR',
				description: `User JSON must be provided.`
			};
			res.status(400).send(resp)
		}


	user = await uRepo.update(id,u);
	
	let resp ={
		status: "OK",
		description: `User with id ${id} was updated`
		};

	res.status(200).send(resp);
	}else{
	let resp = {
		status: "ERROR",
		description:`User with id ${id} not found`
	};
	res.status(404).json(resp)
	}
});

//Excluir um usuário existente com um determinado ID
route.delete('/:id', async(req, res) => {

	let id = req.params["id"];
	let user = await uRepo.findById(id);

	if(user.length > 0){
		await uRepo.delete(user[0]);

		let resp = {
			status: "OK",
			description: `User with id ${id} was deteled`
		};

		res.status(200).send(resp)
	} else{
		let resp = {
			status: "ERROR",
			description: `User with ${id} not found`
		};
		res.status(404).json(resp)
	}
});

module.exports = route