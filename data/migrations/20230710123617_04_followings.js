/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Followings', followings => {
        followings.increments("id");
        followings.integer("userId").references("user_id").inTable("Users").onDelete("CASCADE").onUpdate("CASCADE")
        followings.integer("following_id")
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Followings');
};
