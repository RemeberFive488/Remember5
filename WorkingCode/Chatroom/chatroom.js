$(document).ready(function() {

  // Init Materialize 
  //
  M.AutoInit();
  
  // Array of emojis
  //
  const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛",
    "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐",
    "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔", "🤥", "😬", "🤐",
    "🤢", "🤧", "😷", "🤒", "🤕", "💩", "🙏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "👌", "👈", "👉", "👆", "👇", "👋"
  ];
  
  // Add emojis to the modal
  //
  emojis.forEach((e) => {
    const emojiElement = document.createElement("span");
    emojiElement.textContent = e;
    emojiElement.classList.add("emoji-span");
    emojiElement.addEventListener("click", (e) => {
  $("#userInput").val($("#userInput").val() + e.target.textContent);
  });
  $("#emoji-list").append(emojiElement);
  });
  
  // Open emoji modal
  //
  $("#emoji-picker-button").click(() => {
    $("#emoji-picker").modal("open");
  });
  
  
  
  // Open file picker
  //
  $("#file-attach-button").click(() => {
    $("#file-attach-input").click();
  });
  
  
  
  // ----------------------- Code to add messages ----------------------- //
  
  // Get references to the form and input elements
  const messagingArea = document.getElementById("messagingArea");
  const userInput = document.getElementById("userInput");
  
  // Get a reference to the chatroom container element
  const chatroomContainer = document.getElementById("theChatroom");
  
  
  let currentUserScrollPosition = 0;
  
  chatroomContainer.addEventListener("scroll", (event) => {
      currentUserScrollPosition = chatroomContainer.scrollTop;
  });
  
  
  // Add a submit event listener to the form
  //
  
  messagingArea.addEventListener("submit", (event) => {
    event.preventDefault();
    let currentChatroomMaxScrollHeight = chatroomContainer.scrollHeight;
  
  
    // Get the contents of the user's message
    
  
    const message = userInput.value;
  
    //Only add the chat bubble if user input is not empty
    
  
    const currentUser = "User1"
  
    if (message.trim().length > 0) {

      timestamp = new Date().toLocaleTimeString();

        // Create a new div element to hold the message
        const newMessageBubble = document.createElement("div");        
        newMessageBubble.classList.add("message");
        newMessageBubble.innerHTML = 
        `
        <p class="newMsg blue left white-text">${message}</p>
        
        `

        const userInfo = document.createElement("div")
        userInfo.innerHTML = 
        `
        <div>
          <p class="left red-text">${currentUser}</p>
          <br>
          <p class="left orange-text">${timestamp}</p>
        </div>

        `

        // Create a new paragraph element and avatar to hold the new message to be displayed


        /*const newMsg = document.createElement("p");
        newMsg.classList.add("newMsg", "blue", "center", "white-text");
        newMsg.textContent = message;
  
        const userName = document.createElement("p")
        userName.classList.add("orange-text", "left")
        userName.innerHTML = currentUser;

        // Append everything to the chat bubble
  
        newMessageBubble.appendChild(userName)
        newMessageBubble.appendChild(newMsg);*/
    
        // Append the message container to the chatroom container
          
        chatroomContainer.appendChild(userInfo)
        chatroomContainer.appendChild(newMessageBubble)

        // Clear the message input
        
        userInput.value = "";
  
        
        
        // Handle auto scrolling
        
      if ((currentChatroomMaxScrollHeight - currentUserScrollPosition) >= 600) {
        //Don't scroll down if the user is reading chat history
      } else {
        //Scroll to the bottom if the user is at the bottom of the scroll bar
        $("#theChatroom").animate({ scrollTop: $("#theChatroom").prop("scrollHeight")}, 0);
      }
  
    }
  });
  
  $('thumbup').click(() => {
    $(this).css('color', 'yellow');
  });
  $('thumbdown').click(() => {
    $(this).css('color', 'purple');
  });
  
  
  //// ------------------------------------------ ////
  
  });