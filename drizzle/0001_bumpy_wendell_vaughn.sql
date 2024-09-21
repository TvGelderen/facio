CREATE TABLE IF NOT EXISTS "page_layout" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_id" text NOT NULL,
	"layout" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "page_layout" ADD CONSTRAINT "page_layout_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
