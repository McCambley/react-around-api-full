const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    }
    if (response.status === 400) {
      throw new Error(
        'One of the fields was filled in incorrectly or a user with that email already exists'
      );
    }
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error('One or more of the fields were not provided');
      }
      if (response.status === 401) {
        throw new Error('The user with the specified email not found ');
      }
    })
    .then((res) => {
      localStorage.setItem('token', res.token);
      return res;
    });
};

export const validateUser = () => {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }
    if (response.status === 400) {
      throw new Error('Token not provided or provided in the wrong format');
    }
    if (response.status === 401) {
      throw new Error('The provided token is invalid ');
    }
  });
};
