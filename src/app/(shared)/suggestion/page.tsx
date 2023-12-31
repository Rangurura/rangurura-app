"use client"
import { useRef, useState } from 'react';
import logo from '@/assets/images/logo-dark (1).png'
import Link from 'next/link';
import Image from 'next/image';
import upload from "@/assets/images/upload.svg"
import {Provinces, Sectors, Cells, Districts, Villages} from "rwanda"
import { Select } from '@mantine/core';
import SelectLevel from '@/components/core/Level';

const ReportProblemModel=()=>{
    const [organisationCategory, setOrganisationCategory] = useState<string>("");
    const [organisationLevel, setOrganisationLevel] = useState("");
    const [level, setLevel] = useState("");

    const onChangeCategory = (e: any) =>{
        setOrganisationCategory(e.target.value)
    }

    return(
        <section className='flex justify-center items-center w-screen h-screen bg-[#EEF3F9]'>
            <div className='flex flex-col bg-white rounded p-8 items-center justify-center gap-8 w-[90%] md:w-[35%]'>
                <div className='flex flex-col justify-center items-center'>
                    <Link href="/"><Image src={logo} alt="" width={60} /></Link>
                    <h3 className='font-bold text-[#001833] text-2xl'>Tanga Igitekerezo</h3>
                </div>
                    <form className='w-full flex flex-col justify-center gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-black'>Hitamo aho ushaka kugeza Igitekerezo <span className='text-red-600'>*</span></label>
                            <select required className='border-[#C3C3C3] border-2 rounded-md p-2' value={organisationCategory} onChange={(e)=>onChangeCategory(e)}>
                                <option value="">Select Value</option>
                                <option value="Urwego Rw'Ibanze">Urwego rw'Ibanze</option>
                                <option value="Ikigo cya Leta">Ikigo cya Leta</option>

                            </select>
                            {organisationCategory === "Ikigo cya Leta" && (
                                <div  className='flex flex-col gap-1'>
                                    <label className='font-semibold text-black'>Hitamo aho ushaka kugeza Igitekerezo <span className='text-red-600'>*</span></label>
                                    <select required className='border-[#C3C3C3] border-2 rounded-md p-2'>
                                        <option value="">Hitamo</option>
                                        <option value="">MINALOC</option>
                                        <option value="">MINISANTE</option>
                                        <option value="">RIB</option>
                                        <option value="">RDB</option>
                                        <option value="">RGB</option>
                                    </select>
                                </div>
                            )
                            }
                            {organisationCategory === "Urwego Rw'Ibanze" && (
                                <div  className='flex flex-col gap-1'>
                                    <label className='font-semibold text-black'>Hitamo {organisationCategory} ushaka kugeza Igitekerezo <span className='text-red-600'>*</span></label>
                                    <select required className='border-[#C3C3C3] border-2 rounded-md p-2' onChange={(e)=> setOrganisationLevel(e.target.value)}>
                                        <option value="">Hitamo</option>
                                        <option value="Akagari">Akagari</option>
                                        <option value="Umurenge">Umurenge</option>
                                        <option value="Akarere">Akarere</option>
                                        <option value="Intara">Intara</option>
                                    </select>
                                </div>
                            )
                            }
                            <SelectLevel organisationCategory={organisationCategory} organisationLevel={organisationLevel}/>

                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-black'>Igitekerezo <span className='text-red-600'>*</span></label>
                            <textarea rows={2} placeholder='Igitekerezo' className='min-h-[8rem] border-[#C3C3C3] border-2 rounded-md p-2' style={{resize:"none"}}></textarea>
                        </div>
                        <div className='flex items-center justify-center pt-3'>
                           
                                <button 
                                    className='btn_primary text-white p-2 px-10 rounded-md'
                                    >Tanga Igitekerezo</button>
                        </div>
                    </form>
            </div>
        </section>
    )
}

export default ReportProblemModel;