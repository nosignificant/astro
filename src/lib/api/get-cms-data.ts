export async function getCmsData<T>(url: string): Promise<T | T[]> {
  const res = await fetch(`https://kmuvcd-strapi.onrender.com/api/${url}`, { cache: 'force-cache' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const json = await res.json();
  return json.data;
}