<template>
    <div class="main-page">
      <div class="user-info">
        <h2>Bienvenido, {{ user.name }}</h2>
      </div>
  
      <div class="carousel">
        <Splide :options="carouselOptions" aria-label="Background Carousel">
          <SplideSlide>
            <img
              src="https://atencionprimaria.almirallmed.es/wp-content/uploads/sites/12/2020/07/imagenesblog_varios_5-min.jpg"
              alt="Carrusel 1"
            />
          </SplideSlide>
          <SplideSlide>
            <img
              src="https://atencionprimaria.almirallmed.es/wp-content/uploads/sites/12/2020/07/imagenesblog_varios_5-min.jpg"
              alt="Carrusel 2"
            />
          </SplideSlide>
          <SplideSlide>
            <img
              src="https://atencionprimaria.almirallmed.es/wp-content/uploads/sites/12/2020/07/imagenesblog_varios_5-min.jpg"
              alt="Carrusel 3"
            />
          </SplideSlide>
        </Splide>
      </div>
  
      <div class="cards-container">
        <div class="card-row">
          <div class="card">
            <h3>Consultar Centros Médicos</h3>
            <p>Accede a los centros médicos cercanos para recibir atención.</p>
            <button @click="consultCenters">Ir</button>
          </div>
          <div class="card">
            <h3>Mis Datos</h3>
            <p>Visualiza y edita la información de tu cuenta.</p>
            <button @click="viewData">Ver Mis Datos</button>
          </div>
        </div>
  
        <div class="card-row">
          <div class="card">
            <h3>Gestionar Citas Médicas</h3>
            <p>Consulta, reserva o cancela tus citas médicas.</p>
            <button @click="manageAppointments">Gestionar Citas</button>
          </div>
        </div>
  
        <div class="additional-buttons">
          <button @click="consultDiseases">Consultar Enfermedades</button>
          <button @click="moreInfo">Más Información</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { Splide, SplideSlide } from "@splidejs/vue-splide";
  import "@splidejs/splide/dist/css/splide.min.css";
  import apiservices from "@/apiservices";
  
  const router = useRouter();
  
  const carouselOptions = {
    type: "fade",
    rewind: true,
    autoplay: true,
    interval: 2900,
    arrows: false,
    pagination: false,
  };
  
  const user = ref({
    name: "", // Esta propiedad se llenará con los datos del perfil
  });
  
  // Consultar perfil
  const fetchUserProfile = async () => {
    try {
      const profileData = await apiservices.getProfile();
      user.value = profileData;
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
    }
  };
  
  // Llamar a la API para obtener el perfil al montar el componente
  onMounted(() => {
    fetchUserProfile();
  });
  
  // Función de redirección
  const viewData = () => {
    router.push("/datos");
  };
  
  const consultCenters = () => {
    router.push("/centros")
  };
  
  const manageAppointments = () => {
    router.push("/citas")
  };
  
  const consultDiseases = () => {
    console.log("Consultando información sobre enfermedades...");
  };
  
  const moreInfo = () => {
    console.log("Más información...");
  };
  </script>
  