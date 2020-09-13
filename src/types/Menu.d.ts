export interface iMenu extends iMenuSection { // api response
  items: iMenuItemJSON[]
}

export interface iMenuSection { // api response menu sections
  id: number
  title: string
}

export interface iMenuItem { // api response menu items
  id: number
  title: string
}
