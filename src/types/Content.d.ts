export interface iContent {
  headers: iContentHeader[]
  items: iContentItem[]
}

export interface iContentHeader {
  key: string
  value: string
}

export interface iContentItem {
  id: number
  do: string
  mesto: string
  ks: string
  ku: string
  date: string
  value: string
}
