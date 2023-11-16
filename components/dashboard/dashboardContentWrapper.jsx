import { createTitle } from "@/app/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const DashboardContentWrapper = ({ children }) => {
  const searchParams = useSearchParams();
  const engine = searchParams.get("engine");
  const option = searchParams.get("option");
  const router = useRouter();
  const pathname = usePathname();

  const navigateHome = () => router.push("/dashboard/home");

  const generatePath = () => {
    if (option && engine) {
      return ` / ${createTitle(engine)} / ${createTitle(option)}`;
    } else {
      const match = pathname.toString().match(/(?<=\/dashboard\/)\w+/);
      return match
        ? `/ ${match[0].charAt(0).toUpperCase() + match[0].slice(1)}`
        : null;
    }
  };

  return (
    <div className="text-gray-dark w-100 d-flex flex-column gap-0 row-gap-4 mt-3 mb-5">
      <div>
        <span
          className="fw-medium fw-label text-primary"
          style={{ cursor: "pointer" }}
          onClick={navigateHome}
        >
          Beranda
        </span>
        {generatePath()}
      </div>
      {children}
    </div>
  );
};

export default DashboardContentWrapper;
