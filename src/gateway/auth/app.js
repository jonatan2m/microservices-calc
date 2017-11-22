import express from 'express'
import bodyParser from 'body-parser'
import config from './config/config'
import datasource from './config/datasource'
import authorization from './auth'
import routes from './routes'

const app = express();
app.config = config;
app.datasource = datasource(app);

app.use(bodyParser.json());
const auth = authorization(app);

app.use(auth.initialize());
app.auth = auth;

routes(app);

export default app;