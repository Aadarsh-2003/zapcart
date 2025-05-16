import React, { useEffect } from 'react'
import {NavLink } from 'react-router-dom'
import {assets} from '../assets/assets'
import {useAppContext} from '../context/AppContext'


const Navbar = () => {

    const [open, setOpen] = React.useState(false)
    const {user, setUser, setShowUserLogin, navigate, searchQuerry, setSearchQuerry} = useAppContext();

    const logout = async()=>{
        setUser(null);
        navigate('/');
    }

    useEffect(() => {
      if(searchQuerry.length > 0){
        navigate('/products');
      }
    }, [searchQuerry])
    

    return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/' onClick={()=>setOpen(false)}>
                <img className="h-9" src={assets.zapcart_logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Products</NavLink>
                <NavLink to='/'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=>setSearchQuerry(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    
                    <img src={assets.search_icon} alt='search' className='w-4 h-4' />
                </div>

                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                    
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                    <button id='primary' className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500  w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {!user?(<button onClick={()=>setShowUserLogin(true)} id='primary' className="cursor-pointer px-8 py-2  transition text-white rounded-full">
                    Login
                </button>):(
                    <div className='relative group' >
                        <img src={assets.profile_icon} alt='profile' className='w-10' />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-b-md text-sm z-40' >
                            <li onClick={()=>navigate('my-orders')} className='p-1.5 pl-3  hover:bg-emerald-100  cursor-pointer' >My Orders</li>
                            <li onClick={logout} className='p-1.5 pl-3  hover:bg-emerald-100 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                {/* <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg> */}
                <img src={assets.menu_icon} alt='menu' />
            </button>

            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to='/' onClick={()=> setOpen(false)}>Home</NavLink>
                <NavLink to='/products' onClick={()=> setOpen(false)}>All Products</NavLink>
                {user && 
                <NavLink to='/products' onClick={()=> setOpen(false)}>My Orders</NavLink>
                }
                <NavLink to='/' onClick={()=> setOpen(false)}>Contact</NavLink>

                {!user?(
                    <button  
                    onClick={()=> {
                            setOpen(false);
                            setShowUserLogin(true);
                        }} 
                        id='primary' className="cursor-pointer px-6 py-2 mt-2  transition text-white rounded-full text-sm">
                        Login
                    </button>
                ):(
                    <button 
                    onClick={logout}
                     id='primary' className="cursor-pointer px-6 py-2 mt-2  transition text-white rounded-full text-sm">
                        Logout
                    </button>
                )}
                
                </div>
            )}

        </nav>
  )
}

export default Navbar