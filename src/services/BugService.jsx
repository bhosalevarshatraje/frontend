import axios from 'axios';

const BUG_API_BASE_URL = "http://18.117.66.148:6060/api/bugs";

class BugService{
   viewAllBugs()
   {
        return axios.get(BUG_API_BASE_URL);

     }

   
   
}

export default new BugService()



