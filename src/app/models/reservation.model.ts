export interface Reservation {
  id: number,
  departs: string,
  returns: string,
  nmbrTravelers: number,
  bookedBy: {
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
