import axios from 'axios'

export class StudentService{
    baseURL = "http://localhost:8080/api/v1/";
    getAll(){
        return axios.get(this.baseURL + "student").then(res => res.data);
    }
}