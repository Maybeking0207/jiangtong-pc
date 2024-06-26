const BaseUrl = 'https://autoreport.site:8888/api/collections'

export async function GetList(url) {
  try {
    const response = await fetch(BaseUrl + url)
    console.log(response)
    return await response.json()
  }
  catch (err) {
  }
}

export async function PostMessage(url, params) {
  const response = await fetch(BaseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  const { data } = await response.json()
  return data
}
