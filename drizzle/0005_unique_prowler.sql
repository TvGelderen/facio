ALTER TABLE "website" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "website" DROP COLUMN IF EXISTS "url_name";