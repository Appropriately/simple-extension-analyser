/**
 * Update the data-bs-theme attribute on the html element based on the user's preference.
 */
export const updateTheme = () => {
    const htmlElement = document.querySelector("html");

    if (htmlElement) {
        htmlElement.setAttribute(
            "data-bs-theme",
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
        );
    }
};