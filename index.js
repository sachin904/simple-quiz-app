import { quizData } from './data.js';  // Ensure data.js exists

let currentQuestionIndex = 0;
let score = 0; // Variable to track the score

// Function to load a question
function loadQuestion() {
    const currentQuestionData = quizData[currentQuestionIndex];

    // Deselect all radio buttons (clear the selection)
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach((radio) => radio.checked = false);  // Uncheck all radio buttons

    // Set the question number and text
    document.getElementById('questionNumber').innerHTML = `<h1>Question-${currentQuestionIndex + 1}</h1>`;
    document.getElementById('questionText').textContent = currentQuestionData.question;

    // Set the options text and value
    document.getElementById('option1').textContent = currentQuestionData.a;
    document.getElementById('op1').value = 'a';

    document.getElementById('option2').textContent = currentQuestionData.b;
    document.getElementById('op2').value = 'b';

    document.getElementById('option3').textContent = currentQuestionData.c;
    document.getElementById('op3').value = 'c';

    document.getElementById('option4').textContent = currentQuestionData.d;
    document.getElementById('op4').value = 'd';
}

// Function to handle submit and load the next question
function submitQuiz() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        const answer = selectedOption.value;  // Get selected option value
        if (answer === quizData[currentQuestionIndex].correct) {
            score++;  // Increment score if the answer is correct
        }

        // Move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();  // Load next question
        } else {
            showResult();  // Show the result at the end of the quiz
        }
    } else {
        alert('Please select an option!');
    }
}

// Function to show the result at the end of the quiz
function showResult() {
    const totalQuestions = quizData.length;
    
    // Clear the quiz content
    document.getElementById('questionContainer').innerHTML = `
        <h2>Quiz Completed</h2>
        <p>Your Score: ${score} out of ${totalQuestions}</p>
        <p>${(score / totalQuestions) * 100}% correct</p>
    `;
    
    // Hide the question number and submit button
    document.getElementById('questionNumber').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
}

// Load the first question when the page loads
window.onload = function() {
    loadQuestion();

    // Attach the event listener to the submit button
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);
};
