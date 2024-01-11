import jwt from 'jsonwebtoken'

export const getDataFromToken = req => {
  try {
    const token = request.cookies.get('token')?.value || ''
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRETro)
    return decodedToken.id
  } catch (error) {
    throw new Error(error.message)
  }
}
