const { createClient } = require('redis');

const client = createClient({
    password: 't2IY65MRfpZO1GO8wKKcVoqFpYO9k2LZ',
    socket: {
        host: 'redis-16975.c1.us-west-2-2.ec2.cloud.redislabs.com',
        port: 16975
    }
});

client.on('connect', () => {
    console.log('Redis client connected...');
});
client.on('error', (err) => {
    console.log('Error in Redis client...' + err);
});


async function getToken(token) {
    await client.connect();
    const tokenInDb = await client.get(token);
    await client.disconnect();
    return tokenInDb;
};

async function setToken(token) {
    await client.connect();
    await client.set(token, 1, {EX: 60 * 60});
    await client.disconnect();
};

async function deleteToken(token) {
    await client.connect();
    await client.del(token);
    await client.disconnect();
};


module.exports = {
    getToken,
    setToken,
    deleteToken,
};