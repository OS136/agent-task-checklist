"use client";

import { FormEvent, useEffect, useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = "task-checklist-items";

export default function TaskChecklist() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) setTasks(JSON.parse(savedTasks) as Task[]);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, hasMounted]);

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      return;
    }

    const task: Task = {
      id: Date.now(),
      text: trimmedTask,
      completed: false,
    };

    setTasks((previousTasks) => [task, ...previousTasks]);
    setNewTask("");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
  };

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg">
      <h1 className="text-2xl font-bold text-black">Task Checklist</h1>

      <form className="mt-4 flex gap-2" onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Add a new task"
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-zinc-700 placeholder-zinc-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
        />
        <button
          type="submit"
          className="rounded-lg bg-violet-500 px-4 py-2 font-medium text-white transition hover:bg-violet-700"
        >
          Add Task
        </button>
      </form>

      <ul className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <li className="rounded-lg bg-zinc-50 px-3 py-2 text-black">
            No tasks yet. Add one above.
          </li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`group flex items-center justify-between gap-3 rounded-lg border border-zinc-200 px-3 py-2 transition-opacity ${
                task.completed ? "opacity-50" : "opacity-100"
              }`}
            >
              <label className="flex flex-1 items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="h-4 w-4 accent-zinc-900"
                />
                <span
                  className={
                    task.completed ? "text-black line-through" : "text-black"
                  }
                >
                  {task.text}
                </span>
              </label>
              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 opacity-0 transition hover:bg-red-100 group-hover:opacity-100"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
