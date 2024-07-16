-- CreateTable
CREATE TABLE "projects" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "project_date" VARCHAR(255),
    "project_place" VARCHAR(255),
    "project_category" VARCHAR(255),
    "project_title" VARCHAR(255) NOT NULL,
    "project_extract" VARCHAR(255),
    "project_teaser" TEXT,
    "project_description" TEXT,
    "project_goal" TEXT,
    "project_method" TEXT,
    "project_results" TEXT,
    "project_single_url" VARCHAR(255),
    "project_infos" JSONB,
    "project_meta" JSONB,
    "project_publish_status" VARCHAR(255),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);
