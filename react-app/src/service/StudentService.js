import axios from 'axios'

export class StudentService{
    baseURL = "http://localhost:8080/api/v1/student";
    getAll(){
        return axios.get(this.baseURL).then(res => res.data);
    }
}