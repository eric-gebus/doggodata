import { Router } from "express";
import { bark } from "./controller";

const doggo = Router();

doggo.post("/new-message", bark);

doggo.get('/debug-test', (req, res) => {
  res.send('ROUTER IS WORKING!');
});

export default doggo;