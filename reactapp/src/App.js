import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	state = {
		array: [[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
		],
	};

	Block = ({num}) => {
		return <div>{num}</div>;
	}

	render() {
  	return (
	    <div className="center-column">
	    	{this.state.array.map((row,oneIndex) => 	
	    			<div className="item-row">

	    				{row.map((num) => 
	    					<span className="block">{num}</span>
	    				)}
	    					

	    			</div>
	    	)}
	    </div>
	  );
	}
}

export default App;