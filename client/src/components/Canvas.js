import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ComponentRenderer from './ComponentRenderer';

function Canvas({ components, selectedIndex, setSelectedIndex, handleDragEnd, onDelete, onDuplicate, viewMode, viewModeStyles }) {
  return (
    <div style={{ flex: 1, padding: '24px', background: '#f8fafc' }}>
      <h2 style={{ marginTop: 0 }}>Website Canvas</h2>
      <p style={{ color: '#6b7280', marginBottom: '16px' }}>Arrange sections and refine a polished layout.</p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '20px', padding: '18px', background: '#ffffff', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)', ...viewModeStyles }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.24em', color: '#64748b' }}>{viewMode} preview</span>
              <span style={{ fontSize: '12px', color: '#2563eb' }}>{components.length} sections</span>
            </div>
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