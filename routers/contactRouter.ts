import { Router } from "express";
import * as contactController from "../controllers/contactController";

export const contactRouter = Router();
contactRouter.get("/", contactController.getAllContacts);
contactRouter.get("/id", contactController.getContact);

contactRouter.get("/add", contactController.addContactView);
contactRouter.post("/add", contactController.addContact);

contactRouter.get("/update", contactController.editContactView);
contactRouter.post("/update", contactController.editContact);

contactRouter.post("/delete", contactController.deleteContact);
