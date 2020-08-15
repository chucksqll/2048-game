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
		score : 0,
		bestScore: 0,
		isGameOn: 1,
		touchStartX: 0,
		touchStartY: 0,
	};

	constructor() {
		super();
		// this.reset();
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);

		var gameView = document.getElementById("gameViewport");
		gameView.addEventListener("touchstart", this.handleTouchStart);
		gameView.addEventListener("touchend", this.handleTouchEnd);
	}

	handleTouchStart = event =>{
		event.preventDefault();
		let touchStartX = event.touches[0].clientX;
  		let touchStartY = event.touches[0].clientY;
		this.setState({touchStartX, touchStartY});
	}

	handleTouchEnd = event => {
		event.preventDefault();

		let endX=event.changedTouches[0].clientX;
		let endY=event.changedTouches[0].clientY;
		if(Math.abs(endX-this.state.touchStartX)>Math.abs(endY-this.state.touchStartY)) {
			if(endX>this.state.touchStartX) {
				this.moveRight();
			}
			else {
				this.moveLeft();
			}
		}
		if(Math.abs(endX-this.state.touchStartX)<Math.abs(endY-this.state.touchStartY )) {
			if(endY>this.state.touchStartY ) {
				this.moveDown();
			}
			else{
				this.moveUp();
			}
		}
	}
		

	componentWillUnmount() {
    	document.removeEventListener("keydown", this.handleKeyDown);
    	document.removeEventListener("touchstart",this.handleTouchStart);
    	document.removeEventListener("touchend", this.handleTouchEnd);
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
		document.getElementById("game-over").style.display = "none";

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
	isGameOver = () => {
		//check if there are empty tiles
		for(let row=0;row<this.state.values.length;row++) {
			for (let col = 0; col <this.state.values.length; col++) {
				if (this.state.values[row][col] === 0) {
					return false;
				}
			}
		}
		//check if there are passing tiles horizontally
		for(let row=0;row<this.state.values.length;row++) {
			for (let col = 0; col <this.state.values.length-1; col++) {
				if (this.state.values[row][col] === this.state.values[row][col+1]) {
					return false;
				}
			}
		}
		//check if there are passing tiles vertically
		for(let col=0;col<this.state.values.length;col++) {
			for (let row = 0; row <this.state.values.length-1; row++) {
				if (this.state.values[row][col] === this.state.values[row+1][col]) {
					return false;
				}
			}
		}
		// var elem = document.getElementById('id');
		// elem.style.display = 'block'; 
		return true;


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
				//prevent from infinite loop
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
		let bestScore=0;
		if(score>this.state.bestScore){
			bestScore=score;
		}
		else{
			bestScore=this.state.bestScore;
		}
		this.setState({score, bestScore});

	}

	handleKeyDown = (event) => {
		event.preventDefault();
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
	    if(this.isGameOver()){
	    	document.getElementById("game-over").style.display = "block";
	    }
	}

	render() {
  	return (
  		<div className="wrapper">
  			<div className="container-fluid">
  				<div className="row header">
  						<div className="col-4 justify-content-left">
  						<h1 className="title">2048</h1>
  					</div>
		  			<div className="col-4 score justify-content-center">
		  				Score: {this.state.score}
		  			</div>
		  			<div className="col-3 score justify-content-right">
		  				Best: {this.state.bestScore}
		  			</div>
		  		</div>

	  			<div className="row justify-content-center">
	  				<div className="col-8">
	  					<p className="intro">
	  						Join the numbers and get to the 
	  						<strong> 2048 tile!</strong>
	  					</p>
	  				</div>
	  				<div className="col-4 text-right">
	  					<button className="btn btn-info " onClick={this.reset}>New Game</button>
	  				</div>
	  			</div>

	  			<div id="game-over">Game Over!</div>

			    <div className="game-container" id="gameViewport">

			    	{this.state.values.map((row,oneIndex) => 	
			    			<div className="item-row">

			    				{row.map((num) => 
			    					<span className={"block "+"block"+num}>{num}</span>
			    				)}		

			    			</div>
			    	)}

			    </div>

			    <div className="row game-explanation">
			    	<div className="col-12">
				    	<p>
				    		<strong>HOW TO PLAY: </strong>
				    		Use your arrow keys to move the tiles.
				    		When two tiles with the same number touch,
				    		<strong> they merge into one!</strong>
				    	</p>
				    	<p>
				    		Created by 
				    		<a href="http://witoldbanach.herokuapp.com/" target="_blank"> Witold Banach. </a>
				    		 A clone of 2048 by 
				    		 Gabriele Cirulli written using React.
				    	</p>
				    </div>
			    </div>
			</div>

	    </div>
	  );
	}
}

export default App;