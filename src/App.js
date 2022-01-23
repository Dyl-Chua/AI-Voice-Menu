import { useState, useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import './index.css';


function App() {

const [cart, setCart] = useState([])
const [menuItems, setMenuItems] = useState([])

useEffect(() => {
  alanBtn({
    key:
      "68c0c54888af1700d10db218ab8ad5fd2e956eca572e1d8b807a3e2338fdd0dc/stage",
    onCommand: (commandData) => {
      if(commandData.command === 'getMenu'){
        setMenuItems(commandData.data)
      }
      else if (commandData.command === 'addToCart') {
        addToCart(commandData.data)
      }
    },
  })
}, [])

const addToCart = (menuItem)=>{
  setCart((oldCart)=> {
    return [...oldCart, menuItem]
  })
}

  return(

    <div className="App">
      {menuItems.map((menuItem)=>(
        <li key={menuItem.name}>
          {menuItem.name} - ${menuItem.price} - {menuItem.category}
        </li>
        
      
       ))}
       <div className="cart-item">
      <center> <h1><strong>Cart</strong></h1></center>
       {cart.map((cartItem) => (
         <li key={cartItem.name}>
           {cartItem.name} - ${cartItem.price} = {cartItem.category}
         </li>
       ))}</div>
    </div>
  )
}

export default App