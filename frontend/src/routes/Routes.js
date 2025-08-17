import Dashboard from '../dashboard/Dashboard';
import MainLayout from '../dashboard/pages/Layout/MainLayout';
import Task from '../dashboard/pages/task/AllTask';
import TaskCreate from '../dashboard/pages/task/CreateTask';
import TaskEdit from '../dashboard/pages/task/TaskEdit';
import TaskView from '../dashboard/pages/task/TaskView';

export const routes = [
  {
    path: '/dashboard',
    element: ( <MainLayout><Dashboard /> </MainLayout>),
  },
   {
    path: '/tasklist',
    element: (<MainLayout><Task /> </MainLayout>),
  },
  {
    path: '/addtask',
    element: (<MainLayout><TaskCreate /> </MainLayout>),
  },
  {
    path: '/task/view/:taskId',
    element: <MainLayout><TaskView /></MainLayout>,
  },
  {
    path: '/task/edit/:taskId',
    element: <MainLayout><TaskEdit /></MainLayout>,
  }
];
