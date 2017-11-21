import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jwt-simple'

import config from './config/config'
import datasource from './config/datasource'
import authorization from './auth'

const app = express();
app.config = config;
app.datasource = datasource(app);

app.use(bodyParser.json());
const auth = authorization(app);

app.use(auth.initialize());
app.auth = auth;

const Users = app.datasource.models.Users;

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

export default app;