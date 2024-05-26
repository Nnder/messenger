import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Box } from "@mui/material";

export default function PageLoader() {
  gsap.registerPlugin(useGSAP);
  useGSAP(
    () => {
      gsap.to(".loader", { rotation: "+=360", repeat: -1, duration: 5 });
    },
    { scope: ".container" },
  ); // <-- scope is for selector text (optional)

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="container">
        <img className="loader" src="loader.svg" alt="..." />
      </div>
    </Box>
  );
}
