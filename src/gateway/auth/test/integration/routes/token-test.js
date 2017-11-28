describe('Route Token', () => {
    const Users = app.datasource.models.Users;
    const defaultUser = {
        id: 2,
        name: 'Default User',
        email: 'test@mail.com',
        password: 'test'
    };

    beforeEach(done => {

        Users
            .destroy({ where: {} })
            .then(() => Users.create(defaultUser))
            .then(() => {
                done();
            })
    })

    it('should return 401 when the credential is invalid', done => {

        const user = {
            email: 'test@mail.com',
            password: ''
        }

        request
            .post('/token')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(401);
                done();
            })
    })

    it('should return 200 when the credential is valid', done => {
        const user = {
            email: 'test@mail.com',
            password: 'test'
        }
        request
            .post('/token')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(200);
                done();
            })
    })

    it('TEMP', done => {
        const user = {
            email: 'test@mail.com',
            password: 'test'
        }

        request
            .post('/token')
            .send(user)
            .end((err, res) => {
                console.log('TOKEN', res.body.token)
                request
                    .post('/add')
                    .set('Authorization', `Bearer ${res.body.token}`)
                    .send({
                        x: 2,
                        y: 3
                    })
                    .end((err, res) => {
                        expect(res.statusCode).to.be.eql(200);
                        expect(res.body.result).to.be.eql(5);
                        done();
                    })
            })

    })


})