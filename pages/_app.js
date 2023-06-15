import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }) {

  const router = useRouter();
  const [progress, setProgress] = useState(0)
  const [cart, setcart] = useState({});
  const [key, setkey] = useState(0);
  const [subTotal, setsubTotal] = useState(0);
  
  useEffect(() => {

    router.events.on('routeChangeStart', ()=>{setProgress(40)})
    router.events.on('routeChangeComplete', ()=>{setProgress(100)})

    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
         console.log(error);
         localStorage.clear();
    }

    setkey(Math.random())

  }, [router.query]);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt=0;
    let keys = Object.keys(myCart)

      for(let i=0; i<keys.length ;i++){
        subt += myCart[keys[i]].price * myCart[keys[i]].qty
      }
      setsubTotal(subt); 
  }

  const addToCart = (ItemCode, qty, price, name) => {
    if(Object.keys(cart).length == 0)
    {
      setkey(Math.random())
    }
    let newCart = cart;
    if (ItemCode in cart) {
      newCart[ItemCode].qty = cart[ItemCode].qty + qty
    }
    else {
      newCart[ItemCode] = { qty: 1, price, name}
    }

    setcart(newCart)
    saveCart(newCart);
  }

  const removeFromCart = (ItemCode, qty) => {
    let newCart = cart;
    if (ItemCode in cart) {
      newCart[ItemCode].qty = cart[ItemCode].qty - qty
    }
    if (newCart[ItemCode].qty <= 0) {
      delete newCart[ItemCode]
    }

    setcart(newCart)
    saveCart(newCart);
  }

  const clearCart = () => {
    setcart({})
    saveCart({})
  }

  return<>
  <LoadingBar
        color='#17912B'
        progress={progress}
        waitingTime = {400}
        onLoaderFinished={() => setProgress(0)}
      />
   <Navbar key={key} cart={cart} addToCart = {addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
   <Component cart={cart} addToCart = {addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
   <Footer/>
   </>
}
