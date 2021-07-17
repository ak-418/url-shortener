const db = require('./database');
const testData = {
    from: 'asdf1234test',
    to: "https://google.com"
};

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create redirection', async () => {
    expect.assertions(1);
    const redirection = await db.Redirection.create({
        from: testData.from,
        to: testData.to,
    });
    expect(redirection.from).toEqual('asdf1234test');
});

test('get redirection', async () => {
    expect.assertions(2);
    const redirection = await db.Redirection.findOne({ where: { from: testData.from } });
    expect(redirection.from).toEqual(testData.from);
    expect(redirection.to).toEqual(testData.to);
});

test('delete redirection', async () => {
    expect.assertions(1);
    await db.Redirection.destroy({
        where: {
            from: testData.from,
        }
    });
    const redirection = await db.Redirection.findOne({ where: { from: testData.from } });
    expect(redirection).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});