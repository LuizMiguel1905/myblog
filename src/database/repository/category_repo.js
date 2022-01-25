const Category = require('../../model/category');

class CategoryRepository{

    insert(obj){
        return Category.create({...obj});
    }

    update(id, obj){
        return Category.update({...obj}, {where:{id: id}});
    }

    delete(obj){
        return Category.destroy({where: {id: obj.id}});
    }
    
    deleteById(id){
        return Category.destroy({where: {id: id}});
    }
    findById(id){
        return Category.findAll({where: {id: id}});
    }

    findByName(name){
        return Category.findAll({where: {name: name}});
    }

    findAll(){
        return Category.findAll();
    }
}

module.exports = CategoryRepository;