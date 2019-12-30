import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { q } = req.query;

    if (q) {
      const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

      const students = await Student.findAll({
        where,
      });
      return res.json(students);
    }

    const students = await Student.findAll();

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists. ' });
    }

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'This student does not exists.' });
    }

    if (email && email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email },
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
    }

    const { id, name, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'This student does not exists' });
    }

    await Student.destroy({ where: { id } });

    return res.json();
  }
}

export default new StudentController();
