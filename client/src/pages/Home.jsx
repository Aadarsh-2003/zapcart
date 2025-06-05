import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div id="home" className='mt-10'>
        
            <MainBanner/>
            <Categories/>

        <section id="best-sellers">
            <BestSeller/>
        </section>

            <BottomBanner/>
            <NewsLetter/>
        

    </div>
  )
}

export default Home