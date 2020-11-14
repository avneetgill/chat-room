let myUser = "";
$(function () {
    var socket = io();
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    socket.on("current user", function (username) {
      myUser = username;
      document.cookie = `username=${myUser};max-age=${60 * 30};`;
      console.log(document.cookie + " script");
    });

    socket.on('admin message', function(msg){
      $("#messages").scrollTop($("#messages").height());
    
   
    let timestamp = msg.timestamp.replace(",", "").toLowerCase();

  
    let messageHtml = getMessageHTML(
      msg.admin_tag,
      timestamp,
      msg.admin_msg,
      msg.color
    );

  
    $("#messages").append(messageHtml);
    });
    
    socket.on('chat message', function(msg){
      $("#messages").scrollTop($("#messages").height());
    
    
    
    let timestamp = msg.timestamp.replace(",", "").toLowerCase();

  
    let messageHtml = getMessageHTML(
      msg.username,
      timestamp,
      msg.msg,
      msg.color
    );


    $("#messages").append(messageHtml);
    });
   
    socket.on("user connected", function (onlineUsers) {
      $("#onlineUsers").empty();
      $("#onlineUsers").append(
        `<div style="font-weight:bold;" class="${myUser}">${myUser} (ME)</div>`
      );
      
      $("#onlineUsers").append(`<div class=>************</div>`);
    
      onlineUsers.forEach((u) => {
        if (u !== myUser) {
          $("#onlineUsers").append(`<div class="${u}">${u}</div>`);
        }
      });
    });

    socket.on("update color", function (update) {
      $(`.${update.username}-color`).each(function () {
        this.style.color = update.newColor;
      });
    });
  


    socket.on("username update", function (update) {
      $(`.${update.username}`).each(function () {
        this.innerText = update.newUserName;
        $(this).addClass(update.newUserName).removeClass(update.username);
        $(this)
          .addClass(`${update.newUserName}-color`)
          .removeClass(`${update.username}-color`);
      });
    });
  });

  function getMessageHTML(user, time, msg, color) {
    if (myUser === user) {
      return `<div class="chat-div">
                <div class="m-wrapper c-you">
                    <div class="message from-me">${msg}</div>
                    <div class="user-wrapper">
                        <span style="color:${color};" class="user ${user} ${user}-color u-you">${user}</span>
                        <span style="color:#353535">${time}</span>
                    </div>
                </div>
              </div>`;
    } else {
      return `<div class="chat-div">
                <div class="m-wrapper">
                    <div class="user-wrapper">
                        <span style="color:${color};" class="user ${user} ${user}-color">${user}</span>
                        <span style="color:#353535">${time}</span>
                    </div>
                    <div class="message">${msg}</div>
                </div>
              </div>`;
    }
  }