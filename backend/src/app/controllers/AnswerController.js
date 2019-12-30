import * as Yup from 'yup';
import AssistanceRequest from '../schemas/AssistanceRequest';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    const assists = await AssistanceRequest.find({
      answer: null,
    });

    return res.json(assists);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const assist = await AssistanceRequest.findById(id);

    if (!assist) {
      return res.status(400).json({
        error: 'This Assistance Request does not exists',
      });
    }

    const student = await Student.findOne({
      where: { id: assist.student_id },
    });

    const { answer } = req.body;

    const date = new Date();
    assist.answer = answer;
    assist.answer_at = date;

    await assist.save();

    await Queue.add(AnswerMail.key, {
      student,
      assist,
    });

    return res.json(assist);
  }

  async show(req, res) {
    const { id } = req.params;

    const assistExists = await AssistanceRequest.findById(id);

    if (!assistExists) {
      return res.status(400).json({ error: 'Assist does not exists.' });
    }

    const assists = await AssistanceRequest.findById(id);

    return res.json(assists);
  }
}

export default new AnswerController();
