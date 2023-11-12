interface getRequestProps {
  url: string;
  options?: NextFetchRequestConfig;
}

export const getRequest = async ({ url, options }: getRequestProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(BASE_URL + url, {
      method: "GET",
      ...options,
    });

    const data = await response.json();
    return data;
  } catch (err: unknown) {
    console.log(err);
  }
};
