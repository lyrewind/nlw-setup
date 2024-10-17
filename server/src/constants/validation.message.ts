const REQUIRED = (fieldName: string, expected: string) => `O campo "${fieldName}" deve ser ${expected}.`

export const REQUIRED_STRING = (fieldName: string) => REQUIRED(fieldName, "uma string")
export const REQUIRED_ARRAY = (fieldName: string) => REQUIRED(fieldName, "um array")
export const REQUIRED_NUMBER_ARRAY = (fieldName: string) => REQUIRED(fieldName, "um array de números")
export const REQUIRED_DATE_STRING = (fieldName: string) => REQUIRED(fieldName, "uma string convertível em data (ISO 8601)")
export const REQUIRED_UUID = (fieldName: string) => REQUIRED(fieldName, "um UUID")
