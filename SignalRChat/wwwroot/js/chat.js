"use strict";

// import * as signalR from "@microsoft/signalr";

let connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

// set the message number as zero on init
let messageNumber = 0;

connection.on("ReceiveMessage", function (user, message) {
    let messageElement = document.createElement("div");
    messageElement.className = "alert alert-primary";
    messageElement.role = "alert";
    document.getElementById("messagesList").appendChild(messageElement);
    // TODO shift message ltr or rtl based on the user
    messageElement.textContent = `${messageNumber++}: ${user}: ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    let user = document.getElementById("userInput").value;
    let message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});