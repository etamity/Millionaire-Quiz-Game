import React, { Component } from 'react'
import QuizCard from '../../../components/QuizCard'
import ModalBox from '../../../components/ModalBox'
import './HomeView.scss'

export class HomeView extends Component {

  constructor() {
    super()
    this.state = {enableSubmit: false};
  }

  componentDidMount(){
  	this.props.fetchData();
  }

  componentWillReceiveProps(props) {
    let answers = props.answers,
        inComplete = answers && answers.some(item => !item.selected);
    this.setState({enableSubmit: !inComplete});
  }

  computeSubmitButtonState(answers) {
    return answers.some(item => item.answer);
  }

  selectAnswer(questionId, selectedAnswer) {
    this.props.selectedAnswer({id:questionId, selected:selectedAnswer});
  }

  closeModal(e) {
    this.props.toggleModalAction(false);
  }

  submitAnswers (e) {
    this.props.submitAnswers(e);
    this.props.toggleModalAction(true);
  }
// Render Quiz Cards
  renderQuziCards() {
      return this.props.questions && this.props.questions.map((item, index)=> {
        return (<QuizCard key={index}
                    item={item}
                    onChange={this.selectAnswer.bind(this)}
                    selected={this.props.answers && this.props.answers[index] && this.props.answers[index].selected}
                    showCorrectAnswer={this.props.submited}></QuizCard>)
      });
  }

// Render Header Part
  renderHeader() {
    return (<div className="HomeView-header">
          <h4>Welcome!</h4>
          { this.props.quizLibrary ? (<h7>{'Total Questions in Libaray : ' + this.props.quizLibrary.length}</h7>) : null }
          { this.props.questions ? (<h7>{'Random Picked : ' + this.props.questions.length}</h7>) : null }
    </div>);
  }

  render() {
    return (<div className="HomeView-container">
        { this.renderHeader() }
        { this.renderQuziCards() }
        <div className="HomeView-buttons-group">
          <button className="btn btn-lg btn-success"
                  type="button"
                  disabled={ !this.state.enableSubmit && !this.props.submited }
                  onClick={ this.submitAnswers.bind(this) }>Submit</button>
          <button className="btn btn-lg btn-inverse"
                  type="button"
                  onClick={ this.props.resetQuizAction }>Random</button>
        </div>
        { this.props.error ? (<h6 className="HomeView-error">this.props.error</h6>) : null}
        <ModalBox title="Your Status:" opened={ this.props.isModalOpened } onCloseClick={ this.closeModal.bind(this) }>
        {
            this.props.stats && Object.keys(this.props.stats).map((key, index) => {
                return (
                  <h6 key={index}> { this.props.stats[key].label + " : " + this.props.stats[key].value } </h6>
                )
            })
        }
        </ModalBox>
    </div>);
  }
}

export default HomeView
