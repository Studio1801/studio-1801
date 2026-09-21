import { createInsertSchema } from 'drizzle-zod';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod/v4';

export const websiteLeadsTable = pgTable('website_leads', {
  id: serial('id').primaryKey(),
  frustration: text('frustration').notNull(),
  websiteGoal: text('website_goal').notNull(),
  businessType: text('business_type').notNull(),
  budget: text('budget').notNull(),
  businessName: text('business_name').notNull(),
  contact: text('contact').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const insertWebsiteLeadSchema = createInsertSchema(websiteLeadsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertWebsiteLead = z.infer<typeof insertWebsiteLeadSchema>;
export type WebsiteLead = typeof websiteLeadsTable.$inferSelect;