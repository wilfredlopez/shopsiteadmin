import { CountryName, USState, USStateShortName } from "./country"

//generic
export interface Address {
  address: string
  address2?: string
  apt: string
  country: CountryName
  city: string
  state: USState
  stateShortName: USStateShortName
  zipcode?: string
}

export interface PaymentMethod {
  last4: number
  expirationDate: Date
  paymentType: string
}

export type ShippingMethod = "standard" | "expedite"

export interface OrderDetails {
  items: CartItem[]
  shippingDate?: Date
  trackingNumber?: string
  shippingAddress: Address
  billingAddress: Address
  subtotal: number
  salesTax: number
  shippingMethod: ShippingMethod
}

export interface UserProfile {
  email: string
  firstName: string
  lastName: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
  phoneNumber?: number
  dateOfBirth?: Date
  shippingInformation?: Address
  billingInformation?: Address
  orders: Order[]
}

export type OrderStatus =
  | "Open"
  | "Cancelled"
  | "Shipped"
  | "Delivered"
  | "Returned"
  | "Partially Returned"

export interface Order {
  createdAt: Date
  amount: number
  paymentMethod: PaymentMethod
  status: OrderStatus
  orderNumber: string
  orderDetails: OrderDetails
}

export interface Account {
  cart: Cart
  profile: UserProfile
  email: string
  password: string
  token?: string
}

export interface AuthInfo {
  isAuth: boolean
  token: string | null
  email: string | null
  userId: string | null
}

export interface IMegaMenuItem {
  name: string
  link: string
  subcategories: ISubCat[]
}

export interface ISubCat {
  name: string
  link: string
  children: CatChild[]
}

export interface CatChild {
  main?: string
  name: string
  link: string
}

//for each  main caterory i create the menu ex. Men | Women
//for each unique subcat i asign to the main category

export interface Product {
  color?: string
  size?: string
  _id: string | any
  mainCategory: CatChild
  categories: CatChild[]
  productId: string
  price: number
  msrp: number
  name: string
  brand: string
  taxClass: string
  description: string
  condition?: string | "New"
  imgUrl: string
  img_thumb?: string
  available: boolean
  inventoryOnHand: number
  gender?: string
  searchable?: boolean
  ageGroup?: string | "Adult" | "Kids"
  createdAt: Date
  updatedAt: Date
}

const category: IMegaMenuItem = {
  name: "men",
  link: "/men",
  subcategories: [
    {
      name: "Cloathing",
      link: "/men/cloathing",
      children: [{ name: "", link: "/" }],
    },
  ],
}

export interface CartProduct {
  productId: string
  price: number
  msrp: number
  name: string
  brand: string
  taxClass: string
  description: string
  imgUrl: string
  img_thumb?: string
}

export interface CartItem {
  product: CartProduct
  qty: number
}

export interface Cart {
  userId: String
  cartItems: CartItem[]
  total: number
}

//examples

//CART
// const items: CartItem[] = [
//   {
//     product: {
//       name: 'Product number 2',
//       price: 36.99,
//       imgUrl: 'sdfdfdfdsf.jph',
//     },
//     qty: 2,
//   },
//   {
//     product: { name: 'fake p', price: 22.44, imgUrl: 'dsfsdfdfsd.jpg' },
//     qty: 20,
//   },
// ]
// let total = 0

// items.map(item => {
//   total += item.qty
// })

// const cart: Cart = {
//   cartItems: items,
//   total: total,
// }

//Order
// const order: Order = {
//   amount: 22,
//   createdAt: new Date('12/12/2019'),
//   number: 'WREWEWEWEWE',
//   status: 'Open',
//   paymentMethod: {
//     expirationDate: new Date(Date.now()),
//     last4: 1234,
//     type: 'Visa',
//   },
//   orderDetails: {
//     billingAddress: {
//       address: ' 7sdfsd st. assad',
//       apt: '1',
//       city: 'Secaucus',
//       country: 'United States',
//       state: 'New Jersey',
//       zipcode: '07094',
//       stateShortName: 'NJ',
//     },
//     items: items,
//     salesTax: 4.5,
//     shippingAddress: {
//       address: ' 7sdfsd st. assad',
//       apt: '1',
//       city: 'Secaucus',
//       country: 'United States',
//       state: 'New Jersey',
//       zipcode: '07094',
//       stateShortName: 'NJ',
//     },
//     shippingDate: new Date(Date.now()),
//     shippingMethod: 'expedite',
//     subtotal: 90.56,
//     trackingNumber: '123Q132435QEDAS',
//   },
// }
// //USER PROFILE
// const userProfile: UserProfile = {
//   name: 'Fulano',
//   email: 'sometest@example.com',
//   phoneNumber: 2125555555,
//   dateOfBirth: new Date('12/12/1988'),
//   shippingInformation: {
//     address: '111 colorado st',
//     address2: '',
//     apt: 'apt 1',
//     city: 'Secaucus',
//     state: 'New Jersey',
//     stateShortName: 'NJ',
//     zipcode: '07094',
//     country: 'United States',
//   },
//   billingInformation: {
//     address: '111 colorado st',
//     apt: 'apt 1',
//     city: 'Secaucus',
//     state: 'New Jersey',
//     stateShortName: 'NJ',
//     zipcode: '07094',
//     country: 'United States',
//   },
//   orders: [order],
// }

