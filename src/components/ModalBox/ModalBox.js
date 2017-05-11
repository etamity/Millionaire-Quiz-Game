import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ModalBox.scss'

export class ModalBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.opened ? (
      <div className="ModalBox-container">
        <h3>{this.props.title}</h3>
        <div>
          { React.Children.map(this.props.children, child => child) }
        </div>
        <button className="btn btn-lg btn-success"
                type="button"
                onClick={this.props.onCloseClick}>Close</button>
      </div>
    ) : null;
  }
}

ModalBox.propTypes = {
  title: PropTypes.string,
  opened: PropTypes.bool
}

export default ModalBox
