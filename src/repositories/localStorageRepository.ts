import { IRepository } from './taskRepository';
import { Task } from '../models/taskTypes';

export class LocalStorageRepository implements IRepository<Task> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  async create(item: Task): Promise<void> {
    const items = await this.getAll();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  async read(id: number): Promise<Task | null> {
    const items = await this.getAll();
    return items.find(item => item.id === id) || null;
  }

  async update(item: Task): Promise<void> {
    const items = await this.getAll();
    const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      items[index] = item;
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  }

  async delete(id: number): Promise<void> {
    const items = await this.getAll();
    const filteredItems = items.filter(item => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredItems));
  }

  async getAll(): Promise<Task[]> {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }
}
