import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Spinner } from "../components/shared/Spinner";
import { InputField } from "../components/ui/InputField";
import { useLoginMutation, useMeQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    const [loginMut, { loading }] = useLoginMutation();
    const router = useRouter();
    const client = useApolloClient();

    const { data } = useMeQuery();
    console.log(data);
    if (!loading && data?.me != null) {
        router.push("/app");
    }
    return (
        <div className="m-5 sm:m-0">
            <div className="max-w-md mx-auto mt-52">
                <h1 className="mb-4 text-3xl font-semibold text-gray-300">
                    Login
                </h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await loginMut({ variables: values });
                        if (response.data?.login.errors) {
                            setErrors(toErrorMap(response.data.login.errors));
                        } else if (response.data?.login.user) {
                            if (typeof router.query.next === "string") {
                                router.push(router.query.next);
                            } else {
                                // worked
                                await client.resetStore();
                                router.push("/app");
                            }
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="email"
                                placeholder="Email"
                                label="Email"
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
                                {loading ? "Loading..." : "Login"}
                            </button>
                            <p className="mt-3 text-sm text-gray-500">
                                Don{"'"}t have an account?{" "}
                                <span
                                    className="font-medium text-purple-500 cursor-pointer hover:underline"
                                    onClick={() => router.push("/register")}
                                >
                                    Sign up
                                </span>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
