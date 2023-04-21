import { NextFunction, Request, Response } from "express";
import * as contactService from "../services/contactService";

export async function getAllContacts(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const contacts = await contactService.getAllContacts();
    response.render("contacts", {
      buttonsEnabled: true,
      contacts: contacts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getContact(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    if (request.query.id) {
      const contact = await contactService.getContact(
        request.query.id as string
      );
      response.type("json");
      response.end(JSON.stringify(contact));
    } else {
      response.end("Parameter not found");
    }
  } catch (error) {
    next(error);
  }
}

export async function addContact(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.body.name && request.body.phone) {
    await contactService
      .addContact(request.body)
      .then((result) => {
        response.type("json");
        response.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.error(err.message);
      });
  } else {
    next("Parameters not found");
  }
}

export async function addContactView(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let contacts = [];
  await contactService.getAllContacts().then((result) => (contacts = result));
  response.render("newContact", {
    buttonsEnabled: false,
    contacts: contacts,
  });
}

export async function editContact(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.query.id && request.body.name && request.body.phone) {
    await contactService
      .editContact(request.query.id as string, request.body)
      .then((result) => {
        response.type("json");
        response.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.error(err.message);
      });
  } else {
    next("Parameters not found");
  }
}

export async function editContactView(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let contacts = [],
    contact;
  await contactService.getAllContacts().then((result) => (contacts = result));
  await contactService
    .getContact(request.query.id as string)
    .then((result) => (contact = result));
  response.render("editContact", {
    buttonsEnabled: false,
    contacts: contacts,
    currentContact: contact,
  });
}

export async function deleteContact(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.query.id) {
    await contactService
      .deleteContact(request.query.id as string)
      .then((result) => {
        response.type("json");
        response.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.error(err.message);
      });
  } else {
    next("Parameters not found");
  }
}
