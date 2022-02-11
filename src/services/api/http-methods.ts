import { stringify } from "qs";

import {
  getAuthenticationToken,
  unsetAuthenticationToken,
} from "@/services/token";

const DOMAIN = "http://localhost:3000"; // TODO: Make it configurable

function hasJsonContent(response: Response) {
  const contentType = response.headers.get("Content-Type");
  return contentType ? /^application\/json/i.test(contentType) : false;
}

const formatURL = (
  domain: string,
  path: string,
  qs?: Record<string, unknown>
) => {
  if (!qs || Object.keys(qs).length === 0) return `${domain}${path}`;
  else return `${domain}${path}?${stringify(qs)}`;
};

const request = async (request: Request): Promise<any> => {
  const token = getAuthenticationToken();

  if (token) request.headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(request);

  if (!response.ok) {
    if (response.status === 403) {
      unsetAuthenticationToken();
    }
    throw response.body && hasJsonContent(response)
      ? await response.json()
      : await response.text();
  }

  return response.body && hasJsonContent(response)
    ? response.json()
    : undefined;
};

export const get = async (
  path: string,
  qs?: Record<string, unknown>
): Promise<any> =>
  request(
    new Request(formatURL(DOMAIN, path, qs), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const post = (
  path: string,
  body?: Record<string, unknown>
): Promise<any> =>
  request(
    new Request(formatURL(DOMAIN, path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  );

export const put = (
  path: string,
  body?: Record<string, unknown>
): Promise<any> =>
  request(
    new Request(formatURL(DOMAIN, path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  );

export const del = async (
  path: string,
  qs?: Record<string, unknown>
): Promise<any> =>
  request(
    new Request(formatURL(DOMAIN, path, qs), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
