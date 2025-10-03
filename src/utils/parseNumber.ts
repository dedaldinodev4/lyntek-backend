

export const parseNumberParam = (param: number, defaultValue = 0): number => {
  const parsed = Number(param);
  return !param ? defaultValue : isNaN(Number(param)) ? defaultValue : parsed
}