import { PaginatedBacklog } from "./paginatedbacklog/backlog-list";

export function Backlog({ backlog }) {
  return (
    <div>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Backlog</th>
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
