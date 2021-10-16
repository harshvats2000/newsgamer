export function catchAsync(fn: Function, errMsg: string) {
  return async function (...rest: any) {
    try {
      await fn(...rest);
    } catch (error) {
      console.error(errMsg, error);
    }
  };
}
