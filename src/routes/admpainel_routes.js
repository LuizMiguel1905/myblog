const express = require("express");
const route = express.Router();

const ensureAuthenticated = require('../middleware/auth');
const CategoryRepository = require('../database/repository/category_repo');
const Category = require("../model/category");
const { parse } = require("dotenv");
const cRepo = new CategoryRepository();
route.get('/', ensureAuthenticated, (req, res) =>{
    res.render("pages/adm_panel", {user: req.user})
});

route.get('/categories', ensureAuthenticated, async(req, res) =>{
    let categories = await cRepo.findAll()
    res.render("pages/categories", {user: req.user, categories: categories})
});

route.get('/categories/new', ensureAuthenticated, async (req, res) => {
    
    let option = {
        formName: 'Nova Categoria',
        buttonName: "Cadastrar",
        category: null, 
        url: '/admpainel/categories/new'
    }
    res.render('pages/category_new', {
        option: option,
        user: req.user, 
        error: null})
});

route.get('/categories/edit/:id', ensureAuthenticated, async (req, res) => {
    let id = parseInt(req.params["id"]);
    let category = await cRepo.findById(id);

    let option = {
        formName: 'Editar Categoria',
        category: category[0], 
        url: '/admpainel/categories/edit'
    }
    res.render('pages/category_edit', {
        option: option,
        user:req.user, 
        error: null})
});

route.post("/categories/remove/:id", ensureAuthenticated, async(req, res)=>{
    let id= parseInt(req.params["id"]);
    cRepo.deleteById(id);
    res.redirect("/admpainel/categories")
})

route.post('/categories/edit', ensureAuthenticated, async(req, res) =>{
    let id = parseInt(req.body.id);
    let name= req.body.name;
    let description= req.body.description;

    let category = await cRepo.findById(id);

    let option = {
        formName: 'Editar Categoria',
        buttonName: "Editar",
        category: category[0], 
        url: '/admpainel/categories/edit'
    };

    if(name.length > 0){

        let cat = {name: name, description: description}
        cRepo.update(id, cat)
        res.redirect("/admpainel/categories")
    } else {
        let error = {
            message: "o campo não pode ser vazio",
        };
        res.render("pages/category_edit", {
            option: option,
            user: req.user, 
            error: error})
    }
    
})
route.post('/categories/new', ensureAuthenticated, async(req, res) =>{
    let id = parseInt(req.params.id);
    let name= req.body.name;
    let description= req.body.description;

    let option = {
        formName: 'Nova Categoria',
        buttonName: "Cadastrar",
        category: null, 
        url: '/admpainel/categories/new'
    }

    if(name.length > 0){
        let cRepo = new CategoryRepository();
        let category = await cRepo.findByName(name);

        if(category[0]){
            let error = {
                message: `A categoria de nome ${name} ja existe`,
            };
            res.render("pages/category_new", {
                option: option,
                user: req.user, 
                error: error})
        } else{
            let cat = {name: name, description: description}
            cRepo.insert(cat)
            res.redirect("/admpainel/categories")
        }
    } else{
        let error = {
            message: "o campo nome é obrigatorio",
        };
        res.render("pages/category_new", {
            option: option,
            user: req.user, 
            error: error})
    }
    
});

module.exports = route;