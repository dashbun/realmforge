import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store';
import { 
  Sparkles, 
  MessageSquare, 
  Image, 
  Users, 
  BookOpen, 
  Zap,
  Send,
  Loader,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import GlassCard from '../core/UI/GlassCard';
import NeuButton from '../core/UI/NeuButton';

const AIAssistantPanel: React.FC = () => {
  const { aiLoading, setAiLoading, addAiHistory, currentWorld } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string>('chat');
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const aiFeatures = [
    { id: 'chat', label: 'Chat', icon: MessageSquare, description: 'General assistance' },
    { id: 'character', label: 'Character', icon: Users, description: 'Character generation' },
    { id: 'lore', label: 'Lore', icon: BookOpen, description: 'Lore expansion' },
    { id: 'power', label: 'Powers', icon: Zap, description: 'Power systems' },
    { id: 'image', label: 'Images', icon: Image, description: 'AI artwork' },
  ];

  const handleSendPrompt = async () => {
    if (!prompt.trim() || aiLoading) return;

    setAiLoading(true);
    const userMessage = { type: 'user', content: prompt, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiResponse = {
        type: 'ai',
        content: `Here's a response for your ${activeFeature} request: "${prompt}". This is a simulated response that would normally come from the AI service.`,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, aiResponse]);
      addAiHistory({ feature: activeFeature, prompt, response: aiResponse.content });
    } catch (error) {
      console.error('AI request failed:', error);
    } finally {
      setAiLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="h-full bg-white/5 dark:bg-dark-surface/5 backdrop-blur-xl border-l border-white/10 dark:border-dark-border/10">
      {/* Header */}
      <div className="p-4 border-b border-white/10 dark:border-dark-border/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Powered by GPT-4</p>
            </div>
          </div>
          <NeuButton
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </NeuButton>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Feature Tabs */}
            <div className="p-4 border-b border-white/10 dark:border-dark-border/10">
              <div className="grid grid-cols-2 gap-2">
                {aiFeatures.map((feature) => (
                  <motion.button
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`p-3 rounded-lg text-left transition-all duration-200 ${
                      activeFeature === feature.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-white/5 dark:bg-dark-elevated/30 text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-dark-elevated/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <feature.icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{feature.label}</span>
                    </div>
                    <p className="text-xs opacity-80">{feature.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      AI Assistant Ready
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ask me anything about your world!
                    </p>
                  </div>
                ) : (
                  chatHistory.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-white/10 dark:bg-dark-elevated/50 text-gray-900 dark:text-white'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
                
                {aiLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 dark:bg-dark-elevated/50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Loader className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          AI is thinking...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 dark:border-dark-border/10">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendPrompt()}
                    placeholder={`Ask about ${aiFeatures.find(f => f.id === activeFeature)?.label.toLowerCase()}...`}
                    className="flex-1 px-3 py-2 bg-white/10 dark:bg-dark-elevated/50 border border-white/20 dark:border-dark-border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    disabled={aiLoading}
                  />
                  <NeuButton
                    variant="primary"
                    size="sm"
                    onClick={handleSendPrompt}
                    disabled={!prompt.trim() || aiLoading}
                    loading={aiLoading}
                  >
                    <Send className="h-4 w-4" />
                  </NeuButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistantPanel;