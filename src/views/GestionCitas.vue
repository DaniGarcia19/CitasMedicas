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
                {{ cita.fecha }} - {{ cita.hora }} - {{ cita.usuario }}
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
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Usuario</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cita in citas" :key="cita.id">
                <td>{{ cita.id }}</td>
                <td>{{ cita.fecha }}</td>
                <td>{{ cita.hora }}</td>
                <td>{{ cita.usuario }}</td>
                </tr>
            </tbody>
            </table>
            <p v-else>No hay citas registradas.</p>
        </div>
        </div>
    </template>
    
    <script>
    import apiServices from "@/apiservices";
    import "@/assets/GestionCitaStyles.scss";
    
    export default {
        data() {
        return {
            citas: [],
            nuevaCita: {
            fecha: "",
            hora: "",
            center: "" // Cambié "usuario" por "center" para seguir la API
            }
        };
        },
        methods: {
        async cargarCitas() {
            try {
            this.citas = await apiServices.getCitas();
            } catch (error) {
            console.error("Error al cargar citas:", error);
            }
        },
        async cancelarCita(cita) { // Cambié "id" por "cita", ya que ahora necesitamos "center" y "date"
            try {
            const citaCancelada = await apiServices.cancelarCita({
                center: cita.center,
                date: `${cita.fecha} ${cita.hora}`
            });
            // Filtramos la cita cancelada
            this.citas = this.citas.filter(c => c.id !== cita.id);
            } catch (error) {
            console.error("Error al cancelar la cita:", error);
            }
        },
        async crearCita() {
            try {
            const nuevaCitaData = {
                center: this.nuevaCita.center,
                date: `${this.nuevaCita.fecha} ${this.nuevaCita.hora}` // Concatenamos la fecha y hora
            };
            const nueva = await apiServices.crearCita(nuevaCitaData);
            this.citas.push(nueva);
            this.nuevaCita = { fecha: "", hora: "", center: "" };
            } catch (error) {
            console.error("Error al crear cita:", error);
            }
        }
        },
        mounted() {
        this.cargarCitas();
        }
    };
    </script>
    