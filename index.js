const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./startup/db')()
const port = 3000
const app = express();

require('./startup/routes')(app);

app.listen(port , () => {
    console.log(`listening on port ${port}`)
})

