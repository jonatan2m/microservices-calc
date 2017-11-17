describe('Route Token', () => {

    beforeEach(done => {
        done();
    })

    it('should return 401 when the credential is invalid', done => {

        request
            .post('/token')
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

})