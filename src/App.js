import logo from './logo.svg';
import './App.css';
import axios from 'axios'


function App() {
  // api calls

  const router = require('axios');
  const response = getEthScan(axios).then(res => console.log(res))


  // var api = require('etherscan-api').init('YQMRKMD93AIZUWZVJ8YXWXWJV65PGG8J3F');
  // var balance = api.account.balance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
  // balance.then(function(balanceData){
  //   console.log(balanceData);
  // });


  return (
    <div className="App">
      asdasd
    </div>
  );
}

export async function getEthScan(router) {
  const addr = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"
  const apikey = "YQMRKMD93AIZUWZVJ8YXWXWJV65PGG8J3F"
  return await router(`https://api.etherscan.io/api?module=account&action=balance&address=${addr}&tag=latest&apikey=${apikey}`)
}

export default App;