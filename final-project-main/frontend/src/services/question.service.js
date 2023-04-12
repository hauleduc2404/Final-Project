import axios from 'axios';
import authHeader from './auth-header';

const API_URL = window.BASE_API + 'questions';

class QuestionService {
    getAllQuestionsInSection(sectionId){
        return axios.get(API_URL, {params: {sectionId: sectionId}, headers: authHeader()} )
    }

    getQuestionDetail(questionId) {
        return axios.get(API_URL + '/' + questionId, {headers: authHeader()} )
    }

    submitAnswer(questionId, answer) {
        return axios.post(API_URL + '/' + questionId, {headers: authHeader(), body: {answer: answer}})
    }

    getAnswer(questionId) {
        return axios.get(API_URL + '/' + questionId + '/answer', {headers: authHeader()})
    }
}

export default new QuestionService(); 
