import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory, Redirect, Route, IndexRoute, Link} from 'react-router'

import Container from './Container'

const routeMap = {
  'basic': {
    name: 'Simple',
    component: require('./components/landing').default
  },
  'help': {
    name: 'Marker',
    component: require('./components/withMarkers').default
  },
  'gps': {
    name: 'Clickable markers',
    component: require('./components/clickableMarkers').default
  },
  'mySetting': {
    name: 'Google places',
    component: require('./components/places').default
  },
  'myCitiSafe': {
    name: 'Autocomplete',
    component: require('./components/autocomplete').default
  }
}

const createElement = (Component, props) => {
  const pathname = props.location.pathname.replace('/', '')
  const routeDef = routeMap[pathname];
  const newProps = {
    routeMap, pathname, routeDef
  }
  return <Component {...newProps} {...props} />
}

const routes = (
  <Router createElement={createElement}
          history={hashHistory}>
    <Route  path='/'>
      {Object.keys(routeMap).map(key => {
        const r = routeMap[key]
        return (<Route
                key={key}
                path={key}
                name={r.name}
                component={r.component} />)
      })}
      <IndexRoute component={routeMap['basic'].component} />
    </Route>
  </Router>
)

export default routes;