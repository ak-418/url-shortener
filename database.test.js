const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create redirection', async () => {
    expect.assertions(1);
    const redirection = await db.Redirection.create({
        id: 1,
        firstName: 'Bobbie',
        lastName: 'Draper'
    });
    expect(redirection.id).toEqual(1);
});

test('get redirection', async () => {
    expect.assertions(2);
    const redirection = await db.Redirection.findByPk(1);
    expect(redirection.firstName).toEqual('Bobbie');
    expect(redirection.lastName).toEqual('Draper');
});

test('delete redirection', async () => {
    expect.assertions(1);
    await db.Redirection.destroy({
        where: {
            id: 1
        }
    });
    const redirection = await db.Redirection.findByPk(1);
    expect(redirection).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});