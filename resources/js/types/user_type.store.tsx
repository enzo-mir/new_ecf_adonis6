export type User = {
  name: string
  email: string
  password: string
  guests: number | null
  alergy: string
}

export type UserDataType = {
  userData: User
  setUserData(val: User): void
}
