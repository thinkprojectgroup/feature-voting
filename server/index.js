const express = require('express');
require("express-async-errors") //TODO: move to logging middleware

require('./startup/db')()
require('./startup/joivalidation')()
const port = 3000
const app = express();

require('./startup/routes')(app);

app.listen(port , () => {
    console.log(`listening on port ${port}`)
})

