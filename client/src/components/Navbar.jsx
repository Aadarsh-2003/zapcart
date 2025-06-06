import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchRef = useRef(null);
  const { user, setUser, setShowUserLogin, navigate, searchQuerry, setSearchQuerry, getCartCount, axios } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuerry.length > 0) {
      navigate('/products');
    }
  }, [searchQuerry]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchInput(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative z-50 transition-all">
      <NavLink to='/' onClick={() => setMenuOpen(false)}>
        <img className="h-11" src={assets.zapcart_logo} alt="logo" />
      </NavLink>

      {/* Desktop Nav */}
      <div className="hidden min-[768px]:flex items-center gap-8">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>All Products</NavLink>
        <NavLink to='/contact'>Contact</NavLink>

        {/* Full search bar only visible above 1024px */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuerry(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* Compact Search Icon for md screens */}
        <div className="lg:hidden flex items-center relative z-50 bg-white" ref={searchRef}>
          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShowSearchInput(!showSearchInput)}
          />
          {showSearchInput && (
            <input
              autoFocus
              type="text"
              className="absolute right-7 md:w-40 border border-gray-300 rounded-full px-3 py-1 text-sm outline-none shadow bg-white z-50"
              placeholder="Search"
              onChange={(e) => setSearchQuerry(e.target.value)}
            />
          )}
        </div>

        {/* Cart Icon */}
        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button id="primary" className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button onClick={() => setShowUserLogin(true)} id="primary" className="cursor-pointer px-8 py-2 transition text-white rounded-full">
            Login
          </button>
        ) : (
          <div className="relative">
            <img src={assets.profile_icon} alt="profile" className="w-10 cursor-pointer" onClick={() => setMenuOpen((prev) => !prev)} />
            {menuOpen && (
              <ul className="absolute top-12 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-50">
                <li onClick={() => { setMenuOpen(false); navigate('/my-orders'); }} className="p-1.5 pl-3 hover:bg-emerald-100 cursor-pointer">My Orders</li>
                <li onClick={() => { setMenuOpen(false); logout(); }} className="p-1.5 pl-3 hover:bg-emerald-100 cursor-pointer">Logout</li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="flex items-center gap-4 min-[768px]:hidden">
        {/* Search bar on mobile */}
        <div className="flex items-center border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuerry(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 text-sm"
            type="text"
            placeholder="Search"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* Cart Icon */}
        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button id="primary" className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm min-[768px]:hidden flex">
          <NavLink to='/' onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to='/products' onClick={() => setMenuOpen(false)}>All Products</NavLink>
          {user && <NavLink to='/my-orders' onClick={() => setMenuOpen(false)}>My Orders</NavLink>}
          <NavLink to='/contact' onClick={() => setMenuOpen(false)}>Contact</NavLink>
          {!user ? (
            <button onClick={() => { setMenuOpen(false); setShowUserLogin(true); }} id="primary" className="cursor-pointer px-6 py-2 mt-2 transition text-white rounded-full text-sm">
              Login
            </button>
          ) : (
            <button onClick={logout} id="primary" className="cursor-pointer px-6 py-2 mt-2 transition text-white rounded-full text-sm">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
