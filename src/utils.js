
// Range from https://www.joshwcomeau.com/snippets/javascript/range/
export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
      end = start;
      start = 0;
  }
  for (let i = start; i <= end; i += step) {
      output.push(i);
  }
  return output;
};

export const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
