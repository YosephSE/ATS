const applicationScore = (application: any): any => {
  let score = Math.floor(Math.random() * 100);
  console.log(`Application ${application.id} has a score of ${score}`);
  console.log(application);
  return { score };
};


export default applicationScore;