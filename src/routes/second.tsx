import { createFileRoute } from "@tanstack/react-router";
import SecondPage from "@/features/second/routes/second-page";

export const Route = createFileRoute("/second")({
  component: SecondPage,
});
