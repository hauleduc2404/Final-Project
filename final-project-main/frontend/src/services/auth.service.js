import axios from 'axios';
import CommonFn from '@/common/commonFunction'


const API_URL = window.BASE_API + 'users/';

class AuthService {
  login(user) {
    return axios
        .post(API_URL + 'login', {
            email: user.email,
            password: user.password
        })
      .then(response => {
          if (response.data) {
              CommonFn.setLocalStorage('accessToken', JSON.stringify(response.data.accessToken))
              CommonFn.setLocalStorage('userInfo', JSON.stringify(response.data.userInfo))
          }

        return response.data;
      });
  }

  logout() {
    CommonFn.removeLocalStorage('userInfo')
    CommonFn.removeLocalStorage('accessToken')
  }

  register(user) {
    return axios.post(API_URL + 'register', {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        password2: user.password2
    });
  }
}

export default new AuthService();
