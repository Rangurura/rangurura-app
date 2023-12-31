import React from 'react';
import logo from '../../Assets/Images/logo-dark (1).png'
import appstore from '../../Assets/vector/contactFooter/appstore.png'
import googleplay from '../../Assets/vector/contactFooter/play-store 1.png'
import phone from '../../Assets/vector/contactFooter/phone 4.png'
import facebook from '../../Assets/vector/contactFooter/facebook 3.png'
import instagram from '../../Assets/vector/contactFooter/instagram 2.png'
import mail from '../../Assets/vector/contactFooter/Group.png'
import twitter from '../../Assets/vector/contactFooter/Vector.png'
import Image from 'next/image';
import vector from "@/assets/images/footer.svg"
import Link from 'next/link';
const Footer=()=>{
    return(
        <section className='flex flex-col justify-between p-4 w-full gap-4 md:py-[6vh] footer-section' id='home'>
            <div className='flex max-[500px]:flex-col max-[500px]:items-center flex-row px-[3rem]'>
            <div className='max-[500px]:w-full w-[50%] flex flex-col gap-4 md:justify-start justify-center text-white'>
                <div className='flex gap-2 md:justify-start justify-center items-center'>
                    <a href="#home" className='no-underline mr-4'><Image src={logo} alt="" width={30} height={30}/></a>
                    <h3 className='text-white font-bold text-lg'><a href="#home" className='no-underline'>Rangurura</a></h3>
                </div>
                <p className='text-left font-light'>“Rangurura” is your direct channel to make your voice heard. We believe that every citizen's concerns and issues matter. Our platform empowers you to report problems, share feedback, and request assistance with ease.</p>
                <div className='flex flex-row justify-between font-semibold'>
                    <Link href="#home">Ahabanza</Link>
                    <Link href="#qns">Ibibazo</Link>
                    <Link href="#contacts">Contact</Link>
                    <Link href="/login">Kwinjira</Link>
                    <Link href="/register">Iyandikishe</Link>
                </div>
                
            </div>
            <div className='max-[500px]:w-full w-[50%] flex flex-col justify-end items-end gap-8'>
                <div className='flex flex-col gap-6 justify-center items-center pt-10'>
                    <div className='flex flex-row items-center pl-4 gap-3 bg-white w-[15rem] h-[4rem] rounded pr-16 cursor-pointer'>
                        <Image src={appstore} alt="" width={5} height={31} className={'flex w-10 object-contain h-10 cursor-pointer'}/>
                        <div className='flex flex-col'>
                            <p className='font-bold'>Download on</p>
                            <h4 className='font-bold'>App store</h4>
                        </div>
                    </div>
                    <div className='flex flex-row items-center pl-4 gap-1 bg-white w-[15rem] h-[4rem] rounded pr-16 cursor-pointer'>
                        <Image src={googleplay} alt="" width={50} height={50} className='w-12 h-12 flex cursor-pointer'/>
                        <div className='flex flex-col'>
                            <p className='font-bold'>Download on</p>
                            <h4 className='font-bold'>Play store</h4>
                        </div>
                    </div>
                </div>
                <div className='max-[500px]:w-full max-[500px]:flex-row max-[500px]:justify-between flex flex-col gap-2 justify-start items-start rounded max-[500px]:pr-0 pr-16'>
                    <div className='flex flex-row gap-1'>
                        <Image src={phone} alt="" className='w-6 h-6'/>
                        <p className='text-white font-light'>+25078787878</p>
                    </div>
                    <div className='flex flex-row gap-6 pl-2 mt-2'>
                        <Image src={mail} alt="" className='w-8 h-5 cursor-pointer'/>
                        <Image src={facebook} alt="" className='w-6 h-6 cursor-pointer'/>
                        <Image src={instagram} alt="" className='w-6 h-6 cursor-pointer'/>
                        <Image src={twitter} alt="" className='w-6 h-6 cursor-pointer'/>
                    </div>
                </div>
            </div>
            </div>  
            <div className='flex justify-left px-[3rem] text-white mt-10'> &copy; 2023 Rangurura. All rights reserved</div> 
        </section>
    )
}

export default Footer;