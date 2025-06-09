import { useEffect, useState } from "react";
import { fetchBacklog } from "../../data/fetchBacklog";
import { Backlog } from "./Backlog/Backlog";
import { Pagination } from "./Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export function PaginatedBacklog( {projectId}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);
  const [backlog, setBacklog] = useState([]);

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePageSizeChanged(size) {
    setPageSize(size);
  }

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["backlog", { currentPage, pageSize, projectId }],
    queryFn: () => fetchBacklog(currentPage, pageSize, projectId),
    enabled: !!projectId, // only run if projectId is available
  });

  useEffect(() => {
    if (data) {
      if (currentPage > data.meta.pagination.pageCount) {
        setCurrentPage(data.meta.pagination.pageCount);
      }
      setBacklog(data.data);
      setPageCount(data.meta.pagination.pageCount);
    }
  }, [data, currentPage]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <Backlog backlog={backlog} />
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChanged={handlePageChanged}
        onPageSizeChanged={handlePageSizeChanged}
      />
    </>
  );
}
