import {
  Cat,
  Dog,
  Fish,
  LucideIcon,
  Rabbit,
  Snail,
  Squirrel,
  Turtle,
} from 'lucide-react'

const AVATAR_ICONS: LucideIcon[] = [
  Dog,
  Cat,
  Fish,
  Rabbit,
  Snail,
  Squirrel,
  Turtle,
]

const AVATAR_COLORS: string[] = [
  // Lighter shades
  '#AEC7E8', // Light Blue
  '#FFBB78', // Light Orange
  '#98DF8A', // Light Green
  '#FF9896', // Light Red
  '#C5B0D5', // Light Purple
  '#C49C94', // Light Brown
  '#F7B6D2', // Light Pink
  '#C7C7C7', // Light Gray
  '#DBDB8D', // Light Lime
  '#9EDAE5', // Light Cyan
]

export function getAvatarIcon(name: string): LucideIcon {
  const index = cyrb53(name) % AVATAR_ICONS.length
  return AVATAR_ICONS[index]
}

export function getAvatarColor(name: string): string {
  const index = cyrb53(name, 123) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

/*
  cyrb53 (c) 2018 bryc (github.com/bryc)
  License: Public domain. Attribution appreciated.
  A fast and simple 53-bit string hash function with decent collision resistance.
  Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
*/
const cyrb53 = function (str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}
