const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bycrypt = require('bcryptjs');

class User extends Model {
    checkPassword(password) {
        return bycrypt.compareSync(password, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[8]
        }
    }
},
{

    hooks: {
        beforeCreate: async(newUserData) =>  {
            newUserData.password = await bycrypt.hash(newUserData.password, 10);
            return newUserData;
        }  
    },
        sequelize,
        timestamps: true,
        updatedAt: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    });

module.exports = User;