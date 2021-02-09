'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  var joinin = sequelize.define('joinin', {
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
  // class joinin extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // joinin.init({
  //   user_id:{
  //     type:DataTypes.STRING,
  //     allowNull: false,
  //     primaryKey: true
  //   }, 
  //   password:{
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   name:{
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   email:{
  //     type: DataTypes.STRING,
  //     allowNull: true,
  //     validate: {
  //       isEmail: true
  //     }
  //   },
  //   address:{
  //     type: DataTypes.STRING,
  //     allowNull: true
  //   }
  // }, {
  //   sequelize,
  //   modelName: 'joinin',
  // });
  return joinin;
};