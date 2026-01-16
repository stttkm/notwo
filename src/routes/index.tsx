import HomePage from "@/features/home/routes/home-page";
import { ROUTES } from "@/shared/constants/routes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(ROUTES.HOME)({
  component: HomePage,
});
