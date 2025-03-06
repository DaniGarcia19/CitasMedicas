export default {
  BASE_URL: "http://127.0.0.1:5000",
  token: "",

  async login(usuario, pass) {
    let response = await fetch(this.BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario,
        password: pass,
      }),
    });

    let data = await response.json();

    if (data.access_token) {
      this.token = data.access_token;
    }

    return data;
  },

  async register(userData) {
    let response = await fetch(this.BASE_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await response.json();
  },

  async getProfile() {
    let response = await fetch(this.BASE_URL + "/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el perfil");
    }

    const profileData = await response.json();
    return profileData;
  },

  async getCenters() {
    let response = await fetch(this.BASE_URL + "/centers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de centros");
    }

    const centersData = await response.json();
    return centersData;
  },
};
