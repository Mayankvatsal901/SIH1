import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayerGroup, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- Placeholder Data & Icons (No Changes Here) ---
const placeholderData = {
  argo: [
    { id: 1, pos: [20, -40], active: true, name: 'Argo Float #1' },
    { id: 2, pos: [-10, 110], active: false, name: 'Argo Float #2' },
  ],
  drifters: [{ id: 3, pos: [5, 50], name: 'Drifter #3' }],
  tc: [{ id: 4, pos: [15, -80], name: 'Hurricane Alpha' }],
};

const createIcon = (color) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const icons = {
    activeArgo: createIcon('green'), inactiveArgo: createIcon('red'),
    drifter: createIcon('blue'), tc: createIcon('orange'),
};

// --- The Main Map Component ---
export default function ArgoMap() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleLayers, setVisibleLayers] = useState({
        argo: true, drifters: true, tc: false,
    });
    
    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);
    
    const handleLayerToggle = (layerKey) => {
        setVisibleLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
    };
    
    const tileUrls = {
        dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    };
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
    
    return (
        // ***CHANGED***: Added a relative container. This is the new "anchor" for the panel and legend.
        <div className="map-section-container">
            <MapContainer center={[20, 0]} zoom={3} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                <TileLayer url={isDarkMode ? tileUrls.dark : tileUrls.light} attribution={attribution} />
                <LayerGroup>
                    {visibleLayers.argo && placeholderData.argo.map(p => (
                        <Marker key={p.id} position={p.pos} icon={p.active ? icons.activeArgo : icons.inactiveArgo}>
                            <Popup>{p.name}</Popup>
                        </Marker>
                    ))}
                </LayerGroup>
                <LayerGroup>
                    {visibleLayers.drifters && placeholderData.drifters.map(p => (
                         <Marker key={p.id} position={p.pos} icon={icons.drifter}><Popup>{p.name}</Popup></Marker>
                    ))}
                </LayerGroup>
                <LayerGroup>
                    {visibleLayers.tc && placeholderData.tc.map(p => (
                        <Marker key={p.id} position={p.pos} icon={icons.tc}><Popup>{p.name}</Popup></Marker>
                    ))}
                </LayerGroup>
            </MapContainer>
            
            <aside className={`control-panel ${isPanelOpen ? 'open' : ''}`}>
                <button className="panel-toggle" title="Toggle Panel" onClick={() => setIsPanelOpen(!isPanelOpen)}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="panel-content">
                    <div className="panel-header">
                        <div className="logo"><i className="fa-solid fa-water"></i><h3>Argo AI</h3></div>
                        <button className="theme-toggle" title="Toggle Theme" onClick={() => setIsDarkMode(!isDarkMode)}>
                            <i className="fas fa-sun"></i><i className="fas fa-moon"></i>
                        </button>
                    </div>
                    <div className="panel-body">
                        <h4>Data Layers</h4>
                        <div className="layer-list">
                            <div className="layer-item">
                                <input type="checkbox" id="argo-layer-toggle" className="layer-toggle" checked={visibleLayers.argo} onChange={() => handleLayerToggle('argo')} />
                                <label htmlFor="argo-layer-toggle"><i className="fas fa-check" style={{ color: '#22c55e' }}></i> Argo Floats</label>
                            </div>
                            <div className="layer-item">
                                <input type="checkbox" id="drifters-layer-toggle" className="layer-toggle" checked={visibleLayers.drifters} onChange={() => handleLayerToggle('drifters')} />
                                <label htmlFor="drifters-layer-toggle"><i className="fas fa-tint" style={{ color: '#3b82f6' }}></i> Drifters</label>
                            </div>
                            <div className="layer-item">
                                <input type="checkbox" id="tc-layer-toggle" className="layer-toggle" checked={visibleLayers.tc} onChange={() => handleLayerToggle('tc')} />
                                <label htmlFor="tc-layer-toggle"><i className="fas fa-wind" style={{ color: 'orange' }}></i> Tropical Cyclones</label>
                            </div>
                        </div>
                        {isLoading && (
                            <div className="loader-container"><div className="loader"></div><span>Fetching data...</span></div>
                        )}
                    </div>
                </div>
            </aside>
            
            <div className="legend leaflet-bottom leaflet-right">
                 <div style={{display: 'flex', alignItems: 'center', marginBottom: '4px'}}><div style={{width: '18px', height: '18px', backgroundColor: '#22c55e', marginRight: '8px', borderRadius: '50%'}}></div>Active Argo Float</div>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '4px'}}><div style={{width: '18px', height: '18px', backgroundColor: '#ef4444', marginRight: '8px', borderRadius: '50%'}}></div>Inactive Argo Float</div>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '4px'}}><div style={{width: '18px', height: '18px', backgroundColor: '#3b82f6', marginRight: '8px', borderRadius: '50%'}}></div>Drifter</div>
                <div style={{display: 'flex', alignItems: 'center'}}><div style={{width: '18px', height: '18px', backgroundColor: 'orange', marginRight: '8px', borderRadius: '50%'}}></div>Tropical Cyclone</div>
            </div>

            {/* ***CHANGED***: The CSS is now simpler and doesn't control the whole body */ }
            <style>{`
                /* --- Component-Specific Styles --- */
                .map-section-container {
                  position: relative; /* This is the new anchor for the panel and legend */
                  height: 100vh; /* Make the map section take the full screen height */
                  width: 100%;
                }

                :root {
                    --panel-bg-light: rgba(255, 255, 255, 0.85);
                    --text-muted-light: #4B5563;
                    --border-light: rgba(0, 0, 0, 0.1);
                    --shadow-light: rgba(0, 0, 0, 0.1);
                    --panel-bg-dark: rgba(17, 24, 39, 0.7);
                    --text-muted-dark: #9CA3AF;
                    --border-dark: rgba(255, 255, 255, 0.2);
                    --shadow-dark: rgba(0, 0, 0, 0.4);
                    --argo-green: #22c55e;
                    --panel-width: 300px;
                }
                
                .map-section-container .leaflet-container {
                    background-color: var(--bg-light);
                }
                body.dark .map-section-container .leaflet-container {
                     background-color: var(--bg-dark);
                }

                .control-panel {
                    position: absolute; top: 20px; right: 20px; z-index: 1000;
                    width: var(--panel-width);
                    background: var(--panel-bg-light);
                    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                    border-radius: 16px; border: 1px solid var(--border-light);
                    box-shadow: 0 8px 32px 0 var(--shadow-light); padding: 1rem;
                    display: flex; flex-direction: column; animation: slideIn 0.7s ease-out both;
                    transition: all 0.4s ease;
                }
                body.dark .control-panel {
                    background: var(--panel-bg-dark); color: var(--text-dark);
                    border: 1px solid var(--border-dark); box-shadow: 0 8px 32px 0 var(--shadow-dark);
                }
                @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

                .panel-header {
                    display: flex; align-items: center; justify-content: space-between;
                    padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-light); margin-bottom: 1rem;
                }
                body.dark .panel-header { border-bottom-color: var(--border-dark); }
                .logo { display: flex; align-items: center; gap: 0.75rem; font-size: 1.25rem; font-weight: 700; }
                .logo i { color: #0891B2; }

                .theme-toggle {
                    background-color: var(--bg-light); color: var(--text-muted-light); border: 1px solid var(--border-light);
                    border-radius: 50px; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.4s ease;
                }
                body.dark .theme-toggle { background-color: #374151; color: var(--text-muted-dark); border-color: var(--border-dark); }
                .theme-toggle .fa-sun { display: none; }
                body.dark .theme-toggle .fa-moon { display: none; }
                body.dark .theme-toggle .fa-sun { display: block; }

                .panel-body h4 { font-weight: 600; font-size: 1rem; color: var(--text-muted-light); margin-bottom: 1rem; }
                body.dark .panel-body h4 { color: var(--text-muted-dark); }
                .layer-list { display: flex; flex-direction: column; gap: 0.75rem; }
                .layer-item { display: flex; align-items: center; }
                .layer-item label { cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-weight: 500; }
                .layer-toggle {
                    appearance: none; width: 1.25rem; height: 1.25rem; border: 2px solid var(--border-light);
                    border-radius: 4px; margin-right: 0.75rem; cursor: pointer; position: relative; transition: all 0.2s;
                }
                body.dark .layer-toggle { border-color: var(--border-dark); }
                .layer-toggle:checked { background-color: var(--argo-green); border-color: var(--argo-green); }
                .layer-toggle:checked::after {
                    content: '\\f00c'; font-family: 'Font Awesome 6 Free'; font-weight: 900; color: white;
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.8rem;
                }

                .loader-container { display: flex; align-items: center; gap: 0.75rem; margin-top: 1rem; color: var(--text-muted-light); }
                body.dark .loader-container { color: var(--text-muted-dark); }
                .loader {
                    border: 4px solid var(--border-light); border-top: 4px solid var(--argo-green);
                    border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite;
                }
                body.dark .loader { border-color: var(--border-dark); border-top-color: var(--argo-green); }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

                .legend {
                    padding: 8px 12px; background: var(--panel-bg-light); box-shadow: 0 0 15px rgba(0,0,0,0.2);
                    border-radius: 8px; border: 1px solid var(--border-light); line-height: 1.5; font-size: 14px;
                    margin-right: 12px; margin-bottom: 12px;
                    /* ***CHANGED***: This is now positioned relative to the container, not the page */
                    position: absolute; z-index: 1000; 
                }
                body.dark .legend { background: var(--panel-bg-dark); border-color: var(--border-dark); color: var(--text-dark); }

                .panel-toggle { display: none; }
                @media (max-width: 768px) {
                    .control-panel { transform: translateX(calc(var(--panel-width))); right: 0; top: 0; height: 100%; border-radius: 16px 0 0 16px; }
                    .control-panel.open { transform: translateX(0); }
                    .panel-toggle {
                        display: flex; align-items: center; justify-content: center; position: absolute;
                        top: 20px; left: -40px; width: 40px; height: 40px; background-color: var(--panel-bg-light);
                        border: 1px solid var(--border-light); border-right: none; color: var(--text-light);
                        cursor: pointer; border-radius: 8px 0 0 8px; transition: all 0.4s ease;
                    }
                    body.dark .panel-toggle { background-color: var(--panel-bg-dark); border-color: var(--border-dark); color: var(--text-dark); }
                    .control-panel.open .panel-toggle i { transform: rotate(180deg); }
                }
            `}</style>
        </div>
    );
}