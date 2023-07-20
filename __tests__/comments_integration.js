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
    describe('---------- GET ALL COMMENTS ----------', () => {
        test('1 - users can not get all comments', async () => {
            const resBody = (await request(server).get('/api/comments').set({Authorization: userToken})).body;
            expect(resBody.message).toBe("Yetkiniz yok!");
        });
    });
    
    describe('---------- GET COMMENT BY COMMENT ID ----------', () => {
        test('2 - users can get comment', async () => {
            const resBody = (await request(server).get('/api/comments/2').set({Authorization: userToken})).body;
            expect(resBody.commentContent).toBe("comment 2");
        });
    });
    
    describe('---------- GET COMMENTS OF TWEET BY TWEET ID ----------', () => {
        test('3 - users can get comments of a tweet', async () => {
            const resBody = (await request(server).get('/api/comments/tweet/1').set({Authorization: userToken})).body;
            expect(resBody).toHaveLength(2);
            expect(resBody[0].tweet_id).toBe(1);
        });
    });
    
    
    describe('---------- UPDATE COMMENT BY COMMENT ID ----------', () => {
        const updateBody = {commentContent: "Test"};
        test("4 - users can not update another users' comment", async () => {
            const resBody = (await request(server).put('/api/comments/4').send(updateBody).set({Authorization: userToken})).body;
            expect(resBody.message).toBe("Yetkiniz yok!");
        });
    
        test('5 - users can update his/her own tweet', async () => {
            const resBody = (await request(server).put('/api/comments/9').send(updateBody).set({Authorization: userToken})).body;
            expect(resBody.commentContent).toBe("Test");
            expect(resBody.user_id).toBe(3);
            const updatedComment = (await request(server).get("/api/comments/9").set({Authorization: userToken})).body
            expect(updatedComment.commentContent).toBe("Test");
            expect(updatedComment.user_id).toBe(3);
        });
    });
    
    describe('---------- DELETE COMMENT BY COMMENT ID ----------', () => {
        test("6 - users can not delete another user's comment", async () => {
            const resBody = (await request(server).delete('/api/comments/4').set({Authorization: userToken})).body;
            expect(resBody.message).toBe("Yetkiniz yok!");
        });
    
        test('7 - users can delete his/her own comment', async () => {
            const resBody = (await request(server).delete('/api/comments/9').set({Authorization: userToken})).body;
            expect(resBody.commentContent).toBe("comment 9");
            expect(resBody.user_id).toBe(3);
            admintoken = (await request(server).post("/api/auth/login").send(admin)).body.token;
            const tweets = (await request(server).get("/api/comments").set({Authorization: admintoken})).body
            expect(tweets).toHaveLength(8)
            await request(server).get("/api/auth/logout").set({ Authorization: admintoken })
        });
    });
    
    describe('---------- CREATE COMMENT WITH TWEET ID----------', () => {
        test("8 - users can create comment", async () => {
            const createBody = {commentContent: "comment 10"}
            const resBody = (await request(server).post('/api/comments/1').send(createBody).set({Authorization: userToken})).body;
            expect(resBody.comment_id).toBe(10);
            const comment = (await request(server).get("/api/comments/10").set({Authorization: userToken})).body;
            expect(comment.user_id).toBe(3);
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
    describe('---------- GET ALL COMMENTS ----------', () => { 
        test('9 - admin can get all comments', async () => {
            const resBody = (await request(server).get('/api/comments').set({Authorization: admintoken})).body;
            expect(resBody).toHaveLength(9);
        });
    });   
    
    describe('---------- UPDATE COMMENT BY COMMENT ID ----------', () => {
        test("10 - admin can update comments", async () => {
            const updateBody = {commentContent: "Test"};
            const resBody = (await request(server).put('/api/comments/4').send(updateBody).set({Authorization: admintoken})).body;
            expect(resBody.commentContent).toBe("Test");
            expect(resBody.user_id).toBe(2);
            const updatedComment = (await request(server).get("/api/comments/4").set({Authorization: admintoken})).body
            expect(updatedComment.commentContent).toBe("Test");
            expect(updatedComment.user_id).toBe(2);
        });
    });
    
    describe('---------- DELETE Comment BY Comment ID ----------', () => {    
        test("11 - admin can delete comments", async () => {
            const resBody = (await request(server).delete('/api/comments/3').set({Authorization: admintoken})).body;
            expect(resBody.commentContent).toBe("comment 3");
            expect(resBody.user_id).toBe(2);
            const tweets = (await request(server).get("/api/comments").set({Authorization: admintoken})).body
            expect(tweets).toHaveLength(8)
        });
    });
})
