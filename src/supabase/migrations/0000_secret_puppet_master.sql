CREATE TABLE IF NOT EXISTS "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"menuId" uuid NOT NULL,
	"description" text,
	"isHidden" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updatedBy" uuid NOT NULL,
	"image" varchar(2048),
	"notes" text[] DEFAULT '{}'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menuItems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" text,
	"posId" text DEFAULT '',
	"isHidden" boolean,
	"image" varchar(2048),
	"tags" text[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updatedBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menus" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"description" text,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updatedBy" uuid NOT NULL,
	"image" varchar(2048),
	"notes" text[] DEFAULT '{}',
	"isPublic" boolean DEFAULT false NOT NULL,
	"message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(320) NOT NULL,
	"emailVerified" timestamp,
	"image" varchar(2048) NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_menuId_menus_id_fk" FOREIGN KEY ("menuId") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_updatedBy_user_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menuItems" ADD CONSTRAINT "menuItems_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menuItems" ADD CONSTRAINT "menuItems_updatedBy_user_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menus" ADD CONSTRAINT "menus_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menus" ADD CONSTRAINT "menus_updatedBy_user_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
