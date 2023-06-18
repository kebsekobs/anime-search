/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { CustomJsonInterceptor , CustomJsonParser, JsonParser} from './custom-json-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CustomJsonInterceptor, multi: true },
  { provide: JsonParser, useClass: CustomJsonParser },

  // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },

];
