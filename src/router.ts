import { Router } from "express";
import { bark } from "./controller";

const doggo = Router();

doggo.post("/new-message", bark);

export default doggo;