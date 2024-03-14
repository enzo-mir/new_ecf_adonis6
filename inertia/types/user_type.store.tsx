export type User = {
  id: number
  name: string
  email: string
  guests: number | null
  alergy: string
  role: 0 | 1
  currentReservation: Array<CurrentReservationType>
}

export type UsersInformationType = {
  id: number
  name: string
  email: string
  role: 0 | 1
}

export type CurrentReservationType = {
  guests: number
  date: string
  hours: string
  email: string
}

export type UserDataType = {
  userData: User
  setUserData(val: User): void
}
