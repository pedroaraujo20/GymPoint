import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import AssistanceController from './app/controllers/AssistanceController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/students/:id/assists', AssistanceController.store);
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id', StudentController.show);
routes.get('/students/:id/checkins', CheckinController.index);
routes.get('/students/:id/assists', AssistanceController.show);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);
routes.put('/users', UserController.update);

// Admin access only

routes.use(adminMiddleware);

routes.post('/users', UserController.store);

// Routes for Plans

routes.get('/plans', PlanController.index);
routes.get('/plans/:planId', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:planId', PlanController.update);
routes.delete('/plans/:planId', PlanController.delete);

// Routes for Registrations

routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.get('/registrations/:regId', RegistrationController.show);
routes.put('/registrations/:regId', RegistrationController.update);
routes.delete('/registrations/:regId', RegistrationController.delete);

// Routes for adm helpOrders

routes.get('/assists', AnswerController.index);
routes.get('/assists/:id', AnswerController.show);
routes.post('/assists/:id/answer', AnswerController.store);

export default routes;
