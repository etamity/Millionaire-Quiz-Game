import { connect } from 'react-redux'
import HomeView from '../components/HomeView'
import {
  fetchQuestionsWithRedux,
  selectedAnswerAction,
  resetQuizAction,
  submitAnswersWithRedux,
  toggleModalAction } from '../modules/QuizReducer'

const mapDispatchToProps = {
  fetchData: fetchQuestionsWithRedux,
  selectedAnswer: selectedAnswerAction,
  resetQuizAction: resetQuizAction,
  submitAnswers: submitAnswersWithRedux,
  toggleModalAction: toggleModalAction
}

const mapStateToProps = (state) => ({
  questions: state.home.questions,
  answers: state.home.answers,
  submited: state.home.submited,
  stats: state.home.stats,
  isModalOpened: state.home.isModalOpened,
  quizLibrary: state.home.quizLibrary
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
