class QuickMoveUI {
  constructor() {
    this.getMailFolders();
  }

  async getMailFolders() {
    // /**
    //  * handle the received message by filtering for all messages
    //  * whose "type" property is set to "command".
    //  */
    // const handleMessage = (message, sender, sendResponse) => {
    //   if (message && message.hasOwnProperty("command")) {
    //     // if we have a command, return a promise from the command handler
    //     return doHandleCommand(message, sender);
    //   }
    //   console.log("received message", message);
    // };

    // /**
    //  * Add a handler for communication with other parts of the extension,
    //  * like our messageDisplayScript.
    //  *
    //  * 👉 There should be only one handler in the background script
    //  *    for all incoming messages
    //  */
    // browser.runtime.onMessage.addListener(handleMessage);
    let mailFolders = await browser.runtime.sendMessage({
      command: "getMailFolders",
    });

    console.log("got the mailfolders", mailFolders);

    // const myPort = browser.runtime.connect({ name: "port-from-cs" });
    // myPort.postMessage({ greeting: "hello from content script" });

    // myPort.onMessage.addListener(function (m) {
    //   console.log(
    //     "In content script, received message from background script: "
    //   );
    //   console.log(m.greeting);
    // });

    // document.body.addEventListener("click", function () {
    //   myPort.postMessage({ greeting: "they clicked the page!" });
    // });
  }
}

const quickMoveUI = new QuickMoveUI();
window.addEventListener("load", onLoad);

async function onLoad() {
  document.getElementById("button_ok").addEventListener("click", notifyMode);
  document
    .getElementById("button_cancel")
    .addEventListener("click", notifyMode);
}

async function notifyMode(event) {
  await messenger.runtime.sendMessage({
    popupCloseMode: event.target.getAttribute("data"),
  });
  //does not work until bug 1675940 has landed on ESR
  //window.close();
  let win = await messenger.windows.getCurrent();
  messenger.windows.remove(win.id);
}
