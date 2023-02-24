export function cameCaseSplit(str: string): string {
  const spaced = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
