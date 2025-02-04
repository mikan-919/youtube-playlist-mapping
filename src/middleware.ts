import { auth } from '@/lib/auth';

export default auth((req) => {
  if (req.auth) {
    if (req.nextUrl.pathname === '/')
      return Response.redirect(new URL('/app', req.nextUrl.origin));
  } else {
    if (req.nextUrl.pathname === '/app')
      return Response.redirect(new URL('/', req.nextUrl.origin));
  }
});
