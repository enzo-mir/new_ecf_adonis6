export type HourDataType = {
  id: number
  day: string
  lunch: string
  dinner: string
}
export type HourToSend = {
  day: string
  time: string
  target: string
}
export type Image = {
  description: string
  id: number
  url: string
  title: string
}
export type DessertType = [
  {
    id: number
    name: string
    description: string
    price: number
    sharing?: 0 | 1
  },
]
export type EntreeType = [
  {
    description: string
    id: number
    name: string
    price: number
    sharing: 0 | 1
  },
]
export type PlatType = [
  {
    description: string
    id: number
    name: string
    price: number
    sharing: 0 | 1
  },
]
export type MenuType = [
  {
    id: number
    name: string
    formula: string
    description: string
    sharing?: 0 | 1
  },
]

export type CurrentReservationType = Array<{
  guests: number
  date: string
  hours: string
  email: string
}>

export type CardDataType = {
  starters: EntreeType
  dishs: PlatType
  desserts: DessertType
  menus: MenuType
}

export type CardType = {
  cardStore: CardDataType
  setCardStore(val: CardDataType): void
}
export type HourType = {
  hours: Array<HourDataType>
  setHours(val: Array<HourDataType>): void
}
export type ImageType = {
  images: Array<Image>
  setImages(val: Array<Image>): void
}
