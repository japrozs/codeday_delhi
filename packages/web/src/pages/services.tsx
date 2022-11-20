import React from "react";
import { ProfileServiceCard } from "../components/ui/ProfileServiceCard";
import { useGetAllServicesQuery } from "../generated/graphql";

interface servicesProps {}

const services: React.FC<servicesProps> = ({}) => {
    const { data } = useGetAllServicesQuery();
    return (
        <div className="p-14">
            <h1 className="text-gray-400 font-medium text-3xl ">
                All Services
            </h1>
            <hr className="border-t my-4 border-gray-700" />
            <div className="flex flex-wrap">
                {data?.getAllServices.map((service) => (
                    <ProfileServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default services;
