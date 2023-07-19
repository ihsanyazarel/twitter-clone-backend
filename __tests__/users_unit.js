const db = require("../data/data-config");
const userModel = require("../api/users/users-model");


beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db.seed.run();
});

describe('---------- FIND USER BY KEY ----------', () => {
    test('1 - get user by nickName', async () => {
        const nickName = "ihsanyazarel";
        const user = await userModel.findUserByKey({nickName});
        expect(user.userEmail).toMatch(/ihsanyazarel@hotmail.com/i);
        expect(user).toHaveProperty("user_id", 1);
    });
    test('2 - get user by userEmail', async () => {
        const userEmail = "haytacsahin@gmail.com";
        const user = await userModel.findUserByKey({userEmail});
        expect(user.nickName).toMatch(/haytac/i);
        expect(user).toHaveProperty("user_id", 2);
    });
});

describe('---------- GET ALL USERS ----------', () => {
    test('3 - get all users', async () => {
        const users = await userModel.getAllUsers();
        expect(users).toHaveLength(5);
        expect(users[0]).not.toHaveProperty("password");
    });
});

describe('---------- GET USER BY ID ----------', () => {
    test('4 - get user by ID', async () => {
        const user = await userModel.getUserById(1);
        expect(user.userEmail).toMatch("ihsanyazarel@hotmail.com");
        expect(user.nickName).toMatch("ihsanyazarel");
        expect(user).not.toHaveProperty("password");
        expect(user).not.toHaveProperty("role");
    });
});

describe('---------- GET USER WITH TWEETS ----------', () => {
    test('5 - get user with tweets', async () => {
        const user = await userModel.getUserWithTweets(1);
        expect(user.userEmail).toMatch("ihsanyazarel@hotmail.com");
        expect(user.nickName).toMatch("ihsanyazarel");
        expect(user).toHaveProperty("tweets");
        expect(user.tweets).toHaveLength(3);
    });
});

describe('---------- UPDATE USER ----------', () => {
    test('6 - update user', async () => {
        const updatedUser =await userModel.updateUser(1, {
            nickName: "test",
            userName:"testName",
            userSurname: "testSurname",
            userEmail: "test@mail.com"
        });
        expect(updatedUser).toHaveProperty("nickName", "test");
        expect(updatedUser).toHaveProperty("userName", "testName");
        expect(updatedUser).toHaveProperty("userSurname", "testSurname");
        expect(updatedUser).toHaveProperty("userEmail", "test@mail.com");
    });
    test('7 - can not update user with same nickName existing on other users', async () => {
        try {
            await userModel.updateUser(1, {
                nickName: "haytac",
                userName:"testName",
                userSurname: "testSurname",
                userEmail: "test@mail.com"
            });
        } catch (err) {
            expect(err.message).toMatch(/unique constraint failed/i);
        }
    });
    test('8 - can not update user with same userEmail existing on other users', async () => {
        try {
            await userModel.updateUser(1, {
                nickName: "test",
                userName:"testName",
                userSurname: "testSurname",
                userEmail: "storaman@gmail.com"
            });
        } catch (err) {
            expect(err.message).toMatch(/unique constraint failed/i);
        }
    });
});

describe('---------- DELETE USER ----------', () => {
    test('9 - delete user', async () => {
        const deletedUser = await userModel.deleteUser(5);
        const users = await userModel.getAllUsers();
        expect(users).toHaveLength(4);
        expect(deletedUser).toHaveProperty("userName", "Ayşegül");
    });
    test('10 - can not delete user with a nonexist ID', async () => {
        const deletedUser = await userModel.deleteUser(7);
        expect(deletedUser).toBe(undefined);
    });
});
