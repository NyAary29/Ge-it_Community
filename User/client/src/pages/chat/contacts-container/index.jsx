import { useEffect } from "react"
import NewDm from "./components/new-dm"
import ProfileInfo from "./components/profile-info"
import { apiClient } from "@/lib/api-client"
import { GET_DM_CONTACTS_ROUTE, GET_USER_CHANNELS_ROUTES } from "@/utils/constants"
import { useAppStore } from "@/store"
import ContactList from "@/components/contact-list"
import CreateChannel from "./components/create-channel"

const ContactContainer = () => {

  const {setDirectMessagesContacts,directMessagesContacts,channels,setChannels} = useAppStore()
  useEffect(()=>{
    const getContacts = async () => {
      const response = await apiClient.get(
        GET_DM_CONTACTS_ROUTE,
        {withCredentials:true}
      )

      if(response.data.contacts){
        setDirectMessagesContacts(response.data.contacts);
      }
    }

    const getChannels = async () => {
      const response = await apiClient.get(
        GET_USER_CHANNELS_ROUTES,
        {withCredentials:true}
      )

      if(response.data.channels){
        setChannels(response.data.channels);
      }
    }

    getContacts()
    getChannels()
  },[setChannels,setDirectMessagesContacts])
  return (
    <div className="relative md:w-[45vw] lg:-[70vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#0d1eda] w-full">
      <div className="plt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
        <div className="max-h-[30vh] overflow-auto scrollbar-hidden ">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels Messages" />
          <CreateChannel />
        </div>
        <div className="max-h-[30vh] overflow-auto scrollbar-hidden ">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default ContactContainer

const Logo = () => {
  return (
    <div className="flex p-5 justify-center items-center gap-2">
      <span className="text-3xl font-semibold italic text-rose-500">:::: G<span className="text-white">E-I</span>T ::::</span>
    </div>
  )
}

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  )
}