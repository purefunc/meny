ALTER TABLE "categories" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "isHidden" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "menuItems" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "menuItems" ALTER COLUMN "price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "menuItems" ALTER COLUMN "isHidden" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "menuItems" ALTER COLUMN "isSeasonal" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "menuItems" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "menuItems" ALTER COLUMN "tags" SET DATA TYPE tag[];--> statement-breakpoint
ALTER TABLE "menuItems" ALTER COLUMN "tags" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "menus" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "menuItems" ADD COLUMN "posId" text;--> statement-breakpoint
ALTER TABLE "menus" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "menus" ADD COLUMN "isPublic" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "menus" ADD COLUMN "message" text;