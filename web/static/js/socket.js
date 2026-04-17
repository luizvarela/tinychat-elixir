// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":

import { Socket } from "phoenix"

let messageContainer = document.getElementById("messages")
const dataset = messageContainer.dataset

let socket = new Socket("/socket", {params: {username: dataset.username}})

socket.connect()

let messages = document.getElementById("messages")
let input = document.getElementById("input")
let room = messages.attributes["data-room"].value

// Now that you are connected, you can join channels with a topic:
// Topic is like a route in a controller
let channel = socket.channel(room, {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })


input.addEventListener("keyup", function(e){
  if (e.keyCode == 13) {
    console.log("enter");
    channel.push("msg", {body: input.value})
    input.value = ""
  }
})

channel.on("msg", function(message){
  console.log("Oi");
  // messages.innerHTML += `<div class=message>@${message.username} ${message.body}</div>`
  messages.innerHTML += `<div class="comment">
    <a class="avatar">
      <img src="http://semantic-ui.com/images/avatar/small/joe.jpg">
    </a>
    <div class="content">
      <a class="author">@${message.username}</a>
      <div class="text">
        ${message.body}
      </div>
    </div>
  </div>`
})

export default socket
