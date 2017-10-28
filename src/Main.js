import axios from 'axios'
// import { key } from './config.js'
require('dotenv').config

export const lookUp = function(search) {
    return axios.get('http://food2fork.com/api/search?key=' + process.env.APIKEY + '&q=' + search)
    
    
        
     
     
     

        
}



