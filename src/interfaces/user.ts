export interface IUser {
  email: string
  firstName: string
  lastName: string
  password: string
  token: string
}

export interface IUserToken {
  userId: string
  expiresIn: string
}
