import React, { Component } from 'react';

class Indicator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            close: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                close: true
            });
        }, 6000);
    }

    render() {
        const { message } = this.props;

        return (
            <div className={`indicator ${this.state.close ? 'faded': ''}`} ref={this.indicator}>
                <span>
                    {message}
                </span>
            </div>
        )
    }
}

export default Indicator