export const domain = "http://localhost:8000";


export const endpoint = {
  registration_api: `${domain}/api/v1/auth/register`,
  login_api: `${domain}/api/v1/auth/login`,
  get_task: `${domain}/api/v1/task/all-task`,
  create_task: `${domain}/api/v1/task/create-task`,
  update_task: `${domain}/api/v1/task/update`,
  delete_task: `${domain}/api/v1/task/delete`,
  task_by_id: `${domain}/api/v1/task/task`,
  task_counts:`${domain}/api/v1/task/counts`,
};