//Auth Info
// const authInfo: AuthInfo = {
//   isAuth: true,
//   token: '23S2eFDs45knlksndfkl5w',
//   email: 'text@example.com',
//   userId: 'Z5sZ32ds',
// }

// console.log('AUTH INFO: ')
// console.log(JSON.stringify(authInfo, null, 2))

//Account
// const account: Account = {
//   profile: userProfile,
//   cart: cart,
// }

// console.log("ACCOUNT")
// console.log(JSON.stringify(account, null, 2))

//JSON OUTPUT
//Auth Info
// {
//     "isAuth": true,
//     "token": "23S2eFDs45knlksndfkl5w",
//     "email": "text@example.com",
//     "userId": "Z5sZ32ds"
//   }
//Acount
// {
//     "profile": {
//       "name": "Fulano",
//       "email": "sometest@example.com",
//       "phoneNumber": 2125555555,
//       "dateOfBirth": "1988-12-12T05:00:00.000Z",
//       "shippingInformation": {
//         "address": "111 colorado st",
//         "address2": "",
//         "apt": "apt 1",
//         "city": "Secaucus",
//         "state": "New Jersey",
//         "stateShortName": "NJ",
//         "zipcode": "07094",
//         "country": "United States"
//       },
//       "billingInformation": {
//         "address": "111 colorado st",
//         "apt": "apt 1",
//         "city": "Secaucus",
//         "state": "New Jersey",
//         "stateShortName": "NJ",
//         "zipcode": "07094",
//         "country": "United States"
//       },
//       "orders": [
//         {
//           "amount": 22,
//           "createdAt": "2019-12-12T05:00:00.000Z",
//           "number": "WREWEWEWEWE",
//           "status": "Open",
//           "paymentMethod": {
//             "expirationDate": "2019-08-13T16:07:45.231Z",
//             "last4": 1234,
//             "type": "Visa"
//           },
//           "orderDetails": {
//             "billingAddress": {
//               "address": " 7sdfsd st. assad",
//               "apt": "1",
//               "city": "Secaucus",
//               "country": "United States",
//               "state": "New Jersey",
//               "zipcode": "07094",
//               "stateShortName": "NJ"
//             },
//             "items": [
//               {
//                 "product": {
//                   "name": "Product number 2",
//                   "price": 36.99,
//                   "imgUrl": "sdfdfdfdsf.jph"
//                 },
//                 "qty": 2
//               },
//               {
//                 "product": {
//                   "name": "fake p",
//                   "price": 22.44,
//                   "imgUrl": "dsfsdfdfsd.jpg"
//                 },
//                 "qty": 20
//               }
//             ],
//             "salesTax": 4.5,
//             "shippingAddress": {
//               "address": " 7sdfsd st. assad",
//               "apt": "1",
//               "city": "Secaucus",
//               "country": "United States",
//               "state": "New Jersey",
//               "zipcode": "07094",
//               "stateShortName": "NJ"
//             },
//             "shippingDate": "2019-08-13T16:07:45.231Z",
//             "shippingMethod": "expedite",
//             "subtotal": 90.56,
//             "trackingNumber": "123Q132435QEDAS"
//           }
//         }
//       ]
//     },
//     "cart": {
//       "cartItems": [
//         {
//           "product": {
//             "name": "Product number 2",
//             "price": 36.99,
//             "imgUrl": "sdfdfdfdsf.jph"
//           },
//           "qty": 2
//         },
//         {
//           "product": {
//             "name": "fake p",
//             "price": 22.44,
//             "imgUrl": "dsfsdfdfsd.jpg"
//           },
//           "qty": 20
//         }
//       ],
//       "total": 22
//     }
//   }
