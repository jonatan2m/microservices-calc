import express from 'express'
import bodyParser from 'body-parser'
import config from './config/config'
import datasource from './config/datasource'
import routes from './routes'

const app = express();
app.config = config;
app.datasource = datasource(app);

app.use(bodyParser.json());

routes(app);

export default app;