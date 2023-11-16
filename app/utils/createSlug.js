export const createSlug = (inputString) => {
    return inputString.replace(/\s+/g, "-").toLowerCase();
};