import axios from 'axios';


const STAFF_API_BASE_URL = 'http://18.117.66.148:6060/api'

class StaffService {
    getStaffs(){
        return axios.get(STAFF_API_BASE_URL + "/staffs");
    }

    addStaff(staff){
        return axios.post(STAFF_API_BASE_URL + "/addStaff", staff);
    }

    getStaffById(staffId){
        return axios.get(STAFF_API_BASE_URL + "/staffs/" + staffId);
    }

    updateStaff(staff, staffId){
        return axios.put(STAFF_API_BASE_URL + "/updateStaff/" + staffId, staff);
    }

    deleteStaff(staffId){
        return axios.delete(STAFF_API_BASE_URL + "/deleteStaff/" + staffId);
    }
}

export default new StaffService()