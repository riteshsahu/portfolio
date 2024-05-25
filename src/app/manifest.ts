import type { MetadataRoute } from "next";
import { cookies } from "next/headers";

export default function manifest(): MetadataRoute.Manifest {
  const session = cookies().get("session")?.value;
  const json: MetadataRoute.Manifest = {
    name: "Me",
    short_name: "Me",
    description: "Ritesh Portfolio",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
  };

  if (!session) {
    return json;
  }

  return {
    ...json,
    start_url: "/auth",
    display: "minimal-ui",
  };
}
