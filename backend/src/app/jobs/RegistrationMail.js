import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, endDate, plan } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula GymPoint',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        end_date: format(parseISO(endDate), "'Dia' dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        regPrice: plan.duration * plan.price,
      },
    });
  }
}

export default new RegistrationMail();
