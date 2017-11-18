describe('Route Users', () => {

    const defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'test@mail.com',
        password: 'test'
    };

    // beforeEach(done => {
    //     const Users = app.datasource.models.Users;
    //     Users
    //         .destroy({ where: {} })
    //         .then(() => Users.create(defaultUser))
    //         .then(() => {
    //             done();
    //         })
    // })

    it('should not create an user without password', done => {
        const user = {
            name: 'User Test 1',
            email: 'user1@mail.com'
        }

        request
            .post('/users')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(400);
                done();
            })
    })

    it('should create an user', done => {
        const user = {
            id: 10,
            name: 'User Test 1',
            email: 'user1@mail.com',
            password: '12'
        }

        request
            .post('/users')
            .send(user)
            .end((err, res) => {
                expect(res.body.id).to.be.eql(user.id);
                expect(res.body.name).to.be.eql(user.name);
                expect(res.body.email).to.be.eql(user.email);
                expect(res.statusCode).to.be.eql(201);
                done();
            })
    })
})