function getResponse(userInput) {
let splitMessage = userInput.toLowerCase().split(/\s|[,:;.?!-_]\s*/);
let response = checkAllMessages(splitMessage);
return response;
}

function messageProbability(userMessage, recognizedWords, singleResponse = false, requiredWords = []) {
let messageCertainty = 0;
let hasRequiredWords = true;

for (let word of userMessage) {
    if (recognizedWords.includes(word)) {
        messageCertainty += 1;
    }
}

let percentage = messageCertainty / recognizedWords.length;

for (let word of requiredWords) {
    if (!userMessage.includes(word)) {
        hasRequiredWords = false;
        break;
    }
}

if (hasRequiredWords || singleResponse) {
    return parseInt(percentage * 100);
} else {
    return 0;
}
}

function checkAllMessages(message) {
let highestProb = {};

function response(botResponse, listOfWords, singleResponse = false, requiredWords = []) {
    highestProb[botResponse] = messageProbability(message, listOfWords, singleResponse, requiredWords);
}

response('Que quieres ahora pesado', ['hola'], true);
response('La de infojobs te la sabes?', ['mira', 'que', 'meme'], false, ['meme']);
response('Macho es que deberias hacerte informatico tronco', ['Mira', 'lo', 'que', 'he', 'hecho', 'He', 'vuelto', 'a', 'programar', 'Volví', 'a', 'python'], true);
response('Eres un puto notas macho', ['que', 'opinas', 'de', 'mi'], true);
response('La culpa es del capitalismo', ['Que', 'opinas', 'de', 'la', 'situación', 'geopolitica', 'actual'], false, ['geopolitica']);

let bestMatch = Object.keys(highestProb).reduce((a, b) => highestProb[a] > highestProb[b] ? a : b);

return highestProb[bestMatch] < 1 ? unknown() : bestMatch;
}

function unknown() {
let responses = ['Eres un puto personaje macho', '....', 'Delante de mi ensalada, ¿en serio?', 'Gendo did nothing wrong', 'Malditos Alemanes', 'Pipo'];
return responses[Math.floor(Math.random() * responses.length)];
}

function sendMessage() {
let userInput = document.getElementById('userInput').value;
if (userInput.trim() === '') return;

let chatbox = document.getElementById('chatbox');
let userMessageDiv = document.createElement('div');
userMessageDiv.className = 'message user';
userMessageDiv.textContent = 'You: ' + userInput;
chatbox.appendChild(userMessageDiv);

let botResponse = getResponse(userInput);
let botMessageDiv = document.createElement('div');
botMessageDiv.className = 'message bot';
botMessageDiv.textContent = 'Alexbot: ' + botResponse;
chatbox.appendChild(botMessageDiv);

document.getElementById('userInput').value = '';
chatbox.scrollTop = chatbox.scrollHeight;
}

document.getElementById('userInput').addEventListener('keydown', function(event) {
if (event.key === 'Enter') {
    sendMessage();
}
});