const applicationScore = async (application: any): Promise<number> => {
  try{
    const { GoogleGenerativeAI } = require("@google/generative-ai");
  require("dotenv").config();
  const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log(application);

  const prompt = `Please score the candidate's application out of 100 using your own criteria. Candidate Information: ${application.candidate} Job Criteria: ${application.job} Score the application based on the information provided above. Respond with only a number indicating the score. the format should be xx. For example, if you think the application deserves a score of 80, respond with 80.`;
  const result = await model.generateContent(prompt);
  const scoreText = result.response.text();
  const score = parseInt(scoreText, 10);
  return Number.isNaN(score) ? 0 : score;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default applicationScore;
