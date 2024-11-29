import type * as types from '../types/api/api.types';

export const apiUrl = 'https://testcase.myideasoft.com/admin-api';

class Api {
  public base = apiUrl;

  private getAccessToken() {
    return 'AX5FTZ7UBAABUDT6XYYPW7LX';
  }

  private prepareHeaders(headers?: HeadersInit_): HeadersInit_ {
    // const {deviceId} = useAuthenticationStore.getState();
    // console.log('deviceId', deviceId);
    const defaultHeaders: HeadersInit_ = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      ...(this.getAccessToken()
        ? {Authorization: `Bearer ${this.getAccessToken()}`}
        : {}),
    };

    return {...defaultHeaders, ...headers};
  }

  public async call<T>(params: types.CallParams): Promise<types.Response<T>> {
    const external = params.url.startsWith('http');
    const uri = external ? params.url : this.base + params.url;

    const response = await fetch(uri, {
      method: params.method,
      headers: this.prepareHeaders(params.headers),
      body: JSON.stringify(params.body) as BodyInit_,
    });
    // console.log('respres', response)

    if (response.status === 401) {
      console.info('r', response.status);
      console.log('loggg', response);

      throw new Error('Unauthorized access - user has been signed out');
    }

    if (response.ok) {
      // console.log('resresres',response)
      return response.json();
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }
}

const api = new Api();
export {api};
