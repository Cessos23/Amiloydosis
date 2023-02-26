export  interface Patient {
    _id: string,
    name: string,
    lastname: string,
    phone_number: string,
    birthday: Date,
    allergies: string,
    weight: number,
    size: number,
    temperature: number,
    heart_rate: number,
    breathing_frequency: number,
    blood_pressure: number,
    oxygen_saturation: number
}