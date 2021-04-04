/* 
this is code snippets for express server
 you can run and test this server my using node app.js
if you are using nodemon then just use npm start
*/


// this is express package to get the server running
const express = require('express');
const app = express();
// this is body-parser for getting the res.body
const bodyParser = require('body-parser');
// including cors to give access for the cors policy
// read more form here: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const cors = require('cors');

// this is port u can change that port number currently it running at localhost:8000
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// this is home page for server
app.get('/', (req, res) => {
    res.send({
        messageFromServer: 'Hi! from the express server'
    })
})

app.listen(PORT, () => {
    console.log('server is running at: '+PORT);
})