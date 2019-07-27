import decode from 'jwt-decode'
import URL from 'url-parse'

/**
 * Checks if environment is browser
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * Checks if token is expired.
 */
export const isTokenExpired = (token: string) => {
  try {
    const decoded = decode<{ exp: number }>(token)
    if (decoded.exp < Date.now() / 1000) {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

/**
 * Checks if URL is safe
 */
export function isURLSafe(dangerousURL: string): boolean {
  if (
    // tslint:disable-next-line:max-line-length
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)$/.test(
      dangerousURL
    )
  ) {
    const url = URL(dangerousURL, {})
    if (url.protocol === 'http:') return true
    if (url.protocol === 'https:') return true
    return false
  }
  return false
}
