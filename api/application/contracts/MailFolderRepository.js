/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
module.exports = class MailRepository {
  constructor() {}

  add(mailFolderInstance) {
    return Promise.reject(new Error("not implemented"));
  }

  updateById(mailFolderInstance) {
    return Promise.reject(new Error("not implemented"));
  }

  deleteByName(mailFolderInstance) {
    return Promise.reject(new Error("not implemented"));
  }

  getById(mailFolderId) {
    return Promise.reject(new Error("not implemented"));
  }

  getAll() {
    return Promise.reject(new Error("not implemented"));
  }
};
