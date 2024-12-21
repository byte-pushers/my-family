/**
 * Interface representing a phone number.
 * @author Stella Choi
 */
export interface PhoneNumber {
  /** @property {string} phoneType - The type of phone (e.g., mobile, home, work). */
  phoneType: string | null;

  /** @property {string} countryCode - The country dialing code. */
  countryCode: string | null;

  /** @property {string} areaCode - The area code or region-specific code. */
  areaCode: string | null;

  /** @property {string} subscriberNumber - The subscriber's unique phone number. */
  subscriberNumber: string | null;

}
