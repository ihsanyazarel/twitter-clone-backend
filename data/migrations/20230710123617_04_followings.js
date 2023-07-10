/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Followings', followings => {
        followings.increments("following_id");
        followings.integer("user_id").references("user_id").inTable("Users").onDelete("CASCADE").onUpdate("CASCADE")
        followings.integer("followingId")
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Followings');
};
