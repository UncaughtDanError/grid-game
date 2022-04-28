import React from 'react';

class Space extends React.Component {
    render() {
        return (
            <div className="square"
            style={{backgroundColor: (this.props.owner === 1) ? 'red' : (this.props.owner === 0) ? 'green' : 'WhiteSmoke'}}>
            </div>
        )
    }
}

export default Space;