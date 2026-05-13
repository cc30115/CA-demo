import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { Minus, Plus, ArrowsClockwise, X, Key, Trash, PlusCircle } from '@phosphor-icons/react';
import Dither from './Dither';

const COLORS = ['#0f62fe', '#8a3ffc', '#1192e8', '#fa4d56', '#198038', '#002d9c', '#ee5396'];
const FIELD_TYPES = ['string', 'number', 'boolean', 'datetime', 'enum', 'int'];

const generateId = () => Math.random().toString(36).substring(2, 9);

interface Field {
  id: string;
  name: string;
  type: string;
  marker: 'PK' | 'FK' | null;
  isNew?: boolean;
}

interface NodeData {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  fields: Field[];
}

const INITIAL_NODES: Record<string, NodeData> = {
  users: {
    id: 'users',
    name: 'Users',
    x: 40,
    y: 40,
    color: '#0f62fe',
    fields: [
      { id: 'f1', name: 'id', type: 'int', marker: 'PK' },
      { id: 'f2', name: 'name', type: 'string', marker: null },
      { id: 'f3', name: 'email', type: 'string', marker: null },
      { id: 'f4', name: 'created_at', type: 'datetime', marker: null },
    ],
  },
  orders: {
    id: 'orders',
    name: 'Orders',
    x: 560,
    y: 80,
    color: '#8a3ffc',
    fields: [
      { id: 'f5', name: 'id', type: 'int', marker: 'PK' },
      { id: 'f6', name: 'user_id', type: 'int', marker: 'FK' },
      { id: 'f7', name: 'amount', type: 'number', marker: null },
      { id: 'f8', name: 'status', type: 'enum', marker: null },
    ],
  },
};

interface Connection {
  id: string;
  fromId: string;
  toId: string;
  type: '1:1' | '1:N' | 'N:N';
}

const INITIAL_CONNECTIONS: Connection[] = [
  { id: 'c1', fromId: 'users', toId: 'orders', type: '1:N' }
];

type Direction = 'left' | 'right';

