
import axios from 'axios'

export default (opt) => {
  axios.interceptors.response.use(undefined, function (err) {
    console.log(err.response)
    const { status, data } = err.response
    return new Promise(function () {
      opt.onResponseErr({ status, data })
    })
  })
}
