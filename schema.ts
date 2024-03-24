import {pgTable, serial, text} from "drizzle-orm/pg-core";


export const LinksTable = pgTable('links', {
    id: serial('id').primaryKey(),
    url: text('url').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    image: text('image'),
    owner: text('owner').notNull(),
});
