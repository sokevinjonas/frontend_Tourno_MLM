import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  let headers = req.headers;

  // Add Accept header to ensure backend returns JSON
  if (!headers.has('Accept')) {
    headers = headers.set('Accept', 'application/json');
  }

  // Add Authorization header if token exists
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const cloned = req.clone({
    headers
  });
  
  return next(cloned);
};
