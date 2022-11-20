import { UserInput } from "../schemas/UserInput";

export const validateRegister = (options: UserInput) => {
    if (options.name.length <= 2) {
        return [
            {
                field: "name",
                message: "length must be greater than 2",
            },
        ];
    }
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }
    if (options.phone.length <= 9) {
        return [
            {
                field: "phone",
                message: "length must be greater than 10",
            },
        ];
    }

    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "length must be greater than 2",
            },
        ];
    }

    return null;
};
