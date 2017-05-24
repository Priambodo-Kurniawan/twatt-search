const express = require('express')
const app = express()
var logger = require('morgan');
var OAuth = require('oauth');


const search = require('./routes/search');

app.use(logger('dev'));
// app.get('/', function(req, res){
//   res.send('live!')
// })
app.use('/', search)


app.listen(3000, ()=> {
  console.log('server is listening at port 3000')}
)
