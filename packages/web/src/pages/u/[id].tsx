import { useRouter } from "next/router";
import React, { useState } from "react";
import { ServiceCard } from "../../components/ui/ServiceCard";
import { useGetUserQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/useIsAuth";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const id =
        typeof router.query.id == "string" ? parseInt(router.query.id) : -1;
    const { data } = useGetUserQuery({
        variables: {
            id,
        },
    });
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
                        All Services
                    </button>
                </div>
            </div>
            <div className="bg-black-900 flex items-center p-12">
                <img
                    style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                    }}
                    src={data?.getUser?.imgUrl}
                    width={200}
                    height={200}
                    className="rounded-full overflow-hidden border border-gray-500"
                />
                <div className="ml-8 ">
                    <h1 className="text-5xl text-gray-300 font-semibold">
                        {data?.getUser.name}
                    </h1>
                    <p
                        style={{ fontFamily: "Menlo" }}
                        className="mt-2 text-purple-500 "
                    >
                        {data?.getUser.phone}
                    </p>
                </div>
            </div>
            <div className="px-20 py-6">
                <h1 className="mt-10 text-gray-400 font-medium text-2xl ">
                    {data?.getUser.name}
                    {'"'}s services
                </h1>
                <hr className="border-t my-2 border-gray-700" />
                <div className="flex flex-wrap">
                    {data?.getUser.services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            weirdFlag={true}
                            service={service}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
