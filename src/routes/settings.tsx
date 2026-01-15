import { createFileRoute } from "@tanstack/react-router";
import SettingsPage from "@/features/settings/routes/settings-page";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});
