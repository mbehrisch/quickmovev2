const InMemoryMailFolderReposity = require("../../../api/frameworks/persistance/InMemory/InMemoryMailFolderRepository");
const MailFolder = require("../../../api/entities/MailFolder");

test("should setup properly empty repo", () => {
  const repo = new InMemoryMailFolderReposity();
  expect(repo.currentId).toBe(1);
  expect(repo.mailFolderList.length).toBe(0);
});

test("has added to empty repo", () => {
  const repo = new InMemoryMailFolderReposity();

  const folder = new MailFolder("name", "folder");
  repo.add(folder);

  expect(repo.mailFolderList).toHaveLength(1);
});

test("getbyName repo entry", () => {
  const repo = new InMemoryMailFolderReposity();

  const folder = new MailFolder("name", "folder");
  repo.add(folder);

  expect(repo.mailFolderList).toHaveLength(1);

  repo.getByName(folder.name).then((folderRetrieved) => {
    expect(folder).toEqual(folderRetrieved);
  });
});

test("getbyId repo entry", () => {
  const repo = new InMemoryMailFolderReposity();

  const folder = new MailFolder("name", "folder");
  repo.add(folder);

  expect(repo.mailFolderList).toHaveLength(1);

  repo.getById(folder.id).then((folderRetrieved) => {
    expect(folder).toEqual(folderRetrieved);
  });
});

// async/await can also be used with `.resolves`.
test("get repo entry async", async () => {
  expect.assertions(1);
  const repo = new InMemoryMailFolderReposity();

  const folder = new MailFolder("name", "folder");
  repo.add(folder);

  await expect(repo.getByName(folder.name)).resolves.toEqual(folder);
});

test("update repo entry", () => {
  const repo = new InMemoryMailFolderReposity();

  const folder = new MailFolder("name", "folder");
  repo.add(folder);

  expect(repo.mailFolderList).toHaveLength(1);

  const folderupdate = new MailFolder("nameupdate", "folderupdate");
  repo.updateById(folder);
});

test("getall repo", async () => {
  expect.assertions(2);
  const repo = new InMemoryMailFolderReposity();

  const amount = 10;
  for (let i = 0; i < amount; i++) {
    const folder = new MailFolder("name" + i, "folder" + i);
    repo.add(folder);
  }

  expect(repo.mailFolderList).toHaveLength(amount);

  await expect((await repo.getAll()).length).toBe(amount);
});
