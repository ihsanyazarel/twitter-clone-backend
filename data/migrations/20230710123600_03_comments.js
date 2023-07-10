/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Comments', comments => {
        comments.increments("comment_id");
        comments.integer("tweet_id").references("tweet_id").inTable("Tweets").onDelete("CASCADE").onUpdate("CASCADE")
        comments.integer("user_id").references("user_id").inTable("Users").onDelete("CASCADE").onUpdate("CASCADE")
        comments.string('commentContent', 1024).notNullable();
        comments.integer("numberOfLikes").defaultTo(0)
        comments.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Comments');
};
