import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import { configureStore } from '../src/redux'
import { Provider } from 'react-redux'
import App from '../src/components/App'
import WithStylesContext from '../src/helpers/WithStylesContext'

import path from 'path'
import fs from 'fs'

export default function universalLoader(req, res) {
  const filePath = path.resolve('./build/frontend/build.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }

    const css = [] // CSS for all rendered React components
    const context = {}

    let store = configureStore()
    const html = renderToString(
      createElement(
        WithStylesContext,
        { onInsertCss: styles => css.push(styles._getCss()) },
        createElement(
          Provider,
          { store },
          createElement(
            StaticRouter,
            { location: req.url, context },
            createElement(App)
          )
        )
      )
    )

    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      })
      res.end()
    } else {
      const criticalHTML = htmlData
        .replace('{{SSR}}', html)
        .replace('<inline_style_here/>', `<style>${css.join('')}</style>`)
      res.send(criticalHTML)
    }
  })
}
