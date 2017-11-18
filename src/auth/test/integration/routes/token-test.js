import jwt from 'jwt-simple'

describe('Route Token', () => {

    const defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'test@mail.com',
        password: 'test'
    };

    let token;

    beforeEach(done => {
        const Users = app.datasource.models.Users;
        Users
            .destroy({ where: {} })
            .then(() => Users.create({
                name: 'Admin',
                email: 'admin@mail.com',
                password: '123456'
            }))
        // .then(user => {
        //     Users.create(defaultUser)
        //         .then(() => {
        //             token = jwt.encode({ id: user.id }, app.config.jwtSecret)
        //         })
        // })

        done();
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
            email: 'admin@mail.com',
            password: '123456'
        }
        request
            .post('/token')
            .send(user)
            .end((err, res) => {
                console.log(22222222222, res.statusCode);
                expect(res.statusCode).to.be.eql(200);
                done();
            })
    })

})