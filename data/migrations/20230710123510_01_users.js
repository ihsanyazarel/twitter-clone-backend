/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Users', users => {
        users.increments('user_id')
        users.string('nickName', 128).notNullable().unique()
        users.string('userName', 128).notNullable()
        users.string('userSurname', 128).notNullable()
        users.string('userEmail', 128).notNullable().unique()
        users.string('password', 128).notNullable()
        users.string('role').notNullable().defaultTo('User')
        users.integer("numberOfFollowers").defaultTo(0)
        users.integer("numberOfFollowing").defaultTo(0)
        users.string("secretQuestion").notNullable()
        users.timestamp("signUpDate").defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Users');
};
