import { GoogleGenAI } from '@google/genai'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'

const runCommand = promisify(execFile)
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'verdufrutas-images-'))
await mkdir('public/img', { recursive: true })

const client = new GoogleGenAI({
  apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
  httpOptions: { baseUrl: process.env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, '') },
})

const images = [
  {
    filename: 'harvest.png',
    prompt: 'Create an exquisite photorealistic commercial editorial photograph, landscape 16:9. Close-up of a generous harvest of Costa Rican fresh produce in rustic wooden wholesale market crates: red ripe tomatoes with green vines in foreground on right, carrots, green zucchini, green bell peppers, dark leafy lettuce and a pineapple in back. Warm natural window light from upper right, beautiful deep dark forest green shadows, tactile natural textures, rich yet restrained colors. Photographed at 45 degrees, elevated camera. The right two thirds are filled with beautiful vegetables, left third is dark blurred leafy greens, suitable for a dark green website text overlay. Produce is the hero, no people, no text, no logos, no watermarks. High end food photography, not a grocery store advertisement.',
  },
  {
    filename: 'products-sheet.png',
    prompt: 'Photorealistic produce catalog contact sheet, landscape 16:9. Exactly 8 isolated still life product photographs arranged in an EXACT evenly spaced 4 COLUMN by 2 ROW grid. All 8 cells have same seamless warm off-white background (#f5f5ef) with soft realistic grounding shadows, no grid lines. Each product is fully visible, centered INSIDE its own cell with generous padding, with no overlap or cropping. TOP ROW, LEFT TO RIGHT: 1 three ripe red tomatoes with green stems; 2 three natural golden brown potatoes; 3 three brown cassava yuca roots with one end cut exposing white interior; 4 four orange carrots with a little green foliage. BOTTOM ROW, LEFT TO RIGHT: 5 one whole pineapple and one pineapple slice; 6 a bunch of ripe yellow bananas; 7 one whole green-orange papaya and one orange papaya half with black seeds; 8 three golden yellow onions one cut in half. Same scale, studio lighting, camera angle and background for every cell. Professional real food product photography for a premium wholesale produce distributor. Absolutely no words, no numbers, no lettering, no containers, no people, no watermark.',
  },
]

try {
  await Promise.all(images.map(async ({ filename, prompt }) => {
    const response = await client.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: prompt,
      config: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '16:9' } },
    })
    const image = response.candidates?.[0]?.content?.parts?.find((part) => part.inlineData?.data)
    if (!image?.inlineData?.data) throw new Error(`No image returned for ${filename}`)
    await writeFile(join(temporaryDirectory, filename), Buffer.from(image.inlineData.data, 'base64'))
    console.log(`Generated ${filename}`)
  }))

  const sheetPath = join(temporaryDirectory, 'products-sheet.png')
  const { stdout } = await runCommand('identify', ['-format', '%w %h', sheetPath])
  const [imageWidth, imageHeight] = stdout.trim().split(' ').map(Number)
  const cellWidth = Math.floor(imageWidth / 4)
  const cellHeight = Math.floor(imageHeight / 2)
  const names = ['tomate', 'papa', 'yuca', 'zanahoria', 'pina', 'banano', 'papaya', 'cebolla']

  for (const [index, name] of names.entries()) {
    const offsetX = (index % 4) * cellWidth + 5
    const offsetY = Math.floor(index / 4) * cellHeight + 5
    await runCommand('convert', [sheetPath, '-crop', `${cellWidth - 10}x${cellHeight - 10}+${offsetX}+${offsetY}`, '+repage', '-quality', '92', `public/img/${name}.webp`])
  }
  await runCommand('convert', [join(temporaryDirectory, 'harvest.png'), '-quality', '88', 'public/img/harvest.webp'])
  console.log('Saved optimized hero and eight product images to public/img')
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true })
}
