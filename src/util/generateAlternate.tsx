import { Context } from 'hono'

function formatNumber(value: string): string {
  if (value === '0') return '0'

  // parse num to int
  const num = parseInt(value)
  if (isNaN(num)) return value

  if (num < 1000) return num.toString()
  if (num < 10000) return (num / 1000).toFixed(1) + 'k'
  if (num < 1000000) return (num / 1000).toFixed(1) + 'k'
  if (num < 10000000) return (num / 1000000).toFixed(1) + 'M'
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M'
  if (num < 10000000000) return (num / 1000000000).toFixed(1) + 'B'
  return (num / 1000000000).toFixed(0) + 'B'
}

function formatTime(time: number): string {
  const timeElapsed = Date.now() - time * 1000 // time elapsed in milliseconds
  const minutes = Math.floor(timeElapsed / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}d ${hours % 24}h`
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  } else {
    return `${minutes}m`
  }
}

export default function generateAlternate(c: Context): {
  version: string
  type: string
  author_name: string
  author_url: string
  provider_name: string
  provider_url: string
  title: string
} {
  const { likes, comments, shares, unique_id, images, viewers, startTime } = c.req.query()

  let author_name = ''
  if (likes) author_name += `❤️ ${formatNumber(likes)} `
  if (comments) author_name += `💬 ${formatNumber(comments)} `
  if (shares) author_name += `📤 ${formatNumber(shares)} `
  if (images) author_name += `🖼️ ${images} `
  if (viewers) author_name += `👀 ${formatNumber(viewers)} `
  if (startTime && !isNaN(Number(startTime))) author_name += `🕒 ${formatTime(parseInt(startTime))} `
  if (author_name.length > 0 && author_name[author_name.length - 1] === ' ') author_name = author_name.slice(0, -1) // remove trailing space

  return {
    version: '1.0',
    type: 'link',
    author_name: author_name,
    author_url: `https://www.tiktok.com/${unique_id ? '@' + unique_id : ''}`,
    provider_name: 'fxTikTok',
    provider_url: 'https://github.com/okdargy/fxTikTok',
    title: `TikTok by @${unique_id}`
  }
}
