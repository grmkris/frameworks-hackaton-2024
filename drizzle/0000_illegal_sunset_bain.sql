CREATE TABLE IF NOT EXISTS "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text,
	"title" text,
	"description" text,
	"image" text,
	"owner" text
);
