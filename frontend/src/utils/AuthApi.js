class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  postRegister(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      }),
    }).then(this._checkResponse);
  }

  postLogin(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      }),
    }).then(this._checkResponse);
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${jwt}`
      }
    }).then(this._checkResponse);
  }
}

const apiAuth = new Api({
  baseUrl: "https://api.mesto.skoroxod.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAuth;
