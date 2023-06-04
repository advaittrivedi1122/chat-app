import express, {Router} from "express";
import {AppController} from "../controller/app.controller";

const appRouter: Router = express.Router();
const appController = new AppController();

appRouter.post("/register",appController.register);
// appRouter.post("/save-message", appController.saveMessage);

export = appRouter;