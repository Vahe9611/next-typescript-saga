import axios, { AxiosResponse, Method } from 'axios';
import getConfig from 'next/config'

export interface ApiQueryParams {
  params?: any;
  data?: any;
  headers?: any;
}

export type ApiPrefix = string | number;

class Api {
  url: string;

  constructor(resource: string) {
    const { publicRuntimeConfig: { apiUrl } } = getConfig();
    this.url = `${apiUrl}${resource}`;
  }

  list = (params: ApiQueryParams) => {
    return this.buildQuery('get', params);
  };

  get = (id: ApiPrefix, params: ApiQueryParams = {}) => {
    return this.buildQuery('get', params, id);
  };

  create = (params: ApiQueryParams) => {
    return this.buildQuery('post', params);
  };

  put = (id: ApiPrefix, params: ApiQueryParams) => {
    return this.buildQuery('put', params, id);
  };

  destroy = (id: ApiPrefix) => {
    return this.buildQuery('delete', {}, id);
  };

  buildQuery = (method: Method, params: ApiQueryParams, prefix?: ApiPrefix): Promise<AxiosResponse> => {
    return axios({
      url: this.getFullUrl(prefix),
      method,
      data: params.data,
      params: params.params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getFullUrl = (prefix?: ApiPrefix) => {
    return `${this.url}${prefix ? `/${prefix}` : ''}`;
  };
}

export default Api;
