import { Middleware } from '@koa/router';
import { isBoom } from '@hapi/boom';

interface ResponseError {
  errorMessage?: string;
}

interface TransformResponse {
  status: number;
  body: ResponseError;
}

const transformResponse = (err: Error): TransformResponse => {
  const rs: TransformResponse = {
    status: 500,
    body: {
      errorMessage: 'Internal Server Error',
    },
  };

  if (isBoom(err)) {
    const { statusCode } = err.output;
    const { errorMessage } = err.data ?? ({} as any);
    rs.status = statusCode;
    rs.body = {
      errorMessage: errorMessage ?? `Something went wrong and we couldn't complete your request.`,
    };
  }

  return rs;
};

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const response = transformResponse(err as Error);
    ctx.status = response.status;
    const { errorMessage } = response.body;
    ctx.body = {
      errorMessage: errorMessage ?? 'An unexpected error has occurred. Please try again.',
    };
  }
};
