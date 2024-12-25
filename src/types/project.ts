export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Pending' | 'Ongoing' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  startDate: string;
  endDate: string;
  images: string[];
  files: string[];
  assignedFundis: AssignedFundi[];
  createdAt: string;
  updatedAt: string;
}

export interface AssignedFundi {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  status: Project['status'];
  priority: Project['priority'];
  startDate: string;
  endDate: string;
  assignedFundis: string[];
}