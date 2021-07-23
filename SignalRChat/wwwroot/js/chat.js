"use strict";

//import * as signalR from "@microsoft/signalr";

let connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

let messageNumber = 0;

connection.on("ReceiveMessage", function (user, message) {
    let messageElement = document.createElement("div");
    messageElement.className = "alert alert-primary";
    messageElement.role = "alert";
    document.getElementById("messagesList").appendChild(messageElement);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
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