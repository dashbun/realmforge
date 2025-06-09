import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import { Map, MapLayer, MapMarker } from '../../types';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  MapPin,
  Settings,
  Maximize
} from 'lucide-react';
import GlassCard from '../core/UI/GlassCard';
import NeuButton from '../core/UI/NeuButton';

interface MapCanvas3DProps {
  map: Map;
  onMarkerClick?: (marker: MapMarker) => void;
  onRegionClick?: (regionId: string) => void;
}

const MapCanvas3D: React.FC<MapCanvas3DProps> = ({ map, onMarkerClick, onRegionClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [is3D, setIs3D] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string>('all');
  const [showMarkers, setShowMarkers] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw map background
    if (map.imageUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(zoom, zoom);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();

        // Draw regions
        drawRegions(ctx);
        
        // Draw markers
        if (showMarkers) {
          drawMarkers(ctx);
        }
      };
      img.src = map.imageUrl;
    } else {
      // Draw default map
      drawDefaultMap(ctx);
    }
  }, [map, zoom, rotation, selectedLayer, showMarkers]);

  const drawDefaultMap = (ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#4F46E5');
    gradient.addColorStop(1, '#7C3AED');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    drawRegions(ctx);
    if (showMarkers) {
      drawMarkers(ctx);
    }
  };

  const drawRegions = (ctx: CanvasRenderingContext2D) => {
    map.regions.forEach((region) => {
      const x = region.coordinates.x * zoom + ctx.canvas.width / 2;
      const y = region.coordinates.y * zoom + ctx.canvas.height / 2;

      // Region circle
      ctx.beginPath();
      ctx.arc(x, y, 30 * zoom, 0, 2 * Math.PI);
      ctx.fillStyle = getRegionColor(region.type);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Region label
      ctx.fillStyle = 'white';
      ctx.font = `${12 * zoom}px Inter`;
      ctx.textAlign = 'center';
      ctx.fillText(region.name, x, y + 40 * zoom);
    });
  };

  const drawMarkers = (ctx: CanvasRenderingContext2D) => {
    map.markers.forEach((marker) => {
      const x = marker.coordinates.x * zoom + ctx.canvas.width / 2;
      const y = marker.coordinates.y * zoom + ctx.canvas.height / 2;

      // Marker pin
      ctx.beginPath();
      ctx.arc(x, y, 8 * zoom, 0, 2 * Math.PI);
      ctx.fillStyle = marker.color || '#EF4444';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Marker label
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(x - 30 * zoom, y - 25 * zoom, 60 * zoom, 15 * zoom);
      ctx.fillStyle = 'white';
      ctx.font = `${10 * zoom}px Inter`;
      ctx.textAlign = 'center';
      ctx.fillText(marker.name, x, y - 15 * zoom);
    });
  };

  const getRegionColor = (type: string) => {
    const colors = {
      kingdom: '#10B981',
      city: '#3B82F6',
      forest: '#059669',
      mountain: '#6B7280',
      ocean: '#0EA5E9',
      desert: '#F59E0B',
      other: '#8B5CF6'
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.2));
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left - canvas.width / 2) / zoom;
    const y = (event.clientY - rect.top - canvas.height / 2) / zoom;

    // Check for marker clicks
    const clickedMarker = map.markers.find(marker => {
      const distance = Math.sqrt(
        Math.pow(x - marker.coordinates.x, 2) + 
        Math.pow(y - marker.coordinates.y, 2)
      );
      return distance <= 15;
    });

    if (clickedMarker && onMarkerClick) {
      onMarkerClick(clickedMarker);
    }

    // Check for region clicks
    const clickedRegion = map.regions.find(region => {
      const distance = Math.sqrt(
        Math.pow(x - region.coordinates.x, 2) + 
        Math.pow(y - region.coordinates.y, 2)
      );
      return distance <= 30;
    });

    if (clickedRegion && onRegionClick) {
      onRegionClick(clickedRegion.id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Map Controls */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-white">{map.name}</h3>
            <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
              {is3D ? '3D' : '2D'} View
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <NeuButton variant="ghost" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </NeuButton>
            <span className="text-white text-sm px-2">
              {Math.round(zoom * 100)}%
            </span>
            <NeuButton variant="ghost" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </NeuButton>
            <NeuButton variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </NeuButton>
            <NeuButton 
              variant={is3D ? "primary" : "ghost"} 
              size="sm" 
              onClick={() => setIs3D(!is3D)}
            >
              <Maximize className="h-4 w-4" />
            </NeuButton>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Map Canvas */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-full cursor-crosshair"
            onClick={handleCanvasClick}
          />

          {/* Map Info Overlay */}
          <div className="absolute top-4 left-4">
            <GlassCard className="p-3">
              <div className="text-white text-sm">
                <p>Regions: {map.regions.length}</p>
                <p>Markers: {map.markers.length}</p>
                <p>Zoom: {Math.round(zoom * 100)}%</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Layer Panel */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-gray-400" />
              <h4 className="font-semibold text-white">Layers</h4>
            </div>

            <div className="space-y-2">
              {map.layers.map((layer) => (
                <motion.div
                  key={layer.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={layer.visible}
                      onChange={() => {}}
                      className="rounded"
                    />
                    <span className="text-white text-sm">{layer.name}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={layer.opacity * 100}
                    onChange={() => {}}
                    className="w-16"
                  />
                </motion.div>
              ))}
            </div>

            <div className="border-t border-gray-600 pt-4">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <h4 className="font-semibold text-white">Markers</h4>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">Show Markers</span>
                <input
                  type="checkbox"
                  checked={showMarkers}
                  onChange={(e) => setShowMarkers(e.target.checked)}
                  className="rounded"
                />
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {map.markers.map((marker) => (
                  <div
                    key={marker.id}
                    className="flex items-center space-x-2 p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                    onClick={() => onMarkerClick?.(marker)}
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: marker.color || '#EF4444' }}
                    />
                    <span className="text-white text-sm truncate">{marker.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapCanvas3D;