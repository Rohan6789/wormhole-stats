import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Network, Alchemy } from "alchemy-sdk";


class App extends Component {

  constructor() {
    super();
    this.state = { bal_list: []};
  }

  async componentDidMount() {
    const bal_list = await getBalances(this);
    this.setState({bal_list : bal_list})

  }
  
  render() {
    return (
      <div className="App">
        {this.state.bal_list.map(entry => (
          <ul>
            {entry[0]}: {entry[1]} {entry[2]} 
          </ul>
        ))}
      </div>
    );
  }
}

export async function getBalances(_this) {
  // const addr = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"
  // const apikey = "YQMRKMD93AIZUWZVJ8YXWXWJV65PGG8J3F"
  // return await router(`https://api.etherscan.io/api?module=account&action=balance&address=${addr}&tag=latest&apikey=${apikey}`)

  // const router = require('axios');
  // const response = getEthScan(axios).then(res => console.log(res));

  // Set up alchemy api
  const settings = {
    apiKey: "TQI6fWng2lhvEV9h1wpj2UlFOo1Ikyjr",
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  // Get balances of specified address and filter out zero balances
  const wormhole_addr = "0x3ee18B2214AFF97000D974cf647E7C347E8fa585";
  const balances = await alchemy.core.getTokenBalances(wormhole_addr);
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });

  var balance_list = []

  // Look through tokens in balance and print info
  for (let token of nonZeroBalances) {
    
    // Get token data
    let balance = token.tokenBalance;
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Fix decimals in token balance
    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(2);

    // Print name, balance, and symbol of token
    console.log(`${metadata.name}: ${balance} ${metadata.symbol}`);

    // Store in array
    balance_list = [...balance_list, [metadata.name, balance, metadata.symbol]]
    _this.setState({bal_list : balance_list})
  }

  return balance_list
  
}

export default App;