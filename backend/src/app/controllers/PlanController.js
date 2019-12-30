import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      order: [['id', 'ASC']],
    });

    return res.json(plans);
  }

  async show(req, res) {
    const { planId } = req.params;

    const plan = await Plan.findByPk(planId);

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const findPlan = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (findPlan) {
      return res.status(400).json({ error: 'This plan already exists.' });
    }

    const plans = await Plan.create(req.body);

    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { planId } = req.params;

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists' });
    }

    const { id, title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { planId } = req.params;

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists' });
    }

    await Plan.destroy({ where: { id: planId } });

    return res.json();
  }
}

export default new PlanController();
