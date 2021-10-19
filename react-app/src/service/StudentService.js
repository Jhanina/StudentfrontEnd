import axios from 'axios'

export class StudentService{
    baseURL = "http://localhost:8080/api/v1/student";
    getAll(){
        return axios.get(this.baseURL).then(res => res.data);
    }
    registerNewStudents(student){
        return axios.post(this.baseURL, student);
    }
    updateStudents(studentId, name, email){
        return axios.put(this.baseURL+'/'+ studentId+'?name='+name+'&email='+email)
    }
    deleteStudents(studentId){
        return axios.delete(this.baseURL+'/'+ studentId);
    }



}