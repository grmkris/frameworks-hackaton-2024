import { relations } from "drizzle-orm";
import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  wallet: text("wallet").notNull(),
  image: text("image"),
});

export const LinksTable = pgTable("links", {
  id: uuid("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  user: uuid("owner")
    .notNull()
    .references(() => UserTable.id),
});

export type User = {
  id: string;
  name: string;
  wallet: string;
  image?: string;
  links?: Link[];
};

export type Link = {
  id: string;
  url: string;
  title: string;
  user: string;
};

export const UserRelations = relations(UserTable, ({ one, many }) => ({
  links: many(LinksTable),
}));

export const LinkRelations = relations(LinksTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [LinksTable.user],
    references: [UserTable.id],
  }),
}));
