// src/components/HomePageMap.js
import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomePageMap = () => {
    const floatPositions = [
        { pos: [30, -90], isLarge: false }, { pos: [40, -40], isLarge: true }, { pos: [10, -140], isLarge: false },
        { pos: [-15, 125], isLarge: false }, { pos: [-25, -50], isLarge: false }, { pos: [50, 10], isLarge: false },
        { pos: [5, 170], isLarge: false },
    ];
    const darkTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

    return (
        <>
            <MapContainer
                center={[20, 10]}
                zoom={1.5}
                // This style makes the map fill its parent container perfectly
                style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
                zoomControl={false}
                scrollWheelZoom={false}
                dragging={false}
            >
                <TileLayer
                    url={darkTileUrl} 
                    attribution={attribution}
                />
                {floatPositions.map((float, index) => (
                    <CircleMarker
                        key={index}
                        center={float.pos}
                        radius={float.isLarge ? 8 : 5}
                        pathOptions={{
                            color: '#34d399',
                            fillColor: '#34d399',
                            fillOpacity: 0.9
                        }}
                    >
                        <Tooltip>Active Float</Tooltip>
                    </CircleMarker>
                ))}
            </MapContainer>
            
            {/* This overlay is positioned relative to the parent container */}
            <div className="absolute top-2 left-3 right-3 z-[1000] flex justify-between items-center pointer-events-none">
                <span className="text-sm text-slate-400">World Map</span>
                <div className="flex items-center text-sm">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></span>
                    <span className="text-slate-300">Active Floats</span>
                </div>
            </div>
        </>
    );
};

export default HomePageMap;