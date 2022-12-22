import React from 'react';
import Edge from './Edge.js';

function EdgeRow (props) {
    const cols = [<div key={'spacer' + 0} className="spacer"><svg className="front" width="10" height="10">
    <circle cx="05" cy="0" r="10" stroke="none" fill="black" />
  </svg></div>];
    for (let i = 0; i < props.width; i++) {
        cols.push(<Edge 
            key={'he' + i}
            type='horizontal'
            isClicked={props.edgesClicked[i]}
            clickHandler={props.clickHandler}
            rowNum={props.rowNum}
            colNum={i}/>
        );
        cols.push(<div key={'spacer' + (i+1)} className="spacer"><svg width="10" height="10">
        <circle cx="5" cy="5" r="10" stroke="none" fill="black" />
      </svg></div>);
    } 
    return (
        <div className="row">
            {cols}
        </div>
        )
    }

export default EdgeRow;