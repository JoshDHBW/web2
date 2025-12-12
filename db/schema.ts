import { mysqlTable, serial, text, varchar, timestamp } from "drizzle-orm/mysql-core";

// Accounts Tabelle
export const account = mysqlTable("account", {
  id: serial("id").primaryKey(),
  login: varchar("login", { length: 255 }).notNull(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }),
  reg_date: timestamp("create_time").defaultNow(),
});

// Characters Tabelle
export const characters = mysqlTable("characters", {
  id: serial("id").primaryKey(),
  accountId: serial("account_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  level: serial("level").default(1),
  created_at: timestamp("created_at").defaultNow(),
});

// Itemshop Tabelle
export const items = mysqlTable("items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: serial("price").notNull(),
});
