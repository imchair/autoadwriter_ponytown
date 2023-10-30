//MADE BY CHAIR (disc:im_chair/telegram:@im_chair)
let messageCount = 0;
let isChatOpen = false; 
let isSendingMessage = false; 

function click() {
  var event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  var element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2); 
  element.dispatchEvent(event);

  console.log("click");
}

function openChat() {
  const chatButton = document.querySelector(".chat-open-button button");

  if (chatButton) {
    chatButton.click();
    isChatOpen = true;
  }
}

function closeChat() {
  const closeButton = document.querySelector(".chat-close-button button");

  if (closeButton) {
    closeButton.click();
    isChatOpen = false;
  }
}

function sendMessage(statsText) {
  if (isChatOpen) {
    if (!isSendingMessage) {
      isSendingMessage = true;
      const textareaElement = document.querySelector("textarea[aria-label='Chat message']");

      if (textareaElement) {
        const statsTextWithoutFps = statsText.replace(/\d+\s?fps/, '');
        textareaElement.value = `${++messageCount} ${statsTextWithoutFps}`;

        const enterEvent = new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true,
          cancelable: true,
        });

        textareaElement.dispatchEvent(enterEvent);
        const sendButton = document.querySelector("ui-button[title='Send message (hold Shift to send without closing input)'] button");
        if (sendButton) {
          sendButton.click();
        }

        if (messageCount === 200) {
          location.reload();
        }
      }
      isSendingMessage = false;
    } else {
      setTimeout(sendMessage, 1000, statsText);
    }
  } else {
    openChat();
  }
}

function updateAndSendMessage() {
  const statsText = "your text"; 

  sendMessage(statsText);

  if (Math.random() < 0.39) {
    click(); 
  }
}

setInterval(updateAndSendMessage, 5000 + Math.random() * 2000);