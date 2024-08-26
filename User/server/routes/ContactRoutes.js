import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddeware.js";
import { getContactsForDMList, searchContacts,getAllContacts } from "../controllers/ContactController.js";


const contactsRoutes = Router()

contactsRoutes.post("/search",verifyToken,searchContacts)
contactsRoutes.get('/get-contacts-for-dm',verifyToken,getContactsForDMList)
contactsRoutes.get('/get-all-contacts' , verifyToken, getAllContacts)

export default contactsRoutes