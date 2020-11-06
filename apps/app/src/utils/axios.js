import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}
export default axios.create({
  headers,
  baseUrl: 'http://api.react-docker-pupeteer.com/',
  responseType: 'json',
})

