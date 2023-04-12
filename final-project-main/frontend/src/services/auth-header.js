import CommonFn from '@/common/commonFunction'
export default function authHeader() {
    let user = JSON.parse(CommonFn.getLocalStorage('userInfo'));
    let accessToken = JSON.parse(CommonFn.getLocalStorage('accessToken'));

    if (user) {
        // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        return { 'x-access-token': accessToken, 'Content-Type': 'application/json' };       // for Node.js Express back-end
    } else {
        return {'Content-Type': 'application/json' };
    }
}
