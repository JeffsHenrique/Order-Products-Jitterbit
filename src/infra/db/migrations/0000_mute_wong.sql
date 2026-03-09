CREATE TABLE "Items" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" varchar(50) NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL,
	"order_id" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Items_product_id_unique" UNIQUE("product_id")
);
--> statement-breakpoint
CREATE TABLE "OrdersToItems" (
	"order_id" varchar NOT NULL,
	"product_id" varchar NOT NULL,
	CONSTRAINT "OrdersToItems_order_id_product_id_pk" PRIMARY KEY("order_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "Order" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" varchar(100) NOT NULL,
	"total_value" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Order_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
ALTER TABLE "Items" ADD CONSTRAINT "Items_order_id_Order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("order_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrdersToItems" ADD CONSTRAINT "OrdersToItems_order_id_Order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrdersToItems" ADD CONSTRAINT "OrdersToItems_product_id_Items_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."Items"("product_id") ON DELETE no action ON UPDATE no action;