$(document).ready(function(){

let correctCount = 0;
let incorrectCount = 0;
let unanswered = 0;
let currentQuestion = 0;
var intvervalID;
var timer = 10;
// let newArray = [ ];
// let holder = [ ];
let running = false;
let pick;


//create an array of objects, with each object being the question with one right answer, 3 wrong answers, and an identifier

const myQuestions = [
    {
        question: "What year was the Spanish Armada?",
        answers: {
            a: '1645',
            b: '1588',
            c: '1713',
            d: '1456'
        },
        correctAnswer: 'b',
        longAnswer: 'The Spanish Armada took place in 1588.',
        picture: 'Assets/images/spanishArmada.jpg'
    },
    {
        question: "What year did Neil Armstrong and Buzz Aldrin land on the moon?",
        answers: {
            a: 'Never',
            b: '1958',
            c: '1972',
            d: '1969'
        },
        correctAnswer: 'd',
        longAnswer: 'Apollo 11 landed on the moon on July 20, 1969.',
        picture: 'Assets/images/lunarLanding.jpg'
    },
    {
        question: "Who was the second President of the United States?",
        answers: {
            a: 'Thomas Jefferson',
            b: 'John Adams',
            c: 'James Madison',
            d: 'Benjamin Franklin'
        },
        correctAnswer: 'b',
        longAnswer: 'John Adams was the second President of the United States.',
        picture: 'Assets/images/johnAdams.jpg'
    },
    {
        question: "Who was not a leader for the Texans during the Texas Revolution?",
        answers: {
            a: 'Stephen F. Austin',
            b: 'Sam Houston',
            c: 'John Bastrop',
            d: 'William Travis'
        },
        correctAnswer: 'c',
        longAnswer: 'John Bastrop was not a leader of the Texas Revolution.',
        picture: 'Assets/images/texasRevolution.jpg'
    },
    {
        question: "What agreement created the Republic of Texas?",
        answers: {
            a: 'Treaties of Velasco',
            b: 'The Mexican Accord',
            c: 'The Treaty of the Nueces',
            d: 'The Travis Accords'
        },
        correctAnswer: 'a',
        longAnswer: 'The Treaties of Velasco created the Republic of Texas.',
        picture: 'Assets/images/texas.jpg'
    },
    {
        question: "What year was the Battle of the Alamo in San Antonio, Texas?",
        answers: {
            a: '1834',
            b: '1842',
            c: '1838',
            d: '1836'
        },
        correctAnswer: 'd',
        longAnswer: 'The Battle of the Alamo was fought between February 23rd and March 6th in 1836.',
        picture: 'Assets/images/alamo.png'
    },
    {
        question: "Which Supreme Court case upheld the concept of Judicial Review?",
        answers: {
            a: 'Marbury v. Madison',
            b: 'McCulloch v. Maryland',
            c: 'Brown vs Board of Education',
            d: 'Cohens v. Virginia'
        },
        correctAnswer: 'a',
        longAnswer: 'The landmark case of Marbury v. Madison cemented the concept of Judicial Review and was a key moment in American history.',
        picture: 'Assets/images/justice.jpg'
    },
    {
        question: "Which Supreme Court Justice of the United States was Secretary of State under President John Adams?",
        answers: {
            a: 'Roger Taney',
            b: 'John Marshall',
            c: 'James Madison',
            d: 'Clarence Darrow'
        },
        correctAnswer: 'b',
        longAnswer:  'John Marshall was arguable the most influential Supreme Court Justice in history, but was also previously Sectretary of State under John Adams.',
        picture: 'Assets/images/johnMarshall.jpg'
    },
    {
        question: "What year was the Invasion of Normandy?",
        answers: {
            a: '1944',
            b: '1942',
            c: '1919',
            d: '1941'
        },
        correctAnswer: 'a',
        longAnswer: 'The Invastion of Normandy began on June 6, 1944. ',
        picture: 'Assets/images/invasionOfNormandy.jpg'
    },
    {
        question: "In what year was King Louis XVI of France excuted by guillotine?",
        answers: {
            a: '1726',
            b: '1534',
            c: '1793',
            d: '1687'
        },
        correctAnswer: 'c',
        longAnswer:  'A key moment in the French Revolution, King Louis XVI was executed  on January 21, 1793.',
        picture: 'Assets/images/kingLouis.jpg'
    }

    
]

//FUNCTIONS
function resetGame(){
    correctCount = 0;
    incorrectCount = 0;
    unanswered = 0;
    currentQuestion = 0;
    timer=10;
    running = false;

    $('#question').empty();
    $('#answer1').empty();
    $('#answer2').empty();
    $('#answer3').empty();
    $('#answer4').empty();
    $('#image-view').empty();        
        

    $('#question').html("<button id='start' type='button' class='btn btn-danger btn-md btn-primary-spacing'>Start</button>");
    $('#start').on('click', function(){
        showQuestion();
    });
    
}

function showQuestion(){
    if(correctCount + incorrectCount + unanswered === myQuestions.length){
        showEnd();
    } else{
    let i = currentQuestion;
    pick = myQuestions[i];
        startTimer();
        $('#question').html("<p class='questions'>" + pick.question + "<p>");
        $('#answer1').html("<button id='buttonA' type='button' class='btn btn-danger btn-md btn-primary-spacing'>" + pick.answers.a +"</button>");
        $('#answer2').html("<button id='buttonB' type='button' class='btn btn-danger btn-md btn-primary-spacing'>" + pick.answers.b +"</button>");
        $('#answer3').html("<button id='buttonC' type='button' class='btn btn-danger btn-md btn-primary-spacing'>" + pick.answers.c +"</button>");
        $('#answer4').html("<button id='buttonD' type='button' class='btn btn-danger btn-md btn-primary-spacing'>" + pick.answers.d +"</button>");        
        $('#image-view').empty();
        checkAnswer();
    }
}



function startTimer(){
    if(!running){
        intvervalID = setInterval(decrement, 1000);
        running = true;
    }
}

function decrement(){
    timeDisplay = timer - 1;
    $('#timer').html("<h4>Time remaining: " + timeDisplay + "</h4>");
    timer--;
    if(timer ===0) {
        unanswered++;
        stop();
        showAnswer();
    }
}

function stop() {
    running = false;
    clearInterval(intvervalID);
}


function checkAnswer(){
    let i = currentQuestion;
    $('#buttonA').on('click',function(){
        stop();
        if(myQuestions[i].correctAnswer === 'a'){
            correctCount++;
            $('#question').html("<p class='rightOrWrong'> Correct! <p>");
            showAnswer();
        } else {
            incorrectCount++;
            $('#question').html("<p class='rightOrWrong'> Wrong answer! <p>");
            showAnswer();
        }
    })

    $('#buttonB').on('click',function(){
        stop();
        if(myQuestions[i].correctAnswer === 'b'){
            correctCount++;
            $('#question').html("<p class='rightOrWrong'> Correct! <p>");
            showAnswer();
        } else {
            incorrectCount++;
            $('#question').html("<p class='rightOrWrong'> Wrong answer! <p>");
            showAnswer();
        }
    })
    
    $('#buttonC').on('click',function(){
        stop();
        if(myQuestions[i].correctAnswer === 'c'){
            correctCount++;
            $('#question').html("<p class='rightOrWrong'> Correct! <p>");
            showAnswer();
        } else {
            incorrectCount++;
            $('#question').html("<p class='rightOrWrong'>Wrong answer! <p>");
            showAnswer();
        }
    })

    $('#buttonD').on('click',function(){
        stop();
        if(myQuestions[i].correctAnswer === 'd'){
            correctCount++;
            $('#question').html("<p class='rightOrWrong'> Correct! <p>");
            showAnswer();
        } else {
            incorrectCount++;
            $('#question').html("<p class='rightOrWrong'> Wrong answer! <p>");
            showAnswer();
        }
    })
}

function showAnswer(){
    i=currentQuestion;
    $('#answer1').html("<p class='rightOrWrong'>" + pick.longAnswer + "</p>");
    $('#answer2').html("<p>Number of questions answered correctly: " + correctCount + "</p>");
    $('#answer3').html("<p>Number of questions answered incorrectly: " + incorrectCount + "</p>");
    $('#answer4').html("<p>Number of questions timed out: " + unanswered + "</p>");  
    $('#image-view').html("<img class='picAnswer' src='" + pick.picture + "'>");      
    startTimer2();

}

function startTimer2(){
    setTimeout(threeSeconds,3000);
}

function threeSeconds(){
    currentQuestion = currentQuestion + 1;
    timer =10;
    showQuestion();
}


function showEnd(){
    console.log('Game Ended');
    let percentScore = correctCount / myQuestions.length * 100;
    let score = percentScore.toFixed(0);
    let messages = ['Great job!', 'Satisfactory result.', 'Better hit the books!', 'Ask for your tuition back!']
    let message;
    if(score > 89){ message = messages[0]} else {
        if(score>79) {message = messages[1]} else {
            if(score>50) {message = messages[2]} else {
                message = messages[3];
            } 
        }

    }

    $('#question').html("<p class='rightOrWrong'> Game Over! <p>");
    $('#answer1').html("<p id='message'>You scored " + score + "%!  " + message + "</p>");
    $('#answer2').html("<p>Number of questions answered correctly: " + correctCount + "</p>");
    $('#answer3').html("<p>Number of questions answered incorrectly: " + incorrectCount + "</p>");
    $('#answer4').html("<p>Number of questions timed out: " + unanswered + "</p>");   
    $('#timer').html("<h4>Time remaining: 0 </h4>")
    $('#image-view').html("<button id='tryAgain' type='button' class='btn btn-danger btn-md btn-primary-spacing'>Try Again</button>");
    $('#tryAgain').on('click', function(){
        resetGame();
    });
}

resetGame();
$('#question').html("<button id='start' type='button' class='btn btn-danger btn-md btn-primary-spacing'>Start</button>");
$('#start').on('click', function(){
    showQuestion();
});


})

//Creat a function to initialize the game
    //reset the scores to zero
    //create a button to start the game
    //initilize a variable for the questions to be pulled
    //first create a function that grabs the first question from the array and puts it into the HTML
    //create a timer and displayit on the screen
    // if the timer runs say time is up and show right answer, and to unanswered
    //if they anser wron, tell the incorrect an show them right answer add to incorrectCount
    //if they answerd correctly, say corret and move to next question, add to correctCount

    //add timer for message
    //at end of message timer, create back to new question
