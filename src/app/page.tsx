"use client"
import React from 'react';
import NavBar from '@/Components/Unused/navbar';
import Work from '@/Components/Unused/work';
import Problem from '@/Components/Unused/problem';
import Report from '@/Components/Unused/report';
import Contact from '@/Components/Unused/contact';
import Questions from '@/Components/Unused/questions';
import Footer from '@/Components/Unused/footer';
import Testimonies from '@/components/Unused/Testimonies';

const Homepage=()=>{
    return(
        <section>
            <NavBar />
            <Work />
            <Problem />
            <Report />
            {/* <Testimonies/> */}
            <Contact />
            <Questions />
            <Footer />
        </section>
    )
}
export default Homepage;