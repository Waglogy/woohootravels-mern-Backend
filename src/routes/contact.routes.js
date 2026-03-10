import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact
} from "../controllers/contact.controllers.js";

const router = express.Router();

// POST /api/contacts - Create contact
router.post("/", createContact);

// GET /api/contacts - Get all contacts
router.get("/", getAllContacts);

// GET /api/contacts/:id - Get contact by ID
router.get("/:id", getContactById);

// PUT /api/contacts/:id - Update contact
router.put("/:id", updateContact);

// DELETE /api/contacts/:id - Delete contact
router.delete("/:id", deleteContact);

export default router;