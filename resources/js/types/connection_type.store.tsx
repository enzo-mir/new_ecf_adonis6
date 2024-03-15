export type ConnectionType = {
  connectedUser: boolean
  setConnectedUser(val: boolean): void
  connectedAdmin: boolean | null
  setConnectedAdmin(val: boolean): void
}
