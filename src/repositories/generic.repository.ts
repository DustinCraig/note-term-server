import { Pool } from "pg";
import config from "../config/config";

const dbPool = new Pool({
  connectionString: config.dbUrl,
});

export abstract class GenericRepository<T> {
  protected pool: Pool;
  protected tableName: string;

  constructor(tableName: string) {
    this.pool = dbPool;
    this.tableName = tableName;
  }

  async findById(id: number): Promise<T | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const result = await this.pool.query(query, [id]);
    const note = result.rows[0] as T;
    return note ?? null;
  }

  async findAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    const result = await this.pool.query(query);
    return result.rows as T[];
  }

  async findAllBy(criteria: Partial<T>): Promise<T[]> {
    if (Object.keys(criteria).length === 0) {
      return this.findAll();
    }

    const conditions = Object.keys(criteria)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(" AND ");

    const values = Object.values(criteria);
    const query = `SELECT * FROM ${this.tableName} WHERE ${conditions}`;
    const result = await this.pool.query(query, values);
    return result.rows as T[];
  }

  async deleteById(id: number): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
    await this.pool.query(query, [id]);
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const columns = Object.keys(data).join(",");
    const values = Object.keys(data)
      .map((_, index) => `$${index + 1}`)
      .join(",");
    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values})`;
    const result = await this.pool.query(query, Object.values(data));
    return result.rows[0] as T;
  }

  async updateById(id: number, data: Partial<T>): Promise<T> {
    const { id: undefined, ...updateData } = data as Partial<
      T & { id?: number }
    >;
    const columns = Object.keys(updateData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(",");
    const values = Object.values(updateData);
    const query = `UPDATE ${this.tableName} SET ${columns} WHERE id = $${values.length + 1}`;
    const result = await this.pool.query(query, [...values, id]);
    return result.rows[0] as T;
  }
}
