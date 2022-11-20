import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";
import {
    RegularUserWithServiceFragment,
    useUpdateServiceMutation,
    useUpdateServiceNameMutation,
} from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface UpdateServiceModalProps {
    open: boolean;
    setOpen: any;
    service: RegularUserWithServiceFragment["services"][0];
}

export const UpdateServiceModal: React.FC<UpdateServiceModalProps> = ({
    open,
    setOpen,
    service,
}) => {
    const [name, setName] = useState(service.name);
    const [desc, setDesc] = useState(service.description);
    const [udpateServiceName] = useUpdateServiceNameMutation();
    const [updateServiceTitle] = useUpdateServiceMutation();
    const client = useApolloClient();

    const updateService = async () => {
        if (name != service.name) {
            let res = await udpateServiceName({
                variables: {
                    id: service.id,
                    name,
                },
            });
            console.log(res);
        } else if (desc != service.description) {
            let res = await updateServiceTitle({
                variables: {
                    id: service.id,
                    description: desc,
                },
            });
            console.log(res);
        }
        await client.resetStore();
        setOpen(false);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-opacity-75 bg-black-900" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block p-3 overflow-hidden text-left align-bottom transition-all transform rounded shadow-xl bg-gray-800 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="flex items-center">
                                <p className="text-gray-400 text-md font-medium ">
                                    Edit Service
                                </p>
                                <IoCloseOutline
                                    onClick={() => setOpen(false)}
                                    className="text-gray-400 ml-auto mr-0 text-2xl cursor-pointer"
                                />
                            </div>
                            <hr className="border-t my-4 border-gray-700" />
                            <div className="my-4">
                                <p className="text-sm font-medium text-gray-400 mb-1">
                                    Name
                                </p>
                                <input
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    value={name}
                                    className="w-full text-gray-400 placeholder-gray-600 p-2 px-2 mt-1 text-sm bg-gray-900 border rounded-sm border-gray-800 focus:border-opacity-0 focus:outline-none focus:ring focus:border-blue-100"
                                />
                            </div>
                            <div className="my-4">
                                <p className="text-sm font-medium text-gray-400 mb-1">
                                    Description
                                </p>
                                <textarea
                                    onChange={(e) => {
                                        setDesc(e.target.value);
                                    }}
                                    value={desc}
                                    className="w-full text-gray-400 placeholder-gray-600 p-2 px-2 mt-1 text-sm bg-gray-900 border rounded-sm border-gray-800 focus:border-opacity-0 focus:outline-none focus:ring focus:border-blue-100"
                                />
                            </div>
                            <div className="flex items-center">
                                <button
                                    disabled={
                                        name == service.name &&
                                        desc == service.description
                                    }
                                    onClick={updateService}
                                    type="submit"
                                    className={`px-3 py-1.5 mt-5 border border-gray-800 rounded-md font-medium text-md bg-gray-600 ${
                                        name == service.name &&
                                        desc == service.description
                                            ? "cursor-not-allowed text-gray-400"
                                            : "cursor-pointer text-gray-900"
                                    }`}
                                >
                                    Update service
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
