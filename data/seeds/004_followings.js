/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('Followings')
  .truncate()
  .then(function() {
    return knex('Followings').insert([
      {
        user_id: 1,
        following_id: 2
      },
      {
        user_id: 1,
        following_id: 4
      },
      {
        user_id: 2,
        following_id: 5
      },
      {
        user_id: 2,
        following_id: 3
      },
      {
        user_id: 3,
        following_id: 2
      },
      {
        user_id: 3,
        following_id: 1
      },
      {
        user_id: 4,
        following_id: 3
      },
      {
        user_id: 4,
        following_id: 2
      },
      {
        user_id: 5,
        following_id: 4
      },
    ]);
  });
};
