import jwt from 'jwt-simple'
import http from 'http'

export default app => {
    const Users = app.datasource.models.Users;
    const auth = app.auth;

    app.route('/token')
        .post((req, res) => {
            if (req.body.email && req.body.password) {
                const email = req.body.email;
                const password = req.body.password;

                Users.findOne({ where: { email } })
                    .then(user => {
                        if (Users.isPassword(user.password, password)) {
                            const payload = { id: user.id };
                            res.json({
                                token: jwt.encode(payload, app.config.jwtSecret)
                            })
                        } else {
                            res.sendStatus(401);
                        }
                    })
                    .catch((err) => res.sendStatus(401));

            } else {
                res.sendStatus(401);
            }
        })


    app.route('/users')
        .all(auth.authenticate())
        .post((req, res) => {
            Users.create(req.body)
                .then(result => {
                    res.status(201);
                    res.json(result);
                })
                .catch((err) => {
                    res.status(400);
                    res.json(err);
                })
        })
        .get((req, res) => {
            Users.findAll({})
                .then(result => {
                    res.status(200);
                    res.json(result);
                })
                .catch(err => {
                    res.status(400);
                    res.json(err);
                })
        })

    app.route('/users/:id')
        .get((req, res) => {
            Users.findOne({ where: req.params })
                .then(user => {
                    res.status(200)
                    res.json(user)
                })
                .catch(err => {
                    res.status(400)
                    res.json(err)
                })
        })
        .put((req, res) => {
            Users.update(req.body, { where: req.params })
                .then(user => {
                    res.status(200)
                    res.json(user)
                })
                .catch(err => {
                    res.status(400)
                    res.json(err)
                })
        })

    app.route("/*")
        .all((req, res) => {
            console.log(req.params, req.method);
            let Routes = [];

            const serviceRegistry = {
                url: '127.0.0.1',
                path: '/services',
                port: 3001,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            let serviceRegistryPromise = new Promise((resolve, reject) => {
                let request = http.request(serviceRegistry, serviceRegistryResponse => {
                    var data = "";
                    serviceRegistryResponse.on('data', chunk => {
                        data += chunk;
                    })

                    serviceRegistryResponse.on('end', err => {
                        Routes = JSON.parse(data);

                        if (serviceRegistryResponse.statusCode === 400) {
                            console.log(err, 'request failed');
                            reject('An error occured');
                        } else {

                            let urlParts = req.params['0'].split('/');
                            let service = Routes.find((item) => {
                                return item.url.indexOf(`/${urlParts[0]}` !== -1);
                            });
                            resolve(service);
                        }
                        console.log(Routes);
                    })
                })
                request.end();
            })

            serviceRegistryPromise
                .then(service => {

                    var promises = [];

                    service.endpoints.values.forEach(item => {
                        if (item.type === 'http') {

                            let clientOpts = {
                                method: req.method,
                                headers: req.headers,
                                ...item
                            };
                            console.log("URL", item.url);

                            promises.push(new Promise((resolve, reject) => {
                                let clientReq = http.request(clientOpts, clientRes => {
                                    console.log('executing request')
                                    var data = "";
                                    clientRes.on('data', chunk => {
                                        data += chunk;
                                    })
                                    clientRes.on('end', err => {
                                        resolve(JSON.parse(data));
                                    });
                                })

                                let body = JSON.stringify(req.body);
                                clientReq.write(new Buffer(body))
                                clientReq.end();
                            }));
                        }
                    })
                    return Promise.all(promises);
                })
                .catch(err => {
                    console.log('ERRO', err);
                    res.sendStatus(400);
                })
                .then(data => {
                    data.forEach(item => console.log(item.result));
                    res.json(data[0])
                    res.status(200);
                })
        })
}