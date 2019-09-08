import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export type TypeHttpRequest = <V = any>(config?: AxiosRequestConfig) => AxiosPromise<V>;

// set interceptors of axios
axios.interceptors.request.use((config) => config, (err) => Promise.resolve(err));

axios.interceptors.response.use((res) => res.data, (err) => Promise.resolve(err));

/**
 * function getMethod for for http request of method get
 *
 * @export
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {AxiosPromise<V>}
 */
export function getMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): AxiosPromise<V> {
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
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {AxiosPromise<V>}
 */
export function postMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): AxiosPromise<V> {
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
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {AxiosPromise<V>}
 */
export function putMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): AxiosPromise<V> {
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
 * @template V
 * @param {string} [url]
 * @param {AxiosRequestConfig} [config={}]
 * @returns {AxiosPromise<V>}
 */
export function deleteMethod<V = any>(url?: string, config: AxiosRequestConfig = {}): AxiosPromise<V> {
  return axios({
    url,
    ...config,
    method: 'delete',
  });
}

/**
 * decorator @GetMapping for http request of method get
 *
 * @export
 * @param {string} [url]
 * @returns
 */
export function GetMapping(url?: string) {
  return (target: any, propertyName: string) => {
    target[propertyName] = (config: any = {}) => getMethod(url, config);
    return target[propertyName];
  };
}

/**
 * decorator @PostMapping for http request of method post
 *
 * @export
 * @param {string} [url]
 * @returns
 */
export function PostMapping(url?: string) {
  return (target: any, propertyName: string) => {
    target[propertyName] = (config: any = {}) => postMethod(url, config);
    return target[propertyName];
  };
}

/**
 * decorator @PutMapping for http request of method put
 *
 * @export
 * @param {string} [url]
 * @returns
 */
export function PutMapping(url?: string) {
  return (target: any, propertyName: string) => {
    target[propertyName] = (config: any = {}) => putMethod(url, config);
    return target[propertyName];
  };
}

/**
 * decorator @DeleteMapping for http request of method delete
 *
 * @export
 * @param {string} [url]
 * @returns
 */
export function DeleteMapping(url?: string) {
  return (target: any, propertyName: string) => {
    target[propertyName] = (config: any = {}) => deleteMethod(url, config);
    return target[propertyName];
  };
}
