import { v4 as uuidv4 } from 'uuid'

export function generateId(): string {
  return uuidv4()
}

export function generateShortId(): string {
  return uuidv4().split('-')[0]
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') +
    '-' +
    generateShortId()
}
