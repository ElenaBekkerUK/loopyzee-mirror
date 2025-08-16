// src/lib/next-params.ts

// Узкий тип: у контекста может быть params синхронный или промис
type ParamsLike<T> = { params?: T | Promise<T> };

// type guard: у объекта есть поле params
function hasParams<T>(ctx: unknown): ctx is ParamsLike<T> {
  return typeof ctx === "object" && ctx !== null && "params" in (ctx as object);
}

// type guard: значение — Promise
function isPromise<T>(val: unknown): val is Promise<T> {
  return (
    typeof val === "object" &&
    val !== null &&
    "then" in (val as { then?: unknown }) &&
    typeof (val as { then?: unknown }).then === "function"
  );
}

// Нормализуем второй аргумент Route Handler'а в Next 15:
// ctx.params может быть объектом или Promise этого объекта.
export async function getParams<T extends Record<string, string>>(ctx: unknown): Promise<T> {
  if (!hasParams<T>(ctx)) return {} as T;
  const p = (ctx as ParamsLike<T>).params;
  if (!p) return {} as T;
  return isPromise<T>(p) ? await p : p;
}
