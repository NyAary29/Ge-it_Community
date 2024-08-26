import { useSocket } from "@/context/SocketContext"
import { apiClient } from "@/lib/api-client"
import { useAppStore } from "@/store"
import { UPLOAD_FILE_ROUTE } from "@/utils/constants"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import { GrAttachment } from "react-icons/gr"
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"


const MessageBar = () => {
  const fileInputRef = useRef()
  const { selectedChatType, selectedChatData, userInfo } = useAppStore()
  const socket = useSocket()
  const [message, setMessage] = useState("")
  const emojiRef = useRef()
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji)
  }


  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      })
    }else if(selectedChatType ==="channel"){
      socket.emit("send-channel-message",{
        sender: userInfo.id,
        content: message,
        messageType: "text",
        fileUrl: undefined,
        channelId:selectedChatData._id,
      })
    }
    setMessage("")
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false)
      }

    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => (
      document.removeEventListener("mousedown", handleClickOutside)
    )
  }, [emojiRef])


  const handleAttachementClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAttachementChange = async () => {
    try {
      const file = event.target.files[0]
      if (file) {
        const formData = new FormData()
        formData.append("file", file)
        const response = await apiClient.post(UPLOAD_FILE_ROUTE,  formData , { withCredentials: true })

        if (response.status === 200 && response.data) {
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath,
            })
          }else if(selectedChatType ==="channel"){
            socket.emit("send-channel-message",{
              sender: userInfo.id,
              content: undefined,
              messageType: "file",
              fileUrl: response.data.filePath,
              channelId:selectedChatData._id,
            })
          }

        }
      }

    } catch (error) {
      console.log({ error });

    }
  }
  return (

    <div className="h-[10vh] bg-[#1c1d25] flex  justify-center items-center px-8 mb-6 gap-2 ">

      <div className=" flex bg-[#2a2b33] rounded-md items-center gap-1 px-2">
        <input type="text" className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter message "
          value={message}
          onChange={(e) => setMessage(e.target.value)}

        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white
             duration-300 transition-all"
          onClick={handleAttachementClick}>
          <GrAttachment className='text-2xl' />
        </button>
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleAttachementChange} />

        <div className="realtive">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white
             duration-300 transition-all" onClick={() => setEmojiPickerOpen(true)}>
            <RiEmojiStickerLine className='text-2xl' />
          </button>

          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker theme="dark" open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
          </div>
        </div>
      </div>
      <button className="bg-[#8417ff] rounded-md flex items-center justify-center p-3  focus:border-none hover:bg-[#741bda] focus:bg-[#741bda]  focus:outline-none focus:text-white
             duration-300 transition-all" onClick={handleSendMessage}>
        <IoSend className='text-4xl' />
      </button>
    </div>
  )
}

export default MessageBar