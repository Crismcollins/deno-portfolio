import { Context, MiddlewareHandler, Next } from "https://deno.land/x/hono@v3.4.1/mod.ts";

export const validateLanguage: MiddlewareHandler = async (c, next) => {
  const language = c.req.param('language');

  if (language !== 'es' && language !== 'en') {
    return c.json({ message: 'Language is not valid. Must be en or es' }, 400);
  }

  await next();
};

export const getMethodForm: MiddlewareHandler = async (c, next) => {
  const formData = await c.req.formData();
  const method = formData.get('_method')?.toString().toUpperCase();

  if (method) {
    c.set('simulatedMethod', method);
  } else {
    c.set('simulatedMethod', c.req.method);
  }

  return next();
};

export const redirectUrl: MiddlewareHandler = async (c: Context, next: Next) => {
  const url = new URL(c.req.url);
  const pathname = url.pathname;

  // Si la URL termina en '/' y no es solo '/'
  if (pathname.endsWith('/') && pathname.length > 1) {
    const newUrl = url.origin + pathname.slice(0, -1);
    // Redirige permanentemente
    return c.redirect(newUrl, 301);
  }

  // Continúa con el siguiente middleware o handler
  return next();
};