import { subDays } from 'date-fns';
import Student from '../models/Student';
import Checkin from '../schemas/Checkin';
import Registration from '../models/Registration';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists. ' });
    }

    const checkin = await Checkin.find({ student_id: id });

    return res.json(checkin);
  }

  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists. ' });
    }

    const registered = await Registration.findOne({
      where: { student_id: id },
    });

    if (!registered) {
      return res
        .status(400)
        .json({ error: 'Student doesnt have a register or is not active' });
    }

    const studentCheckins = await Checkin.find({
      student_id: id,
      createdAt: {
        $gte: subDays(new Date(), 7),
        $lt: new Date(),
      },
    });

    if (studentCheckins) {
      if (studentCheckins.length >= 5) {
        return res.status(400).json({
          error: 'Student can make only 5 checkins in a period of 7 days',
        });
      }
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
