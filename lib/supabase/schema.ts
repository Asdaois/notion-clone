import { subscriptionStatus, prices } from "@/migrations/schema";
import { sql } from "drizzle-orm";
import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const defaultData = {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
  title: text('title').notNull(),
  iconID: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  logo: text('logo'),
  bannerUrl: text('banner_url'),
}

export const workspace = pgTable('workspaces', {
  ...defaultData,
  workspaceOwner: uuid('workspace_owner').notNull(),
});

export const folders = pgTable('folders', {
  ...defaultData,
  workspaceId: uuid('workspace_id').references(() => workspace.id, { onDelete: 'cascade' }),
});

export const files = pgTable('files', {
  ...defaultData,
  workspaceId: uuid('workspace_id').references(() => workspace.id, { onDelete: 'cascade' }),
  folderId: uuid('folder_id').references(() => folders.id, {onDelete: 'cascade'}),
})

export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey().notNull(),
  userId: uuid("user_id").notNull(),
  status: subscriptionStatus("status"),
  metadata: jsonb("metadata"),
  priceId: text("price_id").references(() => prices.id),
  quantity: integer("quantity"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end"),
  created: timestamp("created", { withTimezone: true, mode: "string" }).default(
    sql`now()`
  ),
  currentPeriodStart: timestamp("current_period_start", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  currentPeriodEnd: timestamp("current_period_end", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  endedAt: timestamp("ended_at", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  cancelAt: timestamp("cancel_at", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  canceledAt: timestamp("canceled_at", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  trialStart: timestamp("trial_start", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  trialEnd: timestamp("trial_end", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
});