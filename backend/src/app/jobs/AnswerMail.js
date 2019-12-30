import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { student, assist } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Auxilio GymPoint',
      template: 'answer',
      context: {
        student: student.name,
        question: assist.question,
        answer: assist.answer,
      },
    });
  }
}

export default new AnswerMail();
