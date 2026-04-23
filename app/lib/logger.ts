/**
 * Structured Logging Utility
 * Provides consistent, machine-readable logging across the application
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogContext = Record<string, unknown>;

export interface LogEntry {
  level: LogLevel;
  timestamp: string;
  message: string;
  requestId?: string;
  userId?: string;
  context?: LogContext;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
}

function getErrorCode(error: Error): string | undefined {
  if (!('code' in error)) {
    return undefined;
  }

  const code = (error as Error & { code?: unknown }).code;
  return typeof code === 'string' ? code : undefined;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLog(entry: LogEntry): string {
    return JSON.stringify({
      ...entry,
      timestamp: new Date().toISOString(),
    });
  }

  private output(entry: LogEntry): void {
    const formattedLog = this.formatLog(entry);

    // In development, also log to console with colors
    if (this.isDevelopment) {
      const levelColors: { [key in LogLevel]: string } = {
        debug: '\x1b[36m', // cyan
        info: '\x1b[32m', // green
        warn: '\x1b[33m', // yellow
        error: '\x1b[31m', // red
      };

      const color = levelColors[entry.level];
      const reset = '\x1b[0m';

      console.log(
        `${color}[${entry.level.toUpperCase()}]${reset} ${entry.message}`,
        entry.context || ''
      );
    }

    // In production, log to stdout (captured by container/CloudWatch)
    if (entry.level === 'error' || entry.level === 'warn') {
      console.error(formattedLog);
    } else {
      console.log(formattedLog);
    }
  }

  debug(
    message: string,
    context?: LogContext,
    requestId?: string
  ): void {
    this.output({
      level: 'debug',
      message,
      requestId,
      context,
      timestamp: new Date().toISOString(),
    });
  }

  info(
    message: string,
    context?: LogContext,
    requestId?: string
  ): void {
    this.output({
      level: 'info',
      message,
      requestId,
      context,
      timestamp: new Date().toISOString(),
    });
  }

  warn(
    message: string,
    context?: LogContext,
    requestId?: string
  ): void {
    this.output({
      level: 'warn',
      message,
      requestId,
      context,
      timestamp: new Date().toISOString(),
    });
  }

  error(
    message: string,
    error?: Error | null,
    context?: LogContext,
    requestId?: string
  ): void {
    this.output({
      level: 'error',
      message,
      requestId,
      context,
      error: error
        ? {
            message: error.message,
            stack: this.isDevelopment ? error.stack : undefined,
            code: getErrorCode(error),
          }
        : undefined,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log API request
   */
  logRequest(
    method: string,
    path: string,
    requestId: string,
    userId?: string
  ): void {
    this.info(`API Request: ${method} ${path}`, { method, path, userId }, requestId);
  }

  /**
   * Log API response
   */
  logResponse(
    method: string,
    path: string,
    status: number,
    duration: number,
    requestId: string
  ): void {
    this.info(`API Response: ${method} ${path} ${status}`, {
      method,
      path,
      status,
      durationMs: duration,
    }, requestId);
  }

  /**
   * Log database operation
   */
  logDatabase(
    operation: 'read' | 'write' | 'delete',
    table: string,
    duration: number,
    requestId?: string
  ): void {
    this.debug(`Database: ${operation} ${table}`, {
      operation,
      table,
      durationMs: duration,
    }, requestId);
  }

  /**
   * Log authentication event
   */
  logAuth(
    event: 'signin' | 'signup' | 'logout' | 'token-refresh',
    userId?: string,
    success: boolean = true,
    error?: string
  ): void {
    if (success) {
      this.info(`Auth: ${event} succeeded`, { event, userId });
    } else {
      this.warn(`Auth: ${event} failed`, { event, userId, error }, userId);
    }
  }

  /**
   * Log security event
   */
  logSecurity(
    event: 'rate-limit' | 'csrf-fail' | 'xss-attempt' | 'auth-fail',
    context?: LogContext
  ): void {
    this.warn(`Security: ${event}`, { ...context, event });
  }
}

// Export singleton instance
export const logger = new Logger();
