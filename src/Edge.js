import React from 'react';

class Edge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: 'white',
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseOver = () => {
        if (!this.props.isClicked) {
            this.setState({color: 'lightgrey'});
        }
    }

    handleMouseOut = () => {
        if (!this.props.isClicked) {
            this.setState({color: 'white'});
        }
    }    

    render() {
        return (
            <div className={this.props.type} 
                style={{backgroundColor: this.props.isClicked ? 'black' : this.state.color}}
                onClick = {!this.props.isClicked ? () => this.props.clickHandler(this.props.type, this.props.rowNum, this.props.colNum) : undefined}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
            >
            </div>
        )
    }

}

export default Edge;