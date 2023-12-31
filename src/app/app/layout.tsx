import Sidebar from "@/components/core/Sidebar"
import React from "react"

const Layout = ({children}: {children: React.ReactNode}) =>{
    return(
        <div className="w-screen h-[140vh] flex items-center bg-[#021428] md:pr-8">
            <Sidebar/>
            <div className="w-[81%] h-[95%] bg-white rounded-[1.3rem] p-2">
                {children}
            </div>
        </div>
    )
}

export default Layout