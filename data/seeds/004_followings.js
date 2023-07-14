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
        userId: 1,
        following_id: 2
      },
      {
        userId: 1,
        following_id: 4
      },
      {
        userId: 2,
        following_id: 5
      },
      {
        userId: 2,
        following_id: 3
      },
      {
        userId: 3,
        following_id: 2
      },
      {
        userId: 3,
        following_id: 1
      },
      {
        userId: 4,
        following_id: 3
      },
      {
        userId: 4,
        following_id: 2
      },
      {
        userId: 5,
        following_id: 4
      },
    ]);
  });
};
