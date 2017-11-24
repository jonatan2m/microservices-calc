describe('Route Add Service', () => {
    const Add = app.datasource.models.Add;
    const defaultAddService = {
        id: 1,
        x: 2,
        y: 3,
        result: 5
    };

    beforeEach(done => {

        Add
            .destroy({ where: {} })
            .then(() => Add.create(defaultAddService))
            .then(() => {
                done();
            })
    })

    it('should not create an exist add operation, just return result', done => {
        const add = {
            x: 2,
            y: 3,
        }

        request
            .post('/add')
            .send(add)
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(200);
                expect(res.body.id).to.be.eql(defaultAddService.id);
                done();
            })

    })

    it('should create an add operation', done => {
        const add = {
            x: 3,
            y: 3,
        }

        request
            .post('/add')
            .send(add)
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(201);
                expect(res.body.x).to.be.eql(3);
                expect(res.body.y).to.be.eql(3);
                expect(res.body.result).to.be.eql(6);
                done();
            })

    })

    it('should return a list of add operations', done => {
        request
            .get('/add')
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(200);
                expect(res.body[0].id).to.be.eql(defaultAddService.id);
                done();
            })
    })

    it('should return an add operation by id', done => {

        request
            .get('/add/1')
            .end((err, res) => {
                expect(res.body.id).to.be.eql(defaultAddService.id);
                expect(res.statusCode).to.be.eql(200);
                done(err);
            })
    })
})