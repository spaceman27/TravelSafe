import React from 'react'
import ReactDOM from 'react-dom'

import Map, {GoogleApiWrapper} from '../../modules/map'
import Marker from '../../components/Marker'
import InfoWindow from '../../components/InfoWindow'

const WithMarkers = React.createClass({
  render: function() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}>
        <Marker
          name={'SOMA'}
          position={{lat: 37.778519, lng: -122.405640}} />
        <Marker
          name={'Dolores park'}
          position={{lat: 37.759703, lng: -122.428093}} />
        <Marker />
      </Map>
    )
  }
});

export default WithMarkers