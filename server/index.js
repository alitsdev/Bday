const Express = require('express');
const cors = require('cors');
const router = require('./router');
const conf = require('./config');

const app = new Express();

const port = conf.port;

app.use(cors());
app.use(Express.json());
app.use(router);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
