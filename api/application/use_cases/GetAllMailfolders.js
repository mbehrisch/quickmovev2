const mailfolder = require("../../entities/MailFolder");

module.exports = (MailRepository) => {
  async function Execute() {
    return MailRepository.getAll();
  }

  return {
    Execute,
  };
};
