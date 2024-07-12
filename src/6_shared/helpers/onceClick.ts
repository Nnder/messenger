export default function once(f: Function) {
  let clicked = false;
  return (...args: any) => {
    if (!clicked) f(...args);
    clicked = true;
  };
}
