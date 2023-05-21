import express, {Router} from "express";
import {AppController} from "../controllers/app.controller";

const appRouter: Router = express.Router()
const appController = new AppController()

appRouter.post("/send-message", appController.sendMessage)

export = appRouter;