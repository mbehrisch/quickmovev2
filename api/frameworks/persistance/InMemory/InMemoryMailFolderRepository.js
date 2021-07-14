/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
const MailFolderRepository = require("../../../application/contracts/MailFolderRepository");

module.exports = class InMemoryMailFolderRepository extends (
  MailFolderRepository
) {
  constructor() {
    super();
    // this.mailFolderList = new Set([]);
    this.mailFolderList = [];
    this.currentId = 1;
  }

  async add(mailFolderInstance) {
    try {
      this.currentId = this.currentId + 1;
      mailFolderInstance.id = this.currentId;
      this.mailFolderList.push(mailFolderInstance);
    } catch (error) {
      throw new Error("Error Occurred");
    }

    return mailFolderInstance;
  }

  async updateById(mailFolderInstance) {
    let mailfolder;
    try {
      mailfolder = this.mailFolderList.find(
        (x) => x.id === mailFolderInstance.id
      );
      if (mailfolder) {
        Object.assign(mailfolder, { mailFolderInstance: mailFolderInstance });
      }
    } catch (error) {
      throw new Error("Error Occurred");
    }

    return mailfolder;
  }

  async updateByName(mailFolderInstance) {
    let mailfolder;
    try {
      mailfolder = this.mailFolderList.find(
        (x) => x.name === mailFolderInstance.name
      );
      if (mailfolder) {
        Object.assign(mailfolder, { mailFolderInstance: mailFolderInstance });
      }
    } catch (error) {
      throw new Error("Error Occurred");
    }

    return mailfolder;
  }

  async deleteByName(folderName) {
    try {
      const folderIndex = this.mailFolderList.findIndex(
        (x) => x.name === folderName
      );
      if (folderIndex !== -1) {
        this.mailFolderList.splice(folderIndex, 1);
      }
    } catch (error) {
      throw new Error("Error Occurred");
    }

    return true;
  }

  async deleteById(folderId) {
    try {
      const folderIndex = this.mailFolderList.findIndex(
        (x) => x.id === folderId
      );
      if (folderIndex !== -1) {
        this.mailFolderList.splice(folderIndex, 1);
      }
    } catch (error) {
      throw new Error("Error Occurred");
    }

    return true;
  }

  async addAll(mailFolders) {
    try {
      if (mailFolders.length > 0) {
        this.mailFolderList = mailFolders;
      }
    } catch (error) {
      throw new Error("Error Occurred");
    }
    return true;
  }

  async deleteAll() {
    try {
      this.mailFolderList = [];
    } catch (error) {
      throw new Error("Error Occurred");
    }
    return true;
  }

  async getByName(folderName) {
    let folder;
    try {
      folder = this.mailFolderList.find((x) => x.name === folderName);
    } catch (err) {
      throw new Error("Error Occurred");
    }

    return folder;
  }

  async getById(folderId) {
    let folder;
    try {
      folder = this.mailFolderList.find((x) => x.id === folderId);
    } catch (err) {
      throw new Error("Error Occurred");
    }

    return folder;
  }

  async getAll() {
    return this.mailFolderList;
  }
};
