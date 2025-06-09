import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store';
import { Timeline, Era, TimelineEvent } from '../../types';
import { 
  Calendar, 
  Plus, 
  Edit3, 
  Trash2, 
  ZoomIn, 
  ZoomOut,
  Filter,
  Search,
  Clock
} from 'lucide-react';
import GlassCard from '../core/UI/GlassCard';
import NeuButton from '../core/UI/NeuButton';

interface TimelineEditorProps {
  timeline?: Timeline;
  onSave: (timeline: Timeline) => void;
  onCancel: () => void;
}

const TimelineEditor: React.FC<TimelineEditorProps> = ({ timeline, onSave, onCancel }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineData, setTimelineData] = useState<Timeline>(
    timeline || {
      id: '',
      worldId: '',
      name: 'World Timeline',
      description: '',
      eras: [],
      events: [],
      settings: {
        defaultView: 'linear',
        showEras: true,
        showImportanceFilter: true,
        colorCoding: true
      }
    }
  );

  const [zoom, setZoom] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [importanceFilter, setImportanceFilter] = useState(0);

  const eventTypes = [
    { value: 'political', label: 'Political', color: '#3B82F6' },
    { value: 'war', label: 'War', color: '#EF4444' },
    { value: 'discovery', label: 'Discovery', color: '#10B981' },
    { value: 'cultural', label: 'Cultural', color: '#8B5CF6' },
    { value: 'natural', label: 'Natural Disaster', color: '#F59E0B' },
    { value: 'magical', label: 'Magical Event', color: '#EC4899' },
    { value: 'other', label: 'Other', color: '#6B7280' }
  ];

  const filteredEvents = timelineData.events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesImportance = event.importance >= importanceFilter;
    return matchesSearch && matchesImportance;
  });

  const addEvent = () => {
    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      title: 'New Event',
      description: '',
      date: {
        year: 1000,
        era: timelineData.eras[0]?.id || 'default'
      },
      type: 'other',
      importance: 1,
      participants: [],
      consequences: [],
      relatedEntries: []
    };
    
    setSelectedEvent(newEvent);
    setShowEventModal(true);
  };

  const saveEvent = (event: TimelineEvent) => {
    setTimelineData(prev => ({
      ...prev,
      events: prev.events.some(e => e.id === event.id)
        ? prev.events.map(e => e.id === event.id ? event : e)
        : [...prev.events, event]
    }));
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const deleteEvent = (eventId: string) => {
    setTimelineData(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== eventId)
    }));
  };

  const addEra = () => {
    const newEra: Era = {
      id: Date.now().toString(),
      name: 'New Era',
      description: '',
      startYear: 0,
      endYear: 1000,
      color: '#3B82F6',
      importance: 1
    };
    
    setTimelineData(prev => ({
      ...prev,
      eras: [...prev.eras, newEra]
    }));
  };

  const getEventPosition = (event: TimelineEvent) => {
    const minYear = Math.min(...timelineData.events.map(e => e.date.year));
    const maxYear = Math.max(...timelineData.events.map(e => e.date.year));
    const range = maxYear - minYear || 1;
    return ((event.date.year - minYear) / range) * 100;
  };

  const getEventColor = (eventType: string) => {
    return eventTypes.find(type => type.value === eventType)?.color || '#6B7280';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Timeline Editor
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create and manage your world's historical timeline
            </p>
          </div>
          <div className="flex space-x-3">
            <NeuButton variant="ghost" onClick={onCancel}>
              Cancel
            </NeuButton>
            <NeuButton variant="primary" onClick={() => onSave(timelineData)}>
              Save Timeline
            </NeuButton>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Controls Sidebar */}
        <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-6">
            {/* Search and Filters */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Search & Filter
              </h3>
              
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search events..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Minimum Importance: {importanceFilter}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={importanceFilter}
                    onChange={(e) => setImportanceFilter(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Timeline Controls */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Timeline Controls
              </h3>
              
              <div className="flex space-x-2 mb-3">
                <NeuButton variant="ghost" size="sm" onClick={() => setZoom(zoom * 1.2)}>
                  <ZoomIn className="h-4 w-4" />
                </NeuButton>
                <NeuButton variant="ghost" size="sm" onClick={() => setZoom(zoom / 1.2)}>
                  <ZoomOut className="h-4 w-4" />
                </NeuButton>
                <span className="text-sm text-gray-600 dark:text-gray-400 px-2 py-1">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              
              <div className="space-y-2">
                <NeuButton variant="primary" size="sm" onClick={addEvent} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </NeuButton>
                <NeuButton variant="secondary" size="sm" onClick={addEra} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Era
                </NeuButton>
              </div>
            </div>

            {/* Event Types Legend */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Event Types
              </h3>
              
              <div className="space-y-2">
                {eventTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {type.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Events List */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Events ({filteredEvents.length})
              </h3>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer"
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowEventModal(true);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Year {event.date.year}
                        </p>
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full ml-2"
                        style={{ backgroundColor: getEventColor(event.type) }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Canvas */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-900">
          <div 
            ref={timelineRef}
            className="relative h-full min-h-96 p-8"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600" />

            {/* Eras */}
            {timelineData.settings.showEras && timelineData.eras.map((era) => (
              <div
                key={era.id}
                className="absolute left-0 right-0 bg-opacity-10 border-l-4 pl-4"
                style={{
                  backgroundColor: era.color + '20',
                  borderColor: era.color,
                  top: `${(era.startYear / 2000) * 100}%`,
                  height: `${((era.endYear - era.startYear) / 2000) * 100}%`
                }}
              >
                <div className="sticky top-4">
                  <h3 className="font-bold text-lg" style={{ color: era.color }}>
                    {era.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {era.startYear} - {era.endYear}
                  </p>
                </div>
              </div>
            ))}

            {/* Events */}
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="absolute flex items-center"
                style={{
                  top: `${getEventPosition(event)}%`,
                  left: '2rem'
                }}
              >
                {/* Event Marker */}
                <div 
                  className="w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 z-10"
                  style={{ backgroundColor: getEventColor(event.type) }}
                />
                
                {/* Event Card */}
                <GlassCard 
                  className="ml-4 p-4 max-w-sm cursor-pointer"
                  hover
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventModal(true);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Year {event.date.year}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {Array.from({ length: event.importance }).map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-yellow-500 rounded-full" />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {selectedEvent.id ? 'Edit Event' : 'Create Event'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={selectedEvent.title}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      value={selectedEvent.date.year}
                      onChange={(e) => setSelectedEvent({ 
                        ...selectedEvent, 
                        date: { ...selectedEvent.date, year: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      value={selectedEvent.type}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {eventTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={selectedEvent.description}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Importance: {selectedEvent.importance}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={selectedEvent.importance}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, importance: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Minor</span>
                    <span>Major</span>
                    <span>Critical</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <NeuButton 
                  variant="ghost" 
                  onClick={() => {
                    setShowEventModal(false);
                    setSelectedEvent(null);
                  }}
                >
                  Cancel
                </NeuButton>
                <NeuButton 
                  variant="primary" 
                  onClick={() => saveEvent(selectedEvent)}
                >
                  Save Event
                </NeuButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelineEditor;