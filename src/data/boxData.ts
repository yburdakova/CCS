import { BoxData } from "./types";

export const boxes: BoxData[] = [
  {
    id: 1,
    barcode: "CIV-163.0-1-163",
    folderRange: "25500-25556",
    missingFolders: ["25501", "25539", "25548", "25550", "25528", "25530", "25540", "25545", "25556"],
    notes: "47328 Exhibit (video file)",
    numberOfFolders: 27,
    numberOfPages: 2673,
    inspection: {
      operator: 2,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-19T08:00:00 ",
      endTime:  "2024-08-19T08:10:00 ",
      durationMin: 10
    },
    preparation: {
      operator: 2,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-19T08:10:00 ",
      endTime:  "2024-08-19T08:50:00 ",
      durationMin: 40
    },
    scanning1: {
      operator: 2,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-19T08:50:00 ",
      endTime:  "2024-08-19T09:50:00 ",
      durationMin: 60
    },
    scanning2: {
      operator: 4,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-19T09:50:00 ",
      endTime:  "2024-08-19T11:30:00 ",
      durationMin: 100
    },
    review: {
      operator: 3,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-19T11:30:00 ",
      endTime:  "2024-08-19T11:55:00 ",
      durationMin: 25
    },
    ready: true,
    converted: true,
    uploaded: true
  },
  {
    id: 2,
    barcode: "CIV-164.0-1-164",
    folderRange: "25855-25899",
    missingFolders: ["25859", "25865", "25869", "25877", "25881", "25886", "25886", "25886", "25888"],
    notes: "",
    numberOfFolders: 27,
    numberOfPages: 2291,
    inspection: {
      operator: 1,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-19T09:00:00",
      endTime: "2024-08-19T09:10:00",
      durationMin: 10
    },
    preparation: {
      operator: 1,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-19T09:15:00",
      endTime: "2024-08-19T14:00:00",
      durationMin: 285
    },
    scanning1: {
      operator: 1,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-19T14:15:00",
      endTime: "2024-08-19T18:00:00",
      durationMin: 225
    },
    scanning2: {
      operator: 2,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-19T18:15:00",
      endTime: "2024-08-19T22:00:00",
      durationMin: 225
    },
    review: {
      operator: 1,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-20T08:00:00",
      endTime: "2024-08-20T08:50:00",
      durationMin: 50
    },
    ready: true,
    converted: true,
    uploaded: false
  },
  {
    id: 3,
    barcode: "CIV-165.0-1-165",
    folderRange: "25800-25853",
    missingFolders: ["25800-25814", "25823", "25825", "25832", "25834-25836", "25842-25845", "25853"],
    notes: "",
    numberOfFolders: 32,
    numberOfPages: 2874,
    inspection: {
      operator: 4,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-20T08:00:00",
      endTime: "2024-08-20T08:10:00",
      durationMin: 10
    },
    preparation: {
      operator: 4,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-20T08:15:00",
      endTime: "2024-08-20T12:30:00",
      durationMin: 255
    },
    scanning1: {
      operator: 4,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-20T12:45:00",
      endTime: "2024-08-20T17:55:00",
      durationMin: 310
    },
    scanning2: {
      operator: 2,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-20T18:00:00",
      endTime: "2024-08-20T22:05:00",
      durationMin: 245
    },
    review: {
      operator: 3,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-21T08:00:00",
      endTime: "2024-08-21T09:50:00",
      durationMin: 110
    },
    ready: true,
    converted: false,
    uploaded: false
  },
  {
    id: 4,
    barcode: "CIV-166.0-1-166",
    folderRange: "25557-25602",
    missingFolders: ["25561-25563", "25566", "25571", "25591-25601"],
    notes: "047898 Exhibit (driver's license)",
    numberOfFolders: 29,
    numberOfPages: 2762,
    inspection: {
      operator: 5,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-21T08:00:00",
      endTime: "2024-08-21T08:10:00",
      durationMin: 10
    },
    preparation: {
      operator: 5,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-21T08:15:00",
      endTime: "2024-08-21T14:55:00",
      durationMin: 400
    },
    scanning1: {
      operator: 5,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-21T15:00:00",
      endTime: "2024-08-21T20:05:00",
      durationMin: 305
    },
    scanning2: {
      operator: 1,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-21T20:10:00",
      endTime: "2024-08-21T23:25:00",
      durationMin: 195
    },
    review: {
      operator: 2,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-22T08:00:00",
      endTime: "2024-08-22T09:20:00",
      durationMin: 80
    },
    ready: false,
    converted: false,
    uploaded: false
  },
  {
    id: 5,
    barcode: "CIV-167.0-1-167",
    folderRange: "25900-25950",
    missingFolders: ["25911", "25917", "25924", "25928", "25936", "25940", "25943", "25947", "25949"],
    notes: "",
    numberOfFolders: 30,
    numberOfPages: 2430,
    inspection: {
      operator: 3,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-22T08:00:00",
      endTime: "2024-08-22T08:10:00",
      durationMin: 10
    },
    preparation: {
      operator: 3,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-22T08:15:00",
      endTime: "2024-08-22T12:50:00",
      durationMin: 215
    },
    scanning1: {
      operator: 3,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-22T13:00:00",
      endTime: "2024-08-22T16:00:00",
      durationMin: 180
    },
    scanning2: {
      operator: 1,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-22T16:10:00",
      endTime: "2024-08-22T18:05:00",
      durationMin: 175
    },
    review: {
      operator: 1,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-22T18:10:00",
      endTime: "2024-08-22T18:55:00",
      durationMin: 45
    },
    ready: true,
    converted: false,
    uploaded: false
  },
  {
    id: 6,
    barcode: "CIV-168.0-1-168",
    folderRange: "25900-25950",
    missingFolders: ["25911", "25917", "25924", "25928", "25936", "25940", "25943", "25947", "25949"],
    notes: "",
    numberOfFolders: 30,
    numberOfPages: 2430,
    inspection: {
      operator: 3,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-23T08:00:00",
      endTime: "2024-08-23T08:10:00",
      durationMin: 10
    },
    preparation: {
      operator: 3,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-23T08:15:00",
      endTime: "2024-08-23T12:50:00",
      durationMin: 215
    },
    scanning1: {
      operator: 3,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-23T13:00:00",
      endTime: "2024-08-23T16:00:00",
      durationMin: 180
    },
    scanning2: {
      operator: 1,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-23T16:10:00",
      endTime: "2024-08-23T18:05:00",
      durationMin: 175
    },
    review: {
      operator: 1,
      inProgress: false,
      isFinished: true,
      startTime: "2024-08-23T18:10:00",
      endTime: "2024-08-23T18:55:00",
      durationMin: 45
    },
    ready: true,
    converted: false,
    uploaded: false
  },
  { id: 8, barcode: "CIV-169.0-1-169",
    folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false
  },
  { id: 9, barcode: "CIV-170.0-1-170",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 10, barcode: "CIV-171.0-1-171",
    folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 11, barcode: "CIV-172.0-1-172",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 12, barcode: "CIV-173.0-1-173",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 13, barcode: "CIV-174.0-1-174",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 14, barcode: "CIV-175.0-1-175",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 15, barcode: "CIV-176.0-1-176",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 16, barcode: "CIV-177.0-1-177",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 17, barcode: "CIV-178.0-1-178",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 18, barcode: "CIV-179.0-1-179",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 19, barcode: "CIV-180.0-1-180",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 20, barcode: "CIV-181.0-1-181",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 21, barcode: "CIV-182.0-1-182",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 22, barcode: "CIV-183.0-1-183",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 23, barcode: "CIV-184.0-1-184",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 24, barcode: "CIV-185.0-1-185",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 25, barcode: "CIV-186.0-1-186",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 26, barcode: "CIV-187.0-1-187",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 28, barcode: "CIV-189.0-1-189",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  { id: 27, barcode: "CIV-188.0-1-188",     folderRange: null,
    missingFolders: [],
    notes: null,
    numberOfFolders: null,
    numberOfPages: null,
    inspection: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    preparation: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning1: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    scanning2: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    review: {
      operator: null,
      inProgress: false,
      isFinished: false,
      startTime: null,
      endTime: null,
      durationMin: 0
    },
    ready: false,
    converted: false,
    uploaded: false},
  ];
