import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {

    const {isSeller, setIsSeller, navigate, axios, setShowUserLogin} = useAppContext();
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        useEffect(() => {
          if(isSeller){
            navigate("/seller");
          }
        }, [isSeller]);

        const onSubmitHandler = async(e)=>{

          try {
            e.preventDefault();
            const {data} = await axios.post('/api/seller/login' , {email, password});
            if(data.success){
              setIsSeller(true);
              navigate('/seller');
            }else{
              toast.error(data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }

            
        }


  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600' >

        <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200' >
            <p className='text-2xl font-medium m-auto'>
                <span className='text-emerald-500' >Seller</span> Login
            </p>
            <div className='w-full' >
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' className='border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-500' required />
            </div>
            <div className='w-full' >
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password' className='border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-500' required />
            </div>
            <p>
                Are you a User? <span onClick={() => {navigate('/'), setShowUserLogin(true)} } className="text-emerald-500 cursor-pointer">click here</span>
            </p>
            <button id='primary' className='text-white w-full py-2 rounded-md cursor-pointer' >Login</button>
        </div>

    </form>
  )
}

export default SellerLogin