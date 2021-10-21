const { fizzBuzz } = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw an exception if input is not a number", () => {
    const args = [true, "a", [], {}, null, undefined];
    args.forEach((a) => {
      expect(() => {
        fizzBuzz(a);
      }).toThrow();
    });
  });

  it('should return "FizzBuzz" if input is devisible by 3 and 5', () => {
    const result = fizzBuzz(0);
    expect(result).toBe("FizzBuzz");
  });

  it('should return "Fizz" if input is devisible by 3 but not by 5', () => {
    const result = fizzBuzz(3);
    expect(result).toBe("Fizz");
  });

  it('should return "Buzz" if input is devisible by 5 but not by 3', () => {
    const result = fizzBuzz(5);
    expect(result).toBe("Buzz");
  });

  it("should return a number if it is not devisible by 3 and 5", () => {
    const result = fizzBuzz(1);
    expect(result).toBe(1);
  });
});
