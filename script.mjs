const chaatInput = document.querySelector(".chat-input textarea");
const sendChaatBtn = document.querySelector(".chat-input span");
const chaatbox = document.querySelector(".chatbox");


const createChaatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className == "outgoing" ? `<p>${message}</p>` : `<span class = "material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}


let responseIndex = 0; // Start from the first response

const handleChaat = () => {
    let userMessaage = chaatInput.value.trim();
    if (!userMessaage) return;

    // Display user message
    chaatbox.appendChild(createChaatLi(userMessaage, "outgoing"));

    // Define the responses array
    let responses = [
        "Completing that purchase would put you in danger of overspending and exceeding your budget. These are the possible scenarios: 1. Complete the purchase using a revised budget. 2. Don't complete the purchase and continue your current budget. Which option would you like to choose?",
        "That's a wise financial decision, let me know if you need anything else."
    ];

    // Check if there are remaining responses
    if (responseIndex < responses.length) {
        chaatbox.appendChild(createChaatLi(responses[responseIndex], "incoming"));
        responseIndex++; // Move to the next response for the next time handleChat is called
    }
};

sendChaatBtn.addEventListener("click", handleChaat);