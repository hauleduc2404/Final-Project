import axios from 'axios';
import authHeader from './auth-header';

const API_URL = window.BASE_API + 'categories/';

class CategoryService {
  getCategories() {
        return axios.get(API_URL, { headers: authHeader() }).then(res => res.data);
    }

    getCategory(categoryId) {
        return axios.get(API_URL + categoryId, { headers: authHeader() });
    }

    getCoursesByCategory(categoryId) {
        return axios.get(API_URL + categoryId + '/courses', { headers: authHeader() }).then(res => {
            return res.data
        });
    }

    addCourseToCategory(categoryId, courseId) {
        return axios.post(API_URL + categoryId + '/courses/' + courseId, {headers: authHeader()});
    }

    postCategory(category) {
        return axios.post(API_URL, { headers: authHeader(), body: category });
    }

    updateCategory(categoryId, category) {
        return axios.put(API_URL + categoryId, { headers: authHeader(), body: category });
    }

    deleteCategory(categoryId) {
        return axios.delete(API_URL + categoryId, { headers: authHeader() });
    }
}

export default new CategoryService();
