export const url = 'http://localhost:8000/';


// Ici nous avons les fonctions de base pour les requêtes HTTP (GET, POST, PUT, DELETE)
export async function get(authenURL: string): Promise<Response | void> {
  try {
    return await fetch(url + authenURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function remove(authenURL: string): Promise<void> {
  try {
    await fetch(url + authenURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function post(
  authenURL: string,
  body: unknown
): Promise<Response | void> {
  try {
    return await fetch(url + authenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function put(authenURL: string, body: unknown): Promise<void> {
  try {
    await fetch(url + authenURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
}
