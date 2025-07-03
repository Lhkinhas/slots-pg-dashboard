import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSlotSchema, updateSlotSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all slots
  app.get("/api/slots", async (req, res) => {
    try {
      const slots = await storage.getAllSlots();
      res.json(slots);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch slots" });
    }
  });

  // Get slot by ID
  app.get("/api/slots/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const slot = await storage.getSlot(id);
      
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
      }
      
      res.json(slot);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch slot" });
    }
  });

  // Create new slot
  app.post("/api/slots", async (req, res) => {
    try {
      const validatedData = insertSlotSchema.parse(req.body);
      const slot = await storage.createSlot(validatedData);
      res.status(201).json(slot);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create slot" });
    }
  });

  // Update slot
  app.put("/api/slots/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateSlotSchema.parse(req.body);
      const slot = await storage.updateSlot(id, validatedData);
      
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
      }
      
      res.json(slot);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update slot" });
    }
  });

  // Delete slot
  app.delete("/api/slots/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSlot(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Slot not found" });
      }
      
      res.json({ message: "Slot deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete slot" });
    }
  });

  // Simulate real-time player count updates
  app.patch("/api/slots/:id/players", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { jogadores } = req.body;
      
      if (typeof jogadores !== 'number') {
        return res.status(400).json({ message: "Invalid player count" });
      }
      
      const slot = await storage.updateSlot(id, { jogadores });
      
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
      }
      
      res.json(slot);
    } catch (error) {
      res.status(500).json({ message: "Failed to update player count" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
