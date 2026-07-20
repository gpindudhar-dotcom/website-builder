function ComponentPanel({ addComponent }) {
  return (
    <div>
      <button onClick={() => addComponent("heading")}>Heading</button>
      <button onClick={() => addComponent("text")}>Paragraph</button>
      <button onClick={() => addComponent("image")}>Image</button>
      <button onClick={() => addComponent("button")}>Button</button>
    </div>
  );
}

export default ComponentPanel;