export interface IRepository<T> {
    create(item: T): Promise<void>;
    read(id: number): Promise<T | null>;
    update(item: T): Promise<void>;
    delete(id: number): Promise<void>;
    getAll(): Promise<T[]>;
  }
  