const FieldRow = ({ field, index, parentDelay, onUpdate, onDelete }: any) => {
  const [isEditingName, setIsEditingName] = useState(field.isNew || false);
  const [editName, setEditName] = useState(field.name);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingName]);

  const handleNameSave = () => {
    setIsEditingName(false);
    if (editName.trim() === '') {
      setEditName(field.name);
    } else {
      onUpdate({ ...field, name: editName, isNew: false });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNameSave();
    if (e.key === 'Escape') {
      setEditName(field.name);
      setIsEditingName(false);
    }
  };

  const toggleMarker = () => {
    const nextMarker = field.marker === 'PK' ? 'FK' : field.marker === 'FK' ? null : 'PK';
    onUpdate({ ...field, marker: nextMarker });
  };

  return (
    <motion.div 
      initial={field.isNew ? { opacity: 0, height: 0 } : { opacity: 0 }}
      animate={{ opacity: 1, height: '40px' }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
      transition={field.isNew ? { duration: 0.2 } : { delay: parentDelay + 0.1 + index * 0.05, duration: 0.3 }}
      className="px-4 flex items-center justify-between relative hover:bg-[#e0e0e0] transition-colors border-b border-transparent hover:border-[#a8a8a8]/30 group"
    >
      <div className="flex items-center gap-3 relative z-10 w-full overflow-hidden">
        {isEditingName ? (
          <input
            ref={inputRef}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleNameSave}
            onKeyDown={handleKeyDown}
            className="text-[14px] text-[#161616] font-mono bg-white border border-[#0f62fe] outline-none px-1 py-0.5 rounded-[2px] w-[140px]"
          />
        ) : (
          <span 
            onDoubleClick={() => setIsEditingName(true)}
            onClick={() => setIsEditingName(true)}
            className="text-[14px] text-[#161616] font-mono cursor-text truncate max-w-[140px] hover:text-[#0f62fe] transition-colors"
            title="Click to edit"
          >
            {field.name}
          </span>
        )}
        
        {field.marker && (
          <span className={`flex-shrink-0 text-[10px] font-semibold px-[4px] py-[2px] tracking-wide rounded-[2px] ${field.marker === 'PK' ? 'bg-[#0f62fe]/10 text-[#0f62fe]' : 'bg-[#8a3ffc]/10 text-[#8a3ffc]'}`}>
            {field.marker}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 relative ml-2">
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTypeSelector(!showTypeSelector);
            }}
            className="text-[12px] text-[#525252] font-mono cursor-pointer hover:text-[#161616] px-1.5 py-0.5 rounded hover:bg-[#d0d0d0] transition-colors"
          >
            {field.type}
          </button>
          
          {showTypeSelector && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-[#e0e0e0] shadow-md rounded-[2px] z-50 min-w-[100px] flex flex-col py-1">
              {FIELD_TYPES.map(t => (
                <button 
                  key={t}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdate({ ...field, type: t });
                    setShowTypeSelector(false);
                  }}
                  className="px-3 py-1 text-left text-[12px] hover:bg-[#f4f4f4] font-mono text-[#525252] hover:text-[#161616]"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="hidden group-hover:flex items-center gap-0.5 absolute right-0 bg-[#e0e0e0] pl-3">
          <button onClick={toggleMarker} className="p-1 hover:bg-[#c6c6c6] rounded-[2px] text-[#525252] transition-colors" title="Toggle PK/FK">
            <Key size={14} weight={field.marker ? "fill" : "regular"} />
          </button>
          <button onClick={() => onDelete(field.id)} className="p-1 hover:bg-[#fa4d56]/10 hover:text-[#fa4d56] rounded-[2px] text-[#525252] transition-colors" title="Delete Field">
            <X size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TableNode = ({ node, isActive, isDragging, onPointerDown, onUpdate, onDelete, onPortPointerDown, onNodePointerUp, hoverNode, setHoverNode }: any) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(node.name);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  const handleNameSave = () => {
    setIsEditingName(false);
    if (editName.trim() === '') {
      setEditName(node.name);
    } else {
      onUpdate({ ...node, name: editName });
    }
  };

  const addField = () => {
    const newField: Field = {
      id: generateId(),
      name: 'new_field',
      type: 'string',
      marker: null,
      isNew: true
    };
    onUpdate({ ...node, fields: [...node.fields, newField] });
  };

  return (
    <motion.div 
      data-dither="card"
      className={`absolute shadow-md border border-[#e0e0e0] rounded-[2px] bg-white w-[280px] overflow-hidden select-none group/node ${isDragging ? 'cursor-grabbing z-50 scale-[1.02] shadow-xl' : 'cursor-grab z-10 hover:shadow-lg'} transition-[box-shadow,transform,background-color] duration-200`}
      style={{ left: node.x, top: node.y, zIndex: isActive ? 20 : 10 }}
      onPointerDown={onPointerDown}
      onPointerUp={(e) => onNodePointerUp?.(e, node.id)}
      onPointerEnter={() => setHoverNode?.(node.id)}
      onPointerLeave={() => setHoverNode?.(null)}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
    >
      <div 
        className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-[12px] h-[32px] flex items-center justify-center cursor-crosshair z-20 opacity-0 group-hover/node:opacity-100"
        onPointerDown={(e) => onPortPointerDown(e, node.id, 'left')}
      >
        <div className="w-[8px] h-[8px] bg-[#0f62fe] rounded-full border-[2px] border-white shadow-sm transition-transform duration-200 hover:scale-150" />
      </div>
      <div 
        className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-[12px] h-[32px] flex items-center justify-center cursor-crosshair z-20 opacity-0 group-hover/node:opacity-100"
        onPointerDown={(e) => onPortPointerDown(e, node.id, 'right')}
      >
        <div className="w-[8px] h-[8px] bg-[#0f62fe] rounded-full border-[2px] border-white shadow-sm transition-transform duration-200 hover:scale-150" />
      </div>

      <div className="h-[4px] w-full" style={{ backgroundColor: node.color }}></div>
      <div className={`px-4 py-3 border-b border-[#e0e0e0] flex items-center justify-between ${isDragging ? 'bg-[#e0e0e0]' : 'bg-[#f4f4f4]'} transition-colors group`}>
        <div className="flex items-center gap-2 overflow-hidden w-full">
          <div className="p-1 rounded-none flex-shrink-0" style={{ backgroundColor: `${node.color}1a` }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={node.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          
          {isEditingName ? (
            <input
              ref={nameInputRef}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameSave();
                if (e.key === 'Escape') {
                  setEditName(node.name);
                  setIsEditingName(false);
                }
              }}
              className="font-semibold text-[#161616] text-[14px] bg-white border border-[#0f62fe] outline-none px-1 py-0.5 rounded-[2px] w-full"
            />
          ) : (
            <span 
              onDoubleClick={() => setIsEditingName(true)}
              className="font-semibold text-[#161616] text-[14px] cursor-text truncate hover:text-[#0f62fe] transition-colors flex-grow"
              title="Double click to edit"
            >
              {node.name}
            </span>
          )}
        </div>
        {!isEditingName && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="opacity-0 group-hover:opacity-100 p-1 text-[#525252] hover:text-[#fa4d56] hover:bg-[#fa4d56]/10 rounded transition-all ml-2"
            title="Delete Table"
          >
            <Trash size={16} />
          </button>
        )}
      </div>
      
      <div className="flex flex-col py-2 bg-white cursor-default" onPointerDown={e => e.stopPropagation()}>
        <AnimatePresence initial={false}>
          {node.fields.map((f: Field, i: number) => (
            <FieldRow 
              key={f.id} 
              field={f} 
              index={i} 
              parentDelay={0}
              onUpdate={(updatedField: Field) => {
                const newFields = node.fields.map((xf: Field) => xf.id === updatedField.id ? updatedField : xf);
                onUpdate({ ...node, fields: newFields });
              }}
              onDelete={(fieldId: string) => {
                const newFields = node.fields.filter((xf: Field) => xf.id !== fieldId);
                onUpdate({ ...node, fields: newFields });
              }}
            />
          ))}
        </AnimatePresence>
        
        <button 
          onClick={addField}
          className="mt-2 mx-4 py-1.5 flex items-center justify-center gap-1.5 border border-dashed border-[#c6c6c6] text-[#525252] text-[12px] hover:border-[#0f62fe] hover:text-[#0f62fe] hover:bg-[#0f62fe]/5 rounded-[2px] transition-colors"
        >
          <Plus size={12} /> 新增欄位
        </button>
      </div>
    </motion.div>
  );
};

export default function SchemaInteractiveSection() {
  const [nodes, setNodes] = useState<Record<string, NodeData>>(INITIAL_NODES);
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [drawingConnection, setDrawingConnection] = useState<{fromNode: string, fromDir: Direction, x: number, y: number, isError: boolean} | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [hoverNode, setHoverNode] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeNodeTop, setActiveNodeTop] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleZoom = (delta: number) => setZoom(prev => Math.min(Math.max(0.5, prev + delta), 1.5));
  const handleReset = () => {
    setNodes(INITIAL_NODES);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setActiveNodeTop(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      handleZoom(e.deltaY > 0 ? -0.1 : 0.1);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const preventDefault = (e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey) e.preventDefault();
      };
      canvas.addEventListener('wheel', preventDefault, { passive: false });
      return () => canvas.removeEventListener('wheel', preventDefault);
    }
  }, []);

  const onPointerDownCanvas = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.node-element')) return;
    setIsPanning(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const estimateNodeHeight = (node: NodeData) => 42 + node.fields.length * 40 + 34;

  const handlePortPointerDown = (e: React.PointerEvent, nodeId: string, dir: Direction) => {
    e.stopPropagation();
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    setDrawingConnection({ fromNode: nodeId, fromDir: dir, x, y, isError: false });
  };

  const onPointerMoveCanvas = (e: React.PointerEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    } else if (drawingConnection && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      
      let isError = false;
      if (hoverNode) {
         if (hoverNode === drawingConnection.fromNode) {
            isError = true;
         } else {
            const exists = connections.some(c => 
               (c.fromId === drawingConnection.fromNode && c.toId === hoverNode) ||
               (c.fromId === hoverNode && c.toId === drawingConnection.fromNode)
            );
            isError = exists;
         }
      }
      setDrawingConnection(prev => prev ? { ...prev, x, y, isError } : null);
    } else if (draggingNode && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x - dragStart.x) / zoom;
      const y = (e.clientY - rect.top - pan.y - dragStart.y) / zoom;
      setNodes(prev => ({ ...prev, [draggingNode]: { ...prev[draggingNode], x, y } }));
    }
  };

  const onPointerUp = () => {
    setIsPanning(false);
    setDraggingNode(null);
    if (drawingConnection && !hoverNode) {
      setDrawingConnection(null);
    }
  };

  const onNodePointerUp = (e: React.PointerEvent, nodeId: string) => {
    if (drawingConnection) {
       if (drawingConnection.fromNode !== nodeId) {
          const exists = connections.some(c => 
             (c.fromId === drawingConnection.fromNode && c.toId === nodeId) ||
             (c.fromId === nodeId && c.toId === drawingConnection.fromNode)
          );
          if (!exists) {
             setConnections(prev => [...prev, {
                id: `c_${generateId()}`,
                fromId: drawingConnection.fromNode,
                toId: nodeId,
                type: '1:N'
             }]);
          }
       }
       setDrawingConnection(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedConnectionId) {
         setConnections(prev => prev.filter(c => c.id !== selectedConnectionId));
         setSelectedConnectionId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedConnectionId]);

  const onPointerDownNode = (e: React.PointerEvent, nodeId: string) => {
    e.stopPropagation();
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const node = nodes[nodeId];
    const pointerX = (e.clientX - rect.left - pan.x) / zoom;
    const pointerY = (e.clientY - rect.top - pan.y) / zoom;
    setDragStart({ x: (pointerX - node.x) * zoom, y: (pointerY - node.y) * zoom });
    setDraggingNode(nodeId);
    setActiveNodeTop(nodeId);
  };

  const handleAddTable = () => {
    let newX = 250;
    let newY = 150;
    const padding = 40;
    let overlap = true;
    let attempts = 0;
    
    while (overlap && attempts < 20) {
      overlap = Object.values(nodes).some(n => 
        Math.abs(n.x - newX) < 280 + padding && Math.abs(n.y - newY) < 150 + padding
      );
      if (overlap) {
        newX += 40;
        newY += 40;
      }
      attempts++;
    }

    const newId = `node_${generateId()}`;
    const newColor = COLORS[Object.keys(nodes).length % COLORS.length];

    setNodes(prev => ({
      ...prev,
      [newId]: {
        id: newId,
        name: 'NewTable',
        x: newX,
        y: newY,
        color: newColor,
        fields: [{ id: generateId(), name: 'id', type: 'int', marker: 'PK', isNew: true }]
      }
    }));
  };

  const renderConnections = () => {
    const nodePortUsage: Record<string, { left: number; right: number }> = {};
    Object.keys(nodes).forEach(k => {
      nodePortUsage[k] = { left: 0, right: 0 };
    });

    const activeConns = connections.map(conn => {
      const fromNode = nodes[conn.fromId];
      const toNode = nodes[conn.toId];
      if (!fromNode || !toNode) return null;
      
      const isRightToLeft = fromNode.x < toNode.x;
      const fromDir = isRightToLeft ? 'right' : 'left';
      const toDir = isRightToLeft ? 'left' : 'right';

      const fromIndex = nodePortUsage[conn.fromId][fromDir]++;
      const toIndex = nodePortUsage[conn.toId][toDir]++;
      
      return { ...conn, fromNode, toNode, fromDir, toDir, fromIndex, toIndex };
    }).filter(Boolean);

    let drawingLine = null;
    if (drawingConnection) {
       const fx = drawingConnection.fromDir === 'left' ? nodes[drawingConnection.fromNode].x : nodes[drawingConnection.fromNode].x + 280;
       const fH = estimateNodeHeight(nodes[drawingConnection.fromNode]);
       const nextIndex = nodePortUsage[drawingConnection.fromNode][drawingConnection.fromDir];
       const fy = nodes[drawingConnection.fromNode].y + fH / 2 + (nextIndex - nextIndex / 2) * 20;

       const dx = Math.abs(drawingConnection.x - fx);
       const cp1x = drawingConnection.fromDir === 'left' ? fx - dx * 0.5 - 40 : fx + dx * 0.5 + 40;
       const cp2x = drawingConnection.fromDir === 'left' ? drawingConnection.x + dx * 0.5 + 40 : drawingConnection.x - dx * 0.5 - 40;
       
       const cColor = drawingConnection.isError ? '#fa4d56' : '#a8a8a8';
       drawingLine = (
         <svg key="drawing-line" className="absolute inset-0 w-[4000px] h-[4000px] pointer-events-none" style={{ zIndex: 15, overflow: 'visible' }}>
            <path 
              d={`M ${fx} ${fy} C ${cp1x} ${fy}, ${cp2x} ${drawingConnection.y}, ${drawingConnection.x} ${drawingConnection.y}`}
              fill="none" stroke={cColor} strokeWidth="3" strokeDasharray="6 6"
            />
         </svg>
       );
    }

    const drawnConns = activeConns.map((c: any) => {
      const { id, fromNode, toNode, fromDir, toDir, fromIndex, toIndex, type } = c;
      const fTotal = nodePortUsage[c.fromId][fromDir];
      const tTotal = nodePortUsage[c.toId][toDir];
      
      const fH = estimateNodeHeight(fromNode);
      const tH = estimateNodeHeight(toNode);

      const fY = fromNode.y + fH / 2 + (fromIndex - (fTotal - 1) / 2) * 20;
      const tY = toNode.y + tH / 2 + (toIndex - (tTotal - 1) / 2) * 20;
      
      const fX = fromDir === 'left' ? fromNode.x : fromNode.x + 280;
      const tX = toDir === 'left' ? toNode.x : toNode.x + 280;

      const dx = Math.abs(tX - fX);
      const cpDist = Math.max(dx * 0.5, 40);
      const cp1x = fromDir === 'left' ? fX - cpDist : fX + cpDist;
      const cp2x = toDir === 'left' ? tX - cpDist : tX + cpDist;

      const bezierPoint = (t: number, p0: number, p1: number, p2: number, p3: number) => {
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * t;
        return uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3;
      };

      const midX = bezierPoint(0.5, fX, cp1x, cp2x, tX);
      const midY = bezierPoint(0.5, fY, fY, tY, tY);

      const isSelected = selectedConnectionId === id;

      return (
        <React.Fragment key={id}>
          <svg className="absolute inset-0 w-[4000px] h-[4000px] pointer-events-none" style={{ zIndex: isSelected ? 16 : 5, overflow: 'visible' }}>
             <path 
              d={`M ${fX} ${fY} C ${cp1x} ${fY}, ${cp2x} ${tY}, ${tX} ${tY}`}
              fill="none" stroke="transparent" strokeWidth="20"
              className="pointer-events-auto cursor-pointer"
              onPointerDown={(e) => { e.stopPropagation(); setSelectedConnectionId(id); }}
            />
            <motion.path 
              d={`M ${fX} ${fY} C ${cp1x} ${fY}, ${cp2x} ${tY}, ${tX} ${tY}`}
              fill="none" stroke={isSelected ? "#0f62fe" : "#a8a8a8"} strokeWidth={isSelected ? "3" : "2"}
              initial={{ strokeDasharray: "4 4" }}
              animate={{ strokeDasharray: "0 0" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none"
            />
          </svg>
          <motion.div 
            className={`absolute z-20 bg-white border ${isSelected ? 'border-[#fa4d56]' : 'border-[#a8a8a8]'} text-[#525252] text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow-sm cursor-pointer select-none hover:bg-[#e0e0e0] transition-colors`}
            style={{ left: midX - 14, top: midY - 10 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={(e) => { e.stopPropagation(); setSelectedConnectionId(id); }}
            onClick={(e) => {
               e.stopPropagation();
               const types: any[] = ['1:1', '1:N', 'N:N'];
               const nextType = types[(types.indexOf(type) + 1) % types.length];
               setConnections(prev => prev.map(xc => xc.id === id ? { ...xc, type: nextType } : xc));
            }}
          >
            {type}
          </motion.div>
          
          <AnimatePresence>
            {isSelected && (
               <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute z-20 bg-white text-[#fa4d56] border border-[#fa4d56] rounded-full p-0.5 hover:bg-[#fa4d56] hover:text-white transition-colors cursor-pointer"
                  style={{ left: midX + 16, top: midY - 14 }}
                  onClick={(e) => {
                     e.stopPropagation();
                     setConnections(prev => prev.filter(xc => xc.id !== id));
                     setSelectedConnectionId(null);
                  }}
               >
                  <X size={12} weight="bold" />
               </motion.button>
            )}
          </AnimatePresence>
        </React.Fragment>
      );
    });

    return <>{drawnConns}{drawingLine}</>;
  };

  return (
    <motion.section 
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
      className="w-full relative min-h-[70vh] bg-[#f8f9fa] border-y border-[#e0e0e0] overflow-hidden flex flex-col items-center pb-8"
      onPointerDown={() => setSelectedConnectionId(null)}
    >
      <div className="absolute inset-0 z-0">
         <Dither
            waveColor={[15/255, 98/255, 254/255]}
            waveSpeed={0.03}
            waveFrequency={1.6}
            waveAmplitude={0.25}
            colorNum={5}
            pixelSize={1.5}
         />
      </div>
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }} className="absolute inset-0 z-0 bg-[#f8f9fa]/80 pointer-events-none" />

      <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="relative z-10 w-full pt-[64px] px-4 flex flex-col items-center text-center max-w-[800px] mx-auto pointer-events-none">
        <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">即時視覺化</p>
        <h2 className="text-display-xl mb-[24px] text-[#161616]">體驗你的第一個 Schema</h2>
        <p className="text-body-lg text-[#525252] whitespace-pre-line">
          拖拉節點、定義欄位、建立關聯——<br className="hidden md:inline" />
          這就是用 CGA 建後端的完整體驗。
        </p>
      </motion.div>

      <div className="absolute top-4 right-4 z-20">
        <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e0e0e0] rounded-[2px] text-[#161616] hover:bg-[#f4f4f4] transition-colors text-[14px] shadow-sm">
          <ArrowsClockwise size={16} /> 重置
        </button>
      </div>

      <div 
        ref={canvasRef}
        className={`relative w-[80vw] mx-auto mt-[40px] h-[60vh] min-h-[400px] min-w-[300px] max-w-[95vw] bg-white/80 backdrop-blur-sm border border-[#e0e0e0] shadow-sm overflow-hidden ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ resize: 'both' }}
        onPointerDown={onPointerDownCanvas} onPointerMove={onPointerMoveCanvas} onPointerUp={onPointerUp} onPointerLeave={onPointerUp} onWheel={handleWheel}
      >
        <div className="absolute top-4 left-4 z-30 pointer-events-auto">
          <button 
            onClick={handleAddTable}
            className="flex items-center gap-2 px-4 py-2 bg-[#0f62fe] text-white rounded-[2px] font-medium hover:bg-[#0353e9] transition-colors shadow-md"
          >
            <PlusCircle size={18} weight="bold" /> 新增資料表
          </button>
        </div>

        <div className="absolute inset-0 origin-center transition-transform duration-75" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          
          <AnimatePresence>
            {renderConnections()}
          </AnimatePresence>

          <AnimatePresence>
            {Object.values(nodes).map(node => (
              <TableNode 
                key={node.id} 
                className="node-element"
                node={node} 
                isActive={activeNodeTop === node.id}
                isDragging={draggingNode === node.id}
                hoverNode={hoverNode}
                setHoverNode={setHoverNode}
                onPointerDown={(e: React.PointerEvent) => onPointerDownNode(e, node.id)}
                onPortPointerDown={handlePortPointerDown}
                onNodePointerUp={onNodePointerUp}
                onUpdate={(updatedData: NodeData) => setNodes(prev => ({ ...prev, [node.id]: updatedData }))}
                onDelete={() => {
                  const newNodes = { ...nodes };
                  delete newNodes[node.id];
                  setNodes(newNodes);
                }}
              />
            ))}
          </AnimatePresence>
        </div>
        
        <div className="absolute bottom-4 right-4 z-20 flex items-center bg-white border border-[#e0e0e0] rounded-[2px] shadow-sm overflow-hidden pointer-events-auto">
          <button onClick={() => handleZoom(-0.1)} className="p-2 hover:bg-[#e0e0e0] text-[#161616] transition-colors"><Minus size={16} /></button>
          <div className="px-2 text-[12px] font-mono text-[#525252] min-w-[50px] text-center border-x border-[#e0e0e0]">{Math.round(zoom * 100)}%</div>
          <button onClick={() => handleZoom(0.1)} className="p-2 hover:bg-[#e0e0e0] text-[#161616] transition-colors"><Plus size={16} /></button>
        </div>
      </div>
    </motion.section>
  );
}
