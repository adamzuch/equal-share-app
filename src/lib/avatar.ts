import {
  Bird,
  Cat,
  Dog,
  Fish,
  LucideIcon,
  Rabbit,
  Rat,
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
  Bird,
  Rat,
]

const AVATAR_COLORS = [
  '#FBF8CC',
  '#FDE4CF',
  '#FFCFD2',
  '#F1C0E8',
  '#CFBAF0',
  '#A3C4F3',
  '#98F5E1',
  '#B9FBC0',
]

export function getAvatarIcon(name: string): LucideIcon {
  const index = cyrb53(name) % AVATAR_ICONS.length
  return AVATAR_ICONS[index]
}

export function getAvatarColor(name: string): string {
  const index = cyrb53(name, 123) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

export function getAvatarBorderColor(name: string): string {
  const avatarColor = getAvatarColor(name)
  const colors = AVATAR_COLORS.filter((color) => color !== avatarColor)
  const index = cyrb53(name, 246) % colors.length
  return colors[index]
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
