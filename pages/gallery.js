// pages/gallery.js
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function GalleryRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/solutions/gallery");
  }, [router]);
  return <div className="min-h-screen flex items-center justify-center">Redirecting to gallery...</div>;
}
