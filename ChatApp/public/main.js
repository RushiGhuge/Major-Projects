const newUserBtn = document.getElementById("newUserBtn");
const inputUsername = document.getElementById("inputUsername");
const chatContainer = document.getElementById("chat-container");
const inputMassage = document.getElementById("inputMassage");
const sendBtn = document.getElementById("sendBtn");
const massages = document.getElementById("massages");
const SEND = "send";
const REC = "rec";

let socket = io();

newUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsername.value) {
    console.log(inputUsername.value);
    chatContainer.style.display = "block";
  }
  document.getElementById("form").style.display = "none";
});

// click event on the send button
sendBtn.addEventListener("click", (e) => {
  console.log(inputMassage.value);
  e.preventDefault();
  let data = {
    id: socket.id,
    userName: inputUsername.value,
    massage: inputMassage.value,
  };
  socket.emit("echo", data);
  renderMassage(data, SEND);
});

socket.on("echo", (data) => {
  if (data.id !== socket.id) {
    renderMassage(data, REC);
  }
});

// render massage function
function renderMassage(data, massageType) {
  let massageBox = document.createElement("div");
  massageBox.innerHTML = `<span>${data.userName}</span> <div>${data.massage}</div>`;
  if (massageType === SEND) {
    massageBox.className = "massage-send";
  } else {
    massageBox.className = "massage";
  }
  massages.appendChild(massageBox);
  inputMassage.value = "";
}
