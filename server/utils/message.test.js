const {generateMessage,generateLocationMessage} = require("./message.js");
const expect = require("expect");

describe("Generate message" ,()=>{
  it("Should generate message object" , () =>{
      var message = generateMessage("Vijay","Generate Message test case");
      expect(message.from).toBe("Vijay");
      expect(message.text).toBe("Generate Message test case");
      expect(message.createdAt).toBeA("number");
  });
});


describe("Generate location message" , ()=>{
  it("Location message should get generated" , ()=>{
    var location = generateLocationMessage("Vijay","1","2");
    expect(location.from).toBe("Vijay");
    expect(location.url).toBe("https://www.google.com/maps?q=1,2")
    expect(location.createdAt).toBeA("number");
  });
});
