import { stringify } from "qs";

import { getAuthenticationToken, unsetAuthenticationToken } from "@/api/token";

const domain = "http://localhost:3000"; // TODO: Make it configurable

const request = async (request: Request): Promise<any> => {
  const token = getAuthenticationToken();

  if (token) request.headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(request);

  if (!response.ok) {
    if (response.status === 403) {
      unsetAuthenticationToken();
    }
    throw new Error(await response.text());
  }

  if (
    response.body &&
    response.headers.get("Content-Type") === "application/json; charset=utf-8"
  ) {
    return response.json();
  } else {
    return undefined;
  }
};

const formatURL = (
  domain: string,
  path: string,
  qs?: Record<string, unknown>
) => {
  if (!qs || Object.keys(qs).length === 0) return `${domain}${path}`;
  else return `${domain}${path}?${stringify(qs)}`;
};

export const get = async (
  path: string,
  qs?: Record<string, unknown>
): Promise<any> =>
  request(
    new Request(formatURL(domain, path, qs), {
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
    new Request(formatURL(domain, path), {
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
    new Request(formatURL(domain, path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  );
