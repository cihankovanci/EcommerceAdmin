export type CallParams = {
  url: string;
  method: 'GET' | 'POST' | 'UPDATE' | 'PATCH' | 'DELETE' | 'PUT';
  headers?: HeadersInit_;
  body?: Record<string, string | number> | object;
  formData?: boolean;
  authorization?: boolean;
  tags?: string[];
};
export type SuccessResponse<T> = {
  timestamp: string;
  status: number;
  message: string;
  code: string;
  data: T;
};

export type FailureResponse = {
  timestamp: string;
  status: number;
  message: string;
  code: string;
  data: null;
};

export type Response<T> = SuccessResponse<T> | FailureResponse;
