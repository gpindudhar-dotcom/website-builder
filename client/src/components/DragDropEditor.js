import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function DragDropEditor() {
  const items = [
    { id: "1", text: "Heading" },
    { id: "2", text: "Paragraph" },
    { id: "3", text: "Image" }
  ];

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="editor">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: "300px",
              border: "2px dashed gray",
              padding: "20px"
            }}
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: "15px",
                      marginBottom: "10px",
                      background: "#f2f2f2",
                      ...provided.draggableProps.style
                    }}
                  >
                    {item.text}
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDropEditor;