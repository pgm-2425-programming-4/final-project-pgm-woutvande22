const API_TOKEN =
  "bea917a913aabd2560a3b3f9e832d02f4bda7551661c7cf7d59d241656dc6c0ed33ad488240ed7121fdfed0e258ca864034ea2661f698c264b5eb1f0d719f433df39a2e9cad96c144d875ed34f0525768ead2e2cc5014daf0e555629832604bea4217abbd13f9d469f1aba7fef9876fc9ba224217aa8c852e661c01b99173eef";

const API_URL = "http://localhost:1337/api";

export async function fetchBacklog(page, pageSize) {
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
