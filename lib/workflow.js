// Workflow node types for React Flow-style visualizations
export const NODE_TYPES = {
  // Hero section
  TRIGGER: 'trigger',
  OUTPUT: 'output',
  
  // Skills section
  SKILL_GROUP: 'skillGroup',
  SKILL_NODE: 'skillNode',
  
  // Projects section
  PROJECT_NODE: 'projectNode',
  SYSTEM_NODE: 'systemNode',
  
  // Experience section
  MILESTONE_NODE: 'milestoneNode',
  PROCESS_NODE: 'processNode',
  
  // Contact section
  CONNECTION_NODE: 'connectionNode',
};

// Edge types
export const EDGE_TYPES = {
  DEFAULT: 'default',
  ANIMATED: 'animated',
  DATA_FLOW: 'dataFlow',
  EXECUTION: 'execution',
};

// Node design system
export const NODE_STYLES = {
  // Trigger nodes (start points)
  trigger: {
    background: '#00ff88',
    border: '2px solid #00ff88',
    borderRadius: '8px',
    padding: '12px 20px',
    color: '#050508',
    fontFamily: 'Space Mono, monospace',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)',
  },
  
  // Process nodes
  process: {
    background: '#0a0a10',
    border: '1px solid #1a1a2e',
    borderLeft: '3px solid #00ff88',
    borderRadius: '0',
    padding: '16px 20px',
    color: '#e8e8f0',
    minWidth: '180px',
  },
  
  // Skill group nodes
  skillGroup: {
    background: 'rgba(10, 10, 16, 0.9)',
    border: '1px solid #252540',
    borderRadius: '4px',
    padding: '20px',
    backdropFilter: 'blur(10px)',
  },
  
  // Project nodes
  project: {
    background: '#0f0f18',
    border: '1px solid #1a1a2e',
    borderTop: '3px solid',
    borderRadius: '4px',
    padding: '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  
  // Output nodes
  output: {
    background: '#00ff88',
    border: '2px solid #00ff88',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
  },
};

// Edge animation configurations
export const EDGE_ANIMATIONS = {
  // Default connection
  default: {
    stroke: '#1a1a2e',
    strokeWidth: 1,
    animated: false,
  },
  
  // Data flow animation
  dataFlow: {
    stroke: '#00ff88',
    strokeWidth: 2,
    animated: true,
    animationDuration: '1.5s',
    strokeDasharray: '5,5',
  },
  
  // Execution path
  execution: {
    stroke: '#00ff88',
    strokeWidth: 2,
    animated: true,
    animationDuration: '2s',
    strokeDasharray: '10,5',
  },
  
  // Active connection
  active: {
    stroke: '#00ff88',
    strokeWidth: 3,
    animated: true,
    animationDuration: '1s',
    filter: 'drop-shadow(0 0 5px #00ff88)',
  },
};

// Handle positions for nodes
export const HANDLE_POSITIONS = {
  TOP: { x: 50, y: 0 },
  RIGHT: { x: 100, y: 50 },
  BOTTOM: { x: 50, y: 100 },
  LEFT: { x: 0, y: 50 },
};

// Status indicators
export const STATUS_INDICATORS = {
  ONLINE: { color: '#00ff88', pulse: true, label: 'Online' },
  PROCESSING: { color: '#f59e0b', pulse: true, label: 'Processing' },
  OFFLINE: { color: '#555570', pulse: false, label: 'Offline' },
  ERROR: { color: '#ef4444', pulse: false, label: 'Error' },
};

// Custom node component structure
export const createNode = (id, type, position, data, style = {}) => ({
  id,
  type,
  position,
  data,
  style: { ...NODE_STYLES[type], ...style },
});

export const createEdge = (id, source, target, type = 'default', animated = false, style = {}) => ({
  id,
  source,
  target,
  type,
  animated,
  style: { ...EDGE_ANIMATIONS[type], ...style },
});
