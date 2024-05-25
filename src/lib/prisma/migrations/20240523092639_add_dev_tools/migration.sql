-- CreateTable
CREATE TABLE "DevTool" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "DevTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevToolCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DevToolCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DevTool_slug_key" ON "DevTool"("slug");

-- AddForeignKey
ALTER TABLE "DevTool" ADD CONSTRAINT "DevTool_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DevToolCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
