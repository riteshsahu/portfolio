/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ResourceCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `SnippetCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `SnippetCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SnippetCategory" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ResourceCategory_slug_key" ON "ResourceCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SnippetCategory_slug_key" ON "SnippetCategory"("slug");
