type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const serverURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function fetchData<T>(url: string, method: HttpMethod, postData?: any): Promise<any> {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(serverURL + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Token ${sessionStorage.getItem('token')}` : '',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      return response.json();
    } else {
      switch (response.status) {
        case 400:
          throw { message: 'Credential is incorrect' };
        default:
          throw { message: 'Server Error' };
      }
    }
  } catch (err) {
    throw err;
  }
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export const login = (loginFormValues: LoginFormValues) =>
  fetchData<LoginFormValues>('/auth/login/', 'POST', loginFormValues);

export interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

export const signup = (signupFormValues: SignupFormValues) =>
  fetchData<LoginFormValues>('/auth/signup/', 'POST', signupFormValues);

export const getCurrentUser = () => fetchData('/auth/currentuser', 'GET');

export interface ChartQuery {
  view_type: string;
  from: string;
  to: string;
}
export const getChartData = (query: ChartQuery) =>
  fetchData(`/api/chart?view_type=${query.view_type}&from=${query.from}&to=${query.to}`, 'GET');

export const importCSVFromFile = () => fetchData('/api/chart/', 'POST');
