import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
  base: "/",
});
=======
  plugins: [
    react(), 
    tailwindcss(),
  ],
  base: "/"
})
>>>>>>> 66317fb611a8817600d6e761c31f0b4e82d035fe
