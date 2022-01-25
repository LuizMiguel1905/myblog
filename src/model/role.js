const {DataTypes, Model} = require("sequelize");
const sequelize = require("../database");

class Role extends Model{}

Role.init({
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles'
})
module.exports = Role;