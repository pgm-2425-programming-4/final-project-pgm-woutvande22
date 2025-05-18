export function Backlog({ backlog }) {
  return (
    <ul>
      {backlog.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
