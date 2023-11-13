var currentQuestion = 0;
var totalQuestions = 0;
var userAnswers = new Array(totalQuestions).fill(null);

function fetchQuestions() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            totalQuestions = data.length;
            userAnswers = new Array(totalQuestions).fill(null);
            showQuestion(currentQuestion);
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function showQuestion(questionNumber) {
    var questionContainer = document.getElementById('quiz-question');
    questionContainer.innerHTML = ''; // Clear previous question

    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        var questionData = data[questionNumber];
        questionContainer.innerHTML = questionData.question;

        var optionsList = document.querySelector('.options');
        optionsList.innerHTML = ''; // Clear previous options

        questionData.options.forEach(function (option, index) {
            var inputId = 'option' + (index + 1);
            var labelClass = 'opt' + (index + 1);

            var optionElement = document.createElement('li');
            optionElement.className = 'option';
            optionElement.innerHTML = '<input type="radio" name="answer" id="' + inputId +
                '" value="' + option + '" ' + (userAnswers[questionNumber] === option ? 'checked' : '') + '> ' +
                '<label class="' + labelClass + '" for="' + inputId + '">' + option + '</label>';

            optionElement.addEventListener('change', function () {
                userAnswers[questionNumber] = option;
            });

            optionsList.appendChild(optionElement);
        });
    })
    .catch(error => console.error('Error fetching questions:', error));
}

function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function processString(ans)
{
    var val = "";
    for (var i = 0; i < ans.length; i++)
        val += ans[i] + "|";
    return val;
}

function submitQuiz() {
    var score = 0;

    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        for (var i = 0; i < totalQuestions; i++) {
            console.log(userAnswers[i] === data[i].correctAnswer);
            if (userAnswers[i] === data[i].correctAnswer) {
                score += 4;
            }
        }
        setSessionCookie("userPoint", score);
        setSessionCookie("userAnswer", processString(userAnswers));
        setSessionCookie("totalQuestions", totalQuestions);
        window.location.href= "result.html";
    })
    .catch(error => console.error('Error fetching questions:', error));
}

// Function to set a session cookie
function setSessionCookie(cookieName, cookieValue) {
    document.cookie = cookieName + "=" + cookieValue + ";path=/";
}

// Function to get a cookie value
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}


