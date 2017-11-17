import express from 'express'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());

app.route('/token')
    .post((req, res) => {

        if (req.body.email && req.body.password) {
            res.sendStatus(200)
        } else {
            res.sendStatus(401)
        }
    })

export default app;