const MailFolder = require("../../api/entities/MailFolder");

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });

it("standard constr and getters", () => {
  const mailfolder = new MailFolder("abc", "def");
  expect(mailfolder.name).toBe("abc");
  expect(mailfolder.folder).toBe("def");
});

test("illegal constructor", () => {
  expect(() => {
    new MailFolder(null, null);
  }).toThrowError();

  expect(() => {
    new MailFolder("abc", null);
  }).toThrowError();

  expect(() => {
    new MailFolder(null, "agfdkj");
  }).toThrowError();
});
