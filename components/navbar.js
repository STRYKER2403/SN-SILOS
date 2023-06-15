
import React, {  useRef, useState } from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle, AiFillCloseCircle, AiOutlineShoppingCart } from 'react-icons/ai';



const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {

    const [sidebar, setsidebar] = useState(false);
    const ref = useRef();

    const toggleCart = () => {
        setsidebar(!sidebar)
    }

    return (
        <>
            <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md sticky top-0 z-10 bg-gray-800 ${!sidebar && "overflow-hidden"} h-16`}>

              <div className='mr-auto logo  md:mt-2  md:mx-2 font-bold md:text-2xl '>
                    <Link href={"/"}  className='text-white ml-5 '>SN SILOS</Link>
                </div>

                <div className="flex cursor-pointer cart absolute right-0 top-3.5 md:top-5 mx-5 items-center">
                    <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-3xl text-white' />
                </div>

                <div ref={ref} className={`z-10 w-72 h-screen sideCart overflow-y-scroll absolute top-0 bg-gray-100 px-8 py-10 transition-all ${sidebar ? "right-0" : "-right-96"}`}>
                    <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                    <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-gray-500"><AiFillCloseCircle /></span>
                    <ol className='list-decimal font-semibold'>
                        {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Your cart is Empty!!</div>}

                        {Object.keys(cart).map((k) => {
                            return <li key={k}>
                                <div className="item flex my-5">
                                    <div className='w-2/3 font-semibold'>{cart[k].name}</div>
                                    <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name) }} className='cursor-pointer text-gray-500' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name) }} className='cursor-pointer text-gray-500' /></div>
                                </div>
                            </li>
                        })}

                    </ol>

                    <div className='font-semibold my-3' >SubTotal: ₹{subTotal}</div>

                    <div className='flex'>  
                        <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className=" flex mr-2  text-white bg-gray-500 border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-sm ml-16">Clear Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
