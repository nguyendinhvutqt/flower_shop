const express = require('express')

const routes = require('./routes/index')

const app = express();
const port = 3001;

routes(app)

app.listen(port, () => console.log('Server is running on port ' + port))