import React from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({product}) => {

    // const [count, setCount] = React.useState(0);
    const {currency, cartItems, addToCart, updateCartItems, removeFromCart, navigate } = useAppContext();

  return product && (

        <div className={`relative ${!product.inStock ? 'opacity-60 cursor-not-allowed' : ''}`}>
        {!product.inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of Stock
            </div>
        )}
        
            <div  onClick={()=> {
                navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                scrollTo(0,0)
            }}  className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full max-w-xs mx-auto">
                <div className="group cursor-pointer flex items-center justify-center px-2">
                    <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
                </div>
                <div className="text-gray-500/60 text-sm">
                    <p>{product.category}</p>
                    <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                    <div className="flex items-center gap-0.5">
                        {Array(5).fill('').map((_, i) => (
                            
                                <img  key={i} className='w-3 md:w-3.5' src={i<4 ? assets.star_icon : assets.star_dull_icon} alt='' />
            
                        ))}
                        <p>(4)</p>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                        <p className="md:text-xl text-base font-medium text-emerald-500">
                            {currency}{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                        </p>
                        <div onClick={(e)=>{
                            e.stopPropagation();
                        }} className="text-emerald-500">
                            {product.inStock ? (
                            !cartItems[product._id] ? (
                                <button className=" cursor-pointer flex items-center justify-center gap-1 bg-emerald-100 border border-emerald-300 md:w-[80px] w-[64px] h-[34px] rounded text-emerald-500 font-medium" onClick={() => addToCart(product._id)} >
                                    <img src={assets.cart_icon} alt='cart_icon' />
                                    Add
                                </button>
                            ) : (
                                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-emerald-500/25 rounded select-none">
                                    <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                        -
                                    </button>
                                    <span className="w-5 text-center">{cartItems[product._id]}</span>
                                    <button onClick={() => addToCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                        +
                                    </button>
                                </div>
                            )
                        ): (
                            
                                <button className="cursor-not-allowed flex items-center justify-center gap-1 bg-gray-300 border border-gray-600 md:w-[80px] w-[64px] h-[34px] rounded text-gray-600 font-medium" >
                                    <img src={assets.cart_icon} alt='cart_icon' />
                                    Add
                                </button>
                            
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ProductCard