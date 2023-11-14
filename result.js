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

function downloadFile() {
var fileUrl = 'ANSWER.pdf'; // Replace with the actual path to your file
var fileName = 'ANSWER.pdf'; // Replace with the desired name for the downloaded file

var link = document.createElement('a');
link.href = fileUrl;
link.download = fileName;

document.body.appendChild(link);

link.click();

document.body.removeChild(link);
}

function showResult()
{
    var diem = getCookie("userPoint");
    document.getElementById('diem').innerHTML = "Điểm: " + diem + "/100";
    document.getElementById('socau').innerHTML = "Đúng: " + diem/4 + "/25";
}

var viewResultsCheck = false;

function viewResults() {
    if (viewResultsCheck)
    {   
        document.getElementById('re-area').style.display = "none";
        viewResultsCheck = false;
        return;
    }
    viewResultsCheck = true;
    document.getElementById("re-area").style.display = "block";
    var userAnswers = JSON.parse(getCookie("userAnswer"));
    var totalQuestions = getCookie("totalQuestions");
    var resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        for (var i = 0; i < totalQuestions; i++) {
            if (data[i].options[userAnswers[i]] == data[i].correctAnswer)
                resultContainer.innerHTML += '<p style="color: green;"><strong>Question ' + (i + 1) + ':</strong> ' +
                    '<u>Your Answer:</u> ' + data[i].options[userAnswers[i]] +
                    ', <u>Correct Answer:</u> ' + data[i].correctAnswer + '</p>';
            else 
                resultContainer.innerHTML += '<p style="color: red;"><strong>Question ' + (i + 1) + ':</strong> ' +
                '<u>Your Answer:</u> ' + (userAnswers[i] != null ? data[i].options[userAnswers[i]] : 'Not answered') +
                ', <u>Correct Answer:</u> ' + data[i].correctAnswer + '</p>';
            
        }
    })
    .catch(error => console.error('Error fetching questions:', error));

    
}
