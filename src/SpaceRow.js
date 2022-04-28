import React from 'react';
import Space from './Space.js';
import Edge from './Edge.js';

class SpaceRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

     render() {
        const width = this.props.width;
        const cols = [];
        for (let i = 0; i < width; i++) {
            cols.push(<Edge
                key={'ve' + i}
                rowNum={this.props.rowNum}
                colNum={i}
                type='vertical'
                isClicked={this.props.edgesClicked[i]}
                clickHandler={this.props.clickHandler}
            />)
            cols.push(<Space
                owner={this.props.spaceOwners[i]}
                key={'s' + i}
                rowNum={this.props.rowNum}
                colNum={i}
            />)
        }
        cols.push(<Edge
            key={'ve' + width}
            rowNum={this.props.rowNum}
            colNum={width}
            type='vertical'
            isClicked={this.props.edgesClicked[width]}
            clickHandler={this.props.clickHandler}
        />)

        return (
            <div className="row">
                {cols}
            </div>
        )
    }
}

export default SpaceRow;