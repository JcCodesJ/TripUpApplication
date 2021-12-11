export interface Reservation {
  id: number,
  departs: Date,
  returns: Date,
  nmbrTravelers: number,
  client: {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    methodPayment: string[]
  },
  vacation: {
    packageName: string,
    type: string,
    price: number
  }
}
