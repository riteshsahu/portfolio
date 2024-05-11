/*
  Warnings:

  - The primary key for the `Snippet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupName` on the `Snippet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Snippet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_pkey",
DROP COLUMN "groupName",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Snippet_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Snippet_slug_key" ON "Snippet"("slug");
