import { NavLink } from 'react-router'
import { AlignJustify } from "lucide-react"
import { createContext, useContext, useState } from "react"

const SidebarContext = createContext()

export default function Sidebar({children}) {  // SidebarProvider meron siyang context na ipinapasa niya sa children niya, which is yung childrena
    // niiya is depende kung kanino niya icacall, since ang pinapasa niya is yung expanded kung true or false lang 
// anything you wrap in sidebar is your children
    const [expanded, setExpanded] = useState(true) 
    return(
        <>
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white shadow-sm">
                <div className={`p-4 pb-2 flex bg-green-100 
                    ${expanded ? "justify-end" : "justify-center"}`}>
                    <div onClick={() => setExpanded(curr => !curr)} className="cursor-pointer hover:bg-green-200 p-2">
                        <AlignJustify />  {/*Burger Menu* */}
                    </div>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    {children}
                </SidebarContext.Provider>

            </nav>
        </aside>
    </>
    )
}

export function SideBarItem({icon, text, to}) { // nag pasa ng param galing sa qpp.jsx
    const {expanded} = useContext(SidebarContext) // gnrab yung context 
    return (
        <>
        <NavLink 
            to={to}
            className={({ isActive }) =>
                `relative flex items-center gap-2 py-2 px-3 mx-1 my-1
                font-medium rounded-md cursor-pointer transition-colors
                ${
                    isActive
                        ? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
                        : "hover:bg-green-100 text-gray-600"
                }
                ${expanded ? "justify-start" : "justify-center"}`
            }
        >
            {icon}
            <span
                className={`overflow-hidden transition-all
                ${expanded ? "w-52" : "w-0"}`}
            >
                {text}
            </span>
        </NavLink>
        </>
    )
}