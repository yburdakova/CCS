
export interface UserData {
  id: number;
  name: string;
  role: "tl" | "so" | "pm";
  username: string;
  password: string;
  userkey: number;
  isActive: boolean;
}
export interface BoxTaskTypes {
  operator: number | null;
  inProgress: boolean;
  isFinished: boolean;
  startTime: string | null;
  endTime: string | null;
  durationMin: number;
}

export interface BoxData {
  id: number,
  barcode: string,
  folderRange: string | null,
  missingFolders: string [],
  notes: string | null,
  numberOfFolders: number | null,
  numberOfPages: number | null,
  inspection: BoxTaskTypes | null,
  preparation: BoxTaskTypes | null,
  scanning1: BoxTaskTypes | null,
  scanning2: BoxTaskTypes | null,
  review: BoxTaskTypes | null,
  ready: boolean,
  converted: boolean,
  uploaded: boolean
}

  export interface UserState {
    currentUser: UserData | null;
    userType: UserData["role"] | null,
    error: string | null;
    isFetching: boolean;
    isActive: boolean;
  }

  export interface LoginCredentials {
    username: string;
    password: string;
  }

  export interface MenuItemProps{
    title: string;
    path: string;
  }

  export interface TaskData {
    id: number;
    taskType: "Box Activity" | "Management Activity";
    activity: "Inspection" | "Preparation" | "Scanning 1" | "Scanning 2" | "Review" | "Team Meeting" | "Training" | "End of day Clean up" | "Administrative Management" | "Other";
    boxId: number | null;
    userId: number;
    startTime: string;
    endTime: string | null;
    isPaused: boolean;
  }

  export type ActivityType = TaskData['activity'];

  export interface EventLog {
    id: number;
    userId: number;
    eventType: "Work Start" | "Work End" | "Task Start" | "Task End" | "Task Pause";
    taskId: number | null;
    timestamp: string;
  }
  export interface UsersState {
    users: UserData[];
    error: string | null;
    isFetching: boolean;
  }

  export interface EventLogsState {
    eventLogs: EventLog[]
  }
  export interface BoxesState {
    boxes: BoxData[]
  }  
  
  export interface TasksState {
    tasks: TaskData[]
  }
export interface WorkEventsProps {
  userId: number;
  isActiveUser: boolean;
}

export interface BoxActivityProps {
  barcodes: string[];
  boxes: BoxData[];
  users: UserData[];
}

export interface RootState {
  user: UserState;
  eventLogs: EventLogsState;
  boxes: BoxesState;
  tasks: TasksState;
}
  //============================================================= OLD

export interface CategoryData {
  _id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotificationData {
  _id: string;
  toUser: string;
  fromUser: string;
  message: string;
  isRead: boolean;
  type: NotificationType;
  forAdmin: boolean;
  data?: {
    requestId: string;
  };
  createdAt: Date;
}
export interface HisoryPrice {
    _id?: string;
    price: number;
    date?: Date;
}

export interface TransformedDataItem {
  date: string;
  price: number;
}

export interface ProductData {
  _id?: string;
  customId? : string;
  title: string;
  description?: string;
  category: string;
  measure: string;
  price: number;
  quantity: number;
  priceHistory: HisoryPrice[]
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InputRefs {
  [key: string]: HTMLInputElement | null;
}

export interface OrderData {
  _id?: string;
  userId? : string;
  products?: ProductData[];
  amount?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomerRequest {
  _id: string;
  title: string;
  email: string;
  contactName: string;
  contactPhone: string;
  type: 'newUser' | 'newPassword' | 'completed' | 'rejected';
  data?:{
    relatedId: string;
  };
  createdAt: Date;
  updatedAt: Date;
}



export interface AdminState {
  customerRequests: CustomerRequest[],
  users: UserData[];
  orders: OrderData[];
  products: ProductData[];
  categories: CategoryData[];
  isFetching: boolean;
  error: string | null;
  response: UserData | ProductData | null;
}

export interface NotificationsState {
  notifyCounter: number,
  notifications: NotificationData[];
  focusedId: string;
  actualNotificationId: string;
  isFetching: boolean,
  error: string | null;
}

export interface OrderState {
  products: ProductData[],
  quantity: number,
  totalPrice: number,
  isOpen: boolean
}

export type SuccessAction<T> = (data: T) => { type: string; payload: T };

export interface ToggleStatusData {
  isActive: boolean;
}

export interface CustomInputProps {
  label: string;
  placeholder: string;
  required?: boolean;
  type: string;
  isMask?: boolean;
  getValue?: (value: string) => void;
  valueProps?: string;
  dark?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  withDel?: boolean;
}

export interface OrderListItemProps {
  product: ProductData; 

  index: number;
  createdOrder?: boolean;
}

export interface CustomerItemProps{
  customer: UserData
}

export interface OrderItemAdmProps {
  order: OrderData;
  reloadOrders?: () => void 
}
export interface ProductItemProps {
  product: ProductData;
  focused?: boolean;
  reloadProducts?: () => void 
}


export interface TableRowProps {
  rowData: ProductData
}

export interface OrderItemProps {
  order: OrderData;
}


export type NotificationType = 
  'customerRequest' | 
  'newOrder' | 
  'newProduct' | 
  'priceChange' | 
  'statusChange' | 
  'orderStatusChange';

export interface ProductStatsItem{
  value?: number;
  categoryTitle: string;
  quantity: number;
}

export interface CustDashboardSlice {
  products: ProductData[],
  productStats: ProductStatsItem[],
  orders: OrderData[],
  ordersStats: OrderStatsItem[],
  totalAmount: number,
  monthAmount:[]
}
export interface OrderStatsItem{
  value?: number;
  statusTitle: string;
  quantity: number;
}

export interface ProductStatsItem{
  value?: number;
  categoryTitle: string;
  quantity: number;
}


export interface AdmDashboardSlice {
  favoriteProducts: string[];
  loading: boolean;
  error: null | string;
}

export interface ProductStatsBarChartProps {
  type: 'products' | 'orders';
}
