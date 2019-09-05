import axios from 'axios';

// set interceptors of axios
axios.interceptors.request.use((config) => config, (err) => Promise.resolve(err));

axios.interceptors.response.use((res) => res, (err) => Promise.resolve(err));

/**
 * function getMethod for for http request of method get
 *
 * @export
 * @param {string} url
 * @returns {AxiosPromise<any>}
 */
export function getMethod(url) {
  return axios({
    method: 'get',
    url,
    withCredentials: true,
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
export function postMethod(url, params) {
  return axios({
    method: 'post',
    url,
    data: params,
    withCredentials: true,
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
export function putMethod(url, params) {
  return axios({
    method: 'put',
    url,
    data: params,
    withCredentials: true,
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
export function deleteMethod(url, params) {
  return axios({
    method: 'delete',
    url,
    data: params,
    withCredentials: true,
  });
}
