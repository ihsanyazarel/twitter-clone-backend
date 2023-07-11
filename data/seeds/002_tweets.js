/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('Tweets')
  .truncate()
  .then(function() {
    return knex('Tweets').insert([
      {
        tweetContent: "Tweet-1 İhsan tarafından oluşturuldu.",
        user_id: 1,
      },
      {
        tweetContent: "Tweet-2 İhsan tarafından oluşturuldu.",
        user_id: 1,
      },
      {
        tweetContent: "Tweet-3 Aytaç tarafından oluşturuldu.",
        user_id: 2,
      },
      {
        tweetContent: "Tweet-4 Aytaç tarafından oluşturuldu.",
        user_id: 2,
      },
      {
        tweetContent: "Tweet-5 Serkan tarafından oluşturuldu.",
        user_id: 3,
      },
      {
        tweetContent: "Tweet-6 Yaşar tarafından oluşturuldu.",
        user_id: 4,
      },
      {
        tweetContent: "Tweet-7 İhsan tarafından oluşturuldu.",
        user_id: 1,
      },
      {
        tweetContent: "Tweet-8 Yaşar tarafından oluşturuldu.",
        user_id: 4,
      },
      {
        tweetContent: "Tweet-9 Serkan tarafından oluşturuldu.",
        user_id: 3,
      },
    ]);
  });
};
