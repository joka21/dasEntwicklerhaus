ALTER TABLE "portal_variant_comments" ADD COLUMN "is_admin" boolean DEFAULT false NOT NULL;--> statement-breakpoint
-- Bestehende Kommentare von Admins kennzeichnen (bisher über portal_admins ermittelt).
UPDATE "portal_variant_comments" SET "is_admin" = true
WHERE "author_id" IN (SELECT "user_id" FROM "portal_admins");
