const server = require("../api/server");
const request = require("supertest");
const db = require("../data/data-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

describe("---------- LOGIN ----------", () => {
  test("1 - user can login with nickName", async () => {
    const body = { password: "1234", nickName: "ihsanyazarel" };
    const res = await request(server).post("/api/auth/login").send(body);
    expect(res.body.message).toBe(
      "Hoşgeldin İhsan, kullanıcı girişi başarılı."
    );
    const tokenSecret = res.body.token.split(".")[2];
    const tokenSecretDb = await db("TokenList")
      .where("token", tokenSecret)
      .first();
    expect(tokenSecret).toBe(tokenSecretDb.token);
  });

  test("2 - user can login with userEmail", async () => {
    const body = { password: "1234", userEmail: "ihsanyazarel@hotmail.com" };
    const res = await request(server).post("/api/auth/login").send(body);
    expect(res.body.message).toBe(
      "Hoşgeldin İhsan, kullanıcı girişi başarılı."
    );
    const tokenSecret = res.body.token.split(".")[2];
    const tokenSecretDb = await db("TokenList")
      .where("token", tokenSecret)
      .first();
    expect(tokenSecret).toBe(tokenSecretDb.token);
  });

  test("3 - user can not login with wrong password", async () => {
    const body = { password: "12345", nickName: "ihsanyazarel" };
    const res = await request(server).post("/api/auth/login").send(body);
    expect(res.body.message).toBe("Kullanıcı adı veya şifre hatalı!");
  });

  test("4 - user can not login with wrong nickName", async () => {
    const body = { password: "1234", nickName: "ihsan" };
    const res = await request(server).post("/api/auth/login").send(body);
    expect(res.body.message).toBe("Kullanıcı adı veya şifre hatalı!");
  });

  test("5 - user can not login with wrong userEmail", async () => {
    const body = { password: "1234", userEmail: "ihsan@hotmail.com" };
    const res = await request(server).post("/api/auth/login").send(body);
    expect(res.body.message).toBe("Kullanıcı adı veya şifre hatalı!");
  });
});

describe("---------- LOGOUT ----------", () => {
  test("6 - user can not logout without token", async () => {
    const res = await request(server).get("/api/auth/logout");
    expect(res.body.message).toBe("Token bilgisi gereklidir!");
  });

  test("7 - user can logout", async () => {
    const body = { password: "1234", nickName: "ihsanyazarel" };
    const resLogin = await request(server).post("/api/auth/login").send(body);
    const token = resLogin.body.token;
    const resLogout = await request(server).get("/api/auth/logout").set({ Authorization: token });
    expect(resLogout.body.message).toBe("Logout başarılı");
  });
});

describe("---------- REGISTER ----------", () => {
  test("8 - register new user", async () => {
    const newUser = {
      nickName: "test",
      password: "1234",
      userEmail: "test@mail.com",
      userName: "testName",
      userSurname: "testSurname",
      secretQuestion: "Secret Question: Secret Answer",
    };
    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.body.message).toBe("Kullanıcı başarı ile kaydedildi...");
    const userInDb = await db("Users")
      .where("nickName", newUser.nickName)
      .first();
    expect(userInDb.userEmail).toBe(newUser.userEmail);
    expect(userInDb.password).not.toBe(newUser.password);
  });

  test("9 - register fails with missing information", async () => {
    const newUser1 = {
      password: "1234",
      userEmail: "test@mail.com",
      userName: "testName",
      userSurname: "testSurname",
      secretQuestion: "Secret Question: Secret Answer",
    };
    const newUser2 = {
      nickName: "test",
      userEmail: "test@mail.com",
      userName: "testName",
      userSurname: "testSurname",
      secretQuestion: "Secret Question: Secret Answer",
    };
    const newUser3 = {
      nickName: "test",
      password: "1234",
      userName: "testName",
      userSurname: "testSurname",
      secretQuestion: "Secret Question: Secret Answer",
    };
    const newUser4 = {
      nickName: "test",
      password: "1234",
      userEmail: "test@mail.com",
      userSurname: "testSurname",
      secretQuestion: "Secret Question: Secret Answer",
    };
    const newUser5 = {
      nickName: "test",
      password: "1234",
      userEmail: "test@mail.com",
      userName: "testName",
      secretQuestion: "Secret Question: Secret Answer",
    };
    const newUser6 = {
      nickName: "test",
      password: "1234",
      userEmail: "test@mail.com",
      userName: "testName",
      userSurname: "testSurname",
    };
    const res1BodyMessage = (await request(server).post("/api/auth/register").send(newUser1)).body.message;
    const res2BodyMessage = (await request(server).post("/api/auth/register").send(newUser2)).body.message;
    const res3BodyMessage = (await request(server).post("/api/auth/register").send(newUser3)).body.message
    const res4BodyMessage = (await request(server).post("/api/auth/register").send(newUser4)).body.message
    const res5BodyMessage = (await request(server).post("/api/auth/register").send(newUser5)).body.message
    const res6BodyMessage = (await request(server).post("/api/auth/register").send(newUser6)).body.message
    expect(res1BodyMessage).toBe("Kullanıcı bilgileri eksiksiz girilmelidir!");
    expect(res2BodyMessage).toBe("Kullanıcı bilgileri eksiksiz girilmelidir!");
    expect(res3BodyMessage).toBe("Kullanıcı bilgileri eksiksiz girilmelidir!");
    expect(res4BodyMessage).toBe("Kullanıcı bilgileri eksiksiz girilmelidir!");
    expect(res5BodyMessage).toBe("Kullanıcı bilgileri eksiksiz girilmelidir!");
    expect(res6BodyMessage).toBe("Kullanıcı bilgileri eksiksiz girilmelidir!");
  });
});

describe("---------- RESET PASSWORD ----------", () => {
    test("10 - user can reset password with secret question", async () => {
        const resetBody = {
            password: "12345",
            userEmail: "ihsanyazarel@hotmail.com", 
            secretQuestion: "Secret Question: Secret Answer"
            }
        const res = await request(server).post("/api/auth/password/reset").send(resetBody);
        expect(res.body.message).toBe("Şifre başarılı bir şekilde değiştirilmiştir...");

        const wrongLoginBody = { password: "1234", nickName: "ihsanyazarel" };
        const resLogin1 = await request(server).post("/api/auth/login").send(wrongLoginBody);
        expect(resLogin1.body.message).toBe(
          "Kullanıcı adı veya şifre hatalı!"
        );

        const correctLoginBody = { password: "12345", nickName: "ihsanyazarel" };
        const resLogin2 = await request(server).post("/api/auth/login").send(correctLoginBody);
        expect(resLogin2.body.message).toBe(
          "Hoşgeldin İhsan, kullanıcı girişi başarılı."
        );
    });
});