import axios from 'axios';

export const httpClient = (() => {
  let _authorization = '';

  const instance = axios.create({
    baseURL: 'localhost:5800',
  });

  instance.interceptors.request.use((config) => {
    if (config.headers) {
      if (_authorization) {
        config.headers.Authorization = _authorization;
      }
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.data?.errorMessage) {
        err.message = err?.response?.data?.errorMessage || err.message;
      }
      return Promise.reject(err);
    },
  );

  return {
    hasAuthorization() {
      return !!_authorization;
    },

    setAuthorization(authorization: string) {
      _authorization = authorization;
    },

    async get<T>(
      url: string,
      config?: { params?: any; paramsSerializer?: (param: Record<string, any>) => any },
    ): Promise<T> {
      const res = await instance.get<T>(url, config);
      // @ts-expect-error 모든 API 는 { data: 결과 } 형태임을 가정한다.
      return res?.data?.data;
    },

    async head<T>(url: string, config?: { params?: any }): Promise<T> {
      const res = await instance.head<T>(url, config);
      // @ts-expect-error 모든 API 는 { data: 결과 } 형태임을 가정한다.
      return res?.data?.data;
    },

    async post<T>(url: string, data: Record<string, any>): Promise<T> {
      const res = await instance.post<T>(url, data);
      // @ts-expect-error 모든 API 는 { data: 결과 } 형태임을 가정한다.
      return res?.data?.data;
    },

    async patch<T>(url: string, data: Record<string, any>): Promise<T> {
      const res = await instance.patch<T>(url, data);
      // @ts-expect-error 모든 API 는 { data: 결과 } 형태임을 가정한다.
      return res?.data?.data;
    },

    async delete<T>(url: string): Promise<T> {
      const res = await instance.delete<T>(url);
      // @ts-expect-error 모든 API 는 { data: 결과 } 형태임을 가정한다.
      return res;
    },
  };
})();
