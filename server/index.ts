import Express, { Application } from 'express';
import cors from 'cors';
import router from './router';
import conf from './config';

const app: Application = Express();

const port = conf.port;

app.use(cors());
app.use(Express.json());
app.use(router);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
