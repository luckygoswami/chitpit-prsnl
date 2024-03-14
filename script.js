"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://chitpit-prsnl-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const chatsInDb = ref(database, "chat");
const onlineStatusInDb = ref(database, "onlineStatus");

const heBtn = document.querySelector("#he-btn");
const sheBtn = document.querySelector("#she-btn");
const sendBtn = document.querySelector(".send-btn");
const inputField = document.querySelector(".input-field");
const chatArea = document.querySelector(".chat-area");
const welcomeScreen = document.querySelector(".welcome");
let currentUser = undefined;
let antiUser = undefined;

heBtn.addEventListener("click", () => {
  currentUser = "he";
  antiUser = "she";

  welcomeScreen.classList.remove("active");

  update(onlineStatusInDb, {
    [currentUser]: true,
  });

  loadData();

  // check status
  toggleActiveStatus();
});

sheBtn.addEventListener("click", () => {
  currentUser = "she";
  antiUser = "he";

  welcomeScreen.classList.remove("active");

  update(onlineStatusInDb, {
    [currentUser]: true,
  });

  loadData();

  // check status
  toggleActiveStatus();
});

sendBtn.addEventListener("click", () => {
  let inputMsg = inputField.value;
  inputField.value = "";

  push(chatsInDb, {
    user: `${currentUser}`,
    text: `${inputMsg}`,
    dateAndTime: `${new Date()}`,
    seen: false,
  });

  // to prevent input from losing focus after sending a msg
  inputField.focus();
});

function loadData() {
  onValue(chatsInDb, function (snapshot) {
    if (snapshot.exists()) {
      let chatsArray = Object.entries(snapshot.val());
      chatArea.innerHTML = "";

      // load only limited messages..
      const chatLimit = 100;
      if (chatsArray.length > chatLimit) {
        for (
          let i = chatsArray.length - 1;
          i >= chatsArray.length - chatLimit;
          i--
        ) {
          createChat(chatsArray, i);
        }
      } else {
        for (let i = chatsArray.length - 1; i >= 0; i--) {
          createChat(chatsArray, i);
        }
      }

      scrollToBottom();

      // read receipts update
      for (let i = 0; i < chatsArray.length; i++) {
        let chatUser = chatsArray[i][1].user;

        if (currentUser != chatUser) {
          let chatId = chatsArray[i][0];
          let chatLocationInDb = ref(database, `chat/${chatId}`);
          update(chatLocationInDb, {
            seen: true,
          });
        }
      }
    } else {
      console.log("snapshot doesn't exists");
    }
  });
}

function createChat(chatData, index) {
  let chatId = chatData[index][0];
  let chatUser = chatData[index][1].user;
  let chatText = chatData[index][1].text;
  let chatDateandTime = chatData[index][1].dateAndTime;
  let chatTime = chatDateandTime.split(" ")[4];
  let seenStatus = chatData[index][1].seen;

  let message_box = document.createElement("div");
  message_box.classList.add("message-box");
  chatArea.append(message_box);

  let message = document.createElement("div");
  message.classList.add("message", `${chatUser}`);
  message_box.append(message);

  let text = document.createElement("div");
  text.classList.add("text");
  text.innerText = `${chatText}`;
  message.append(text);

  let spaceSpan = document.createElement("span");
  spaceSpan.classList.add("space");
  spaceSpan.innerHTML = `&nbsp &nbsp &nbsp &nbsp &nbsp `;
  text.append(spaceSpan);

  let timeSpan = document.createElement("span");
  timeSpan.classList.add("time");
  timeSpan.innerHTML = `${chatTime.split(":").slice(0, 2).join(":")}&nbsp;`;
  text.append(timeSpan);

  let seenTick = document.createElement("i");
  seenTick.classList.add("fa-solid", "fa-check-double", "read-receipt");

  if (currentUser == chatUser) {
    timeSpan.append(seenTick);
    message.style.justifyContent = "flex-end";
  }

  // update msg seen status
  if (seenStatus) {
    seenTick.style.color = "rgba(0, 195, 255, 0.6)";
  }
}

function scrollToBottom() {
  chatArea.scrollTop = chatArea.scrollHeight;
}

function toggleActiveStatus() {
  // Check if the Page Visibility API is supported

  if (typeof document.hidden !== "undefined") {
    // Browser supports Page Visibility API

    // Handle page visibility change
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        // Page is visible, user is active
        update(onlineStatusInDb, {
          [currentUser]: true,
        });
        console.log("User is active");
      } else {
        // Page is hidden, user is inactive
        update(onlineStatusInDb, {
          [currentUser]: false,
        });
        console.log("User is offline");
      }
    });
  } else {
    // Browser does not support Page Visibility API
    // Fallback to focus and blur events

    // Handle focus event
    window.addEventListener("focus", function () {
      // User is active
      update(onlineStatusInDb, {
        [currentUser]: true,
      });
      console.log("User is active");
    });

    // Handle blur event
    window.addEventListener("blur", function () {
      // User is inactive
      update(onlineStatusInDb, {
        [currentUser]: false,
      });
      console.log("User is offline");
    });
  }
}
