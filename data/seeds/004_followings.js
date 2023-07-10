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
        followingId: 2
      },
      {
        user_id: 1,
        followingId: 4
      },
      {
        user_id: 2,
        followingId: 5
      },
      {
        user_id: 2,
        followingId: 3
      },
      {
        user_id: 3,
        followingId: 2
      },
      {
        user_id: 3,
        followingId: 1
      },
      {
        user_id: 4,
        followingId: 3
      },
      {
        user_id: 4,
        followingId: 2
      },
      {
        user_id: 5,
        followingId: 4
      },
    ]);
  });
};
