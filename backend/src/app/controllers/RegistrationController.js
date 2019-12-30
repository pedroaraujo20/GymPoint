import * as Yup from 'yup';
import { parseISO, isBefore, addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const registrations = await Registration.findAll({
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'student_id',
        'plan_id',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'price', 'duration'],
        },
      ],
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const date = parseISO(start_date);

    /**
     * Check if date is valid
     */

    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permmited' });
    }

    /**
     * Check if student exists
     */

    const student = await Student.findOne({
      where: { id: student_id },
      attributes: ['name', 'email'],
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    /**
     * Check if student already have a register
     */

    const findRegister = await Registration.findOne({
      where: { id: student_id },
    });

    if (findRegister) {
      return res
        .status(400)
        .json({ error: 'Student already registered. Select another one' });
    }

    /**
     * Check if plan exists
     */

    const plan = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists. ' });
    }

    const endDate = addMonths(date, plan.duration);

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: date,
      end_date: endDate,
      price: plan.duration * plan.price,
    });

    await Queue.add(RegistrationMail.key, {
      student,
      endDate,
      plan,
    });

    return res.json(registration);
  }

  async show(req, res) {
    const { regId } = req.params;
    const registration = await Registration.findByPk(regId, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'price', 'duration'],
        },
      ],
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exists!' });
    }

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().integer(),
      plan_id: Yup.number().integer(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const date = parseISO(start_date);

    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permmited' });
    }

    const plan = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists. ' });
    }

    const { regId } = req.params;

    const registration = await Registration.findByPk(regId);

    if (!registration) {
      return res.status(400).json({ error: 'Invalid registration.' });
    }

    await registration.update({
      student_id,
      plan_id,
      start_date: date,
      end_date: addMonths(date, plan.duration),
      price: plan.duration * plan.price,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const { regId } = req.params;

    const registration = await Registration.findByPk(regId);

    if (!registration) {
      return res.status(400).json({ error: 'Invalid Id.' });
    }

    await Registration.destroy({ where: { id: regId } });
    return res.json();
  }
}

export default new RegistrationController();
