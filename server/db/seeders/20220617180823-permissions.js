'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'Permissions',
      [
        { name: 'user_login', description: 'permission to log in' }, 
        { name: 'user_logout', description: 'permission to log out' }, 
        { name: 'create_role', description: 'permission to create role' }, 
        { name: 'view_roles', description: 'permission to view roles' }, 
        { name: 'update_role', description: 'permission to update role' }, 
        { name: 'delete_role', description: 'permission to delete role' }, 
        { name: 'create_perm', description: 'permission to create permission' }, 
        { name: 'view_perms', description: 'permission to view permissions' }, 
        { name: 'update_perm', description: 'permission to update permission' }, 
        { name: 'delete_perm', description: 'permission to delete_permission' },
        { name: 'give_permission', description: 'permission to give_permission' }, 
        { name: 'create_user', description: 'permission to create user' }, 
        { name: 'view_users', description: 'permission to view users' }, 
        { name: 'view_user', description: 'permission to view user' }, 
        { name: 'update_user', description: 'permission to update user' }, 
        { name: 'activate_user', description: 'permission to activate user' }, 
        { name: 'delete_user', description: 'permission to delete user' }, 
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Permissions', null, {});
  },
};

