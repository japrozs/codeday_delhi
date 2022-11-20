export const truncate = (str: string): string => {
    if (str.length < 30) {
        return str;
    } else {
        return str.substring(0, 30) + "...";
    }
};
