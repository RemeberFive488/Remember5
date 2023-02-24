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
  //

  const message = userInput.value;

  //Only add the chat bubble if user input is not empty
  //
  if (message.trim().length > 0) {

      // Create a new div element to hold the message
      const newMessageBubble = document.createElement("div");
      newMessageBubble.classList.add("message");

      // Create a new paragraph element and avatar to hold the new message to be displayed
      //
      const newMsg = document.createElement("p");
      const avatarAdd = document.createElement("img")

      avatarAdd.src = "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
      avatarAdd.classList.add("circle", "responsive-img", "avatar")
      newMsg.classList.add("newMsg", "blue", "center", "white-text");
      newMsg.textContent = message;

      // Create a new div element to hold the message options
      const likeSystem = document.createElement("div");
      likeSystem.classList.add("likeSystem");

      // Create the thumb up and thumb down icons
      //

      const thumbUp = document.createElement("a");
      thumbUp.classList.add("badge", "material-icons", "waves-effect", "waves-light", "thumbup");
      thumbUp.textContent = "thumb_up";

      const thumbDown = document.createElement("a");
      thumbDown.classList.add("badge", "material-icons", "waves-effect", "waves-light", "thumbdown");
      thumbDown.textContent = "thumb_down";

      // Append everything to the chat bubble
      //

      newMessageBubble.appendChild(avatarAdd)
      newMessageBubble.appendChild(newMsg);
      likeSystem.appendChild(thumbUp);
      likeSystem.appendChild(thumbDown);
      newMessageBubble.appendChild(likeSystem);

      // Append the message container to the chatroom container
      //
      chatroomContainer.appendChild(newMessageBubble);

      // Clear the message input
      //
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