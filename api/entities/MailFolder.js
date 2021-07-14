module.exports = class MailFolder {
  constructor(name, folder) {
    if (name == null || name == undefined) {
      throw new Error("needs proper instantiation with name string");
    }
    if (folder == null || folder == undefined) {
      throw new Error("needs proper instantiation with nsIMsgFolder");
    }
    this.name = name;
    this.folder = folder;
  }
};
