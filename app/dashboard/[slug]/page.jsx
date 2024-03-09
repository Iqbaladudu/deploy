"use client";

import dynamic from "next/dynamic";
import { Suspense, lazy } from "react";

const components = {
  home: lazy(() => import("@/components/dashboard")),
  demo: dynamic(() => import("@/components/dashboard/demo"), { ssr: false }),
  upload: lazy(() => import("@/components/dashboard/upload")),
  labeling: lazy(() => import("@/components/dashboard/labeling")),
  result: lazy(() => import("@/components/dashboard/result")),
  profile: lazy(() => import("@/components/dashboard/profile")),
  tutorial: lazy(() => import("@/components/dashboard/tutorial")),
  help: lazy(() => import("@/components/dashboard/help")),
  info: lazy(() => import("@/components/dashboard/info")),
  batch: lazy(() => import("@/components/dashboard/batch")),
};

const Page = ({ params }) => {
  const Component = components[params.slug] || (() => <div>Coming soon</div>);

  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export default Page;
