/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Tweets', function(tweets) {
        tweets.increments("tweet_id");
        tweets.integer("user_id").references("user_id").inTable("Users").onDelete("CASCADE").onUpdate("CASCADE")
        tweets.string('tweetContent', 1024).notNullable();
        tweets.integer("numberOfLikes").defaultTo(0)
        tweets.integer("numberOfComments").defaultTo(0)
        tweets.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Tweets');
};
