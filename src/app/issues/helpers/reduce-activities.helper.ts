export const reduceActivitiesToTimeSpent = (activities: any[]) =>
  activities.reduce((acc: number, activity: any) => {
    const currentTime = new Date().getTime();
    const time = activity.spent !== null ? activity.spent : currentTime - activity.start;

    return acc += time;
  }, 0);
