import { computed, signal } from "@preact/signals-react";

function appState() {
    const theme = signal("light")
    const changeTheme = computed(() => {
        return theme.value === "light" ? theme.value = "dark" : theme.value = "light"
    })

    return { theme, changeTheme }
}

export default appState;