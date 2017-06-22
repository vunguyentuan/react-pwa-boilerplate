import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import { configureStore } from '../src/redux'
import { Provider } from 'react-redux'
import App from '../src/components/App'
import WithContext from '../src/helpers/WithContext'
import { matchPath } from 'react-router-dom'
import Helmet from 'react-helmet'
import routes from '../src/routes'

import path from 'path'
import fs from 'fs'

export default function universalLoader(req, res) {
  const filePath = path.resolve('./build/backend/template.ejs')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }

    const css = [] // CSS for all rendered React components
    const dataLoaders = []
    routes.some(route => {
      const match = matchPath(req.url, route)
      if (match) {
        dataLoaders.push(route.loadData(match))
      }

      return match
    })

    const context = {}

    const store = configureStore()
    const getHTML = () =>
      renderToString(
        createElement(
          WithContext,
          {
            onInsertCss: styles => css.push(styles._getCss()),
          },
          createElement(
            Provider,
            { store },
            createElement(
              StaticRouter,
              { location: req.url, context },
              createElement(App),
            ),
          ),
        ),
      )

    // preload data
    Promise.all(dataLoaders.map(action => action(store))).then(data => {
      if (context.url) {
        res.writeHead(301, {
          Location: context.url,
        })
        res.end()
      } else {
        // get html with data
        const html = getHTML()

        const helmet = Helmet.renderStatic()
        const __INITIAL_STATE__ = JSON.stringify(store.getState())
        const inlineStyles = css.join('')

        const metaData = [
          helmet.title.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
        ].join('')

        const criticalHTML = htmlData
          .replace('[META_DATA]', metaData)
          .replace('[SSR]', html)
          .replace('[INLINE_STYLE]', inlineStyles)
          .replace('[INITIAL_STATE]', __INITIAL_STATE__)
        res.send(criticalHTML)
      }
    })
  })
}
