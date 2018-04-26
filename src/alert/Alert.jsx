/* @flow */

import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

type State = {
  visible: boolean,
};

const TYPE_CLASSES_MAP: {[type: string]: string} = {
  'success': 'fa-check-circle',
  'warning': 'fa-exclamation-circle',
  'error': 'fa-times-circle',
};

export default class Alert extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  close() {
    this.setState({
      visible: false,
    });
  }

  onAfterLeave() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <Transition name="kui-alert-fade" onAfterLeave={this.onAfterLeave.bind(this)}>
        <View show={this.state.visible}>
          <div style={this.style()} className={this.classNames('kui-alert', `kui-alert--${ this.props.type }`, {
            'kui-alert--banner': this.props.banner,
          })}>
            {
              this.props.showIcon && <i className={this.classNames('kui-alert__icon', 'fa', TYPE_CLASSES_MAP[this.props.type] || 'fa-info-circle', {
                'is-big': this.props.description,
              })} />
            }
            <div className="kui-alert__content">
              {
                this.props.title && (
                  <span className={this.classNames('kui-alert__title', {
                    'is-bold': this.props.description,
                  })}>
                    {this.props.title}
                  </span>
                )
              }
              {
                this.props.description && <p className="kui-alert__description">{this.props.description}</p>
              }
              <View show={this.props.closable}>
                <i className={this.classNames('kui-alert__closebtn', 'fa', this.props.closeText ? 'is-customed' : 'fa-times')} onClick={this.close.bind(this)}>
                  {this.props.closeText}
                </i>
              </View>
            </div>
          </div>
        </View>
      </Transition>
    );
  }
}

Alert.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string,
  closable: PropTypes.bool,
  closeText: PropTypes.string,
  showIcon: PropTypes.bool,
  banner: PropTypes.bool,
};

Alert.defaultProps = {
  type: 'info',
  closable: true,
  banner: false,
};
