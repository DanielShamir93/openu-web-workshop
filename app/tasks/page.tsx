import { auth } from '@/auth';

import { TaskList } from '@/components/taskList/TaskList';
import { getTasksWithPatientByUnit } from '@/data/tasks';

import React from 'react';

const page = async () => {
  const session = await auth();
  const tasks = await getTasksWithPatientByUnit(session?.user?.activeUnit!);

  return <TaskList tasks={tasks} />;
};

export default page;
