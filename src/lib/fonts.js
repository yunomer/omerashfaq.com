import { cache } from 'react'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const fontDirectory = join(process.cwd(), 'src', 'assets', 'fonts')

const loadFont = async (filename) => {
  try {
    const fontPath = join(fontDirectory, filename)
    const fontData = await readFile(fontPath)
    return fontData
  } catch (error) {
    console.error(`Error loading font ${filename}:`, error)
    return null
  }
}

/**
 * Retrieves the regular font file asynchronously.
 * It returns a Promise that resolves to the font file's array buffer.
 * @returns A Promise resolving to the regular font file as an array buffer.
 */
export const getRegularFont = cache(async () => {
  return loadFont('Geist-Regular.otf')
})

/**
 * Retrieves the bold font file asynchronously.
 * It returns a Promise that resolves to the font file's array buffer.
 * @returns A Promise resolving to the bold font file as an array buffer.
 */
export const getBoldFont = cache(async () => {
  return loadFont('Geist-Medium.otf')
})
