let questionNumber = 0;
let score = 0;


var STORE = [
{
    question: 'what is the first track to be considered acid house?', 
       answers: ['808 state: Cubik','Phuture: Acid Trax','LAX: Gbefun','The Juice: Mr.Fingers'],
       correctAnswer: 'Phuture: Acid Trax',    
},
{
    question: 'House music is often called the child of what other genre of music',
        answers: ['Rock','Pop','Disco','Classical',],
        correctAnswer: 'Disco',
},
{
    question: 'The first house music mix came in what year',
        answers: ['1981','1979','1986','1977',],
        correctAnswer: '1981',
},
{
    question: 'House music orginated from where?',
        answers: ['Paris','Detroit','New York','Chicago',],
        correctAnswer: 'Chicago',
},
{
    question: 'The club famous for House Music was',
        answers: ['Warehouse','Land','The House','Place',],
        correctAnswer: 'Warehouse',
},
{ 
    question: 'Two DJ famous for pinonering House were ?',
        answers: ['Franky Knuckles and Ron Hardy','Manifeston and Marshall Jefferson','Langris and Whis',
        'Carl Cox and Paul Oakenfield',],
        correctAnswer: 'Franky Knuckles and Ron Hardy',

},
{
    question: 'The spirtuall home of Techno is?',
        answers: ['Berlin','Hamburg','Chicago','New York',],
        correctAnswer: 'Berlin',

},
{
    question: 'What was the technology that help to create house music?',
        answers: ['TR-808','TS-303','drum pad','gutare',],
        correctAnswer: 'TR-808',
},
{
    question: 'who is considered the creator of deep house?',
        answers: ['Larry Heard','Franky Knuckles','Marc Lands','Knos',],
        correctAnswer: 'Larry Heard', 
},
{
    question: 'The record studio that became famous for House Music was?',
        answers: ['Trax','Ultra','Jes say','MOS(Minstry of Sound)',],
        correctAnswer: 'Jes say', 
}
];


function generateQuestion () {
    if (questionNumber < STORE.length) {
      return `<div class="question-${questionNumber}">
      <h2>${STORE[questionNumber].question}</h2>
      <form>
      <fieldset>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
      <span>${STORE[questionNumber].answers[0]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
      <span>${STORE[questionNumber].answers[1]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
      <span>${STORE[questionNumber].answers[2]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
      <span>${STORE[questionNumber].answers[3]}</span>
      </label>
      <button type="submit" class="submitButton">Submit</button>
      </fieldset>
      </form>
      </div>`;
  } else {
      renderResults();
      restartQuiz();
      $('.questionNumber').text(10)
    }
  }
  
  //increment question number
  function changeQuestionNumber () {
    //if (questionNumber < STORE.length) {
      questionNumber ++;
    //}
    $('.questionNumber').text(questionNumber+1);
  }
  
  //increment score
  function changeScore () {
    score ++;
  }
  
  //start quiz
  //on startQuizButton click hide start div
  //unhide quiz form div
  function startQuiz () {
    $('.quizStart').on('click', '.startButton', function (event) {
      $('.quizStart').remove();
      $('.questionAnswerForm').css('display', 'block');
      $('.questionNumber').text(1);
  });
  }
  
  // render question in DOM
  function renderQuestion () {
    $('.questionAnswerForm').html(generateQuestion());
  }
  
  //user selects answer on submit run user feedback
  function userSelectAnswer () {
    $('form').on('submit', function (event) {
      event.preventDefault();
      let selected = $('input:checked');
      let answer = selected.val();
      let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
      if (answer === correctAnswer) {
        selected.parent().addClass('correct');
        ifAnswerIsCorrect();
      } else {
        selected.parent().addClass('wrong');
        ifAnswerIsWrong();
      }
    });
  }
  
  function ifAnswerIsCorrect () {
    userAnswerFeedbackCorrect();
    updateScore();
  }
  
  function ifAnswerIsWrong () {
    userAnswerFeedbackWrong();
  }
  
  //user feedback for correct answer
  function userAnswerFeedbackCorrect () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
  }
  
  //user feedback for wrong answer
  function userAnswerFeedbackWrong () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    // let iconImage = `${STORE[questionNumber].icon}`;
    $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
  }
  
  //update score text
  function updateScore () {
    changeScore();
    $('.score').text(score);
  }
  
  //when quiz is over this is the html for the page
  function renderResults () {
    if (score >= 8) {
      $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Sweet!</h3><img src="" alt="turntable icon"/><p>You got ${score} / 10</p><p>You know House Music</p><button class="restartButton">Restart Quiz</button></div>`);
    } else if (score < 8 && score >= 5) {
      $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Almost there!</h3><img src="" alt="headphone icon"/><p>You got ${score} / 10</p><p>A few more Track to play and you should be ok!</p><button class="restartButton">Restart Quiz</button></div>`);
    } else {
      $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You need a refresher</h3><img src="" alt=""/><p>You got ${score} / 10</p><p>Try again!</p><button class="restartButton">Restart Quiz</button></div>`);
    }
  }
  
  //what happens when the user clicks next
  function renderNextQuestion () {
    $('main').on('click', '.nextButton', function (event) {
      changeQuestionNumber();
      renderQuestion();
      userSelectAnswer();
    });
  }
  
  //restart quiz function - reloads page to start quiz over
  function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
      location.reload();
    });
  }
  
  //run quiz functions
  function createQuiz () {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
  }
  
  $(createQuiz);
