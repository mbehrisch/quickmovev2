const MailFolder = require("../../entities/MailFolder");

console.log("Loading setupmailfolders.js");

module.exports = (MailFolderRepository) => {
  console.log("Loading setupmailfolders.js internal");
  async function Execute() {
    if ("accounts" in browser) {
      let accountList = await browser.accounts.list();

      let mailFolders = [];
      accountList.forEach((account) => {
        _recursiveAdd(mailFolders, ...account.folders);
      });

      if (mailFolders.length == 0) {
        throw new Error("No folders could be retrieved");
      }
      MailFolderRepository.addAll(mailFolders);

      console.log("folders in browser 2", this.quickMoveModel.mailFolders);
    } else {
      console.error("accounts not in browser; permission issue", browser);
    }

    // const student = await StudentRepository.getByEmail(email);

    // // validate
    // if (!firstName || !lastName || !email) {
    //     throw new Error('validation failed');
    // }

    // // check if student exist by email
    // if (student) {
    //     throw new Error('email already exist in the system');
    // }

    // // create new student object
    // let newStudent = new Student(firstName, lastName, email);

    // // persist student
    // newStudent = await StudentRepository.add(newStudent);

    // // notify crm system
    // await CrmServices.notify(newStudent);

    return "student added successfully";
  }

  async function _recursiveAdd(mailFolders, folder) {
    if (folder.subFolders && folder.subFolders.length > 0) {
      folder.subFolders.forEach((folder) => {
        this._recursiveAdd(mailFolders, folder);
      });
    } else {
      mailFolders.push(folder);
    }
  }

  return {
    Execute,
  };
};
