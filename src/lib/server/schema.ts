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
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
}, (t) => ({
    unq: unique().on(t.provider, t.provider_id)
}));

export const websites = pgTable("website", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id),
    name: text("name").notNull(),
    description: text("description"),
    logo: text("logo"),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }).defaultNow(),
});

export const logos = pgTable("logo", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id),
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
