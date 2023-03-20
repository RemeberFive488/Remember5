$(document).ready(function() {

  const firebaseConfig = {
    apiKey: "AIzaSyBxoV0Qji0j8GjG2N4jqYWWUtmUnN1Qyec",
    authDomain: "remember5-321e2.firebaseapp.com",
    projectId: "remember5-321e2",
    storageBucket: "remember5-321e2.appspot.com",
    messagingSenderId: "363183328287",
    appId: "1:363183328287:web:3f597b880859c5eb18192a",
    measurementId: "G-XPX3Y2K184"
  };
       
      firebase.initializeApp(firebaseConfig)
      const db = firebase.firestore()
      db.settings({});

      const auth = firebase.auth();


      var currentUser = ""
      auth.onAuthStateChanged(user => {
          if (user) {
            console.log('User logged in: ', user);
            currentUser = user.displayName
            console.log(user.displayName)
          } else {
            console.log('User logged out');
          }
        })

  const chatroomMessagesRef = db.collection('ChatroomMessages');
  chatroomMessagesRef.get().then((snapshot) => {
     highestMessageCount = snapshot.size;
  }).catch((error) => {
    console.error('Error getting document count:', error);
  });

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
  $("#emoji-picker-button").click(() => {
    $("#emoji-picker").modal("open");
  });
  
  
  
  // // Open file picker
  // $("#file-attach-button").click(() => {
  //   $("#file-attach-input").click();
  // });
  
  var currentUserScrollPosition = 0;


//-----------Retrivew current messages-------///

// Function to render a message on the screen

var count = 0;

function renderMessage(data) {
  console.log(data)
  console.log("data length", data.length, "data", data)
  const chatroomContainer = document.getElementById("theChatroom");
  
  for (let i = 0; i < data.length; i++) {
    const message = data[i].message;
    const username = data[i].username;
    const time = data[i].time;
    const id = data[i].id;
    
    // Check if the message is already displayed
    if (document.getElementById(id)) {
      continue;
    }
    
    // Check if the message was sent by the current user and only display it once
    if (username === currentUser && count > 0) {
      continue;
    } else {
      // Create a new div element to hold the message
      const newMessageBubble = document.createElement("div");        
      newMessageBubble.classList.add("message");
      newMessageBubble.innerHTML = 
      `
      <p class="newMsg blue left white-text">${message}</p>
      `;

      const userInfo = document.createElement("div");
      userInfo.innerHTML = 
      `
      <div>
        <p class="left red-text">${username}</p>
        <br>
        <p class="left orange-text">${time}</p>
      </div>
      `;

      // Set the ID of the message element to the document ID
      newMessageBubble.setAttribute("id", id);
      
      // Append the message container to the chatroom container
      chatroomContainer.appendChild(userInfo);
      chatroomContainer.appendChild(newMessageBubble);

      var currentChatroomMaxScrollHeight = chatroomContainer.scrollHeight;

      if ((currentChatroomMaxScrollHeight - currentUserScrollPosition) >= 600) {
        //Don't scroll down if the user is reading chat history
      } else {
        //Scroll to the bottom if the user is at the bottom of the scroll bar
        $("#theChatroom").animate({ scrollTop: $("#theChatroom").prop("scrollHeight")}, 0);
      }
    }
  }
  count++;
}

function getMessages() {
  const chatroomMessagesRef = db.collection("ChatroomMessages");
  
  // Listen for new messages and update the chatroom in real-time
  chatroomMessagesRef.onSnapshot((snapshot) => {
    var messages = []
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("new message added")
        const message = change.doc.data();
        message.id = change.doc.id; 
        messages.push(message);
      }
    });

    // Sort the messages in increasing order based on the value of {number} in the document ID
    messages.sort((a, b) => {
      const aNumber = parseInt(a.id.split("_")[0]);
      const bNumber = parseInt(b.id.split("_")[0]);
      return aNumber - bNumber;
    });

    renderMessage(messages)
  });
}


// Call getMessages() to display all messages in the database on screen
getMessages();


//-----------Retrivew current messages end-------///

  
  // ----------------------- Code to add messages ----------------------- //
  
  // Get references to the form and input elements
  const messagingArea = document.getElementById("messagingArea");
  const userInput = document.getElementById("userInput");
  
  // Get a reference to the chatroom container element
  const chatroomContainer = document.getElementById("theChatroom");
  
  chatroomContainer.addEventListener("scroll", (event) => {
      currentUserScrollPosition = chatroomContainer.scrollTop;
  });
  
  
  // Add a submit event listener to the form
  //
  
  messagingArea.addEventListener("submit", (event) => {
    event.preventDefault();
    var currentChatroomMaxScrollHeight = chatroomContainer.scrollHeight;
  
  
    // Get the contents of the user's message
    
  
    var message = userInput.value;
  
    //Only add the chat bubble if user input is not empty
    
  
    if (message.trim().length > 0) {

      var timestamp = new Date().toLocaleTimeString();

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
  

      const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
      const formattedDate = new Date().toLocaleDateString('en-US', options).replace(',', '');
      console.log(formattedDate)

      const chatroomMessagesRef = db.collection('ChatroomMessages');

      // Get the current document count
      chatroomMessagesRef.get().then((snapshot) => {
        const documentCount = snapshot.size;

        // Create the new document name
        const documentName = `${documentCount + 1}_${currentUser}`;

        //Add the new document with the specified fields
        chatroomMessagesRef.doc(documentName).set({
          MMDDYYYY: formattedDate,
          message: message,
          time: timestamp,
          username: currentUser,
        }).then(() => {
          console.log(`Document written with ID: ${documentName}`);
        }).catch((error) => {
          console.error('Error adding document:', error);
        });
      }).catch((error) => {
        console.error('Error getting document count:', error);
      });

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