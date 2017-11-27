export default app => {
    const Add = app.datasource.models.Add;

    function findExist(numbers) {
        return Add.findOne({ where: { x: numbers.x, y: numbers.y } });
    }


    app.route('/add')
        .post((req, res) => {
            console.log('requesting from ', req.origin)

            var numbersPromise = findExist(req.body);

            numbersPromise.then(addResult => {
                if (addResult) {
                    res.status(200)
                    res.json(addResult);
                } else {
                    addResult = {
                        result: req.body.x + req.body.y,
                        x: req.body.x,
                        y: req.body.y
                    };

                    Add.create(addResult)
                        .then(result => {
                            res.status(201)
                            res.json(result);
                        })
                        .catch(err => {
                            res.status(400)
                            res.json(err);
                        })
                }
            })
        })
        .get((req, res) => {
            Add.findAll({})
                .then(result => {
                    res.status(200)
                    res.json(result)
                })
                .catch(err => {
                    res.status(400)
                    res.json(err)
                })
        })


    app.route('/add/:id')
        .get((req, res) => {
            Add.findOne({ where: req.params })
                .then(result => {
                    res.status(200)
                    res.json(result)
                })
                .catch(err => {
                    res.status(400)
                    res.json(err)
                })
        })
}
