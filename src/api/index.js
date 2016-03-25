import Api from './api';

const api = new Api({
//  baseURI: 'http://testbd.meiningjia.com',
  baseURI: 'http://localhost:8080',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token':window.localStorage.getItem('token')
  }
})

export default api
