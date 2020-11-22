let store = {
  questions: [
    {
      question: 'How many notes are there in the Major Scale?',
      answers: [
        '6',
        '7',
        '8',
        '9'
      ],
      correctAnswer: '8',
      isFinalQuestion: false
    },
    {
      question: 'How many notes make up a Major chord?',
      answers: [
        '2',
        '3',
        '4',
        '5'
      ],
      correctAnswer: '3',
      isFinalQuestion: false
    },
    {
      question: 'Which three note intervals make up a Major chord?',
      answers: [
        'The first, second, and fourth intervals',
        'The first, third, and seventh intervals',
        'The third, fourth, and sixth intervals',
        'The first, third, and fifth intervals'
      ],
      correctAnswer: 'The first, third, and fifth intervals',
      isFinalQuestion: false
    },
    {
      question: 'Which scale are most pop song melodies written in?',
      answers: [
        'Major scale',
        'Minor scale',
        'Harmonic scale',
        'Melodic scale'
      ],
      correctAnswer: 'Major scale',
      isFinalQuestion: false
    },
    {
      question: 'Which genre of music gets the most use out of the chromatic scale?',
      answers: [
        'Rock',
        'Classical',
        'R&B',
        'Jazz'
      ],
      correctAnswer: 'Jazz',
      isFinalQuestion: true
    }


  ],
  quizStarted: false,
  questionNumber: 1,
  score: 0,
  incorrect: 0,
  counter: 0
};


/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateStartPage() {

return `<section class="start-page">
<div class="container1">
    <div class=item1 id="title">
    <h1>Music Theory Quiz!</h1>
    </div>
    <div class="item1" id="button1">
        <button class="start-button">
            Begin?
        </button>
    </div>
</div>
</section>`
}
function generateQuestionPage() {
return `<section class="question1">
<div class="container1" id="question1">
    <div class="container2">
        <div class="item2">
            <span id="to-left">Total Correct: ${store.score}</span>
        </div>
        <div class="item2">
            <span id="to-right">${store.questionNumber} out of 5</span>
        </div>
        <div class="item2">
            <span id="to-left">Total Incorrect: ${store.incorrect}</span>
        </div>
    </div>
    <h3>${store.questions[`${store.questionNumber}`-1].question}</h3>
    <form class="form">
        <input type="radio" id="option1" name="option" required value="${store.questions[`${store.questionNumber}`-1].answers[0]}">
        <label for="option1">${store.questions[`${store.questionNumber}`-1].answers[0]}</label><br>
        <input type="radio" id="option2" name="option" value="${store.questions[`${store.questionNumber}`-1].answers[1]}">
        <label for="option2">${store.questions[`${store.questionNumber}`-1].answers[1]}</label><br>
        <input type="radio" id="option3" name="option" value="${store.questions[`${store.questionNumber}`-1].answers[2]}">
        <label for="option3">${store.questions[`${store.questionNumber}`-1].answers[2]}</label><br>
        <input type="radio" id="option4" name="option" value="${store.questions[`${store.questionNumber}`-1].answers[3]}">
        <label for="option4">${store.questions[`${store.questionNumber}`-1].answers[3]}</label><br>
        <button id="submit-button" type="submit">Submit</button>
    </form>
</div>
</section>`
}
function generateEndPage() {
  let feedback = ""
  if (store.score < 3) {
    feedback = "Oops! Looks like you might need to spend a little more time studying!"
  }
  else if (3 < store.score && store.score < 5) {
    feedback = "Great job, but there is always room for improvement!"
  }
  else if (store.score = 5) {
    feedback = "Amazing! You got all of them right!"
  }
return `
<div class="container1">
<h3>${feedback}</h3>
<span id="to-left">Total Correct: ${store.score}/5</span>
<button class="start-over">Start Over?</button>
</div>
`
}

function generateCorrectPage() {
return`
<div class="container1">
<h3>That is correct!</h3>
<span id="to-left">Total Correct: ${store.score}</span>
<span id="to-left">Total Incorrect: ${store.incorrect}</span>
<button type="submit" id="next-button" >Next</button>
</div>
`
}

function generateIncorrectPage() {
return `
<div class="container1">
<h3>Sorry! That wasn't quite right. The correct answer was ${`${store.questions[`${store.questionNumber}`-1].correctAnswer}`}.</h3>
<span id="to-left">Total Correct: ${store.score}</span>
<span id="to-left">Total Incorrect: ${store.incorrect}</span>
<button id="next-button" type="submit">Next</button>
</div>
`
}
/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderPage(isCorrect) {
let html = ''

  if (store.quizStarted === false) {
    html = generateStartPage()
  }
  else if (isCorrect === true) {
    html = generateCorrectPage()
  }
  else if (isCorrect === false) {
    html = generateIncorrectPage()
  }
  else if (store.questionNumber === store.questions.length+1){
    html = generateEndPage()
  }
  else if (store.quizStarted === true) {
    html = generateQuestionPage()
  }
  $('main').html(html)
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleBeginClick() {
$('main').on("click", '.start-button', event => {
  console.log("clicked")
  store.quizStarted=true
  renderPage()
})
}
function handleSubmitQuestion() {
$("main").submit("#submit-button", e => {
  e.preventDefault()
  let input = $("input[name='option']:checked").val()
  let genCorrect = true
  let genIncorrect = false
  let correct = `${store.questions[`${store.questionNumber}`-1].correctAnswer}`
  store.counter +=1
  if (input === correct) {
    store.score +=1
    renderPage(genCorrect)
  }
  else {
    store.incorrect +=1
    renderPage(genIncorrect)
  }

})
}
function handleNextQuestion() {
  $("main").on("click", "#next-button", event => {
    store.questionNumber+=1
    renderPage()
  })
}

function handleTryAgain() {
$("main").on("click", ".start-over", e => {
  store.quizStarted = false
  store.score = 0
  store.incorrect = 0
  store.questionNumber = 1
  store.counter = 0
  console.log(store)
  renderPage()
})
}

function main() {
  renderPage()
  handleSubmitQuestion()
  handleBeginClick()
  handleNextQuestion()
  handleTryAgain()
}

$(main)
