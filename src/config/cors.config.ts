import { PORT } from "../env";
import { CorsOptions } from "cors";

const allowedOrigins = [
  `http://localhost:${PORT}`,
  "http://localhost:4200",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  optionsSuccessStatus: 200,
};

export { allowedOrigins };
export default corsOptions;
