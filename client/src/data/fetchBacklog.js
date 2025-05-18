const API_TOKEN =
  "acf2a31a3830bbb30df76608159377a95bf3ed7dd1d0309cc08f1b1e8c1e9d02f1f79db8fe6d3f77ec21f7a204d248ec0c917a500463f4e118531368a516441938fe4596b0e84bab0c899188f56d15c08c7b99049685ac68707c2e505471a74e26060965274794ae4ee629d69f8c1b7dbebe685938fc33c8f5a6a84750190a55";

const API_URL = "http://localhost:1337/api";

export async function fetchStudents(page, pageSize) {
  const result = await fetch(
    `${API_URL}/todos?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  const data = await result.json();
  return data;
}

console.log( fetchStudents(1, 10));