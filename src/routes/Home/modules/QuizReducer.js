import { fetchQuestionsService, submitAnswersService } from './QuizServices'

function fetchSuccess(payload) {
  return {
    type: 'FETCH_SUCCESS',
    payload
  }
}

function fetchError(error) {
  return {
    type: 'FETCH_ERROR',
    payload: error
  }
}

function validateAnswers(payload) {
  return {
    type: 'VALIDATE_ANSWERS',
    payload
  }
}
// export dispatch function
export function fetchQuestionsWithRedux() {
    return (dispatch, state) => {
      if (state.questions) {
        return;
      };
      return fetchQuestionsService().then(([response, json]) =>{
          if(response.status === 200){
          dispatch(fetchSuccess(json))
        }
        else{
          dispatch(fetchError())
        }
      })
  }
}

// export dispatch function
export function selectedAnswerAction(answers) {
    return (dispatch) => {
      dispatch({
        type: 'SELECTED_ANSWER_ACTION',
        payload: answers
      })
    }
}

// export dispatch function
export function resetQuizAction() {
    return (dispatch) => {
      dispatch({
        type: 'RESET_ANSWER_ACTION'
      })
    }
}

// export dispatch function
export function submitAnswersWithRedux() {
    return (dispatch, state) => {
      return submitAnswersService().then(([response, json]) =>{
          if(response.status === 200){
          dispatch(validateAnswers(json))
        }
        else{
          dispatch(fetchError(response.error))
        }
      })
  }
}


function randomPickQuestions(questions, num) {
  let randomPicked = questions.sort(() => .5 - Math.random()).slice(0, num),
      answers = randomPicked.map(item => {
        return {id: item.id, selected: null};
      });
  return {questions: randomPicked, answers: answers}
}

function buildStatsState(questions, answers) {
  let correctAnswers = answers.filter(item => {
      let index = questions.findIndex(quiz => quiz.id === item.id);
      return questions[index].answer === item.selected;
  });

  return [{
    label: 'Correct Answers',
    value: correctAnswers.length
  }, {
    label: 'Wrong Answers',
    value: questions.length - correctAnswers.length
  }, {
    label: 'Total Questions',
    value: questions.length
  }]
}

// export dispatch function
export function toggleModalAction(showed) {
    return (dispatch) => {
      dispatch({
        type: 'TOGGLE_MODAL_ACTION',
        payload: showed
      })
    }
}

//define initialState structure to make states more clear
const initialState = {
  questions: [],
  answers: [],
  submited: false,
  showNumOfQuiz: 10,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      let quiz = randomPickQuestions(action.payload, state.showNumOfQuiz);
      return {...state, ...quiz, quizLibrary: action.payload, error: null};

    case 'SELECTED_ANSWER_ACTION':
      let index = state.answers.findIndex(item => item.id === action.payload.id) || 0;
      let newAnswers = state.answers.slice(0);
          newAnswers[index] = action.payload;
      return {...state, answers: newAnswers};

    case 'RESET_ANSWER_ACTION':
      let resetQuiz = randomPickQuestions(state.quizLibrary, state.showNumOfQuiz);
      return {...initialState, ...resetQuiz, quizLibrary: state.quizLibrary}

    case 'VALIDATE_ANSWERS':
      let stats = buildStatsState(state.questions, state.answers);
      return {...state, stats , submited: true}

    case 'TOGGLE_MODAL_ACTION':
      return {...state, isModalOpened: action.payload};

    case 'FETCH_ERROR':
      return {...state, error:action.payload}
    default:
      return state;
  }
}
