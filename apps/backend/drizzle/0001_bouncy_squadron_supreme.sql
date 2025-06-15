CREATE TABLE "user_specialization" (
	"user_id" text NOT NULL,
	"specialization_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "user_specialization_user_id_specialization_id_pk" PRIMARY KEY("user_id","specialization_id")
);
--> statement-breakpoint
ALTER TABLE "user_specialization" ADD CONSTRAINT "user_specialization_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_specialization" ADD CONSTRAINT "user_specialization_specialization_id_specialization_id_fk" FOREIGN KEY ("specialization_id") REFERENCES "public"."specialization"("id") ON DELETE cascade ON UPDATE no action;