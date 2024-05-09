/*
  Warnings:

  - You are about to drop the column `body` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `code` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lang` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "body",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "lang" TEXT NOT NULL;
