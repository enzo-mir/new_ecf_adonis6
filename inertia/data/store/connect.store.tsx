import { create } from 'zustand'
import type { UserDataType } from '../../types/user_type.store'
import type { ConnectionType } from '../../types/connection_type.store'

export const connectStore = create<ConnectionType>((set) => ({
  connectedUser: false,
  setConnectedUser: (val) => set(() => ({ connectedUser: val })),
  connectedAdmin: null,
  setConnectedAdmin: (val) => set(() => ({ connectedAdmin: val })),
}))

export const userDataStore = create<UserDataType>((set) => ({
  userData: {
    id: 0,
    name: '',
    email: '',
    guests: 0,
    alergy: '',
    role: 0,
    currentReservation: [],
  },
  setUserData: (val) => set(() => ({ userData: val })),
}))
