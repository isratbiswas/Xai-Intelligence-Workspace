"use client";

import dynamic from "next/dynamic";

const AllCodeInner = dynamic(() => import("@/components/modules/AllCode"), {
  ssr: false,
});
export default AllCodeInner;
