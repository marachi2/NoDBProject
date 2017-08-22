import axios from 'axios'
import { key } from './config.js'

export const lookUp = function(search) {
    return axios.get('http://food2fork.com/api/search?key=' + key + '&q=' + search)
    
    
        
     
     
     

        
}



