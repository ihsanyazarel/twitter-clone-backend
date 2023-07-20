const server = require("../api/server");
const request = require("supertest");
const db = require("../data/data-config");

const admin = {password: "1234", nickName: "ihsanyazarel"}
const user = {password: "1234", nickName: "storaman"}
let userToken;
let admintoken;

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db.seed.run();
});

describe("********** USER **********", ()=> {
    beforeEach(async () => {
        userToken = (await request(server).post("/api/auth/login").send(user)).body.token;
    });
    afterEach(async ()=>{
        await request(server).get("/api/auth/logout").set({ Authorization: userToken })
    })
    describe('---------- GET ALL TWEETS ----------', () => {
        test('1 - users can not get all tweets', async () => {
            const resBody = (await request(server).get('/api/tweets').set({Authorization: userToken})).body;
            expect(resBody.message).toBe("Yetkiniz yok!");
        });
    });
    
    describe('---------- FIND TWEET BY TWEET ID ----------', () => {
        test('2 - users can get tweet', async () => {
            const resBody = (await request(server).get('/api/tweets/2').set({Authorization: userToken})).body;
            expect(resBody.tweetContent).toBe("Tweet-2 İhsan tarafından oluşturuldu.");
        });
    });
    
    describe('---------- GET TWEETS OF USER BY USER ID ----------', () => {
        test('3 - users can get tweets of a user', async () => {
            const resBody = (await request(server).get('/api/tweets/user/1').set({Authorization: userToken})).body;
            expect(resBody).toHaveLength(3);
            expect(resBody[0].user_id).toBe(1);
        });
    });
    
    describe("---------- GET TWEETS ON USER'S HOMEPAGE BY USER ID ----------", () => {
        test('4 - users can not get tweets of homepage of another user', async () => {
            const resBody = (await request(server).get('/api/tweets/home/1').set({Authorization: userToken})).body;
            expect(resBody.message).toBe("Yetkiniz yok!");
        });
        
        test('5 - users can get tweets of his/her homepage', async () => {
            const resBody = (await request(server).get('/api/tweets/home/3').set({Authorization: userToken})).body;
            expect(resBody).toHaveLength(7);
            expect(resBody[0].user_id).toBe(1);
        });
    });
    
    
    describe('---------- UPDATE TWEET BY TWEET ID ----------', () => {
        const updateBody = {tweetContent: "Test"};
        test("6 - users can not update another users' tweet", async () => {
            const resBody = (await request(server).put('/api/tweets/4').send(updateBody).set({Authorization: userToken})).body;
            expect(resBody.message).toBe("Yetkiniz yok!");
        });
    
        test('7 - users can update his/her own tweet', async () => {
            const resBody = (await request(server).put('/api/tweets/5').send(updateBody).set({Authorization: userToken})).body;
            expect(resBody.tweetContent).toBe("Test");
            expect(resBody.user_id).toBe(3);
            const updatedTweet = (await request(server).get("/api/tweets/5").set({Authorization: userToken})).body
            expect(updatedTweet.tweetContent).toBe("Test");
            expect(updatedTweet.user_id).toBe(3);
        });
    });
    
    describe('---------- DELETE TWEET BY TWEET ID ----------', () => {
        test("8 - users can not delete another user's tweet", async () => {
            const resBody = (await request(server).delete('/api/tweets/4').set({Authorization: userToken})).body;
            expect(resBody.message).toBe("Yetkiniz yok!");
        });
    
        test('9 - users can delete his/her own tweet', async () => {
            const resBody = (await request(server).delete('/api/tweets/5').set({Authorization: userToken})).body;
            expect(resBody.tweetContent).toBe("Tweet-5 Serkan tarafından oluşturuldu.");
            expect(resBody.user_id).toBe(3);
            admintoken = (await request(server).post("/api/auth/login").send(admin)).body.token;
            const tweets = (await request(server).get("/api/tweets").set({Authorization: admintoken})).body
            expect(tweets).toHaveLength(8)
            await request(server).get("/api/auth/logout").set({ Authorization: admintoken })
        });
    });
    
    describe('---------- CREATE TWEET ----------', () => {
        test("10 - users can create tweet", async () => {
            const createBody = {tweetContent: "Tweet-10 Serkan tarafından oluşturuldu."}
            const resBody = (await request(server).post('/api/tweets').send(createBody).set({Authorization: userToken})).body;
            expect(resBody.tweet_id).toBe(10);
            const tweet = (await request(server).get("/api/tweets/10").set({Authorization: userToken})).body;
            expect(tweet.user_id).toBe(3);
        });
    });
})

describe("********** ADMIN **********", ()=> {
    beforeEach(async () => {
        admintoken = (await request(server).post("/api/auth/login").send(admin)).body.token;
    });
    afterEach(async ()=>{
        await request(server).get("/api/auth/logout").set({ Authorization: admintoken })
    })
    describe('---------- GET ALL TWEETS ----------', () => { 
        test('11 - admin can get all tweets', async () => {
            const resBody = (await request(server).get('/api/tweets').set({Authorization: admintoken})).body;
            expect(resBody).toHaveLength(9);
        });
    });

    describe("---------- GET TWEETS ON USER'S HOMEPAGE BY USER ID ----------", () => {        
        test("12 - admin can get tweets of users' homepage", async () => {
            const resBody = (await request(server).get('/api/tweets/home/3').set({Authorization: admintoken})).body;
            expect(resBody).toHaveLength(7);
            expect(resBody[0].user_id).toBe(1);
        });
    });
    
    
    describe('---------- UPDATE TWEET BY TWEET ID ----------', () => {
        test("13 - admin can update tweets", async () => {
            const updateBody = {tweetContent: "Test"};
            const resBody = (await request(server).put('/api/tweets/4').send(updateBody).set({Authorization: admintoken})).body;
            expect(resBody.tweetContent).toBe("Test");
            expect(resBody.user_id).toBe(2);
            const updatedTweet = (await request(server).get("/api/tweets/4").set({Authorization: admintoken})).body
            expect(updatedTweet.tweetContent).toBe("Test");
            expect(updatedTweet.user_id).toBe(2);
        });
    });
    
    describe('---------- DELETE TWEET BY TWEET ID ----------', () => {    
        test("14 - admin can delete tweets", async () => {
            const resBody = (await request(server).delete('/api/tweets/3').set({Authorization: admintoken})).body;
            expect(resBody.tweetContent).toBe("Tweet-3 Aytaç tarafından oluşturuldu.");
            expect(resBody.user_id).toBe(2);
            const tweets = (await request(server).get("/api/tweets").set({Authorization: admintoken})).body
            expect(tweets).toHaveLength(8)
        });
    });
})
