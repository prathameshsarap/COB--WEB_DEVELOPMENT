let timerInterval;
let startTime;
let isTestActive = false;

// Array of quotes
const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is not about what you know; it's about what you can figure out.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "The only way to do great work is to love what you do.",
    "In three words I can sum up everything I've learned about life: it goes on.",
    "Life is what happens when you're busy making other plans.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It always seems impossible until it's done.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    // Add more quotes as needed
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function startTest() {
    if (isTestActive) {
        return; // Prevent starting a new test while one is already active
    }

    const originalText = getRandomQuote();
    document.getElementById('quote').innerText = originalText;
    document.getElementById('userInput').value = '';
    document.getElementById('result').innerHTML = '';

    startTime = new Date().getTime();
    isTestActive = true;

    timerInterval = setInterval(function () {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 1000; // in seconds

        updateTimerDisplay(elapsedTime);

        if (elapsedTime >= 60) {
            clearInterval(timerInterval);
            endTest(originalText);
            isTestActive = false;
        }
    }, 1000);
}

function calculateTypingSpeed(elapsedTime) {
    const userInput = document.getElementById('userInput').value.trim();
    const words = userInput.split(/\s+/); // Splitting by whitespace to count words
    const wordCount = words.length;
    
    // Calculate WPM (words per minute)
    const minutes = elapsedTime / 60;
    const wordsPerMinute = Math.round(wordCount / minutes);

    return wordsPerMinute;
}

function endTest(originalText) {
    const userInput = document.getElementById('userInput').value.trim();
    const elapsedTime = (new Date().getTime() - startTime) / 1000;
    const typingSpeed = calculateTypingSpeed(elapsedTime);

    if (userInput === originalText) {
        document.getElementById('result').innerHTML = `Your typing speed is ${typingSpeed} words per minute!`;
    } else {
        document.getElementById('result').innerHTML = 'Your typing is incorrect. Try again.';
    }
}

function submitTest() {
    if (!isTestActive) {
        return; // Do not submit if no test is active
    }

    clearInterval(timerInterval);
    isTestActive = false;
    const originalText = document.getElementById('quote').innerText.trim();
    endTest(originalText);
}

function resetTest() {
    clearInterval(timerInterval);
    document.getElementById('quote').innerText = '';
    document.getElementById('userInput').value = '';
    document.getElementById('timer').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    isTestActive = false;
}

function updateTimerDisplay(elapsedTime) {
    const minutes = Math.floor(elapsedTime / 60);
    const remainingSeconds = Math.round(elapsedTime % 60);
    const timerDisplay = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    document.getElementById('timer').innerHTML = timerDisplay;
}

// Initialize with a random quote on page load
document.getElementById('quote').innerText = getRandomQuote();
