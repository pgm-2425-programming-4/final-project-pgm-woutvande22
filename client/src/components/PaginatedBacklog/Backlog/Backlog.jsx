export function Backlog({ backlog }) {
  return (
    <div>
      <ul>
        {backlog.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
