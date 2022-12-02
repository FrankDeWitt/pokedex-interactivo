export function getErrorMessage(error: any) {
  return error?.message || String(error);
}