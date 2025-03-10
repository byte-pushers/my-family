import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './http-request.interceptor';

/** Provider for the Noop Interceptor. */
export const httpInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true };
