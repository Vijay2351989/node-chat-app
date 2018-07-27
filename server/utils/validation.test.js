const expect = require("expect");
const {isValidString} = require("./validation.js");

describe("Test string" , () => {
  it("Should return string as valid" , () => {
     expect(isValidString('Vijay')).toBe(true);
  });
  it("Should return string as invalid for length 0" , () => {
     expect(isValidString('    ')).toBe(false);
  });
  it("Should return string as invalid for type incorrect" , () => {
     expect(isValidString(123)).toBe(false);
  });
});
