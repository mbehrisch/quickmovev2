class QuickMoveController {
    constructor() {
      this.quickMoveModel = new QuickMoveModel();
  
      this._updateMailFolders();
  
      this._registerListeners();
      this._setupRuntimeConnect();
  
      // browser.quickmove.sayHello("kaldfjlkdajf");
    }
  
    async _setupRuntimeConnect() {
      /**
       * Add a handler for communication with other parts of the extension,
       * like our messageDisplayScript.
       *
       * 👉 There should be only one handler in the background script
       *    for all incoming messages
       */
      browser.runtime.onMessage.addListener(this.handleMessage);
    }
  
    /**
     * handle the received message by filtering for all messages
     * whose "type" property is set to "command".
     */
    handleMessage = (message, sender, sendResponse) => {
      if (message && message.hasOwnProperty("command")) {
        // if we have a command, return a promise from the command handler
        return this.doHandleCommand(message, sender);
      }
      //   let notificationDetails = browser.runtime.sendMessage({
      //     hello: "you too",
      //   });
    };
  
    /**
     * command handler: handles the commands received from the content script
     */
    doHandleCommand = async (message, sender) => {
      const { command } = message;
      const {
        tab: { id: tabId },
      } = sender;
  
      // const messageHeader = await browser.messageDisplay.getDisplayedMessage(
      //   tabId
      // );
      console.log("doHandleCommand", message, sender);
  
      // check for known commands
      switch (command.toLocaleLowerCase()) {
        case "getmailfolders":
          if (this.quickMoveModel && this.quickMoveModel.mailFolders) {
            return this.quickMoveModel.mailFolders;
          }
          break;
        //   case "getnotificationdetails":
        //     {
        //       // create the information chunk we want to return to our message content script
        //       return {
        //         text: `Mail subject is "${messageHeader.subject}"`,
        //       };
        //     }
        //     break;
  
        //   case "markunread":
        //     {
        //       // get the current message from the given tab
        //       if (messageHeader) {
        //         // mark the message as unread
        //         browser.messages.update(messageHeader.id, {
        //           read: false,
        //         });
        //       }
        //     }
        //     break;
        default:
          break;
      }
    };
  
    async _updateMailFolders() {
      if ("accounts" in browser) {
        let accountList = await browser.accounts.list();
  
        let mailFolders = [];
        accountList.forEach((account) => {
          this._recursiveAdd(mailFolders, ...account.folders);
        });
  
        this.quickMoveModel.setMailFolders(mailFolders);
  
        // console.log("folders in browser 2", this.quickMoveModel.mailFolders);
      } else {
        console.error("accounts not in browser; permission issue", browser);
      }
    }
  
    _recursiveAdd(mailFolders, folder) {
      if (folder.subFolders && folder.subFolders.length > 0) {
        folder.subFolders.forEach((folder) => {
          this._recursiveAdd(mailFolders, folder);
        });
      } else {
        mailFolders.push(folder);
      }
    }
  
    _registerListeners() {
      const _this = this;
      messenger.commands.onCommand.addListener(function (command) {
        switch (command) {
          case "move-feature":
            _this.moveMessagesCommand();
            break;
          case "copy-feature":
            _this.copyMessagesCommand();
            break;
          case "goto-feature":
            _this.gotoFolderCommand();
            break;
          default:
            console.error("command cannot be handled by QuickMove v2", command);
            break;
        }
      });
    }
  
    async moveMessagesCommand() {
      let dialogResult = await this.openDialog(
        browser.i18n.getMessage("dialogMoveTitle")
      );
      console.log("invoked moveMessagesCommand", dialogResult);
  
      if (dialogResult === browser.i18n.getMessage("dialogOK")) {
        browser.mailTabs.onSelectedMessagesChanged.addListener(
          async (tab, messageList) => {
            // let messageCount = messageList.messages.length;
  
            let messageIDList = messageList.messages.map((msg) => msg.id);
            // for (const msg of messageList) {
            //   const message = messageList.messages[0];
            //   //   browser.messages.move([message.id], mailFolders[2]);
            // }
            console.log("moving fake", messageIDList, mailFolders[2]);
          }
        );
      }
    }
  
    async copyMessagesCommand() {
      let dialogResult = await openDialog(
        browser.i18n.getMessage("dialogCopyTitle")
      );
      console.log("invoked copyMessagesCommand");
    }
  
    async gotoFolderCommand() {
      let dialogResult = await openDialog(
        browser.i18n.getMessage("dialogGoToTitle")
      );
      console.log("invoked gotoFolderCommand");
    }
  
    async openDialog(title) {
      let window = await messenger.windows.create({
        url: "quickmove.html",
        titlePreface: title,
        type: "popup",
        height: 280,
        width: 390,
      });
  
      // await the created popup to be closed and define a default
      // return value if the window is closed without clicking a button
      let rv = await this.popupClosePromise(window.id, "cancel");
      return rv;
    }
  
    async popupClosePromise(popupId, defaultPopupCloseMode) {
      try {
        await messenger.windows.get(popupId);
      } catch (e) {
        //window does not exist, assume closed
        return defaultPopupCloseMode;
      }
      return new Promise((resolve) => {
        let popupCloseMode = defaultPopupCloseMode;
        function windowRemoveListener(closedId) {
          if (popupId == closedId) {
            messenger.windows.onRemoved.removeListener(windowRemoveListener);
            messenger.runtime.onMessage.removeListener(messageListener);
            resolve(popupCloseMode);
          }
        }
        function messageListener(request, sender, sendResponse) {
          if (
            sender.tab.windowId == popupId &&
            request &&
            request.popupCloseMode
          ) {
            popupCloseMode = request.popupCloseMode;
          }
        }
        messenger.runtime.onMessage.addListener(messageListener);
        messenger.windows.onRemoved.addListener(windowRemoveListener);
      });
    }
  
    // messenger.windows.create({
    //     height: 400,
    //     width: 500,
    //     url: "/path/from/root/of/addon/to/dialog.html",
    //     type: "popup"
    // });
  }