import axios from 'axios'



const api = "http://localhost:3035"


const Axios = axios.create({
    baseURL : api,
    headers :{
        "Content-Type": 'application/json',
    }
})

export default Axios