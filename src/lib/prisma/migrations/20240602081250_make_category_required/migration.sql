/*
  Warnings:

  - Made the column `categoryId` on table `Resource` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_categoryId_fkey";

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ResourceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
