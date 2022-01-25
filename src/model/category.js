const { DataTypes, Model} = require("sequelize");
const sequelize = require('../database');

class Category extends Model{}

Category.init(
    {
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Category',
        tableName: 'categories'
    }
)

module.exports = Category;