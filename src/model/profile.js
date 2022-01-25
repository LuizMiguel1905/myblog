const { DataTypes, Model} = require("sequelize");
const sequelize = require('../database');
const Role = require("./role");

class Profile extends Model{}

Profile.init(
    {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
})


module.exports = Profile