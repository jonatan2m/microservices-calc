import jwt from 'jwt-simple'

describe('Route Users', () => {
    const Users = app.datasource.models.Users;
    const defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'test@mail.com',
        password: 'test'
    };


    let token;

    beforeEach(done => {

        Users
            .destroy({ where: {} })
            .then(() => Users.create({
                name: 'Admin',
                email: 'admin@mail.com',
                password: '123456'
            }))
            .then(user => {
                Users.create(defaultUser)
                    .then(() => {
                        token = jwt.encode({ id: user.id }, app.config.jwtSecret)
                        done();
                    })
            })

    })



    it('should not create an user without password', done => {
        const user = {
            name: 'User Test 1',
            email: 'user1@mail.com'
        }

        request
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
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
            //.set('Authorization', `Bearer ${token}`)
            .send(user)
            .end((err, res) => {
                expect(res.body.id).to.be.eql(user.id);
                expect(res.body.name).to.be.eql(user.name);
                expect(res.body.email).to.be.eql(user.email);
                expect(res.statusCode).to.be.eql(201);
                done();
            })
    })

    it('should return a list of users', done => {
        request
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(200);
                expect(res.body[0].id).to.be.eql(defaultUser.id);
                expect(res.body[0].name).to.be.eql(defaultUser.name);
                expect(res.body[0].email).to.be.eql(defaultUser.email);
                done();
            })
    })

    it('should return an user', done => {

        request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.body.id).to.be.eql(defaultUser.id);
                expect(res.body.name).to.be.eql(defaultUser.name);
                expect(res.body.email).to.be.eql(defaultUser.email);
                expect(res.statusCode).to.be.eql(200);
                done(err);
            })
    })

    it('should update an user', done => {

        var userUpdated = {
            id: 1,
            name: 'New Name'
        }

        request
            .put('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .send(userUpdated)
            .end((err, res) => {
                expect(res.body).to.be.eql([1]);
                expect(res.statusCode).to.be.eql(200);
                done(err);
            })
    })
})