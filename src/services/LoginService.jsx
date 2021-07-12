import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://18.117.66.148:6060/api/adminLogin";

class LoginService {

    validate(id,password)
    {
        return axios.get(EMPLOYEE_API_BASE_URL+ '/' + id + '/' + password);
    }
}

export default new LoginService()


