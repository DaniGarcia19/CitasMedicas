<template>
    <div class="citas-container">
        <h1>Gestión de Citas</h1>
        
        <div class="gestion-citas">
            <div class="crear-cita">
                <h2>Crear Cita</h2>
                <form @submit.prevent="crearCita">
                    <!-- Establecer la fecha mínima a la fecha actual -->
                    <input v-model="nuevaCita.fecha" type="date" :min="fechaMinima" required />

                    <select v-model="nuevaCita.hora" required>
                        <option value="" disabled>Selecciona una hora</option>
                        <option v-for="hora in horasDisponibles" :key="hora" :value="hora">
                            {{ hora }}
                        </option>
                    </select>

                    <select v-model="nuevaCita.center" required>
                        <option value="" disabled>Selecciona un centro</option>
                        <option v-for="centro in centros" :key="centro.id" :value="centro.name">
                            {{ centro.name }}
                        </option>
                    </select>

                    <button type="submit">Agregar Cita</button>
                </form>
            </div>

            <div class="cancelar-cita">
                <h2>Cancelar Citas</h2>
                <ul v-if="citasUsuario.length">
                    <li v-for="cita in citasUsuario" :key="cita.id">
                        {{ formatearFecha(cita.date) }} - {{ cita.center }}
                        <button class="delete-btn" @click="cancelarCita(cita)">Cancelar</button>
                    </li>
                </ul>
                <p v-else>No tienes citas disponibles para cancelar.</p>
            </div>
        </div>

        <div class="ver-citas">
            <h2>Todas las Citas</h2>
            <table v-if="citas.length">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Centro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cita in citas" :key="cita.id">
                        <td>{{ formatearFecha(cita.date) }}</td>
                        <td>{{ cita.center }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else>No hay citas registradas.</p>
        </div>

        <div class="back-button-container" style="margin-top: 30px;">
            <RouterLink to="/principal">
                <BotonGoBack class="go-back-button" />
            </RouterLink>
        </div>
    </div>
</template>

<script>
import apiServices from "@/apiservices";
import BotonGoBack from "@/components/BotonBack2.vue"; 
import Swal from "sweetalert2";

export default {
    components: {
        BotonGoBack,  
    },
    data() {
        return {
            citas: [],  
            citasUsuario: [], 
            centros: [], 
            nuevaCita: {
                fecha: "",
                hora: "",
                center: "",
            },
            horasDisponibles: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
        };
    },
    computed: {
        // Computed property para obtener la fecha mínima (hoy) en formato YYYY-MM-DD
        fechaMinima() {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
            const day = fecha.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`; // Devuelve la fecha en formato YYYY-MM-DD
        }
    },
    methods: {
        formatearFecha(fecha) {
            if (!fecha) return "";
            const partes = fecha.split(" ");
            if (partes.length < 2) return "";
            const fechaPartes = partes[0].split("/");
            if (fechaPartes.length !== 3) return "";
            return `${fechaPartes[0]}/${fechaPartes[1]}/${fechaPartes[2]}`;
        },

        formatPostFecha(fecha, hora) {
            if (!fecha || !hora) return "";
            const partesFecha = fecha.split("-");
            return `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]} ${hora}:00`;
        },

        async cargarCitas() {
            try {
                this.citas = await apiServices.getAllCitas();
            } catch (error) {
                console.error("Error al cargar todas las citas:", error);
            }
        },

        async cargarCitasUsuario() {
            try {
                this.citasUsuario = await apiServices.getCitasByName();
            } catch (error) {
                console.error("Error al cargar citas del usuario:", error);
            }
        },

        async cargarCentros() {
            try {
                this.centros = await apiServices.getCenters();
            } catch (error) {
                console.error("Error al cargar centros:", error);
            }
        },

        async crearCita() {
            try {
                const fechaFormateada = this.formatPostFecha(this.nuevaCita.fecha, this.nuevaCita.hora);
                const nuevaCitaData = {
                    center: this.nuevaCita.center,
                    date: fechaFormateada,
                };

                console.log("Enviando cita:", nuevaCitaData);

                const respuesta = await apiServices.crearCita(nuevaCitaData);

                console.log("Respuesta del servidor:", respuesta);

                const status = respuesta?.status || respuesta?.data?.status || (respuesta ? 200 : 400); 

                console.log("Status recibido:", status);

                if (status === 200 || status === 201) {
                    this.nuevaCita = { fecha: "", hora: "", center: "" };
                    await this.cargarCitas();
                    await this.cargarCitasUsuario();

                    await Swal.fire({
                        title: "Cita Creada",
                        text: "Tu cita ha sido creada exitosamente.",
                        icon: "success",
                        confirmButtonText: "Aceptar"
                    });

                    location.reload();
                } else {
                    await Swal.fire({
                        title: "Error",
                        text: "No se pudo crear la cita, intenta de nuevo.",
                        icon: "error",
                        confirmButtonText: "Aceptar"
                    });
                }
            } catch (error) {
                console.error("Error al crear cita:", error.response || error);

                await Swal.fire({
                    title: "Error",
                    text: "No se pudo crear la cita, intenta de nuevo.",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
            }
        },

        async cancelarCita(cita) {
            try {
                if (!cita.date) {
                    console.error("Error: La cita no tiene una fecha válida.");
                    return;
                }

                const confirmacion = await Swal.fire({
                    title: "¿Estás seguro?",
                    text: "Esta acción cancelará tu cita y no podrá recuperarse.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Sí, cancelar cita",
                    cancelButtonText: "No, mantenerla"
                });

                if (!confirmacion.isConfirmed) {
                    return;
                }

                const citaData = {
                    center: cita.center,
                    date: cita.date,
                };

                const respuesta = await apiServices.cancelarCita(citaData);

                if (respuesta.status === 200 || respuesta.status === 201) {
                    this.citasUsuario = this.citasUsuario.filter(c => c.id !== cita.id);

                    await Swal.fire({
                        title: "Cita Cancelada",
                        text: "Tu cita ha sido cancelada correctamente.",
                        icon: "success",
                        confirmButtonText: "Aceptar"
                    });

                    location.reload();
                } else {
                    await Swal.fire({
                        title: "Error",
                        text: "No se pudo cancelar la cita, intenta de nuevo.",
                        icon: "error",
                        confirmButtonText: "Aceptar"
                    });
                }
            } catch (error) {
                console.error("Error al cancelar cita:", error);
                await Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error inesperado al cancelar la cita.",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
            }
        }
    },
    async mounted() {
        await this.cargarCitas();
        await this.cargarCitasUsuario();
        await this.cargarCentros();
    },
};
</script>
