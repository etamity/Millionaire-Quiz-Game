import React from 'react'
import PropTypes from 'prop-types'
import './QuizCard.scss'

const computeQuizCardClass = (props, key) => {
  let className = "QuizCard-label";
  if (!props.showCorrectAnswer) {
    return className;
  }
  if (props.selected && key === props.item.answer) {
    className = className + " QuizCard-correct-answer";
  }
  if (props.selected && props.selected === key && props.selected !== props.item.answer) {
    className = className + " QuizCard-wrong-answer";
  }
  return className;
}

const checkAnswer = (selected, answer) => selected === answer;

export const QuizCard = (props) => {
  const onChange = (e) => {
    let selectedAnswer = e.target.value;
      if (props.onChange) {
        props.onChange(props.item.id, selectedAnswer);
      }
  }

  let optionKeys = Object.keys(props.item).filter(item => item !== 'question' && item !== 'answer' && item !== 'id'),
      options = optionKeys.map((key, index) => {
        return (
          <label className={computeQuizCardClass(props, key)} key={index}>
            <input name='question' type="radio" value={key} onClick={onChange} checked={props.selected === key}/>
            <span className="QuizCard-span">{key + ' : ' + props.item[key]}</span>
          </label>
        )
      });
  return (
    <div className="QuizCard-container">
      <div className="QuizCard-id">
        <span>{'Quiz ID : ' + props.item.id}</span>
        <span className={
          checkAnswer(props.selected, props.item.answer) ? "QuizCard-green fui-check" : "QuizCard-red fui-cross"
        } hidden={ !props.showCorrectAnswer }></span>
      </div>
      <h6 className="QuizCard-title">{ props.item.question }</h6>
      <form className="QuizCard-form">
        { options }
      </form>
    </div>
  )
}

QuizCard.propTypes = {
  item: PropTypes.object.isRequired,
  selected: PropTypes.string,
  showCorrectAnswer: PropTypes.bool
}

export default QuizCard
