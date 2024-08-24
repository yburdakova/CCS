
export interface UserData {
  id: number;
  name: string;
  role: "tl" | "so" | "pm";
  username: string;
  password: string;
  userkey: number;
}

export interface BoxData {
  id: number,
  box: string,
  folderRange: string,
  missingFolders: string [],
  notes: string,
  numberOfFolders: number,
  numberOfPages: number,
  preparator: UserData["name"];
  scanner1: UserData["name"];
  scanner2: UserData["name"];
  reviewer: UserData["name"];
  prepTime: number,
  scan1Time: number,
  scan2Time: number,
  reviewTime: number,
  ready: boolean,
  converted: boolean,
  uploaded: boolean
}

export interface TaskData {
  id: number,
  title: TaskType,
  level: number,
  startTime: Date,
  endTime: Date,
  inprogress: boolean,
}

export type TaskType =
  'Work' |
  'Team meeting' |
  'Training' |
  'End of day Clean up' |
  'Administrative Management' |
  'Box Preparation' |
  'Scanning 1' |
  'Scanning 2' |
  'Review' ;

  export interface UserState {
    currentUser: UserData | null;
    userType: UserData["role"] | null,
  }

  export interface RootState {
    user: UserState;
  }

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
export interface MenuItemProps{
  title: string;
  path: string;
  icon: React.ReactNode;
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
