import React from "react";

export function TaskSearchBar({ value, onChange, placeholder = "Search tasks by name..." }) {
  return (
    <input
      className="input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ maxWidth: 300 }}
    />
  );
}