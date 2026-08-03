import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * An office may list one address or several. Accepts either an array or a
 * single string (space- or comma-separated), so adding another address to
 * lib/data.ts works whichever way it is written.
 */
export function toEmails(email: string | string[]): string[] {
  const list = Array.isArray(email) ? email : String(email ?? '').split(/[\s,]+/)
  return list.map((e) => e.trim()).filter(Boolean)
}
