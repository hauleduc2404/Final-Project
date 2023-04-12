 import axios from 'axios';
import authHeader from './auth-header';

const API_URL = window.BASE_API + 'course-sections/';

class CourseSectionService {
    getSection(sectionId) {
        console.log('sectionId=', sectionId)
        return axios.get(API_URL +  sectionId, {headers: authHeader()})
    }

    deleteSection(sectionId) {
        return axios.delete(API_URL + sectionId, {headers: authHeader()})
    }

    updateSection(sectionId, section) {
        return axios.post(API_URL + sectionId, {headers: authHeader(), body: section})
    }

}

export default new CourseSectionService();
