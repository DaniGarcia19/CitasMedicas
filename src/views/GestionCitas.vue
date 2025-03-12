<template>
    <div class="citas-container">
        <h1>Gestión de Citas</h1>

        <div class="gestion-citas">
            <div class="crear-cita">
                <h2>Crear Cita</h2>
                <form @submit.prevent="crearCita">
                    <input v-model="nuevaCita.fecha" type="date" required />
                    <input v-model="nuevaCita.hora" type="time" required />
                    <input v-model="nuevaCita.center" type="text" placeholder="Centro de Salud" required />
                    <button type="submit">Agregar Cita</button>
                </form>
            </div>

            <div class="cancelar-cita">
                <h2>Cancelar Citas</h2>
                <ul v-if="citas.length">
                    <li v-for="cita in citas" :key="cita.id">
                        {{ formatearFecha(cita.date) }} - {{ cita.center }}
                        <button class="delete-btn" @click="cancelarCita(cita)">Cancelar</button>
                    </li>
                </ul>
                <p v-else>No hay citas disponibles para cancelar.</p>
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
    </div>
</template>

<script>
import apiServices from "@/apiservices";

export default {
    data() {
        return {
            citas: [],
            nuevaCita: {
                fecha: "",
                hora: "",
                center: ""
            }
        };
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
            const partesHora = hora.split(":");

            return `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]} ${partesHora[0]}:${partesHora[1]}:00`;
        },

        async cargarCitas() {
            try {
                this.citas = await apiServices.getCitas();
            } catch (error) {
                console.error("Error al cargar citas:", error);
            }
        },

        async crearCita() {
            try {
                const fechaFormateada = this.formatPostFecha(this.nuevaCita.fecha, this.nuevaCita.hora);
                const nuevaCitaData = {
                    center: this.nuevaCita.center,
                    date: fechaFormateada
                };

                const respuesta = await apiServices.crearCita(nuevaCitaData);

                if (respuesta.status === 200 || respuesta.status === 201) {
                    this.nuevaCita = { fecha: "", hora: "", center: "" };
                    await this.cargarCitas();
                }
            } catch (error) {
                console.error("Error al crear cita:", error);
            }
        },

        async cancelarCita(cita) {
            try {
                const fechaFormateada = this.formatPostFecha(cita.date, cita.time);
                const citaData = {
                    center: cita.center,
                    date: fechaFormateada
                };

                const respuesta = await apiServices.cancelarCita(citaData);
                if (respuesta.status === 200 || respuesta.status === 201) {
                    this.citas = this.citas.filter(c => c.id !== cita.id);
                } else {
                    alert("Error al cancelar la cita.");
                }
            } catch (error) {
                console.error("Error al cancelar cita:", error);
            }
        }
    },
    mounted() {
        this.cargarCitas();
    }
};
</script>
