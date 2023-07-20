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

describe("********** USER **********", () => {
    beforeEach(async () => {
        userToken = (await request(server).post("/api/auth/login").send(user)).body.token;
    });
    afterEach(async ()=>{
        await request(server).get("/api/auth/logout").set({ Authorization: userToken })
    })
    describe('---------- GET ALL USERS ----------', () => {
        test('1 - can not get all users without login', async () => {
            const res = await request(server).get('/api/users');
            expect(res.body.message).toBe("Token bilgisi gereklidir!");
        });
    
        test('2 - users can get all users', async () => {
            const resBody = (await request(server).get('/api/users').set({Authorization: userToken})).body;
            expect(resBody).toHaveLength(5);
        });
    });
    
    describe('---------- FIND USER WITH TWEETS BY USER ID ----------', () => {
        test('3 - users can get user with tweets', async () => {
            const resBody = (await request(server).get('/api/users/tweets/1').set({Authorization: userToken})).body;
            expect(resBody).toHaveProperty("tweets");
            expect(resBody.userName).toBe("İhsan");
            expect(resBody.tweets).toHaveLength(3);
    
        });
    });
    
    describe('---------- FIND USER BY USER ID ----------', () => {
        test('4 - users can get user', async () => {
            const resBody = (await request(server).get('/api/users/2').set({Authorization: userToken})).body;
            expect(resBody.userName).toBe("Aytaç");
        });
    });
    
    describe('---------- UPDATE USER BY USER ID ----------', () => {
        const updateBody = {
            nickName: "storaman2",
            userName: "Serkan2",
            userSurname: "Toraman2"};
        test('5 - users can not update another users', async () => {
            const resBody = (await request(server).put('/api/users/4').send(updateBody).set({Authorization: userToken})).body;
            expect(resBody.message).toBe("Yetkiniz yok!");
        });
    
        test('6 - users can update his/her own information', async () => {
            const resBody = (await request(server).put('/api/users/3').send(updateBody).set({Authorization: userToken})).body;
            expect(resBody.userEmail).toBe("storaman@gmail.com");
            const updatedUser = (await request(server).get("/api/users/3").set({Authorization: userToken})).body
            expect(updatedUser.nickName).toBe("storaman2")
        });
    });
    
    describe('---------- DELETE USER BY USER ID ----------', () => {
        test('7 - users can not delete another user', async () => {
            const resBody = (await request(server).delete('/api/users/4').set({Authorization: userToken})).body;
            expect(resBody.message).toBe("Yetkiniz yok!");
        });
    
        test('8 - users can delete his/her own user', async () => {
            const resBody = (await request(server).delete('/api/users/3').set({Authorization: userToken})).body;
            expect(resBody.userEmail).toBe("storaman@gmail.com");
            const users = (await request(server).get("/api/users").set({Authorization: userToken})).body
            expect(users).toHaveLength(4)
        });
    });
})

describe("********** ADMIN **********", () => {
    beforeEach(async () => {
        admintoken = (await request(server).post("/api/auth/login").send(admin)).body.token;
    });
    afterEach(async ()=>{
        await request(server).get("/api/auth/logout").set({ Authorization: admintoken })
    })
    
    describe('---------- UPDATE USER BY USER ID ----------', () => {
        const updateBody = {
            nickName: "storaman2",
            userName: "Serkan2",
            userSurname: "Toraman2"};
        test("9 - admin can update users' information", async () => {
            const resBody = (await request(server).put('/api/users/3').send(updateBody).set({Authorization: admintoken})).body;
            expect(resBody.userEmail).toBe("storaman@gmail.com");
            const updatedUser = (await request(server).get("/api/users/3").set({Authorization: admintoken})).body
            expect(updatedUser.nickName).toBe("storaman2")
        });
    });
    
    describe('---------- DELETE USER BY USER ID ----------', () => {
        test("10 - admin can delete users", async () => {
            const resBody = (await request(server).delete('/api/users/3').set({Authorization: admintoken})).body;
            expect(resBody.userEmail).toBe("storaman@gmail.com");
            const users = (await request(server).get("/api/users").set({Authorization: admintoken})).body
            expect(users).toHaveLength(4)
        });
    });
})