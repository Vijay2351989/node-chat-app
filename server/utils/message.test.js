const {generateMessage} = require("./message.js");
const expect = require("expect");

describe("Generate message" ,()=>{
  it("Should generate message object" , () =>{
      var message = generateMessage("Vijay","Generate Message test case");
      expect(message.from).toBe("Vijay");
      expect(message.text).toBe("Generate Message test case");
      expect(message.createdAt).toBeA("number");
  });
});
