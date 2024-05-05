import { Store } from "@tanstack/store";

export const UserStore = new Store({
    isLoggedIn: false,
    userData: {},
});
