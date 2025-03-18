<template>
  <div class="main-page">
    <div class="user-info">
      <h2>Bienvenido, {{ user.name }}</h2>
    </div>

    <div class="cards-container">
      <div class="card-row">
        <div class="card">
          <div class="card-header">
            <img src="@/assets/icons/location.png" alt="Ubicación" class="card-icon" />
            <h3>Consultar Centros Médicos</h3>
          </div>
          <p>Accede a los centros médicos cercanos para recibir atención.</p>
          <button @click="consultCenters">Ir</button>
        </div>

        <div class="card">
          <div class="card-header">
            <img src="@/assets/icons/user.png" alt="Usuario" class="card-icon" />
            <h3>Mis Datos</h3>
          </div>
          <p>Visualiza y edita la información de tu cuenta.</p>
          <button @click="viewData">Ver Mis Datos</button>
        </div>
      </div>

      <div class="card-row">
        <div class="card">
          <div class="card-header">
            <img src="@/assets/icons/calendar.png" alt="Calendario" class="card-icon" />
            <h3>Gestionar Citas Médicas</h3>
          </div>
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
import apiservices from "@/apiservices";

const router = useRouter();

const user = ref({
  name: "",
});

const fetchUserProfile = async () => {
  try {
    const profileData = await apiservices.getProfile();
    user.value = profileData;
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
  }
};

onMounted(() => {
  fetchUserProfile();
});

const viewData = () => {
  router.push("/datos");
};

const consultCenters = () => {
  router.push("/centros");
};

const manageAppointments = () => {
  router.push("/citas");
};

const consultDiseases = () => {
  console.log("Consultando información sobre enfermedades...");
};

const moreInfo = () => {
  console.log("Más información...");
};
</script>
