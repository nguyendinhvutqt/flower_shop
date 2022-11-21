const express = require('express')

const connectDB = require('./configs/configDB')
const configViewEngine = require('./configs/configViewEngine')
const routes = require('./routes/index')

const app = express();
const port = 3001;

configViewEngine(app);
connectDB()

routes(app)

app.listen(port, () => console.log('Server is running on port ' + port))