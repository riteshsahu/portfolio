/*
  Warnings:

  - You are about to drop the column `category` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "category",
DROP COLUMN "tags",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SnippetCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SnippetCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SnippetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
