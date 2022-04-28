import React from 'react';
import EdgeRow from './EdgeRow.js';
import SpaceRow from './SpaceRow.js';

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 3,
            height: 2,
            currentPlayer: 0,
            verticalEdges: [],
            horizontalEdges: [],
            spaces: [],
            scores: [0, 0],
        };

        let width = this.state.width;
        let height = this.state.height;
        
        // create 2D state arrays for spaces, horizontal edges, and vertical edges
        this.state.spaces = Array(height).fill().map(function() { 
             return Array(width).fill(null);
        });
        this.state.horizontalEdges = Array(height + 1).fill().map(function() { 
            return Array(width).fill(0);
        });
        this.state.verticalEdges = Array(height).fill().map( function () {
            return Array(width + 1).fill(0);
        });

        // event handler binding
        this.handleEdgeClick = this.handleEdgeClick.bind(this);
    }
    
    handleEdgeClick(type, row, col) {
        console.log('click');
        // update edge state
        let spaceCoordinates = [];
        let width = this.state.width;
        let height = this.state.height;
        if (type === 'horizontal') {
            const edges = this.state.horizontalEdges.slice();
            edges[row][col] = 1;
            this.setState({horizontalEdges: edges})
            spaceCoordinates = [[row - 1, col], [row, col]];
        } else {
            const edges = this.state.verticalEdges.slice();
            edges[row][col] = 1;
            this.setState({verticalEdges: edges})
            spaceCoordinates = [[row, col - 1], [row, col]];
        }
        
        let spacesCopy = [];
        for (let i = 0; i<this.state.height; i++){
            spacesCopy.push(this.state.spaces[i].slice());
        }
        let boxClosed = false;
        let scoreIncrement = 0;

        // check the spaces
        for (let i = 0; i < spaceCoordinates.length; i++) {
            let currentCoords = spaceCoordinates[i];
            let r = currentCoords[0];
            let c = currentCoords[1];
            // check if currentCoords are valid
            if (r >= 0 && r < height && c >= 0 && c < width) {
                // check if currentSpace is closed
                if (this.state.verticalEdges[r][c] && this.state.verticalEdges[r][c + 1] && this.state.horizontalEdges[r][c] && this.state.horizontalEdges[r + 1][c]) {
                    spacesCopy[r][c] = this.state.currentPlayer;
                    boxClosed = true;
                    scoreIncrement += 1;
                }
            }
        }

        if (boxClosed) {
            const scoresCopy = this.state.scores.slice();
            scoresCopy[this.state.currentPlayer] += scoreIncrement;
            this.setState({
                spaces: spacesCopy,
                scores: scoresCopy,
            });
        } else {
            this.setState({
                currentPlayer: 1 - this.state.currentPlayer,
            })
        }

        //check for game end
        console.log(this.state.spaces)
        let gameOver = !this.state.spaces.some(row => {
            console.log('current row', row);
            console.log('result', row.includes(null))
            return row.includes(null);
        });
        console.log(gameOver)
        if (gameOver) {
            let winner = (this.state.scores[0] > this.state.scores[1]) ? 'Green' : 'Red';
            alert('The winner is ' + winner);
            let playAgain = window.confirm('Would you like to play again?');
            if (playAgain) {
                this.setState( {
                    width: 5,
                    height: 4,
                    currentPlayer: 0,
                    verticalEdges: [],
                    horizontalEdges: [],
                    spaces: [],
                    scores: [0, 0],
                })
                let width = this.state.width;
                let height = this.state.height;
                
                // create 2D state arrays for spaces, horizontal edges, and vertical edges
                this.setState({
                    spaces: Array(height).fill().map(function() { 
                        return Array(width).fill(null);
                    })
                });
                this.setState({
                    horizontalEdges: Array(height + 1).fill().map(function() { 
                        return Array(width).fill(0);
                    })
                });
                this.setState({
                    verticalEdges: Array(height).fill().map( function () {
                        return Array(width + 1).fill(0);
                    })
                });
            }
        }
    }

    render() {
        const height = this.state.height;
        const rows = [];
        for (let i = 0; i < height; i++) {
            rows.push(<EdgeRow 
                key={'er' + i} 
                edgesClicked={this.state.horizontalEdges[i]} 
                rowNum={i} 
                width={this.state.width}
                clickHandler={this.handleEdgeClick}
            />);
                         
            rows.push(<SpaceRow
                key={'sr' + i}
                edgesClicked={this.state.verticalEdges[i]}
                spaceOwners={this.state.spaces[i]}
                rowNum={i}
                width={this.state.width}
                clickHandler={this.handleEdgeClick}
            /> );
        }

        rows.push(<EdgeRow
            key={'er' + height} 
            edgesClicked={this.state.horizontalEdges[height]}
            rowNum={height}
            width={this.state.width}
            clickHandler={this.handleEdgeClick}
        />);
        return(
            <div className="game">
                <h1 className='game-info'>Current Player: {this.state.currentPlayer ? 'Red' : 'Green'}</h1>
                <h1 className='game-info'>Green Score: {this.state.scores[0]}</h1>
                <h1 className='game-info'>Red Score: {this.state.scores[1]}</h1>
                <div className="board">
                    {rows}
                </div>
            </div>
        )
    }
}

export default Board;