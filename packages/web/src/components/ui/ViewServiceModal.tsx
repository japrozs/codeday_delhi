import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";
import {
    RegularUserWithServiceFragment,
    useCreateServiceMutation,
    useMeQuery,
    useUpdateServiceMutation,
    useUpdateServiceNameMutation,
} from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface ViewServiceModalProps {
    service: RegularUserWithServiceFragment["services"][0];
    open: boolean;
    setOpen: any;
}

export const ViewServiceModal: React.FC<ViewServiceModalProps> = ({
    service,
    open,
    setOpen,
}) => {
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
                                    View Service
                                </p>
                                <IoCloseOutline
                                    onClick={() => setOpen(false)}
                                    className="text-gray-400 ml-auto mr-0 text-2xl cursor-pointer"
                                />
                            </div>
                            <hr className="border-t my-4 border-gray-700" />
                            <p className="w-full text-gray-400 font-semibold placeholder-gray-600 p-2 px-2  text-3xl border rounded-sm border-gray-800 focus:border-opacity-0 focus:outline-none focus:ring focus:border-blue-100">
                                {service.name}
                            </p>
                            <p className="w-full text-gray-400 placeholder-gray-600 p-2 px-2 mt-1 text-sm border rounded-sm border-gray-800 focus:border-opacity-0 focus:outline-none focus:ring focus:border-blue-100">
                                {service.description}
                            </p>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
