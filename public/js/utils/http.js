import axios from 'axios';

// set interceptors of axios
axios.interceptors.request.use((config) => config, (err) => Promise.resolve(err));

axios.interceptors.response.use((res) => res.data, (err) => Promise.resolve(err));

/**
 * function getMethod for for http request of method get
 *
 * @export
 * @param {string} url
 * @returns {AxiosPromise<any>}
 */
export function getMethod(url, config) {
  return axios({
    url,
    ...config,
    method: 'get',
  });
}

/**
 * function postMethod for for http request of method post
 *
 * @export
 * @param {string} url
 * @param {Object} params
 * @returns {AxiosPromise<any>}
 */
export function postMethod(url, config) {
  return axios({
    url,
    ...config,
    method: 'post',
  });
}

/**
 * function putMethod for for http request of method put
 *
 * @export
 * @param {string} url
 * @param {Object} params
 * @returns {AxiosPromise<any>}
 */
export function putMethod(url, config) {
  return axios({
    url,
    ...config,
    method: 'put',
  });
}

/**
 * function deleteMethod for for http request of method delete
 *
 * @export
 * @param {string} url
 * @param {Object} params
 * @returns {AxiosPromise<any>}
 */
export function deleteMethod(url, config) {
  return axios({
    url,
    ...config,
    method: 'delete',
  });
}
