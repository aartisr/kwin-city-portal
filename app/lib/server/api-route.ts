import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { logger, type LogContext } from '@/lib/logger';
import { captureApiRouteException } from '@/lib/server/observability';

interface ApiRouteContext {
  requestId: string;
  startedAt: number;
}

interface ApiRouteOptions {
  method: string;
  path: string;
  context?: LogContext;
  fallbackMessage?: string;
}

export async function withApiRoute<T extends NextResponse>(
  options: ApiRouteOptions,
  handler: (ctx: ApiRouteContext) => Promise<T>
): Promise<T | NextResponse> {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();

  logger.logRequest(options.method, options.path, requestId);

  try {
    const response = await handler({ requestId, startedAt });
    logger.logResponse(options.method, options.path, response.status, Date.now() - startedAt, requestId);
    return response;
  } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error('Unknown API route error');
    logger.error(
      `Unhandled API route failure: ${options.method} ${options.path}`,
        normalizedError,
      options.context,
      requestId
    );
      captureApiRouteException(normalizedError, {
        method: options.method,
        path: options.path,
        requestId,
        context: options.context,
      });
    logger.logResponse(options.method, options.path, 500, Date.now() - startedAt, requestId);

    return NextResponse.json(
      {
        error: options.fallbackMessage || 'Unexpected server error. Please try again.',
        requestId,
      },
      { status: 500 }
    );
  }
}
