export function Backlog({ backlog, total }) {
  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        
      </div>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th><strong>Backlog tasks: {total}</strong></th>
          </tr>
        </thead>
        <tbody>
          {backlog.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
