import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class View extends Component {
  render() {
    const style = this.props.hasOwnProperty('show') && !this.props.show && {
      display: 'none',
    };

    return React.cloneElement(React.Children.only(this.props.children), {
      style: Object.assign({}, this.props.children.props.style, style),
    });
  }
}

View.propTypes = {
  show: PropTypes.any,
};

View._typeName = 'View';
