export enum Languages {
  bg = "bg",
  cs = "cs",
  de = "de",
  en_gb = "en-gb",
  es = "es",
  fr = "fr",
  hu = "hu",
  id = "id",
  it = "it",
  ja = "ja",
  ko = "ko",
  nl = "nl",
  pl = "pl",
  ps = "ps",
  pt_br = "pt-br",
  ru = "ru",
  tr = "tr",
  uk = "uk",
  zh_hans = "zh-hans",
  zh_hant = "zh-hant",
}

export interface Options {
  locale: Languages
  localeData?: Record<string, any>
}
