import axios from 'axios'
import authHeader from './auth-header'

const API_URL = window.BASE_API + 'courses'

class CourseService {
    getAllCourses (params) {
        return axios.get(API_URL, { headers: authHeader(), params }).then(res => {
            return res.data
        })
    }

    getPopularCourses () {
        return axios.get(`${API_URL}/popular-courses`, { headers: authHeader() }).then(res => {
            return res.data
        })
    }

    getLatestCourses () {
        return axios.get(`${API_URL}/lastest-courses`, { headers: authHeader() }).then(res => {
            return res.data
        })
    }

    getCourse (courseId) {
        return axios.get(`${API_URL}/${courseId}`, { headers: authHeader() })
    }

    getAllSectionsOfCourse (courseId) {
        return axios.get(`${API_URL}/${courseId}/course-sections`, { headers: authHeader() })
    }

    registerUserToCourse (userId, courseId) {
        return axios.post(`${API_URL}/${courseId}/users`, { userId }, { headers: authHeader() })
    }

    addSectionToCourse (courseId, section) {
        return axios.post(API_URL + courseId + '/course-sections', {
            headers: authHeader(),
            body: section
        })
    }

    postCourse (course) {
        return axios.post(API_URL, { headers: authHeader(), body: course })
    }

    updateCourse (courseId, course) {
        return axios.put(API_URL + courseId, { headers: authHeader(), body: course })
    }

    deleteCourse (courseId) {
        return axios.delete(API_URL + courseId, { headers: authHeader() })
    }

    createReview (review) {
        return axios.post(window.BASE_API + 'course-reviews', review, { headers: authHeader() })
    }
}

export default new CourseService()
