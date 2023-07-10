const db = require("../../data/data-config");

const findUserByKey = (key, value) => {
    return db("Users").where(key, value).first();
}

module.exports = {
    findUserByKey,
}