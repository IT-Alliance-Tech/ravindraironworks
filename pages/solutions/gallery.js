// pages/solutions/gallery.js
/**
 * Gallery page for Ravindra Iron Works (under /solutions)
 * - Place images in public/images/
 * - Optional: public/images/gallery.json to provide metadata (file, title, caption, alt, tags)
 *
 * Usage:
 * 1) Drop images into public/images/
 * 2) (Optional) Add public/images/gallery.json with metadata
 * 3) Run dev and visit /solutions/gallery
 */

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'

export default function Gallery({ images }) {
  const [filter, setFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filtered, setFiltered] = useState(images);

  useEffect(() => {
    setFiltered(images.filter((img) => filter === "all" || img.tags.includes(filter)));
    setSelectedIndex(null);
  }, [filter, images]);

  const onKey = useCallback(
    (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i === null ? null : Math.min(i + 1, filtered.length - 1)));
      if (e.key === "ArrowLeft")
        setSelectedIndex((i) => (i === null ? null : Math.max(i - 1, 0)));
    },
    [selectedIndex, filtered.length]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [selectedIndex, onKey]);

  const allTags = ["all", ...Array.from(new Set(images.flatMap((i) => i.tags).filter(Boolean)))];

  return (
    <>
      <Header />
      <main className="p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Project Gallery</h1>
        <p className="text-gray-600 mt-1">
          Showcase of Ravindra Iron Works — facility, machines, team and finished projects.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-full border text-sm shadow-sm ${
              filter === t
                ? "bg-[#DAA520] text-white border-[#DAA520]"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            {t === "all" ? "All" : t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-600 py-20">No images yet — add images to <code>public/images/</code>.</div>
      ) : (
        <section
          aria-live="polite"
          className="gallery-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {filtered.map((img, idx) => (
            <figure
              key={img.file}
              className="relative break-inside-avoid rounded-lg overflow-hidden shadow-sm bg-gray-50 cursor-pointer"
              style={{ position: "relative", margin: 0 }}
              onClick={() => setSelectedIndex(idx)}
            >
              <div style={{ position: "relative", width: "100%", paddingBottom: "75%" }}>
                <Image
                  src={`/images/${img.file}`}
                  alt={img.alt || img.file}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  priority={false}
                />
              </div>
              <figcaption className="p-3 text-sm text-gray-700">
                {img.title || humanize(img.file)}
              </figcaption>
            </figure>
          ))}
        </section>
      )}

      {selectedIndex !== null && filtered[selectedIndex] && (
        <Lightbox
          image={filtered[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex((i) => Math.max(i - 1, 0))}
          onNext={() => setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < filtered.length - 1}
        />
      )}

      <style jsx>{`
        .gallery-grid img {
          break-inside: avoid;
        }
      `}</style>
      </main>
      <Footer />
    </>
  );
}

function Lightbox({ image, onClose, onPrev, onNext, hasPrev, hasNext }) {
  let touchStartX = null;
  let touchEndX = null;

  const onTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && hasNext) onNext();
      if (diff < 0 && hasPrev) onPrev();
    }
    touchStartX = null;
    touchEndX = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-[92%] max-w-4xl max-h-[92%] bg-transparent"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button aria-label="Close" onClick={onClose} className="absolute top-2 right-2 z-30 p-2 rounded-md bg-white/90">
          ✕
        </button>

        {hasPrev && (
          <button aria-label="Previous" onClick={onPrev} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-md bg-white/90">
            ‹
          </button>
        )}
        {hasNext && (
          <button aria-label="Next" onClick={onNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-md bg-white/90">
            ›
          </button>
        )}

        <div style={{ position: "relative", width: "100%", paddingBottom: "60%" }}>
          <Image
            src={`/images/${image.file}`}
            alt={image.alt || image.file}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width:640px) 100vw, 80vw"
          />
        </div>

        <div className="mt-3 p-3 bg-white/90 rounded-b">
          <div className="text-sm font-semibold">{image.title || humanize(image.file)}</div>
          {image.caption && <div className="text-xs text-gray-700 mt-1">{image.caption}</div>}
        </div>
      </div>
    </div>
  );
}

function humanize(filename) {
  return filename.replace(/\.\w+$/, "").replace(/[_-]/g, " ").replace(/\b(\w)/g, (m) => m.toUpperCase());
}

export async function getStaticProps() {
  const imagesDir = path.join(process.cwd(), "public", "images");
  let files = [];
  try {
    files = fs.readdirSync(imagesDir);
  } catch (e) {
    files = [];
  }

  const jsonPath = path.join(imagesDir, "gallery.json");
  let images = [];
  if (fs.existsSync(jsonPath)) {
    try {
      const raw = fs.readFileSync(jsonPath, "utf8");
      const parsed = JSON.parse(raw);
      images = parsed.map((it) => ({
        file: it.file,
        title: it.title || null,
        caption: it.caption || null,
        alt: it.alt || (it.file ? it.file.replace(/[_-]/g, " ") : ""),
        tags: Array.isArray(it.tags) ? it.tags : [],
      }));
    } catch (err) {
      console.warn("Failed to parse gallery.json:", err);
      images = [];
    }
  } else {
    const exts = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"];
    images = (files || [])
      .filter((f) => exts.includes(path.extname(f).toLowerCase()))
      .map((file) => {
        const lower = file.toLowerCase();
        const tags = [];
        if (lower.includes("team")) tags.push("team");
        if (lower.includes("mach") || lower.includes("machine")) tags.push("machinery");
        if (lower.includes("finish") || lower.includes("product") || lower.includes("finished") || lower.includes("project")) tags.push("finished");
        if (lower.includes("facility") || lower.includes("plant") || lower.includes("factory")) tags.push("facility");
        if (lower.includes("gate") || lower.includes("door") || lower.includes("railing")) tags.push("gate");
        if (tags.length === 0) tags.push("other");
        return {
          file,
          title: null,
          caption: null,
          alt: file.replace(/[_-]/g, " "),
          tags,
        };
      });
  }

  return {
    props: {
      images,
    },
    revalidate: 60,
  };
}
