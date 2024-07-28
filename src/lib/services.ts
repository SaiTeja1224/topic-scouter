import { API_URL_V1, REQUEST_CONFIG } from "./constant";

export const getTopics = async (options?: Record<string, string>) => {
  const params = new URLSearchParams(options);
  const searchParams = params.toString();
  const getTopicsUrl = API_URL_V1 + `topics?${searchParams}`;
  const response = await fetch(getTopicsUrl, {
    method: "GET",
    ...REQUEST_CONFIG,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data?.data;
};

export const getTopicById = async (topicId: string) => {
  const getTopicUrl = API_URL_V1 + `topics/${topicId}/ratings/`;
  const response = await fetch(getTopicUrl, {
    method: "GET",
    ...REQUEST_CONFIG,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data?.data;
};

export const addRatingToTopic = async (
  topicId: string,
  body: { rating: number }
) => {
  const response = await fetch(API_URL_V1 + `topics/${topicId}/ratings/`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...REQUEST_CONFIG,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data?.data;
};

export const login = async (body: { username: string; password: string }) => {
  const response = await fetch(API_URL_V1 + `users/login`, {
    method: "POST",
    body: JSON.stringify(body),
    ...REQUEST_CONFIG,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data?.data;
};
export const signUp = async (body: { username: string; password: string }) => {
  const response = await fetch(API_URL_V1 + `users/sign_up`, {
    method: "POST",
    body: JSON.stringify(body),
    ...REQUEST_CONFIG,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data?.data;
};
export const verify = async () => {
  const response = await fetch(API_URL_V1 + `users/verify`, {
    method: "GET",
    ...REQUEST_CONFIG,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data?.data;
};

export const logout = async () => {
  const response = await fetch(API_URL_V1 + `users/logout`, {
    method: "GET",
    ...REQUEST_CONFIG,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data?.data;
};
