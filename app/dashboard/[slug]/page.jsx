"use client";

import { Suspense, lazy } from "react";
import Loading from "../loading";

const components = {
  home: lazy(() => import("@/components/dashboard")),
  demo: lazy(() => import("@/components/dashboard/demo")),
  upload: lazy(() => import("@/components/dashboard/upload")),
  labeling: lazy(() => import("@/components/dashboard/labeling")),
  result: lazy(() => import("@/components/dashboard/result")),
  profile: lazy(() => import("@/components/dashboard/profile")),
  tutorial: lazy(() => import("@/components/dashboard/tutorial")),
  help: lazy(() => import("@/components/dashboard/help")),
  info: lazy(() => import("@/components/dashboard/info")),
};

const Page = ({ params }) => {
  const Component = components[params.slug] || (() => <div>Coming soon</div>);

  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default Page;
