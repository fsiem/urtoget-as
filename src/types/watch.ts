export interface MovementDetails {
  type: string
  gangReserve: string
  oscillations: string
  rubies: string
}

export interface CaseDetails {
  waterResistance: string
  thickness: string
  crystal: string
  finish: string
}

export interface FunctionsFull {
  winding: string
  secondHand: string
  dateFunction: string
  incabloc: string
  crownSetting: string
}

export interface Watch {
  id: string
  brand: string
  model: string
  ref: string
  collection: string
  price: number
  currency: 'USD' | 'NOK'
  image: string
  images: string[]
  description: string
  isNew: boolean
  caseMaterial: string
  caseSize: string
  movement: string
  movementType: string
  caliber: string
  powerReserve: string
  waterResistance: string
  thickness: string
  crystal: string
  finish: string
  strap: string
  strapColor: string
  clasp: string
  dial: string
  functions: string[]
  keyDifference: string
  tags: string[]
  movementDetails?: MovementDetails
  caseDetails?: CaseDetails
  functions_full?: FunctionsFull
  featuredComparisons?: string[]
}
