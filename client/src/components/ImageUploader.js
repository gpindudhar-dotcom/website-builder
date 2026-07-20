import { useState } from "react";

export default function ImageUploader({ currentSrc, onChange }) {
  const [image, setImage] = useState(currentSrc || null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImage(preview);
    onChange?.(preview);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <input type="file" accept="image/*" onChange={handleChange} />
      <input
        type="text"
        value={image || ""}
        onChange={(event) => {
          setImage(event.target.value);
          onChange?.(event.target.value);
        }}
        placeholder="Paste an image URL"
        style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid #d1d5db" }}
      />

      {image && (
        <img
          src={image}
          alt="preview"
          style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 12, marginTop: 4 }}
        />
      )}
    </div>
  );
}