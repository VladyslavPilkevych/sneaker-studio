import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

function setMeta(name: string, content: string, property = false) {
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;

  let meta = document.querySelector(selector);

  if (!meta) {
    meta = document.createElement("meta");
    if (property) {
      meta.setAttribute("property", name);
    } else {
      meta.setAttribute("name", name);
    }
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

export function Seo({
  title,
  description,
  image = "/og-image.jpg",
  url = window.location.href,
  type = "website",
}: SeoProps) {
  useEffect(() => {
    const siteTitle = "Sneaker Studio";
    const fullTitle = `${title} | ${siteTitle}`;

    document.title = fullTitle;

    setMeta("description", description);

    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
    setMeta("og:url", url, true);
    setMeta("og:type", type, true);
    setMeta("og:site_name", siteTitle, true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }, [title, description, image, url, type]);

  return null;
}
