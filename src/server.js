const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const session = require('express-session')



const connectDB = require('./configs/configDB')
const configViewEngine = require('./configs/configViewEngine')
const routes = require('./routes/index')

const app = express();
const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use(session({
  
    // It holds the secret key for session
    secret: 'Your_Secret_Key',
  
    // Forces the session to be saved
    // back to the session store
    resave: true,
  
    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}))

app.use('/user', express.static(path.join(__dirname, 'public')))

configViewEngine(app);
connectDB()

routes(app)

app.listen(port, () => console.log('Server is running on port ' + port))