import { serverHttp } from "./http";
import "./websocket";

serverHttp.listen(3001, () => console.log("Server is running on PORT 3001"));