import { create } from 'zustand'
import type { UserDataType } from '../../types/user_type.store'
import type { connectionType } from '../../types/connectionType.store'

export const connectStore = create<connectionType>((set) => ({
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
    password: '',
    guests: 0,
    alergy: '',
  },
  setUserData: (val) => set(() => ({ userData: val })),
}))
