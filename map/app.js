document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENT REFERENCES ---
    const mapElement = document.getElementById('map');
    const loader = document.getElementById('loader');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const layerToggles = document.querySelectorAll('.layer-toggle');
    const panel = document.getElementById('control-panel');
    const panelToggle = document.getElementById('panel-toggle');

    // --- MAP & THEME INITIALIZATION ---
    const lightTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO &copy; OpenStreetMap contributors' });
    const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO &copy; OpenStreetMap contributors' });
    const map = L.map(mapElement, { worldCopyJump: true }).setView([20, 0], 2);
    
    let currentTheme;
    let dataCache = {}; // Cache to store fetched data for each layer
    const dataLayers = {
        argo: L.layerGroup(),
        drifters: L.layerGroup(),
        tc: L.layerGroup()
    };
    
    // --- THEME MANAGEMENT ---
    function applyTheme(theme) {
        currentTheme = theme;
        document.body.classList.toggle('dark', theme === 'dark');
        map.removeLayer(theme === 'dark' ? lightTiles : darkTiles);
        map.addLayer(theme === 'dark' ? darkTiles : lightTiles);
        localStorage.setItem('mapTheme', theme);
    }

    // --- DATA FETCHING ---
    async function fetchData(dataset) {
        if (dataCache[dataset]) return dataCache[dataset]; // Return cached data if available
        
        loader.classList.remove('hidden');
        try {
            const response = await fetch(`http://localhost:3000/api/${dataset}`);
            if (!response.ok) throw new Error(`Proxy error for ${dataset}: ${response.status}`);
            const data = await response.json();
            dataCache[dataset] = data; // Cache the successful response
            return data;
        } catch (error) {
            console.error(`Error fetching ${dataset} data:`, error);
            alert(`Failed to fetch ${dataset} data. Is your local proxy server running?`);
            return null;
        } finally {
            loader.classList.add('hidden');
        }
    }

    // --- MAP MARKER RENDERING ---
    function updateArgoMarkers(data) {
        const layer = dataLayers.argo;
        layer.clearLayers();
        if (!data) return;

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        data.forEach(profile => {
            const isActive = new Date(profile.timestamp) > thirtyDaysAgo;
            const markerOptions = {
                radius: 4,
                fillColor: isActive ? "#22c55e" : "#ef4444", // Green for active, red for inactive
                color: "#FFFFFF",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.9
            };
            const [lon, lat] = profile.geolocation.coordinates;
            const marker = L.circleMarker([lat, lon], markerOptions)
                .bindPopup(`<b>Argo Float</b><br>ID: ${profile._id}<br>Status: ${isActive ? 'Active' : 'Inactive'}<br>Last report: ${new Date(profile.timestamp).toLocaleDateString()}`);
            marker.addTo(layer);
        });
    }

    function updateDrifterMarkers(data) {
        const layer = dataLayers.drifters;
        layer.clearLayers();
        if (!data) return;

        data.forEach(point => {
            const icon = L.divIcon({
                html: `<i class="fas fa-tint" style="color: #3b82f6; font-size: 16px;"></i>`,
                className: 'map-icon'
            });
            const [lon, lat] = point.geolocation.coordinates;
            const marker = L.marker([lat, lon], { icon: icon })
                .bindPopup(`<b>Drifter</b><br>ID: ${point._id}<br>Last report: ${new Date(point.timestamp).toLocaleDateString()}`);
            marker.addTo(layer);
        });
    }

    function updateTCMarkers(data) {
        const layer = dataLayers.tc;
        layer.clearLayers();
        if (!data) return;

        data.forEach(point => {
            const icon = L.divIcon({
                html: `<i class="fas fa-wind" style="color: #ef4444; font-size: 16px;"></i>`,
                className: 'map-icon'
            });
            const [lon, lat] = point.geolocation.coordinates;
            const marker = L.marker([lat, lon], { icon: icon })
                .bindPopup(`<b>Tropical Cyclone</b><br>Name: ${point.name}<br>Date: ${new Date(point.timestamp).toLocaleDateString()}<br>Max Wind: ${point.data[0]} kts`);
            marker.addTo(layer);
        });
    }
    
    // --- LEGEND CONTROL ---
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <h4>Legend</h4>
            <div><i class="fas fa-circle" style="color: #22c55e;"></i> Active Argo Float</div>
            <div><i class="fas fa-circle" style="color: #ef4444;"></i> Inactive Argo Float</div>
            <div><i class="fas fa-tint" style="color: #3b82f6;"></i> Drifter</div>
            <div><i class="fas fa-wind" style="color: #ef4444;"></i> Tropical Cyclone</div>
        `;
        return div;
    };
    legend.addTo(map);

    // --- EVENT HANDLERS ---
    async function handleLayerToggle(event) {
        const checkbox = event.target;
        const dataset = checkbox.dataset.layer;
        const layer = dataLayers[dataset];

        if (checkbox.checked) {
            if (!dataCache[dataset]) { // Fetch data only if not in cache
                const data = await fetchData(dataset);
                if (dataset === 'argo') updateArgoMarkers(data);
                if (dataset === 'drifters') updateDrifterMarkers(data);
                if (dataset === 'tc') updateTCMarkers(data);
            }
            map.addLayer(layer);
        } else {
            map.removeLayer(layer);
        }
    }

    // --- INITIALIZATION & BINDING ---
    themeToggleBtn.addEventListener('click', () => applyTheme(currentTheme === 'light' ? 'dark' : 'light'));
    panelToggle.addEventListener('click', () => panel.classList.toggle('open'));
    layerToggles.forEach(toggle => toggle.addEventListener('change', handleLayerToggle));

    // Initial setup
    const savedTheme = localStorage.getItem('mapTheme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // Load Argo floats by default
    document.getElementById('argo-layer-toggle').dispatchEvent(new Event('change'));
});
