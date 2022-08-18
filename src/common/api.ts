export async function get(url: string) {
  return fetch(url);
}

export async function post(url: string, data: any) {
  console.log(data);

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
}
