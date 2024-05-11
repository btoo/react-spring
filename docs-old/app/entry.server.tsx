import { renderToString } from 'react-dom/server'
import type { EntryContext } from '@vercel/remix'
import { RemixServer } from '@remix-run/react'

import { getCssText } from './styles/stitches.config'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  )

  markup = markup.replace(
    /<style id="stitches">.*<\/style>/g,
    `<style id="stitches">${getCssText()}</style>`
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
