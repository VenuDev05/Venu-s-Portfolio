
  const socket = io();

  const createInput = document.getElementById("createGroupInput");
  const createBtn = document.getElementById("createGroupBtn");
  const joinInput = document.getElementById("groupInput");
  const joinBtn = document.getElementById("joinGroupBtn");
  const groupList = document.getElementById("groupList");

  const groupSelection = document.getElementById("group-selection");
  const chatContainer = document.getElementById("chat-container");
  const input = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const messages = document.getElementById("messages");

  let username = prompt("Enter your name:");
  if (!username) username = "Unknown";

  let currentGroup = "";

  // Request active group list
  socket.emit("get groups");

  createBtn.addEventListener("click", () => {
    const groupName = createInput.value.trim();
    if (groupName !== "") {
      socket.emit("create group", groupName);
      joinGroup(groupName);
    }
  });

  joinBtn.addEventListener("click", () => {
    const groupName = joinInput.value.trim();
    if (groupName !== "") {
      joinGroup(groupName);
    }
  });

  function joinGroup(groupName) {
    currentGroup = groupName;
    socket.emit("join room", groupName);
    groupSelection.style.display = "none";
    chatContainer.style.display = "flex";
    messages.innerHTML = ""; // Clear chat history
  }

  sendBtn.addEventListener("click", () => {
    const msg = input.value;
    if (msg.trim() !== "") {
      socket.emit("chat message", { group: currentGroup, user: username, text: msg });
      input.value = "";
    }
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });

  socket.on("chat message", (data) => {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message", data.user === username ? "sent" : "received");

    const userElem = document.createElement("div");
    userElem.classList.add("username");
    userElem.textContent = data.user;

    const textElem = document.createElement("div");
    textElem.classList.add("text");
    textElem.textContent = data.text;

    messageWrapper.appendChild(userElem);
    messageWrapper.appendChild(textElem);
    messages.appendChild(messageWrapper);
    messages.scrollTop = messages.scrollHeight;
  });

  socket.on("group list", (groups) => {
    groupList.innerHTML = "";
    groups.forEach(group => {
      const li = document.createElement("li");
      li.textContent = group;
      li.style.cursor = "pointer";
      li.onclick = () => joinGroup(group);
      groupList.appendChild(li);
    });
  });
