import React from "react";

export function TagDropdown({ tags, value, onChange, placeholder = "All tags" }) {
  return (
    <select
      className="input"
      style={{ maxWidth: 300 }}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {tags.map(tag => (
        <option key={tag.id} value={tag.id}>
          {tag.title || tag.name}
        </option>
      ))}
    </select>
  );
}