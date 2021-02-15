'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('boards', {
      id: {
        type: Sequelize.BIGINT(100),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '번호'
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment:'제목'
      },
      content: {
        type: Sequelize.STRING(3000),
        allowNull: false,
        comment: '내용'
      },
      writer: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment:'작성자'
      },
      view_cnt: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        defaultValue: 0,
        commnet: '조회 수'
      },
      secret_yn: {
        type: Sequelize.ENUM('Y','N'),
        allowNull: false,
        defaultValue: 'N',
        comment:'비밀 여부'
      },
      delete_yn: {
        type: Sequelize.ENUM('Y','N'),
        allowNull: false,
        defaultValue: 'N',
        comment: '삭제 여부'
      },
      insert_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '생성 날짜'
      },
      delete_time: {
        
        type: Sequelize.DATE,
        comment:'수정 날짜'
      },
      update_time: {
        
        type: Sequelize.DATE,
        comment:'삭제 날짜'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('boards');
  }
};