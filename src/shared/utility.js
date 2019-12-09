export const checkValidity = (value, rules) => {
    if (rules && rules.required) {
        return value.trim() !== '';
    }else return true;
};