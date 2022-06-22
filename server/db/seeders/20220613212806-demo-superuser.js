'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'Users',
      [
        { 
          user_id: 'ADMS-000000', username: 'xtest', email : 'xtest@gmail.com',
          fname: 'David', lname : 'Ojo', gender : 'Male',
          role_id : '1', password : 'password4',
          is_active : true
        }, 
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};

