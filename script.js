let currentUser = "";
$(function () {
    var socket = io();
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    socket.on("current user", function (username) {
      currentUser = username;
      document.cookie = `username=${currentUser};max-age=${60 * 60};`;
      console.log(document.cookie);
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
   
    socket.on("user connected", function (users) {
      $("#users").empty();
      $("#users").append(
        `<div style="font-weight:bold;" class="${currentUser}">${currentUser} (You)</div>`
      );
      users.forEach((u) => {
 
        if (u !== currentUser) {
          $("#users").append(`<div class="${u}">${u}</div>`);
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
    if (currentUser === user) {
      return `<div class="chat-item">
                <div class="content-wrapper c-you">
                    <div class="message m-you">${msg}</div>
                    <div class="user-wrapper">
                        <span style="color:${color};" class="user ${user} ${user}-color u-you">${user}</span>
                        <span style="color:#353535">${time}</span>
                    </div>
                </div>
              </div>`;
    } else {
      return `<div class="chat-item">
                <div class="content-wrapper">
                    <div class="user-wrapper">
                        <span style="color:${color};" class="user ${user} ${user}-color">${user}</span>
                        <span style="color:#353535">${time}</span>
                    </div>
                    <div class="message">${msg}</div>
                </div>
              </div>`;
    }
  }