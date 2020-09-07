import { Platform } from '../settings/settings.model'

export interface Contact {
    id: string,
    name: string,
    social: Platform[]
}
