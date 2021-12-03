import qs from "qs";

interface Options {
  method: string;
  path: string;
  querystring?: Record<string, unknown>;
  body?: Record<string, unknown>;
}

function hasJsonContent(response: Response) {
  const contentType = response.headers.get("Content-Type");
  return contentType ? /^application\/json/i.test(contentType) : false;
}

async function call({ method, path, querystring, body }: Options) {
  let url = process.env.BACK_URL + path;
  if (querystring) url = url + "?" + qs.stringify(querystring);

  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.body && hasJsonContent(response)
    ? response.json()
    : undefined;
}

export const get = (path: string, querystring?: Record<string, unknown>) =>
  call({ method: "GET", path, querystring });

export const post = (path: string, body?: Record<string, unknown>) =>
  call({ method: "POST", path, body });

export const put = (path: string, body?: Record<string, unknown>) =>
  call({ method: "PUT", path, body });

export const del = (path: string, querystring?: Record<string, unknown>) =>
  call({ method: "DELETE", path, querystring });
