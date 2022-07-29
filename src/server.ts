import { serverHttp } from "./http";
import sequelize from './database';
import './models/index';
import "./websocket";

sequelize.sync({ force: true })
.then(() =>{
  serverHttp.listen(3001);
})
.catch((err) => console.error(err));
