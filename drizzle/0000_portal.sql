-- pgvector für spätere Funktionen; das Portal selbst nutzt die Erweiterung nicht.
CREATE EXTENSION IF NOT EXISTS vector;
--> statement-breakpoint
CREATE TABLE "auth_account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" uuid NOT NULL,
	CONSTRAINT "auth_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "auth_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "auth_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "auth_verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portal_admins" (
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portal_admins_pkey" PRIMARY KEY("user_id")
);
--> statement-breakpoint
CREATE TABLE "portal_client_members" (
	"client_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portal_client_members_pkey" PRIMARY KEY("client_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "portal_clients" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portal_clients_pkey" PRIMARY KEY("id"),
	CONSTRAINT "portal_clients_name_check" CHECK (char_length("portal_clients"."name") between 1 and 200)
);
--> statement-breakpoint
CREATE TABLE "portal_design_variants" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"storage_path" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portal_design_variants_pkey" PRIMARY KEY("id"),
	CONSTRAINT "portal_design_variants_storage_path_key" UNIQUE("storage_path"),
	CONSTRAINT "portal_design_variants_id_project_id_key" UNIQUE("id","project_id"),
	CONSTRAINT "portal_design_variants_title_check" CHECK (char_length("portal_design_variants"."title") between 1 and 200),
	CONSTRAINT "portal_design_variants_path_prefix_check" CHECK ("portal_design_variants"."storage_path" like "portal_design_variants"."project_id"::text || '/%'),
	CONSTRAINT "portal_design_variants_path_html_check" CHECK ("portal_design_variants"."storage_path" ~ '\.html$')
);
--> statement-breakpoint
CREATE TABLE "portal_project_approvals" (
	"project_id" uuid NOT NULL,
	"variant_id" uuid NOT NULL,
	"approved_by" uuid,
	"approved_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portal_project_approvals_pkey" PRIMARY KEY("project_id")
);
--> statement-breakpoint
CREATE TABLE "portal_projects" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portal_projects_pkey" PRIMARY KEY("id"),
	CONSTRAINT "portal_projects_slug_key" UNIQUE("slug"),
	CONSTRAINT "portal_projects_slug_check" CHECK ("portal_projects"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	CONSTRAINT "portal_projects_title_check" CHECK (char_length("portal_projects"."title") between 1 and 200)
);
--> statement-breakpoint
CREATE TABLE "portal_variant_comments" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"variant_id" uuid NOT NULL,
	"author_id" uuid,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portal_variant_comments_pkey" PRIMARY KEY("id"),
	CONSTRAINT "portal_variant_comments_body_check" CHECK (char_length(btrim("portal_variant_comments"."body")) between 1 and 5000)
);
--> statement-breakpoint
ALTER TABLE "auth_account" ADD CONSTRAINT "auth_account_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_admins" ADD CONSTRAINT "portal_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_client_members" ADD CONSTRAINT "portal_client_members_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."portal_clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_client_members" ADD CONSTRAINT "portal_client_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_design_variants" ADD CONSTRAINT "portal_design_variants_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."portal_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_project_approvals" ADD CONSTRAINT "portal_project_approvals_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."portal_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_project_approvals" ADD CONSTRAINT "portal_project_approvals_variant_fkey" FOREIGN KEY ("variant_id","project_id") REFERENCES "public"."portal_design_variants"("id","project_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_project_approvals" ADD CONSTRAINT "portal_project_approvals_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "public"."auth_user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_projects" ADD CONSTRAINT "portal_projects_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."portal_clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_variant_comments" ADD CONSTRAINT "portal_variant_comments_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."portal_design_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_variant_comments" ADD CONSTRAINT "portal_variant_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."auth_user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "auth_account_user_id_idx" ON "auth_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "auth_session_user_id_idx" ON "auth_session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "auth_verification_identifier_idx" ON "auth_verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "portal_client_members_user_id_idx" ON "portal_client_members" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "portal_design_variants_project_id_idx" ON "portal_design_variants" USING btree ("project_id","sort_order");--> statement-breakpoint
CREATE INDEX "portal_projects_client_id_idx" ON "portal_projects" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "portal_variant_comments_variant_id_idx" ON "portal_variant_comments" USING btree ("variant_id","created_at");