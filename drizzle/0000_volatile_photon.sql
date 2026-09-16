CREATE TABLE "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"important" boolean DEFAULT false NOT NULL,
	"author" text,
	"url" text,
	"likes" serial DEFAULT 0 NOT NULL
);
