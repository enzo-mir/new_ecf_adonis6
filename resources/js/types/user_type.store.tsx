import type { CurrentReservationType } from './data_api_types'

export type User = {
  name: string
  email: string
  password: string
  guests: number | null
  alergy: string
  currentReservation?: CurrentReservationType
}

export type UserDataType = {
  userData: User
  setUserData(val: User): void
}
