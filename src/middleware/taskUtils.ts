import { BoxData, TaskData } from "../data/types";

export const getTaskActivity = (processType: keyof BoxData): TaskData["activity"] => {
  switch (processType) {
    case 'inspection':
      return 'Inspection';
    case 'preparation':
      return 'Preparation';
    case 'scanning1':
      return 'Scanning 1';
    case 'scanning2':
      return 'Scanning 2';
    case 'review':
      return 'Review';
    default:
      return 'Other';
  }
};
