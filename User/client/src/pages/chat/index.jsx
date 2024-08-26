import { useAppStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import ContactContainer from "./contacts-container"
import EmptyChatContainer from "./empty-chat-container"
import ChatContainer from "./chat-container"

const Chat = () => {
  const { userInfo, selectedChatType } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue ")
      navigate("/profile")
    }
  }, [userInfo, navigate])


  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />
      {
        selectedChatType === undefined ? (
          <EmptyChatContainer />
        ) : (
          <ChatContainer />
        )
      }


    </div>
  )
}

export default Chat