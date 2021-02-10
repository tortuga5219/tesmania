'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  let joinin = sequelize.define('joinin', {
    user_id:{
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }, 
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    address:{
      type: DataTypes.STRING,
      allowNull: true
    }
  },{
    classMethods:{
      associate: function(models){
        //
      }
    }
  });
  return joinin;
};