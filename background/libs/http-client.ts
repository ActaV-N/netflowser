const BASE_URL = 'http://localhost:5800';

export const httpClient = (() => {
  const call = async (pathname: string, method: string, body?: Record<string, any>) => {
    const res = await fetch(`${BASE_URL}${pathname}`, { method, body: JSON.stringify(body) });

    if (!res.ok) {
      const { errorMessage } = await res.json();
      throw new Error(errorMessage);
    }

    const { data } = await res.json();

    return data;
  };

  return {
    async get<T>(url: string): Promise<T> {
      return call(url, 'get');
    },

    async post<T>(url: string, data?: Record<string, any>): Promise<T> {
      return call(url, 'post', data);
    },
    // async head<T>(url: string, config?: { params?: any }): Promise<T> {
    //   const res = await instance.head<T>(url, config);
    //   // @ts-expect-error 모든 API 는 { data: 결과 } 형태임을 가정한다.
    //   return res?.data?.data;
    // },

    // async patch<T>(url: string, data: Record<string, any>): Promise<T> {
    //   const res = await instance.patch<T>(url, data);
    //   // @ts-expect-error 모든 API 는 { data: 결과 } 형태임을 가정한다.
    //   return res?.data?.data;
    // },

    // async delete<T>(url: string): Promise<T> {
    //   const res = await instance.delete<T>(url);
    //   // @ts-expect-error 모든 API 는 { data: 결과 } 형태임을 가정한다.
    //   return res;
    // },
  };
})();
