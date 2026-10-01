import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Lang } from "./lib/locales";

// Best supported language from an Accept-Language header ("de-CH,de;q=0.9,en;q=0.8" → "de").
function fromAcceptLanguage(header: string | null): Lang | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q.slice(2)) : 1 };
    })
    .filter((x) => x.lang && !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q);
  for (const { lang } of ranked) if (hasLocale(lang)) return lang;
  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  // "/en/..." → canonical unprefixed English URL.
  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // "/de/..." and "/es/..." are real routes.
  if (hasLocale(first)) return NextResponse.next();

  // Unprefixed URL: an explicit choice (cookie set by the language switcher)
  // wins; otherwise follow the browser language. Crawlers send no
  // Accept-Language, so they get English and find /de + /es via hreflang.
  const cookie = request.cookies.get("lang")?.value ?? "";
  const lang: Lang = hasLocale(cookie)
    ? cookie
    : (fromAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale);

  // Only negotiate on entry: a link followed from this site to an English URL
  // (e.g. "EN" opened in a new tab from a /de page) is an explicit choice.
  const referer = request.headers.get("referer");
  const internal = referer !== null && URL.canParse(referer) && new URL(referer).host === request.nextUrl.host;

  const url = request.nextUrl.clone();
  if (lang !== defaultLocale && !internal) {
    url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // English keeps clean URLs; render the /en tree internally.
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, Vercel internals and any file with an extension.
  matcher: ["/((?!api|_next/static|_next/image|_vercel|.*\\..*).*)"],
};
