import { connect } from 'react-redux'
import HomeView from '../components/HomeView'
import {
  fetchQuestionsWithRedux,
  selectedAnswerAction,
  resetQuizAction,
  submitAnswersWithRedux,
  toggleModalAction } from '../modules/QuizReducer'

// map dispath function from QuizReducer
const mapDispatchToProps = {
  fetchData: fetchQuestionsWithRedux,
  selectedAnswer: selectedAnswerAction,
  resetQuizAction: resetQuizAction,
  submitAnswers: submitAnswersWithRedux,
  toggleModalAction: toggleModalAction
}

// map state to props from global state.home
const mapStateToProps = (state) => ({
  questions: state.home.questions,
  answers: state.home.answers,
  submited: state.home.submited,
  stats: state.home.stats,
  isModalOpened: state.home.isModalOpened,
  quizLibrary: state.home.quizLibrary,
  error: state.home.error
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
