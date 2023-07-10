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
        tweetContent: 'I wish the ring had never come to me. I wish none of this had happened.',
        user_id: 1,
      },
      {
        tweetContent: 'I think we should get off the road. Get off the road! Quick!',
        user_id: 1,
      },
      {
        tweetContent: "I made a promise, Mr Frodo. A promise. \"Don't you leave him Samwise Gamgee.\" And I don't mean to. I don't mean to.",
        user_id: 2,
      },
      {
        tweetContent: " N-nothing important. That is, I heard a great deal about a ring, a Dark Lord, and something about the end of the world, but... Please, Mr. Gandalf, sir, don't hurt me. Don't turn me into anything... unnatural.",
        user_id: 2,
      },
      {
        tweetContent: 'You need people of intelligence on this sort of mission...quest...thing.',
        user_id: 3,
      },
      {
        tweetContent: 'All you have to do is decide what to do with the time that is given to you.',
        user_id: 4,
      },
      {
        tweetContent: 'Do not be so quick to deal out death and judgement. Even the very wise do not see all ends.',
        user_id: 5,
      },
      {
        tweetContent: ' Fool of a Took! Throw yourself in next time and rid us of your stupidity!',
        user_id: 4,
      },
      {
        tweetContent: 'I will be dead before I see the ring in the hands of an elf! Never trust an elf!',
        user_id: 3,
      },
    ]);
  });
};
