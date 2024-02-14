const express = require('express')
const parser = require('body-parser')
const cookieParser = require('cookie-parser')
const authRouter = require('./Routes/authentication')
const dbRouter = require('./Database/models')
const groceriesRouter = require('./Routes/groceries')

const app = express();
const PORT = 3000
app.use(parser.json());
app.use(cookieParser());
app.use(express.json());

app.use(parser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
})

app.use('/auth', authRouter)
app.use('/db', dbRouter)
app.use('/cart', groceriesRouter)

app.listen(PORT)

