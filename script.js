"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://chitpit-prsnl-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const chatsInDb = ref(database, "chat");

const heBtn = document.querySelector("#he-btn");
const sheBtn = document.querySelector("#she-btn");
const sendBtn = document.querySelector(".send-btn");
const inputField = document.querySelector(".input-field");
const chatArea = document.querySelector(".chat-area");
const welcomeScreen = document.querySelector(".welcome");
let currentUser = window.localStorage.userActive;

heBtn.addEventListener("click", () => {
  currentUser = "he";
  welcomeScreen.classList.remove("active");
  loadData();
});

sheBtn.addEventListener("click", () => {
  currentUser = "she";
  welcomeScreen.classList.remove("active");
  loadData();
});

sendBtn.addEventListener("click", () => {
  let inputMsg = inputField.value;
  inputField.value = "";

  push(chatsInDb, {
    user: `${currentUser}`,
    text: `${inputMsg}`,
  });
});

function loadData() {
  onValue(chatsInDb, function (snapshot) {
    if (snapshot.exists()) {
      let chatsArray = Object.values(snapshot.val());
      chatArea.innerHTML = "";

      for (let i = 0; i < chatsArray.length; i++) {
        let chatUser = chatsArray[i].user;
        let chatText = chatsArray[i].text;

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

        // aligning msgs
        if (currentUser == chatUser) {
          message.style.justifyContent = "flex-end";
        }
      }

      scrollToBottom();
    } else {
      console.log("snapshot doesnt exists");
    }
  });
}

function scrollToBottom() {
  chatArea.scrollTop = chatArea.scrollHeight;
}
