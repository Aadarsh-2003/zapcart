import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className='mt-16 flex flex-col items-center px-4'>
      <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm w-full max-w-[800px]">
        <p className="text-lg text-emerald-600 font-medium pb-2">Contact Us</p>
        <h1 className="text-4xl font-semibold text-slate-700 pb-4 text-center">Get in touch with us</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <div className="w-full">
            <label className="text-black/70" htmlFor="name">Your Name</label>
            <input
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-emerald-300"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <label className="text-black/70" htmlFor="email">Your Email</label>
            <input
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-emerald-300"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-6 w-full">
          <label className="text-black/70" htmlFor="message">Message</label>
          <textarea
            className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-emerald-300"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button id='primary' type="submit" className="mt-5 cursor-pointer text-white h-12 w-56 px-4 rounded active:scale-95 transition">
          Send Message
        </button>
      </form>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white text-sm text-center text-gray-800 shadow-[0px_4px_25px_0px_#0000000D] px-4 py-8 md:px-10 md:py-10 m-1 rounded-lg w-full max-w-md">
            <h1 className="md:text-2xl text-xl font-semibold">Your Message Sent Successfully</h1>
            <p className="mt-6 text-gray-500">We’ll get back to you shortly. Thank you for reaching out to us!</p>
            <div className="grid grid-cols-2 px-8 mt-8 gap-5">
              <button
                type="button"
                className="border cursor-pointer border-gray-300 py-2 rounded hover:bg-red-600 hover:border-red-600 hover:text-white transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                onClick={() => navigate('/')}
                id='primary'
                type="button"
                className="text-white cursor-pointer transition py-2 rounded"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
