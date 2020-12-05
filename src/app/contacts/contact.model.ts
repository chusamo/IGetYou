import { Platform } from '../settings/settings.model'

export interface Contact {
    id: string,
    name: string,
    social: Platform[]
    phone: string,
    email: string,
    description: string,
}
