import { cookies } from "next/headers";
import React from "react";
import ReactMapGL from "./_components/ReactMapGL";


const Map = async () => {
  const res = await fetch("https://tracev2.barikoimaps.dev/users/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });
  const data = await res.json();
  const filterdata = await data.users.filter(
    (user: any) => user?.user_last_lat && user?.user_last_lon
  );
  const markerData = await filterdata.map((user: any) => ({
    ...user,
    coordinates: [user?.user_last_lon, user?.user_last_lat],
  }));



  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-2">
      <ReactMapGL users={markerData} token={cookies().get("token")?.value} />
    </div>
  );
};

export default Map;
