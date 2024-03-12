import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.resolve("dp", "contacts.json");
export const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};
export const getContact = async (id) => {
  const data = await getAllContacts();
  const result = data.find((itema) => itema.id === id);

  return result || null;
};
export const addContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return newContact;
};
export const deleteContact = async (id) => {
  const contacts = await getAllContacts();
  const index = contacts.find((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.slice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 10));
  return result;
};
