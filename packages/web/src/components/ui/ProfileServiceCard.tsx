import { useRouter } from "next/router";
import React from "react";
import { GetAllServicesQuery } from "../../generated/graphql";
import { truncate } from "../../utils/truncate";

interface ProfileServiceCardProps {
    service: GetAllServicesQuery["getAllServices"][0];
}

export const ProfileServiceCard: React.FC<ProfileServiceCardProps> = ({
    service,
}) => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/u/${service.creator.id}`)}
            className="bg-gray-800 cursor-pointer p-3 rounded-md border border-gray-700 w-72 m-2"
        >
            <div className="flex items-center mb-2">
                <img
                    style={{
                        maxWidth: "30px",
                        maxHeight: "30px",
                    }}
                    src={service.creator.imgUrl}
                    width={30}
                    height={30}
                    className="rounded-full border border-gray-400"
                />
                <p
                    style={{
                        fontFamily: "Menlo",
                    }}
                    className="ml-3 text-lg text-purple-500"
                >
                    {service.creator.name}
                </p>
            </div>
            <div className="flex items-center ">
                <div className="colored-circle-blue"></div>
                <p className="ml-3 text-gray-200 font-medium ">
                    {service.name}
                </p>
            </div>
            <p className="mt-1 text-gray-500">
                {truncate(service.description)}
            </p>
        </div>
    );
};
