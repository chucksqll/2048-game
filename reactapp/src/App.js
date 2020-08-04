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
		availableTiles: [	
						[1,1,1,1],
						[1,1,1,1],
						[1,1,1,1],
						[1,1,1,1],
		],
		startTiles : 2
	};
	reset = () => {
		const values = [...this.state.values];
		const availableTiles = [...this.state.availableTiles]
		for(let row=0;row<this.state.values.length;row++) {
			for (let col = 0; col <this.state.values.length; col++) {
				values[row][col] = 0
				availableTiles[row][col] = 1
			}
		}
		this.setState({values});
		this.setState({availableTiles});
	}
	getRandomInt = max => {
  	return Math.floor(Math.random() * Math.floor(max));
	}
	isAvaialbeTile = () => {
		for(let row=0;row<this.state.values.length;row++) {
			for (let col = 0; col <this.state.values.length; col++) {
				if (this.state.availableTiles[row][col] == 1) {
					return true;
				}
			}
		}
		return false;
	}

	addTiles = () => {
		console.log("dupa");
		const values = [...this.state.values];
		const availableTiles = [...this.state.availableTiles]
		let added = false;
		let i =0
		while(!added) {
			i = i +1;
			let randRow = this.getRandomInt(4);
			let randCol = this.getRandomInt(4);

			if(this.state.availableTiles[randRow][randCol] == 1){
				added = true;
				availableTiles[randRow][randCol] = 0;
				let value = Math.random() < 0.9 ? 2 : 4;
				values[randRow][randCol] = value;
				this.setState({values});
				this.setState({availableTiles});
			}

			if(!this.isAvaialbeTile()){
				console.log("no tiles");
				break;
			}
		}
	}

	moveUp = () => {
		console.log("up")
		this.addTiles();
	}

	moveLeft = () => {
		console.log("left")
	}

	moveRight = () => {
		console.log("right")
	}

	moveDown = () => {
		console.log("down")
	}



	render() {
  	return (
  		<React.Fragment>
		    <div className="center-column">
		    	{this.state.values.map((row,oneIndex) => 	
		    			<div className="item-row">

		    				{row.map((num) => 
		    					<span className="block">{num}</span>
		    				)}		

		    			</div>
		    	)}
		    </div>
		   
		    <div className="arrows">
		    	<div>
		    		<button className="arrow-button" onClick={this.moveUp}>up</button>
		    	</div>
		    	<div>
			    	<button className="arrow-button" onClick={this.moveLeft}>left</button>
			    	<button className="arrow-button" onClick={this.moveRight}>right</button>
			    </div>
			    <div>
		    		<button className="arrow-button" onClick={this.moveDown}>down</button>
	    		</div>

		    </div>
	    </React.Fragment>
	  );
	}
}

export default App;