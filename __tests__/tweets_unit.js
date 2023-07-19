const db = require("../data/data-config");
const tweetModel = require("../api/tweets/tweets-model");


beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db.seed.run();
});

describe('---------- GET ALL TWEETS ----------', () => {
    test('1 - get all tweets', async () => {
        const tweets = await tweetModel.getAllTweets();
        expect(tweets).toHaveLength(9);
    });
});

describe('---------- GET TWEET BY ID ----------', () => {
    test('2 - get tweet by ID', async () => {
        const tweet = await tweetModel.getTweetById(2);
        expect(tweet.tweetContent).toMatch("Tweet-2 İhsan tarafından oluşturuldu.");
        expect(tweet.user_id).toBe(1);
    });
});

describe('---------- GET TWEETS OF USER ----------', () => {
    test('3 - get tweets of user', async () => {
        const tweets = await tweetModel.getTweetsOfUser(1);
        expect(tweets).toHaveLength(3);
    });
});

describe('---------- GET TWEETS OF USER WITH FOLLOWINGS ----------', () => {
    test('4 - get tweets of user with followings', async () => {
        const tweets = await tweetModel.getTweetsOfUserWithFollowings(1);
        expect(tweets).toHaveLength(7);
        expect(tweets[2].user_id).toBe(2);
        expect(tweets[3].user_id).toBe(2);
        expect(tweets[4].user_id).toBe(4);
        expect(tweets[5].user_id).toBe(1);
        expect(tweets[6].user_id).toBe(4);
    });
});

describe('---------- UPDATE TWEET ----------', () => {
    test('5 - update tweet', async () => {
        await tweetModel.updateTweet(1, {tweetContent: "test"});
        const updatedTweet = await tweetModel.getTweetById(1);
        expect(updatedTweet).toHaveProperty("tweetContent", "test");

    });
});

describe('---------- DELETE TWEET ----------', () => {
    test('6 - delete tweet', async () => {
        const deletedTweet = await tweetModel.deleteTweet(5);
        const tweets = await tweetModel.getAllTweets();
        expect(tweets).toHaveLength(8);
        expect(deletedTweet).toHaveProperty("user_id", 3);
    });
});

describe('---------- CREATE TWEET ----------', () => {
    test('7 - create tweet', async () => {
        const createdTweet = await tweetModel.createTweet({tweetContent: "test"});
        expect(createdTweet.tweet_id).toBe(10);
        const tweets = await tweetModel.getAllTweets();
        expect(tweets).toHaveLength(10);
    });
});
