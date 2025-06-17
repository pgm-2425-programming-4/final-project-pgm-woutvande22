import React from "react";

export function TagDropdown({
  tags,
  value,
  onChange,
  multiple = false,
  placeholder = "All tags",
}) {
  const handleChange = (e) => {
    if (multiple) {
      const selected = Array.from(
        e.target.selectedOptions,
        (option) => option.value,
      );
      onChange(selected);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <select
      className="select"
      style={{ maxWidth: 300 }}
      value={multiple ? value || [] : value || ""}
      onChange={handleChange}
      multiple={multiple}
    >
      {!multiple && <option value="">{placeholder}</option>}
      {tags.map((tag) => (
        <option key={tag.id} value={tag.id}>
          {tag.title || tag.name}
        </option>
      ))}
    </select>
  );
}
