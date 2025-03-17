export default {
  BASE_URL: "http://127.0.0.1:5000",
  
  get token() {
    return localStorage.getItem("auth_token");
  },

  set token(value) {
    localStorage.setItem("auth_token", value);
  },

  // Métodos de autenticación y perfil

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

  async updateProfile(userData) {
    console.log(JSON.stringify(userData));
    let response = await fetch(this.BASE_URL + "/currentUser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("No se pudo actualizar el perfil");
    }

    const updatedProfile = await response.json();
    return updatedProfile;
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

  // Nuevas funcionalidades añadidas para gestionar citas

  async getAllCitas() {
    let response = await fetch(`${this.BASE_URL}/dates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    });

    if (!response.ok) throw new Error("Error al obtener las citas");
    return await response.json();
  },

  async getCitasByName() {
    let response = await fetch(`${this.BASE_URL}/date/getByUser`, {
      method: "GET",
      headers: {   
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    });

    if (!response.ok) throw new Error("Error al obtener las citas del usuario");
    return await response.json();
  },

  async getCitasPorDia(fecha) {
    let response = await fetch(`${this.BASE_URL}/date/getByDay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: JSON.stringify({ day: fecha }), // Cambié 'fecha' a 'day' para que coincida con el parámetro de la API
    });

    if (!response.ok) throw new Error("Error al obtener citas por día");
    return await response.json();
  },

  async crearCita(data) {
    let response = await fetch(`${this.BASE_URL}/date/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        center: data.center,  // Cambié 'data' para que coincida con los parámetros de la API
        date: data.date,
      }),
    });

    if (!response.ok) throw new Error("Error al crear la cita");
    return await response.json();
  },

  async cancelarCita(data) {
    let response = await fetch(`${this.BASE_URL}/date/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        center: data.center,  // Cambié 'data' para que coincida con los parámetros de la API
        date: data.date,
      }),
    });

    if (!response.ok) throw new Error("Error al cancelar la cita");
    return await response.json();
  },
};
