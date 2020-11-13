let onlineUsers = [];
let chatLog = [];
let userCookie = null;


var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var { replaceEmoticons } = require('emoticon-to-emoji');
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  userCookie = req.cookies.username;
  console.log(req.cookies.username + "here")
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get("/script.js", function (req, res) {
    res.sendFile(__dirname + "/script.js");
});

app.get("/style.css", function (req, res) {
  res.sendFile(__dirname + "/style.css");
});

app.get("/paper-plane.png", function (req, res) {
  res.sendFile(__dirname + "/paper-plane.png");
});


io.on('connection', (socket) => {
    let username = "";
    let color = "";

    if (userCookie && !onlineUsers.includes(userCookie)) {
      console.log(userCookie)
      username = userCookie;
    }
    else{
      username = `user${onlineUsers.length}`
      console.log(username)
    }
    
    onlineUsers.push(username);

    socket.emit("current user", username);
    
    io.emit("user connected", onlineUsers);
    console.log(userCookie)
    chatLog.forEach((c) => {
        socket.emit("chat message", c);
    });

    socket.on('chat message', (msg) => {
    admin = false;
    admin_color = false;
    admin_name = false;
    
      let timestamp = new Date(Date.now()).toLocaleString(undefined, {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      let findColor = /^\/color\s/;
      let findHex = /^[a-fA-F0-9]{6}$/;
      let findName = /^\/name\s/;

      if (msg.search(findName) > -1) {
        let newUserName = msg.replace(findName, "");

        if (onlineUsers.includes(newUserName)) {
          admin = true;
          admin_name = true;
        }

        else if (newUserName.trim().length === 0) {
          admin = true;
          admin_name = true;
        } else {
          newUserName = newUserName.replace(" ", "_");
  
          onlineUsers = onlineUsers.filter((u) => u != username);
          onlineUsers.push(newUserName);
          
          socket.emit("current user", newUserName);
          io.emit("user connected", onlineUsers);
          io.emit("username update", { newUserName, username });
          
          chatLog.forEach((c) => {
            if (c.username === username) {
              c.username = newUserName;
            }
          });

          username = newUserName;
        }
      }
      if (msg.search(findColor) > -1) {
        let newColor = msg.replace(findColor, "");

        if (newColor.trim().length === 0 || newColor.search(findHex) === -1) {
          admin = true;
          admin_color = true;
        } else {
          console.log(newColor)
          newColor = `#${newColor}`;
  
          io.emit("update color", { newColor, username });
          
          color = newColor;
        }
      }
          msg = replaceEmoticons(msg);
          let mssgInfo = { msg, timestamp, username, color };

          if (chatLog.length == 200) {
            chatLog.shift();
          }
          chatLog.push(mssgInfo);
  
          io.emit("chat message", mssgInfo);
          
        if(admin){
          admin = false;
          if(admin_name){
            admin_msg = "That username is taken or is invalid, please try again";
            admin_name = false;
          }
          else if(admin_color){
            admin_msg = "Invalild colour, please try again";
            admin_color= false;
          }
          admin_tag="chat-room bot";
          adminMssgInfo = {admin_msg , timestamp, admin_tag, color };
          if (chatLog.length == 200) {
            chatLog.shift();
          }
          chatLog.push(mssgInfo);
          io.emit("admin message", adminMssgInfo );
        }
    });

    socket.on("disconnect", () => {
 
        onlineUsers = onlineUsers.filter((u) => u != username );
    
        io.emit("user connected", onlineUsers);
    });
  });


http.listen(3000, () => {
  console.log('listening on *:3000');
});