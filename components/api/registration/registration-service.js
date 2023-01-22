import axios from "axios";

const API_URL = "http://localhost:8080";

class RegistrationService {

    async executeRegistrationService(userDetails) {
        return axios.post(`${API_URL}/api/user/registration`, userDetails);
    }

}

export default new RegistrationService;