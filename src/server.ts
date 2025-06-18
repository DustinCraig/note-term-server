import { createApp } from "./app";
import config from "./config/config";

const app = createApp();
const port = config.port;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
