type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface ChannelRequest {
  id: string;
  path: string;
  method?: Method;
  data?: Record<string, any>;
  queryKey: string[];
}

interface ChannelResponse<T = any> {
  requestId: string;
  method: Method;
  data?: T;
  error?: any;
  queryKey: string[];
}
