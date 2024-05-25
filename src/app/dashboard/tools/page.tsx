import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Tools() {
  const tools = await prisma.devTool.findMany();

  return (
    <div>
      {tools.map((tool) => (
        <div key={tool.id}>
          <Image src={tool.image} alt={tool.name} />
          <Link href={tool.link as any} passHref={true} target="_blank">
            {tool.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
