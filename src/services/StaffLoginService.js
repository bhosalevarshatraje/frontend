import axios from 'axios'

const baseUrl = "http://18.117.66.148:6060/api/staffLogin";

class StaffLoginService {

    validate(id,password)
    {
        return axios.get(baseUrl+ '/'+ id + '/' + password);
    }

    getDetailsById(bugId)
    {
        return axios.get("http://18.117.66.148:6060/api/bugs/"+ bugId);
    }
}

export default new StaffLoginService()