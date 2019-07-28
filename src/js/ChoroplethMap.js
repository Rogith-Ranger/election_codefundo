import React, { Component } from 'react'
import {Map,TileLayer} from 'react-leaflet'
class ChoroplethMap extends Component {
    mapstyle = {
        height: "300px",
        width:"400px"
      }
    render() {
        const position = [20.5937, 78.9629]
        return (
      <div>
        <Map center={position} zoom={4} preferCanvas={true} style={this.mapstyle}>
        <TileLayer
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            //   "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
      </Map>
      </div>
        )
    }
}

export default ChoroplethMap
