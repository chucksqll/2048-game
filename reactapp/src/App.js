import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	state = {
		values: [
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
		],
		startTiles : 2,
		score : 0

	};
	constructor() {
		super();
		this.reset();
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
	}

	componentWillUnmount() {
    	document.removeEventListener("keydown", this.handleKeyDown);
  	}

	reset = () => {
		const values = [...this.state.values];
		for(let row=0;row<this.state.values.length;row++) {
			for (let col = 0; col <this.state.values.length; col++) {
				values[row][col] = 0
			}
		}
		this.setState({values});
		for(let i=0;i<this.state.startTiles;i++){
			this.addTiles();
		}

	}
	getRandomInt = max => {
  	return Math.floor(Math.random() * Math.floor(max));
	}
	isAvaialbeTile = () => {
		for(let row=0;row<this.state.values.length;row++) {
			for (let col = 0; col <this.state.values.length; col++) {
				if (this.state.values[row][col] === 0) {
					return true;
				}
			}
		}
		return false;
	}

	addTiles = () => {
		const values = [...this.state.values];
		let added = false;
		let i =0
		while(!added) {
			i = i +1;
			let randRow = this.getRandomInt(4);
			let randCol = this.getRandomInt(4);

			if(this.state.values[randRow][randCol] === 0){
				added = true;
				let value = Math.random() < 0.9 ? 2 : 4;
				values[randRow][randCol] = value;
				this.setState({values});
			}

			if(!this.isAvaialbeTile()){
				console.log("no tiles");
				break;
			}
		}
		this.countScore();
	}

	moveUp = () => {
		const values = [...this.state.values];
		let toAddNewTile = false;
		const move = () => {
			for(let k=0;k<4;k++){
				for( let i=0;i<3; i++) {
					if(this.state.values[i][k]===0) {
						let moved = false;
						let j = i+1;
						while(!moved) {
							if( j>3){
								break;
							}
							if(this.state.values[j][k]!==0){
								values[i][k] = this.state.values[j][k];
								values[j][k] = 0;
								moved = true;
								toAddNewTile = true;
							}
							j = j+1;
						}
					}
				}
			}
		}
		move();
		for(let k=0;k<3;k++) {
			for(let i=0;i<4;i++) {
				if(this.state.values[k][i]===this.state.values[k+1][i]){
					values[k][i] = this.state.values[k][i]*2;
					values[k+1][i] = 0;
					if(this.state.values[k][i]!==0){
						toAddNewTile = true;
					}

				}
			}
		}
		move()
		if(toAddNewTile){
			this.addTiles();
		}
		this.setState({values});
	}

	moveLeft = () => {
		const values = [...this.state.values];
		let toAddNewTile = false;
		const move = () => {
			for(let k=0;k<4;k++){
				for( let i=0;i<3; i++) {
					if(this.state.values[k][i]===0) {
						let moved = false;
						let j = i+1;
						while(!moved) {
							if( j>3){
								break;
							}
							if(this.state.values[k][j]!==0){
								values[k][i] = this.state.values[k][j];
								values[k][j] = 0;
								moved = true;
								toAddNewTile = true;
							}
							j = j+1;
						}
					}
				}
			}
		}
		move();
		for(let k=0;k<3;k++) {
			for(let i=0;i<4;i++) {
				if(this.state.values[i][k]===this.state.values[i][k+1]){
					values[i][k] = this.state.values[i][k]*2;
					values[i][k+1] = 0;
					if(this.state.values[i][k]!==0){
						toAddNewTile = true;
					}

				}
			}
		}
		move()
		if(toAddNewTile){
			this.addTiles();
		}
		this.setState({values});
	}

	moveRight = () => {
		const values = [...this.state.values];
		let toAddNewTile = false;
		const move = () => {
			for(let k=0;k<4;k++){
				for( let i=3;i>0; i--) {
					if(this.state.values[k][i]===0) {
						let moved = false;
						let j = i-1;
						while(!moved) {
							if( j<0){
								break;
							}
							if(this.state.values[k][j]!==0){
								values[k][i] = this.state.values[k][j];
								values[k][j] = 0;
								moved = true;
								toAddNewTile = true;
							}
							j = j-1;
						}
					}
				}
			}
		}
		move();
		for(let k=3;k>0;k--) {
			for(let i=0;i<4;i++) {
				if(this.state.values[i][k]===this.state.values[i][k-1]){
					values[i][k]= this.state.values[i][k]*2;
					values[i][k-1] = 0;
					if(this.state.values[i][k]!==0){
						toAddNewTile = true;
					}

				}
			}
		}
		move()
		if(toAddNewTile){
			this.addTiles();
		}
		this.setState({values});

	}

	moveDown = () => {
		const values = [...this.state.values];
		let toAddNewTile = false;
		const move = () => {
			for(let k=0;k<4;k++){
				for( let i=3;i>0; i--) {
					if(this.state.values[i][k]===0) {
						let moved = false;
						let j = i-1;
						while(!moved) {
							if( j<0){
								break;
							}
							if(this.state.values[j][k]!==0){
								values[i][k] = this.state.values[j][k];
								values[j][k] = 0;
								moved = true;
								toAddNewTile = true;
							}
							j = j-1;
						}
					}
				}
			}
		}
		move();
		for(let k=3;k>0;k--) {
			for(let i=0;i<4;i++) {
				if(this.state.values[k][i]===this.state.values[k-1][i]){
					values[k][i]= this.state.values[k][i]*2;
					values[k-1][i] = 0;
					if(this.state.values[k][i]!==0){
						toAddNewTile = true;
					}

				}
			}
		}
		move()
		if(toAddNewTile){
			this.addTiles();
		}
		this.setState({values});

	}

	countScore = () => {
		let score = 0;
		for(let row=0;row<this.state.values.length;row++) {
			for (let col = 0; col <this.state.values.length; col++) {
				score += this.state.values[row][col];
			}
		}
		this.setState({score});

	}
	handleKeyDown = (event) => {
	    let left = 37;
	    let up = 38;
	    let right = 39;
	    let down = 40;
	    switch(event.keyCode) {
	    	case left:
	    		this.moveLeft();
	    		break;
	    	case up:
	    		this.moveUp();
	    		break;
	    	case right:
	    		this.moveRight();
	    		break;
    		case down:
	    		this.moveDown();
	    		break;
	    }
	}
	render() {

  	return (
  		<React.Fragment>
  			<div className="score">
  				Score: {this.state.score}
  			</div>

		    <div className="center-column">
		    	{this.state.values.map((row,oneIndex) => 	
		    			<div className="item-row">

		    				{row.map((num) => 
		    					<span className={"block "+"block"+num}>{num}</span>
		    				)}		

		    			</div>
		    	)}
		    </div>
		   	
		    <div className="arrows">
		    	<div>
		    		<button className="arrow-button btn-primary" onClick={this.moveUp}>up</button>
		    	</div>
		    	<div>
			    	<button className="arrow-button" onClick={this.moveLeft}>left</button>
			    	<button className="arrow-button" onClick={this.moveRight}>right</button>
			    </div>
			    <div>
		    		<button className="arrow-button" onClick={this.moveDown}>down</button>
	    		</div>
		    </div>

		    <div>
		    	<button onClick={this.reset}>reset</button>
		    </div>

	    </React.Fragment>
	  );
	}
}

export default App;