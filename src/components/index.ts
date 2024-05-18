import dynamic from "next/dynamic";

export const AppLogo = dynamic(() => import("./logo/logo"), { ssr: true });
export const Icon = dynamic(() => import("./icon/icon"), { ssr: false });
export const ProductCard = dynamic(() => import("./product-card/product-card"), { ssr: true });
export const Accordion = dynamic(() => import("./accordion/accordion"), { ssr: true });
export const Header = dynamic(() => import("./header/header"), { ssr: true });
export const Navbar = dynamic(() => import("./navbar/navbar"), { ssr: true });
export const ProductListCard = dynamic(() => import("./product-list-card/product-list-card"), { ssr: true });
export const Layout = dynamic(() => import("./layout/layout"), { ssr: false });
