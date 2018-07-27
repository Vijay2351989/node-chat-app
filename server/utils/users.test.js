const expect = require("expect");
const {Users} = require("./users.js");


describe('Users' , () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {id:'123',
       name:'Vijay',
      room:'My room'},
      {id:'456',
       name:'Akhtar',
      room:'My room'},
      {id:'789',
       name:'Sudhir',
      room:'My room'}
    ];
  });
  it("Should add new user" ,() =>{
  //  var users = new Users();
    var user = users.addUser("111", "Vijay2", "My room");
    expect(users.users.length).toBe(4);
    expect(users.users).toInclude(user);

  });

  it("Should remove user by id" ,() =>{
    var user = users.removeUser("789");
    expect(users.users.length).toBe(2);
     expect(user.name).toBe("Sudhir");
  });

  it("Should get user by id" ,() =>{
    var user = users.getUser("789");
     expect(user.name).toBe("Sudhir");
  });

  it("Should get user list by room name" ,() =>{
    var user = users.getUserList("My room");
     expect(user.length).toBe(3);
      expect(user).toEqual(['Vijay','Akhtar','Sudhir']);
  });

});
