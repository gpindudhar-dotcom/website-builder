import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ComponentRenderer from './ComponentRenderer';
import { canvasTheme } from '../styles/canvasTheme';

function Canvas({ components, selectedIndex, setSelectedIndex, handleDragEnd, onDelete, onDuplicate, viewMode, viewModeStyles }) {
  return (
    <div style={{ flex: 1, padding: '24px', background: 'transparent' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto 18px', padding: '18px 22px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.64)', border: `1px solid ${canvasTheme.border}`, boxShadow: '0 18px 50px rgba(2, 6, 23, 0.28)', backdropFilter: 'blur(18px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: '0 0 6px', color: canvasTheme.textPrimary, fontSize: '24px', fontWeight: 800 }}>Website Canvas</h2>
            <p style={{ margin: 0, color: canvasTheme.textSecondary, fontSize: '14px' }}>Arrange sections and refine a polished layout.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ padding: '8px 12px', borderRadius: '999px', background: 'rgba(129, 140, 248, 0.16)', color: '#dbeafe', fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700 }}>{viewMode} preview</span>
            <span style={{ padding: '8px 12px', borderRadius: '999px', background: 'rgba(56, 189, 248, 0.16)', color: '#bae6fd', fontSize: '12px', fontWeight: 700 }}>{components.length} sections</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <div style={{ border: `1px solid ${canvasTheme.border}`, borderRadius: '28px', padding: '18px', background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.9))', boxShadow: canvasTheme.shadow, ...viewModeStyles }}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="canvas-droppable">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {components.map((item, index) => (
                      <Draggable key={`${item.type}-${index}`} draggableId={`${item.type}-${index}`} index={index}>
                        {(dragProvided) => (
                          <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                            <ComponentRenderer
                              component={item}
                              index={index}
                              selectedIndex={selectedIndex}
                              setSelectedIndex={setSelectedIndex}
                              onDelete={onDelete}
                              onDuplicate={onDuplicate}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;