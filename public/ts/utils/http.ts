import axios, { AxiosPromise } from 'axios';

export type TypeGet = <V = any>(url: string) => AxiosPromise<V>;

export type TypePost = <T = any, V = any>(url: string, params?: T) => AxiosPromise<V>;

export type TypePut = <T = any, V = any>(url: string, params?: T) => AxiosPromise<V>;

export type TypeDelete = <T = any, V = any>(url: string, params?: T) => AxiosPromise<V>;

// set interceptors of axios
axios.interceptors.request.use((config) => config, (err) => Promise.resolve(err));

axios.interceptors.response.use((res) => res.data, (err) => Promise.resolve(err));

/**
 * function getMethod for for http request of method get
 *
 * @export
 * @template V
 * @param {string} url
 * @returns {AxiosPromise<V>}
 */
export function getMethod<V = any>(url: string): AxiosPromise<V> {
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
 * @template T
 * @template V
 * @param {string} url
 * @param {T} params
 * @returns {AxiosPromise<V>}
 */
export function postMethod<T = any, V = any>(url: string, params?: T): AxiosPromise<V> {
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
 * @template T
 * @template V
 * @param {string} url
 * @param {T} params
 * @returns {AxiosPromise<V>}
 */
export function putMethod<T = any, V = any>(url: string, params?: T): AxiosPromise<V> {
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
 * @template T
 * @template V
 * @param {string} url
 * @param {T} params
 * @returns {AxiosPromise<V>}
 */
export function deleteMethod<T = any, V = any>(url: string, params?: T): AxiosPromise<V> {
  return axios({
    method: 'delete',
    url,
    data: params,
    withCredentials: true,
  });
}

/**
 * decorator @Get for http request of method get
 *
 * @export
 * @param {*} target
 * @param {string} propertyName
 * @returns
 */
export function Get(target: any, propertyName: string) {
  target[propertyName] = (url: string) => getMethod(url);
  return target[propertyName];
}

/**
 * decorator @Post for http request of method post
 *
 * @export
 * @param {*} target
 * @param {string} propertyName
 * @returns
 */
export function Post(target: any, propertyName: string) {
  target[propertyName] = (url: string, params?: any) => postMethod(url, params);
  return target[propertyName];
}

/**
 * decorator @Put for http request of method put
 *
 * @export
 * @param {*} target
 * @param {string} propertyName
 * @returns
 */
export function Put(target: any, propertyName: string) {
  target[propertyName] = (url: string, params?: any) => putMethod(url, params);
  return target[propertyName];
}

/**
 * decorator @Delete for http request of method delete
 *
 * @export
 * @param {*} target
 * @param {string} propertyName
 * @returns
 */
export function Delete(target: any, propertyName: string) {
  target[propertyName] = (url: string, params?: any) => deleteMethod(url, params);
  return target[propertyName];
}
