'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'Roles',
      [
        { name: 'SuperAdmin', symbol : 'ADMS'}, 
        { name: 'Admin', symbol : 'ADM'},
        { name: 'UnitAdmin', symbol : 'UADM' },
        { name: 'Member', symbol : 'MBR'}
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Roles', null, {});
  },
};

