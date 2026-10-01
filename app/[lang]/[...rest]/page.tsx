import { notFound } from "next/navigation";

// Any unknown path inside a language (/de/foo, /foo → /en/foo) renders that
// language's not-found page, with the localized header and footer.

export default function CatchAll() {
  notFound();
}
