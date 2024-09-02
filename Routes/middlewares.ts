import { MiddlewareHandler } from "https://deno.land/x/hono@v3.4.1/mod.ts";

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
