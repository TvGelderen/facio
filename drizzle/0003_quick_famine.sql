CREATE TABLE IF NOT EXISTS "logo" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"file" text NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "logo" ADD CONSTRAINT "logo_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
