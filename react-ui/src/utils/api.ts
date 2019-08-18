export async function callApi(method: string, url: string, path: string, data?: any) {
  console.log(path)
  const res = await fetch(url + '/api' + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await res.json()
}
