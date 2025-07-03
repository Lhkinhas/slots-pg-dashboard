import { users, slots, type User, type InsertUser, type Slot, type InsertSlot, type UpdateSlot } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Slot operations
  getAllSlots(): Promise<Slot[]>;
  getSlot(id: number): Promise<Slot | undefined>;
  createSlot(slot: InsertSlot): Promise<Slot>;
  updateSlot(id: number, slot: UpdateSlot): Promise<Slot | undefined>;
  deleteSlot(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private slots: Map<number, Slot>;
  private currentUserId: number;
  private currentSlotId: number;

  constructor() {
    this.users = new Map();
    this.slots = new Map();
    this.currentUserId = 1;
    this.currentSlotId = 1;
    
    // Initialize with some sample slots
    this.initializeSampleSlots();
  }

  private initializeSampleSlots() {
    const sampleSlots: InsertSlot[] = [
      {
        nome: "Fortune Tiger",
        categoria: "Fortune",
        imagem: "https://www.pgsoft.com/uploads/Games/Images/573dd356-c258-4f7d-b6a3-94c4ab44a780.png",
        porcentagem: 90,
        jogadores: 998
      },
      {
        nome: "Fortune Rabbit",
        categoria: "Fortune",
        imagem: "https://www.pgsoft.com/uploads/Games/Images/1c66cd3b-e9e6-417a-a59e-74124af6ebc5.png",
        porcentagem: 91,
        jogadores: 843
      },
      {
        nome: "Fortune Mouse",
        categoria: "Fortune",
        imagem: "https://www.pgsoft.com/uploads/Games/Images/dcb0a0c8-86e4-4f81-a738-46fb29bf7c6a.png",
        porcentagem: 96,
        jogadores: 723
      },
      {
        nome: "Mahjong Ways 2",
        categoria: "Mahjong",
        imagem: "https://www.pgsoft.com/uploads/Games/Images/b29bec46-4cf1-4eb1-9b77-98ad9813410d.png",
        porcentagem: 92,
        jogadores: 1278
      },
      {
        nome: "Lucky Neko",
        categoria: "Temático",
        imagem: "https://www.pgsoft.com/uploads/Games/Images/a0117f36-871d-4aef-a40c-c83d083c8dbd.png",
        porcentagem: 89,
        jogadores: 1112
      },
      {
        nome: "Fortune Ox",
        categoria: "Fortune",
        imagem: "https://www.pgsoft.com/uploads/Games/Images/dad28553-b44b-41d9-9e8f-1188f7ffd995.png",
        porcentagem: 87,
        jogadores: 1365
      },
      {
        nome: "Cash Mania",
        categoria: "Clássico",
        imagem: "https://www.pgsoft.com/uploads/Games/Images/a32fdc67-e0c0-4d7b-a211-53868866a0f7.png",
        porcentagem: 88,
        jogadores: 754
      },
      {
        nome: "Fortune Dragon",
        categoria: "Fortune",
        imagem: "https://www.pgsoft.com/uploads/Games/Images/6db8b734-210d-4c7f-b427-0480a05a9e7d.png",
        porcentagem: 93,
        jogadores: 1102
      }
    ];

    // Force initialization for deployment
    this.slots.clear();
    this.currentSlotId = 1;
    
    sampleSlots.forEach((slot, index) => {
      const id = index + 1;
      const slotWithId: Slot = { ...slot, id, ativo: true };
      this.slots.set(id, slotWithId);
    });
    
    this.currentSlotId = sampleSlots.length + 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllSlots(): Promise<Slot[]> {
    // Ensure data is always available for deployment
    if (this.slots.size === 0) {
      this.initializeSampleSlots();
    }
    return Array.from(this.slots.values()).filter(slot => slot.ativo);
  }

  async getSlot(id: number): Promise<Slot | undefined> {
    return this.slots.get(id);
  }

  async createSlot(insertSlot: InsertSlot): Promise<Slot> {
    const id = this.currentSlotId++;
    const slot: Slot = { ...insertSlot, id, ativo: true };
    this.slots.set(id, slot);
    return slot;
  }

  async updateSlot(id: number, updateSlot: UpdateSlot): Promise<Slot | undefined> {
    const existingSlot = this.slots.get(id);
    if (!existingSlot) return undefined;

    const updatedSlot: Slot = { ...existingSlot, ...updateSlot };
    this.slots.set(id, updatedSlot);
    return updatedSlot;
  }

  async deleteSlot(id: number): Promise<boolean> {
    const slot = this.slots.get(id);
    if (!slot) return false;

    // Soft delete by setting ativo to false
    slot.ativo = false;
    this.slots.set(id, slot);
    return true;
  }
}

export const storage = new MemStorage();
