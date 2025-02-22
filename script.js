const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const API_Key = "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"
let userMessage;

let script = document.createElement('script');
script.src = 'script.js';
document.head.appendChild(script);

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className == "outgoing" ? `<p>${message}</p>` : `<span class = "material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_Key}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{role: "user", content: userMessage}]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "oops! I am having trouble understanding you. Please try again.";
    })
}
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
sendChatBtn.addEventListener("click", generateResponse);