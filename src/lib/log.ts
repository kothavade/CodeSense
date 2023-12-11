const LOG = process.env.NODE_ENV === "development";
export function log(...args: any[]) {
  LOG && console.log(...args);
}
