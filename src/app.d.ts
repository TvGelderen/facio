// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { User, Session } from "lucia";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: User | null;
            session: Session | null;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { };
