"use client"
import React from 'react';
import NavBar from '@/components/Unused/navbar.jsx';
import Work from '@/Components/Unused/work.jsx';
import Problem from '@/Components/Unused/problem.jsx';
import Report from '@/Components/Unused/report.jsx';
import Contact from '@/Components/Unused/contact.jsx';
import Questions from '@/Components/Unused/questions.jsx';
import Footer from '@/Components/Unused/footer.jsx';
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