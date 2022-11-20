import { useRouter } from "next/router";
import React, { ChangeEvent, createRef, useState } from "react";
import { CreateServiceModal } from "../components/ui/CreateServiceModal";
import { ServiceCard } from "../components/ui/ServiceCard";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import Axios from "axios";
import { useApolloClient } from "@apollo/client";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
    useIsAuth();
    const { data } = useMeQuery();
    const [open, setOpen] = useState(false);
    const [logoutMutation] = useLogoutMutation();
    const router = useRouter();
    const client = useApolloClient();

    // image uploading code
    const fileInputRef = createRef<HTMLInputElement>();

    const openFileInput = () => {
        fileInputRef.current?.click();
    };

    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);

        try {
            await Axios.post("http://localhost:4000/upload/avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            await client.resetStore();
        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        await logoutMutation();
        router.push("/");
    };
    return (
        <div>
            <div className="flex items-center bg-gray-900 border-b border-gray-800">
                <p
                    style={{ fontFamily: "Menlo" }}
                    className="ml-3 text-purple-500 text-xl"
                >
                    me.com
                </p>
                <div className="ml-auto mr-5">
                    <button
                        onClick={() => router.push("/services")}
                        type="submit"
                        className="px-3 py-1.5 my-2 mr-4 border border-gray-700 rounded-md text-gray-300 font-medium text-md bg-gray-800"
                    >
                        Services
                    </button>
                    <button
                        onClick={() => setOpen(true)}
                        type="submit"
                        className="px-3 py-1.5 my-2 border border-gray-700 rounded-md text-gray-300 font-medium text-md bg-gray-800"
                    >
                        Create new service
                    </button>
                    <button
                        onClick={logout}
                        type="submit"
                        className="px-3 py-1.5 mx-5 my-2 border border-gray-700 rounded-md text-gray-300 font-medium text-md bg-gray-800"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div
                style={{
                    maxWidth: `${69 - 2}rem`,
                }}
                className="p-20 mx-auto"
            >
                <h1 className="text-gray-400 font-medium text-3xl ">
                    Your account details
                </h1>
                <hr className="border-t my-4 border-gray-700" />
                <div className="flex items-center">
                    <div className="w-4/6">
                        <div className="my-4">
                            <p className="text-md font-medium text-gray-500 mb-1">
                                Name
                            </p>
                            <p className="w-full max-w-md text-gray-400 placeholder-gray-600 p-2 px-2 mt-1 text-sm bg-gray-900 border rounded-sm border-gray-800 focus:border-opacity-0 focus:outline-none focus:ring focus:border-blue-100">
                                {data?.me?.name}
                            </p>
                        </div>
                        <div className="my-4">
                            <p className="text-md font-medium text-gray-500 mb-1">
                                Email
                            </p>
                            <p className="w-full max-w-md text-gray-400 placeholder-gray-600 p-2 px-2 mt-1 text-sm bg-gray-900 border rounded-sm border-gray-800 focus:border-opacity-0 focus:outline-none focus:ring focus:border-blue-100">
                                {data?.me?.email}
                            </p>
                        </div>
                        <div className="my-4">
                            <p className="text-md font-medium text-gray-500 mb-1">
                                Phone no.
                            </p>
                            <p className="w-full max-w-md text-gray-400 placeholder-gray-600 p-2 px-2 mt-1 text-sm bg-gray-900 border rounded-sm border-gray-800 focus:border-opacity-0 focus:outline-none focus:ring focus:border-blue-100">
                                {data?.me?.phone}
                            </p>
                        </div>
                    </div>
                    <div className="w-2/6">
                        <input
                            type="file"
                            hidden={true}
                            ref={fileInputRef}
                            onChange={uploadImage}
                        />
                        <img
                            style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                            }}
                            src={data?.me?.imgUrl}
                            width={200}
                            height={200}
                            className="rounded-full overflow-hidden"
                        />
                        <button
                            onClick={() => openFileInput()}
                            type="submit"
                            className="px-3 py-1.5 ml-7 mt-4 border border-gray-700 rounded-md text-gray-400 font-medium text-md bg-gray-800"
                        >
                            Change picture
                        </button>
                    </div>
                </div>
                <h1 className="mt-10 text-gray-400 font-medium text-2xl ">
                    Your services
                </h1>
                <hr className="border-t my-2 border-gray-700" />
                <div className="flex items-center flex-wrap">
                    {data?.me?.services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
            <CreateServiceModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default App;
