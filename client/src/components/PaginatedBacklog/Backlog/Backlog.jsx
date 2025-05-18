import React from 'react'
import { Pagination} from  '../../Pagination/Pagination';

function Backlog() {
  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <StudentList students={students} />
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={handlePageChanged}
      />
    </>
  );
}

export default Backlog
