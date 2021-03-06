export default app => {
    const Services = app.datasource.models.Services;

    function validateService(service) {
        if (service.name
            && service.url
            && service.endpoints
            && service.endpoints.values) {
            return Services.findOne({ where: { name: service.name } })
                .then(serviceFound => {
                    if (serviceFound) return false;

                    return true;
                })
        }

        return false;
    }

    app.route('/services')
        .post((req, res) => {
            console.log(`Service "${req.body.name}" asking for register`)

            if (validateService(req.body)) {
                Services.create(req.body)
                    .then(result => {
                        res.status(201)
                        res.json(result);
                        console.log(`Service "${result.name}" was registered`)
                    })
                    .catch(err => {
                        res.status(400)
                        res.json(err.errors
                            .reduce((before, item) => {
                                before += item.message;
                                return before;
                            }, ""));
                        console.log(`Service "${req.body.name}" can't registered`)
                    })
            }
            else
                res.sendStatus(400)
        })
        .get((req, res) => {
            Services.findAll({})
                .then(result => {
                    res.status(200)
                    res.json(result)
                })
                .catch(err => {
                    res.status(400)
                    res.json(err)
                })
        })


    app.route('/services/:name')
        .get((req, res) => {
            Services.findOne({ where: req.params })
                .then(result => {
                    res.status(200)
                    res.json(result)
                })
                .catch(err => {
                    res.status(400)
                    res.json(err)
                })
        })
        .put((req, res) => {
            Services.update(req.body, { where: req.params })
                .then(result => {
                    res.status(200)
                    res.json(result)
                })
                .catch(err => {
                    res.status(400)
                    res.json(err)
                })
        })
        .delete((req, res) => {
            console.log(`Service "${req.params.name}" asking for unregister`)
            Services.destroy({ where: req.params })
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