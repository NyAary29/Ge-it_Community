import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { apiClient } from "@/lib/api-client"
import { HOST, SEARCH_CONTACTS_ROUTE } from "@/utils/constants"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { getColor } from "@/lib/utils"
import { useAppStore } from "@/store"

const NewDm = () => {
    const { setSelectedChatType,setSelectedChatData} = useAppStore()
    const [openNewContactModal, setOpenNewContactModal] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])


    const searchContacts = async (searchTerm) => {
        try {
            if (searchTerm.length >= 0) {
                const response = await apiClient.post(
                    SEARCH_CONTACTS_ROUTE,
                    { searchTerm },
                    { withCredentials: true })

                if (response.status === 200 && response.data.contacts) {
                    setSearchedContacts(response.data.contacts)
                }
            } else {
                setSearchedContacts([])
            }
        } catch (error) {
            console.log(error);

        }
    }


    const selectNewContact = (contact) => {
        setOpenNewContactModal(false)
        setSelectedChatType("contact")
        setSelectedChatData(contact)
        setSearchedContacts([])
    }

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-neutral-400 font-light text-opacity-100 cursor-pointer transition-all duration-300"
                            onClick={() => setOpenNewContactModal(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className=" bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        Select New Contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal} className="p-5">

                <DialogContent className="bg-[#191920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please select a contact</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <div>
                        <Input placeholder="Search Contact" className=" rounded-lg p-6 bg-[#2c2e3B] border-none"
                            onChange={(e) => searchContacts(e.target.value)} />
                    </div>
                    

                    <ScrollArea className="h-[250px]">
                        <div className="flex flex-col gap-5">
                            {
                                searchedContacts.map((contact,index)=> 
                                <div key={index} className="flex gap-3 items-center cursor-pointer" onClick={()=>selectNewContact(contact)}>
                                    <div className="w-12 relative">
                                        <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                            {contact.image
                                                ? (
                                                    <AvatarImage
                                                        src={`${HOST}/${contact.image}`}
                                                        alt="profile"
                                                        className="object-cover w-full h-full bg-black rounded-full"
                                                    />
                                                ) : (
                                                    <div className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>

                                                        {contact.firstName
                                                            ? contact.firstName.split("").shift()
                                                            : contact.email.split("").shift()
                                                        }
                                                    </div>
                                                )}

                                        </Avatar>

                                    </div>
                                    <div className="flex flex-col">
                                       <span>
                                       {
                                            contact.firstName && contact.lastName
                                                ? `${contact.firstName} ${contact.lastName}`
                                                : contact.email
                                        }
                                       </span>
                                       <span className="text-xs">{contact.email}</span>
                                    </div>
                                </div>)
                            }
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default NewDm