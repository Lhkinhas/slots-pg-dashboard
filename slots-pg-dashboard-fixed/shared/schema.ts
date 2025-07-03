import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const slots = pgTable("slots", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  categoria: text("categoria").notNull(),
  imagem: text("imagem").notNull(),
  porcentagem: integer("porcentagem").notNull(),
  jogadores: integer("jogadores").notNull(),
  ativo: boolean("ativo").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSlotSchema = createInsertSchema(slots).omit({
  id: true,
  ativo: true,
});

export const updateSlotSchema = createInsertSchema(slots).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSlot = z.infer<typeof insertSlotSchema>;
export type UpdateSlot = z.infer<typeof updateSlotSchema>;
export type Slot = typeof slots.$inferSelect;
