import { Context } from 'hono'

export default function generateAlternate(c: Context): {
  version: string
  type: string
  author_name: string
  author_url: string
  provider_name: string
  provider_url: string
  title: string
} {
  const { unique_id, nickname } = c.req.query()

  return {
    version: '1.0',
    type: 'link',
    author_name: `${decodeURIComponent(nickname)} (@${decodeURIComponent(unique_id)})`,
    author_url: `https://www.tiktok.com/${unique_id ? '@' + unique_id : ''}`,
    provider_name: 'fxTikTok - Embed with s/i/n',
    provider_url: 'https://github.com/okdargy/fxTikTok',
    title: `TikTok by @${unique_id}`
  }
}
