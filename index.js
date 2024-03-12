import {
  getAllContacts,
  getContact,
  addContact,
  deleteContact,
} from "./contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await getAllContacts();
      return console.log(allContacts);
      break;

    case "get":
      const oneContact = await getContact(id);
      return console.log(oneContact);
      break;

    case "add":
      const newContact = await addContact(data);
      return console.log(newContact);
      break;

    case "remove":
      const deletedContact = await deleteContact(id);
      return console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
