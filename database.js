require('dotenv').config();
const mongoose = require('mongoose');
const assert =  require('assert');
const db_url = process.env.DB_URL;

//connect to database
//connection code
mongoose.connect(db_url,{
    useFindAndModify: false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true},    
function(error,link){
    //check error
    assert.equal(error,null,'db connection fail...')

    //ok
    console.log('DB connection successful...')
    console.log(link)
    }
)