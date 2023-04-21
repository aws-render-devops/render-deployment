import fs from "fs/promises";
import { v4 as uuid } from "uuid";
import contactsJsonArray from "../contacts.json";

const contacts = contactsJsonArray || [];
export const getAllContacts = async () => await contacts;

export const getContact = async (id: string) => {
  const contact = await contacts.find((c: { id: string }) => c.id === id);
  return contact ? contact : "Not found";
};

export const addContact = async (data: any) => {
  contacts.push({ id: uuid(), name: data.name, phone: data.phone });
  saveToFile();

  return contacts;
};

export const editContact = async (id: string, data: any) => {
  const contact = await contacts.find((c: { id: string }) => c.id === id);
  if (contact) {
    contact.name = data.name;
    contact.phone = data.phone;
  }
  saveToFile();

  return contacts;
};

export const deleteContact = async (id: string) => {
  const index = contacts.findIndex((c: { id: string }) => c.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
  }
  await saveToFile();

  return contacts;
};

const saveToFile = async () => {
  try {
    await fs.writeFile("./contacts.json", JSON.stringify(contacts));
  } catch (e) {
    console.log(e);
  }
};
