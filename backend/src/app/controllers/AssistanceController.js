import * as Yup from 'yup';
import AssistanceRequest from '../schemas/AssistanceRequest';
import Student from '../models/Student';

class AssistanceController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { question } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const assist = await AssistanceRequest.create({
      student_id: id,
      question,
    });

    return res.json(assist);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const assists = await AssistanceRequest.find({
      student_id: id,
    });

    return res.json(assists);
  }
}

export default new AssistanceController();
