export const newsCardStyles = {
  articleBase:
    "bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",

  articleGrid: "overflow-hidden",

  articleList:
    "flex flex-col gap-4 overflow-hidden p-4 sm:flex-row",

  imageWrapperGrid: "relative block h-48 w-full overflow-hidden",

  imageWrapperList:
    "relative block h-48 w-full shrink-0 overflow-hidden sm:h-32 sm:w-48",

  image: "object-cover",

  categoryBadge:
    "absolute bottom-3 right-3 bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white",

  contentGrid: "flex min-h-[220px] flex-col p-5",

  contentList: "flex flex-1 flex-col",

  title:
    "mb-2 text-base font-bold leading-snug text-gray-900 transition hover:text-red-600",

  description:
    "mb-4 line-clamp-3 text-sm leading-6 text-gray-600",

  meta:
    "mb-5 flex flex-wrap items-center gap-3 text-xs text-gray-500",

  actions: "mt-auto border-t border-gray-100 pt-4",

  actionIcons: "justify-start",
};