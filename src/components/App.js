import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Token from '../abis/Token.json';
import { 
loadWeb3, 
loadAccount, 
loadToken, 
loadExchange, 
} from '../store/interactions';
import Navbar from './Navbar';
import Content from './Content';
import { contractsLoadedSelector } from '../store/selectors';

class App extends Component {
  componentWillMount() {
    
    this.loadBlockChainData(this.props.dispatch)
  }

  async loadBlockChainData(dispatch){
    const web3 = await loadWeb3(dispatch)
    await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, dispatch)
    const token = await loadToken(web3, networkId, dispatch)
    if(!token) {
      window.alert('Token smart contract is not detected on the current network. Please select another network with Metamask.')
      return
    }
    const exchange = await loadExchange(web3, networkId, dispatch)
    if(!exchange) {
      window.alert('Exchange smart contract is not detected on the current network. Please select another network with Metamask.')
    }
    
  }

  render(){
    
    return (
      <div>
          <Navbar/>
          { this.props.contractsLoaded ? <Content /> : <div className='content'></div> }
          <Content/>
      </div>
    );
    }
}

function mapStateToProps(state){
  return {
    contractsLoaded: contractsLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App);
