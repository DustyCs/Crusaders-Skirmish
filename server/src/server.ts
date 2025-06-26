import { app, server} from "./app";
import { APP_PORT } from "./utils/sercret"

server.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});