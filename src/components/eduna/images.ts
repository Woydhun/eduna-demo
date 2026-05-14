/** CDN assets used on eduna.hu (ShopRenter) — hotlink with local fallback in RemoteImg. */
const CDN = "https://impextel.cdn.shoprenter.hu/custom/impextel/image";

export const EDUNA_IMAGES = {
  logo: `${CDN}/cache/w220h100m00/new_design_202207/eduna-logo.png`,
  bannerS26: `${CDN}/data/Banner/2026/S26series.png.webp`,
  bannerPetkit: `${CDN}/data/Banner/2026/petkit.png.webp`,
  bannerScooter: `${CDN}/data/Banner/2026/scooter6series.png.webp`,
  bannerCofidis: `${CDN}/data/Banner/Cofidis199web4.png.webp`,
  apple: `${CDN}/cache/w130h80/Logo/Apple-Logo.png.webp`,
  samsung: `${CDN}/cache/w130h80/Logo/Samsung_Logo.png.webp`,
  jbl: `${CDN}/cache/w130h80/Logo/JBL-Logo.png.webp`,
  xiaomi: `${CDN}/cache/w130h80/new_design_202207/gyarto/xiaomi.png.webp`,
  dyson: `${CDN}/cache/w130h80/Logo/dysonlogo1_feher.png.webp`,
  baseus: `${CDN}/cache/w130h80/Logo/baseus_logo.png.webp`,
  tplink: `${CDN}/cache/w130h80/new_design_202207/gyarto/tplink.png.webp`,
} as const;
