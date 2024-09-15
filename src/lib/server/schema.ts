import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    provider: text("provider").notNull(),
    provider_id: text("provider_id").notNull(),
    username: text("username").notNull(),
    email: text("email"),
    avatar: text("avatar"),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }).notNull().defaultNow(),
}, (t) => ({
    unq: unique().on(t.provider, t.provider_id)
}));

export const usersRelations = relations(users, ({ many }) => ({
    websites: many(websites),
}));

export const websites = pgTable("website", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description").notNull(),
    logo: text("logo"),
    url: text("url"),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }).notNull().defaultNow(),
});

export const websitesRelations = relations(websites, ({ many }) => ({
    pages: many(pages),
}));

export const pages = pgTable("page", {
    id: text("id").primaryKey(),
    websiteId: text("website_id").notNull().references(() => websites.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    path: text("path").notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }).notNull().defaultNow(),
}, (t) => ({
    unq: unique().on(t.websiteId, t.path)
}));

export const pagesRelations = relations(pages, ({ one }) => ({
    website: one(websites, {
        fields: [pages.websiteId],
        references: [websites.id]
    }),
}));

export const images = pgTable("images", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    file: text("file").notNull(),
    url: text("url").notNull(),
})

export const sessions = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
});
