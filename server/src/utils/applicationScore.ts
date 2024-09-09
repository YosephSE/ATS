const applicationScore = async (application: any): Promise<{ score: number }> => {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  require("dotenv").config();

  const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Please score ${JSON.stringify(
    application.candidate
  )} out of 100 using the standard of the companies. I know it is impossible but make the keys on ${JSON.stringify(
    application.job
  )} as standard and score it out of hundred. And give me your response as json format with only the score key along with its value. Have your own criteria, though. I don't need any explanation.`;

  const result = await model.generateContent(prompt);
  const scoreResponse = JSON.parse(result.response.text());
  return { score: scoreResponse.score };
};

export default applicationScore;