export const url = 'http://localhost:8000/';
//export const url = 'https://restauration-api--mds.herokuapp.com/';

export async function get(authenURL: string): Promise<Response> {
  return fetch(url + authenURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function remove(authenURL: string): Promise<void> {
  await fetch(url + authenURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function post(
  authenURL: string,
  body: unknown
): Promise<Response> {
  const res = await fetch(url + authenURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res;
}

export async function put(authenURL: string, body: unknown): Promise<void> {
  await fetch(url + authenURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
