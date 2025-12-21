import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // We use cookies for authentication (Sanctum SPA)
  // Ensure withCredentials is set to true for all requests to backend
  const cloned = req.clone({
    withCredentials: true
  });
  return next(cloned);
};
