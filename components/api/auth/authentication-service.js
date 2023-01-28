import axios from "axios";

const API_URL = "http://localhost:8080";

class AuthenticationService {

    createJwt(token) {
        return 'Bearer ' + token;
    }

    async executeJwtAuthenticationService(email, password) {
        return axios.post(`${API_URL}/api/login`, JSON.stringify({
            email,
            password
        }), {
            headers: {
                'Context-Type': 'application/json',
                withCredentials: true
            }
        });
    }

    registerSuccessfulLoginForJwt(token) {
        localStorage.setItem("access_token", token);
        this.setupAxiosInterceptors(this.createJwt(token));
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }

    isUserLoggedIn() {
        let token = localStorage.getItem("access_token");
        return token !== null;
    }
}

export default new AuthenticationService;