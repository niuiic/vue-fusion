export const useAsset = (pathAfterAssets: string): string =>
  new URL(`/src/assets/${pathAfterAssets}`, import.meta.url).href
