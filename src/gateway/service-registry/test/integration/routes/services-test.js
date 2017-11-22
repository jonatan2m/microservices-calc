describe('Route Services', () => {
    const Services = app.datasource.models.Services;
    const defaultService = {
        name: 'add',
        url: '/add',
        endpoints: {
            values: [{
                type: 'http',
                url: 'localhost:4000/add'
            }]
        }
    };


    let token;

    beforeEach(done => {

        Services
            .destroy({ where: {} })
            .then(() => Services.create(defaultService))
            .then(service => {
                done();
            })
    })

    it('should not create a service with the same name', done => {
        const service = {
            name: 'add',
            url: '/my-service',
            endpoints: {
                values: [{
                    type: 'http',
                    url: 'localhost:4000/my-service'
                }]
            }
        }

        request
            .post('/services')
            .send(service)
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(400);
                done();
            })

    })

    it('should create a service', done => {
        const service = {
            name: 'my-service',
            url: '/my-service',
            endpoints: {
                values: [{
                    type: 'http',
                    url: 'localhost:4000/my-service'
                }]
            }
        }

        request
            .post('/services')
            .send(service)
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(201);
                done();
            })

    })

    it('should return a list of services', done => {
        request
            .get('/services')
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(200);
                expect(res.body[0].name).to.be.eql(defaultService.name);
                expect(res.body[0].url).to.be.eql(defaultService.url);
                done();
            })
    })

    it('should return a service', done => {

        request
            .get('/services/add')
            .end((err, res) => {
                expect(res.body.name).to.be.eql(defaultService.name);
                expect(res.body.url).to.be.eql(defaultService.url);
                expect(res.statusCode).to.be.eql(200);
                done(err);
            })
    })

    it('should update an user', done => {

        var serviceUpdated = {
            name: 'add',
            url: '/newUrl'
        }

        request
            .put('/services/add')
            .send(serviceUpdated)
            .end((err, res) => {
                expect(res.body).to.be.eql([1]);
                expect(res.statusCode).to.be.eql(200);
                done(err);
            })
    })

    it('should delete a service', done => {

        request
            .get('/services/add')
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(200);
                done(err);
            })
    })
})