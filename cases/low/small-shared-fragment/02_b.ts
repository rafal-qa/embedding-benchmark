type Task = { id: string; needs: string[] };
type Label = {
  key: string;
  value: string;
  active: boolean;
};

export function order(tasks: Task[]): string[] {
  const pending = new Map(tasks.map((task) => [task.id, task.needs]));
  const completed: string[] = [];
  while (pending.size > 0) {
    const ready = [...pending].find(([, needs]) => needs.every((id) => completed.includes(id)));
    if (ready === undefined) throw new Error("dependency cycle");
    completed.push(ready[0]);
    pending.delete(ready[0]);
  }
  return completed;
}

export function blocked(tasks: Task[]): Label[] {
  return tasks.filter((task) => task.needs.length > 0)
    .map((task) => ({ key: task.id, value: task.needs.join(","), active: false }));
}
