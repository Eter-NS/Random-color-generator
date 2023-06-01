export default function keysObject<T>(obj: T): (keyof T)[] {
  return Object.keys(obj!) as (keyof T)[];
}
