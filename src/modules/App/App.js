import React, { Component } from 'react'
import { connect } from 'react-redux';
import styles from './App.css'
import Header from './components/Header'
import { browserHistory } from 'react-router';
export class App extends Component {
	componentDidMount() {
		browserHistory.push('/')
	}
  render() {
    return (
			<div>
				<Header />
				{this.props.children}
			</div>
    );
  }
}



export default connect()(App)