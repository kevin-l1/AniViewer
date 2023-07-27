set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."bookmarks" (
	"bookmarkId" serial NOT NULL,
	"userId" integer NOT NULL,
	"title" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"itemId" integer NOT NULL,
	CONSTRAINT "bookmarks_pk" PRIMARY KEY ("bookmarkId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."reviews" (
	"reviewId" serial NOT NULL,
	"userId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"rating" integer NOT NULL,
	"review" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"itemId" integer NOT NULL,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."account" (
	"userId" serial NOT NULL,
	"username" integer NOT NULL UNIQUE,
	"hashedPassword" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "account_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_fk0" FOREIGN KEY ("userId") REFERENCES "account"("userId");

ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("userId") REFERENCES "account"("userId");
