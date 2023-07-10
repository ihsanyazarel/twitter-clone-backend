/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('Comments')
  .truncate()
  .then(function() {
    return knex('Comments').insert([
      {
        commentContent: "comment 1",
        user_id: 1,
        tweet_id: 1
      },
      {
        commentContent: "comment 2",
        user_id: 1,
        tweet_id: 1
      },
      {
        commentContent: "comment 3",
        user_id: 2,
        tweet_id: 2
      },
      {
        commentContent: "comment 4",
        user_id: 2,
        tweet_id: 2
      },
      {
        commentContent: "comment 5",
        user_id: 3,
        tweet_id: 3
      },
      {
        commentContent: "comment 6",
        user_id: 4,
        tweet_id: 4
      },
      {
        commentContent: "comment 7",
        user_id: 5,
        tweet_id: 5
      },
      {
        commentContent: "comment 8",
        user_id: 4,
        tweet_id: 6
      },
      {
        commentContent: "comment 9",
        user_id: 3,
        tweet_id: 7
      },
    ]);
  });
};
