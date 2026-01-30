import { useLocation, Link, useParams } from "react-router-dom";
import { SNEAKER_MODELS } from "@/data/models";

interface Crumb {
  name: string;
  path: string;
  label?: string;
}

export function Breadcrumbs() {
  const location = useLocation();
  const params = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getModelName = (id: string) => {
    const model = SNEAKER_MODELS.find((m) => m.id === id);
    return model ? model.name : id;
  };

  const generateBreadcrumbs = () => {
    const crumbs: Crumb[] = [{ name: "Home", path: "/" }];

    if (pathnames.length === 0) return crumbs;

    if (pathnames.includes("checkout")) {
      crumbs.push({ name: "Cart", path: "/cart" });
      crumbs.push({ name: "Checkout", path: "/checkout" });
      return crumbs;
    }

    if (pathnames.includes("cart")) {
      crumbs.push({ name: "Cart", path: "/cart" });
      return crumbs;
    }

    if (pathnames.includes("about")) {
      crumbs.push({ name: "About", path: "/about" });
      return crumbs;
    }

    if (pathnames.includes("reviews")) {
      crumbs.push({ name: "Reviews", path: "/reviews" });
      return crumbs;
    }

    if (pathnames.includes("collections")) {
      crumbs.push({ name: "Collections", path: "/collections" });
      return crumbs;
    }

    if (pathnames.includes("product") && params.id) {
      crumbs.push({ name: "Collections", path: "/collections" });
      crumbs.push({
        name: "Model",
        path: `/product/${params.id}`,
        label: getModelName(params.id as string),
      });
      return crumbs;
    }

    if (pathnames.includes("model") && params.id) {
      crumbs.push({ name: "Collections", path: "/collections" });
      const modelName = getModelName(params.id as string);
      crumbs.push({ name: modelName, path: `/product/${params.id}` });
      crumbs.push({ name: "Customization", path: `/model/${params.id}` });
      return crumbs;
    }

    return crumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center gap-2 text-xs text-[#4c4c9a] font-medium mb-6 uppercase tracking-tighter">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={crumb.path} className="flex items-center gap-2">
            {index > 0 && (
              <span className="material-symbols-outlined text-[12px]">
                chevron_right
              </span>
            )}
            {isLast ? (
              <span className="text-[#0d0d1b] dark:text-white">
                {crumb.label || crumb.name}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="hover:text-primary transition-colors"
              >
                {crumb.label || crumb.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
