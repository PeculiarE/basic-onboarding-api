CREATE TABLE IF NOT EXISTS "user_info" (
  "id" VARCHAR PRIMARY KEY,
  "first_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL,
  "email" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL,
  "salt" VARCHAR NOT NULL,
  "onboarding_status" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMPTZ DEFAULT (now()),
  "updated_at" TIMESTAMPTZ DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "onboarding_data" (
  "id" VARCHAR PRIMARY KEY,
  "user_id" VARCHAR UNIQUE NOT NULL,
  "company_name" VARCHAR NOT NULL,
  "year_founded" VARCHAR NOT NULL,
  "location" VARCHAR NOT NULL,
  "website" VARCHAR NOT NULL,
  "industry_type" VARCHAR NOT NULL,
  "business_model" VARCHAR NOT NULL,
  "funding_round" VARCHAR NOT NULL,
  "finance_type" VARCHAR NOT NULL,
  "amount" INT NOT NULL,
  "investor_presentation" VARCHAR NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT (now()),
  "updated_at" TIMESTAMPTZ DEFAULT (now()),
  CONSTRAINT "fk_onboarding_user_id" FOREIGN KEY ("user_id") REFERENCES "user_info" ("id") ON DELETE CASCADE
);
