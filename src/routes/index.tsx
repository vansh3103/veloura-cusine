import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Veloura — Luxury Fine Dining Restaurant" },
      { name: "description", content: "Veloura is an award-winning luxury fine dining restaurant. Farm-to-table cuisine, premium ambience, and unforgettable evenings." },
      { property: "og:title", content: "Veloura — Where Every Meal Becomes a Memory" },
      { property: "og:description", content: "Award-winning luxury fine dining with farm-to-table cuisine." },
    ],
  }),
});

function Index() {
  useEffect(() => {
    window.location.replace("/veloura/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#c9a24b", fontFamily: "serif", letterSpacing: 4 }}>
      Loading Veloura…
    </div>
  );
}
