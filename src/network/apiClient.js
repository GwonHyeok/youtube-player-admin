import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://13.209.50.205',
  timeout: 5000
});
export default instance
