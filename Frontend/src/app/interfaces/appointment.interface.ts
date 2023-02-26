export  interface Appointment {
    _id: string,
    id_paciente: string,
    numero: string,
    servicio: string,
    id_servicio: Date,
    start: Date,
    allDay: boolean,
    __v:number,
}
