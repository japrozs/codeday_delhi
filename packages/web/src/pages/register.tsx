import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Spinner } from "../components/shared/Spinner";
import { InputField } from "../components/ui/InputField";
import { useMeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const [registerMut, { loading }] = useRegisterMutation();
    const router = useRouter();
    const client = useApolloClient();

    const { data } = useMeQuery();
    console.log(data);
    if (!loading && data?.me != null) {
        router.push("/app");
    }
    return (
        <div className="m-5 sm:m-0">
            <div className="max-w-md mx-auto mt-20">
                <h1 className="mb-4 text-3xl font-semibold text-gray-300">
                    Register
                </h1>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        phone: "",
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const res = await registerMut({
                            variables: {
                                options: values,
                            },
                        });
                        if (res.data?.register.errors) {
                            setErrors(toErrorMap(res.data.register.errors));
                        } else if (res.data?.register.user) {
                            router.push("/app");
                            await client.resetStore();
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="name"
                                placeholder="Name"
                                label="Name"
                            />
                            <InputField
                                name="email"
                                placeholder="Email"
                                label="Email"
                            />
                            <InputField
                                name="phone"
                                placeholder="Phone No."
                                label="Phone no."
                            />
                            <InputField
                                name="password"
                                placeholder="Password"
                                label="Password"
                                type={"password"}
                            />
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="px-3 py-1.5 mt-5 border border-gray-800 rounded-md text-gray-400 font-medium text-md bg-gray-800"
                            >
                                {loading ? "Loading..." : "Register"}
                            </button>
                            <p className="mt-3 text-sm text-gray-500">
                                Already have an account?{" "}
                                <span
                                    className="font-medium text-purple-500 cursor-pointer hover:underline"
                                    onClick={() => router.push("/login")}
                                >
                                    Login
                                </span>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
