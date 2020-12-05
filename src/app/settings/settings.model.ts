export interface Platform {
    platform: string,
    value: string
}
export interface Settings {
    name: string,
    token: string,
    social: Platform[],
    phone: string,
    description: string,
    email: string,
}
