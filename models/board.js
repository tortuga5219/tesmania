'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  let board = sequelize.define('board', {

    title:{
      type: DataTypes.STRING(100),
      allowNull: false,
      comment:'제목'
    },
    content:{
      type: DataTypes.STRING(3000),
      allowNull: false,
      comment: '내용'
    },
    writer:{
      type: DataTypes.STRING(20),
      allowNull: false,
      comment:'작성자'
    },
    view_cnt:{
      type: DataTypes.BIGINT(20),
      allowNull: false,
      defaultValue: 0,
      commnet: '조회 수'
    },
    secret_yn:{
        type: DataTypes.ENUM('Y','N'),
        allowNull: false,
        defaultValue: 'N',
        comment:'비밀 여부'
    },
    delete_yn:{
        type: DataTypes.ENUM('Y','N'),
        allowNull: false,
        defaultValue: 'N',
        comment: '삭제 여부'
    },
    insert_time:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '생성 날짜'
    },
    update_time:{
        type: DataTypes.DATE,
        allowNull: true,
        comment:'수정 날짜'
    },
    delete_time:{
        type: DataTypes.DATE,
        allowNull: true,
        comment:'삭제 날짜'
    }     
  },{
    timestamps:false,
  });
  return board;
};