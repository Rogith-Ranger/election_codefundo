import React, { Component } from 'react'
import {Map, TileLayer ,GeoJSON} from 'react-leaflet'
import shapeData from '../shapes.json'

class ChoroplethMap extends Component {

    mapstyle = {
        height: "300px",
        width:"400px"
      }
    
    getColor = d => {
        return d > 33 ? '#800026' :
               d > 28  ? '#BD0026' :
               d > 22  ? '#E31A1C' :
               d > 18  ? '#FC4E2A' :
               d > 13   ? '#FD8D3C' :
               d > 9   ? '#FEB24C' :
               d > 3   ? '#FED976' :
                          '#FFEDA0';
    }
    
    style = feature => {
        return {
            fillColor: this.getColor(feature.properties.stateId),
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    
    render() {
        const position = [20.5937, 78.9629]
        return (
      <div>
        <Map center={position} zoom={4} preferCanvas={true} style={this.mapstyle}>
        <TileLayer
              url=
              "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              // "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <GeoJSON key="whatever" data={shapeData} style={this.style} onEachFeature={ (feature, layer) => {
            layer.bindTooltip("<strong>State Name :</strong> "+feature.properties.stateName)}}/>
        </Map>
      </div>
        )
    }
}

export default ChoroplethMap
