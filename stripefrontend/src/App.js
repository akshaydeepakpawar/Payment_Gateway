import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {
  const [product,setProduct]=useState({
    name:"React from facebook",
    price:10,
    productBy:"facebook"
  });

  const makePayment=token=>{
    const body={
      token,
      product
    }
    const header={
      "Content-Type":"application/json"
    }
    return fetch(`http:localhost:8282/payment`,{
      method:"POST",
      header,
      body:JSON.stringify(body)
    }).then(response=>
      {
        console.log("RESPONSE",response)
        const{status}=response;
        console.log("STATUS",status)
      })
    .catch(error=> console.log(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
        stripeKey="pk_test_51NeXqzSDG6OkBJqJymj7Zxq2fX2MHfhCkEgUL08HeQGZFXTozroR3YSbthdxFW40W2VxWGy9E8zOjowlER3Gc4Ly002JljFkIN"
        token={makePayment}
        name="Buy React"
        amount={product.price*100}
        shippingAddress
        billingAddress
        allowRememberMe>
          <button className='btn-large blue'> BUY REACT IN JUST {product.price} $</button>
          </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
