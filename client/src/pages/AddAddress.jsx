import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const InputField = ({type, placeholder, name, handleChange, address})=>(
        <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-emerald-400 transition'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        />
    );


const AddAddress = () => {

    const {axios , user, navigate} = useAppContext();

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setAddress((prevAddress)=>({
            ...prevAddress,
            [name]: value,
        }
        ))
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post('api/address/add' , {userId: user._id, address});

            if(data.success){
                toast.success(data.message)
                navigate('/cart')
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(!user){
            navigate('/cart')
        }
    }, [])
    

  return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500' >Add Shipping <span className='font-semibold text-emerald-500' >Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10' >
            <div className='flex-1 max-w-md'>
                <form className='space-y-3 mt-6 text-sm' onSubmit={onSubmitHandler}>
                    <div className='grid grid-cols-2 gap-4' >
                        <InputField  
                            type="text" placeholder="First Name" handleChange={handleChange}
                            name="firstName" address={address}
                        />
                        <InputField  
                            type="text" placeholder="Last Name" handleChange={handleChange}
                            name="lastName" address={address}
                        />
                        <InputField  
                            type="email" placeholder="Email Address " handleChange={handleChange}
                            name="email" address={address}
                        />
                        <InputField  
                            type="text" placeholder="Street" handleChange={handleChange}
                            name="street" address={address}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4' >
                        <InputField  
                            type="text" placeholder="City" handleChange={handleChange}
                            name="city" address={address}
                        />
                        <InputField  
                            type="text" placeholder="State" handleChange={handleChange}
                            name="state" address={address}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4' >
                        <InputField  
                            type="number" placeholder="Zip Code" handleChange={handleChange}
                            name="zipcode" address={address}
                        />
                        <InputField  
                            type="text" placeholder="Country" handleChange={handleChange}
                            name="country" address={address}
                        />
                    </div>

                    <InputField  
                            type="text" placeholder="Phone" handleChange={handleChange}
                            name="phone" address={address}
                        />

                        <button id='primary' className='w-full mt-6 text-white py-3 transition cursor-pointer uppercase' >Save Address</button>
                </form>
            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />

        </div>
    </div>
  )
}

export default AddAddress