import { truncate } from "../../utils/truncate";
import React, { useState } from "react";
import { RegularUserWithServiceFragment } from "../../generated/graphql";
import { UpdateServiceModal } from "./UpdateService";
import { ViewServiceModal } from "./ViewServiceModal";

interface ServiceCardProps {
    // weird typescript but what can I do
    service: RegularUserWithServiceFragment["services"][0];
    weirdFlag?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    service,
    weirdFlag,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            onClick={() => setOpen(true)}
            className="bg-gray-800 cursor-pointer p-3 rounded-md border border-gray-700 w-72 m-2"
        >
            <div className="flex items-center ">
                <div className="colored-circle-blue"></div>
                <p className="ml-3 text-gray-200 font-medium ">
                    {service.name}
                </p>
            </div>
            <p className="mt-1 text-gray-500">
                {truncate(service.description)}
            </p>
            {weirdFlag ? (
                <ViewServiceModal
                    open={open}
                    setOpen={setOpen}
                    service={service}
                />
            ) : (
                <UpdateServiceModal
                    open={open}
                    setOpen={setOpen}
                    service={service}
                />
            )}
        </div>
    );
};
