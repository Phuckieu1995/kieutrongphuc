// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

const sum_to_n_a = function (n: number) {
  // your code here
  if (n <= 0) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (sum >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
    sum += i;
  }

  return sum;
};

const sum_to_n_b = function (n: number) {
  // your code here
  if (n <= 0) return 0;

  const sum = Array.from({ length: n }, (_, index) => index + 1).reduce(
    (result, value) => result + value,
    0
  );
  return sum;
};

const sum_to_n_c = function (n: number) {
  // your code here
  if (n <= 0) return 0;

  const arr = [...Array(n)].map((_, i) => i + 1);
  const sum = arr.reduce((result, value) => result + value, 0);
  return sum;
};

console.log(sum_to_n_a(-2));
console.log(sum_to_n_b(-2));
console.log(sum_to_n_c(-2));
