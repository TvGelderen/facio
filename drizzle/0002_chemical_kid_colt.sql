ALTER TABLE "page_layout" ADD COLUMN "elements" jsonb;--> statement-breakpoint
ALTER TABLE "page_layout" DROP COLUMN IF EXISTS "layout";