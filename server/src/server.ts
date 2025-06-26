import { app, server} from "./app.js";
import { APP_PORT } from "./utils/sercret.js"

server.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});