import React from 'react';
import logo from '@/assets/images/logo-dark (1).png'
import Image from 'next/image';

const Contact=()=>{
    const contact=[
        {name:"mail", head:"Email", text1:"Chat with our friendly team and get updates via Email",text2:"rangurura@gmail.com",type:"email"},
        {name:"chatbubble", head:"Social links", text1:"Follow us on facebook or instagram to receive daily update",text2:"",type:"media"},
        {name:"call", head:"Call us", text1:"Call our support team",icon:"call",text2:"+25078787878",type:"call"},
    ]
    return(
        <section className='flex flex-col gap-4 justify-center items-center p-4 py-[10vh]' id='contacts'>
            <Image src={logo} alt="" width={40}/>
            <h3 className='max-[420px]:text-[25px] font-bold text-[30px] mb-6'>Contact our friendly team</h3>
            <div className='w-full flex md:flex-row flex-col justify-evenly items-center gap-5 px-3'>
                {
                    contact.map((contact,i)=>(
                        <div key={i} className='flex flex-col justify-center items-start rounded-md border-[#D7D7D7] border-[2px] p-4 pl-6 pt-8 gap-4 w-[80vw] md:w-[20vw] h-[30vh] relative'>
                            <div className='flex justify-center items-center p-2 rounded border-[#D7D7D7] border-[1px] absolute left-3 top-3 contact-badge'>
                                <ion-icon name={`${contact.name}-outline`} size="sm" color="#0075FF"></ion-icon>
                            </div>
                            <div className='flex flex-col items-start justify-center gap-1 w-full text-left'>
                                <h4 className='font-extrabold text-[15px]'>{contact.head}</h4>
                                <p className='text-left text-sm'>{contact.text1}</p>
                            </div>
                            {contact.type === "email" ? (
                                <div className='w-full flex flex-row items-center justify-left'>
                                    <p className='w-full text-left text-sm text-cyan-600 cursor-pointer'><a target={"_blank"} href="https://mail.google.com/mail/u/0" className='w-full no-underline font-light'>{contact.text2}</a></p>
                                </div>
                            ) : contact.type === "media" ? (
                                <div className='w-full flex flex-row items-center justify-left gap-1'>
                                    <span className='border border-[1px] border-[#ccc] rounded-lg w-8 h-8 mr-3 flex items-center justify-center'>
                                        <ion-icon name={"logo-facebook"} color="#235248"></ion-icon>
                                    </span>
                                    <span className='border border-[1px] border-[#ccc] rounded-lg w-8 h-8 mr-3 flex items-center justify-center'>
                                        <ion-icon name={"logo-instagram"} color="#235248"></ion-icon>    
                                    </span> 
                                    <span className='border border-[1px] border-[#ccc] rounded-lg w-8 h-8 mr-3 flex items-center justify-center'>
                                        <ion-icon name={"logo-twitter"} color="#235248"></ion-icon>    
                                    </span> 
                                </div>
                            ) : (
                                <div className='w-full flex flex-row items-center justify-left gap-1'>
                                    <p className='text-md font-light text-cyan-600 cursor-pointer'>+25078787878</p>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Contact;