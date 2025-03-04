import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("latihan_mtk", "routes/latihan_mtk.tsx"),
] satisfies RouteConfig;
