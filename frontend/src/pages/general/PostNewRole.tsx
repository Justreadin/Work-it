import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { GoClock } from "react-icons/go";

const initialTasks = [
  "Calling",
  "Replying emails",
  "Checking emails",
  "Posting online",
  "Excerpt design",
  "Commenting under post",
  "Checking notifications",
  "Booking Appointments",
  "Content writing",
  "Reminder",
  "Joining my calls",
  "Taking Minutes",
  "Forwarding inboxes",
  "Proof Reading",
];

const durations = ["1 month", "3 months", "6 months"];
const locations = ["Lagos", "Abuja", "Remote"];
const deadlines = ["24hrs", "48hrs", "72hrs", "1 week"];

export default function PostNewRole() {
  const [tasks, setTasks] = useState<string[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    selectedTasks: [] as string[],
    tags: ["LinkedIn", "Communication", "Assistant", "Lagos"],
    duration: "3 months",
    location: "Lagos",
    workersNeeded: "1",
    deadline: "72hrs",
  });

  const handleTaskToggle = (task: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTasks: prev.selectedTasks.includes(task)
        ? prev.selectedTasks.filter((t) => t !== task)
        : [...prev.selectedTasks, task],
    }));
  };

  const handleTagRemove = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

    const handleAddNewTask = () => {
    const trimmed = newTask.trim();
    if (trimmed && !tasks.includes(trimmed)) {
      setTasks((prev) => [...prev, trimmed]);
      setFormData((prev) => ({
        ...prev,
        selectedTasks: [...prev.selectedTasks, trimmed],
      }));
      setNewTask("");
      }
    };

  return (
    <div className="mx-auto space-y-6 p-0">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-semibold">JOB TITLE</label>
          <input
            type="text"
            className="w-1/2 rounded border p-4"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">PRICE</label>
          <div className="flex items-center rounded border p-2">
            <span className="mr-1">₦</span>
            <input
              type="text"
              className="w-24 border-none outline-none"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">JOB DESCRIPTION</label>
        <textarea
          className="min-h-[100px] w-full rounded border p-2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <h3 className="mb-2 font-semibold">CONTRACT</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {tasks.map((task) => (
            <label key={task} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.selectedTasks.includes(task)}
                onChange={() => handleTaskToggle(task)}
              />
              {task}
            </label>
          ))}
        </div>
        {/* Add custom task */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter custom task"
            className="w-full max-w-xs rounded border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-dark_purple"
            />
            <button
            type="button"
            onClick={handleAddNewTask}
            className="text-sm font-medium text-dark_purple underline hover:text-customPurple"
            >
            Add another task
            </button>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">TAGS</h3>
        <input
          type="text"
          className="mb-2 rounded border p-2 placeholder:text-xs placeholder:text-black"
          placeholder="start typing and press enter to add"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              setFormData({
                ...formData,
                tags: [...formData.tags, e.currentTarget.value.trim()],
              });
              e.currentTarget.value = "";
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm"
            >
              {tag}
              <button onClick={() => handleTagRemove(tag)}>×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-semibold">
            <GoClock className="mr-1 inline" /> DURATION
          </label>
          <select
            className="w-full rounded border p-2"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          >
            {durations.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">
            <CiLocationOn className="mr-1 inline" /> LOCATION
          </label>
          <select
            className="w-full rounded border p-2"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          >
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-4">
          <label className="mb-1 whitespace-nowrap text-sm font-semibold text-customPurple">
            Number of workers needed:
          </label>
          <select
            className="w-1/4 rounded border p-2"
            value={formData.workersNeeded}
            onChange={(e) => setFormData({ ...formData, workersNeeded: e.target.value })}
          >
            {[...Array(20).keys()].map((n) => (
              <option key={n + 1}>{n + 1}</option>
            ))}
          </select>
        </div>
      <div className="mt-4">
        <label className="mb-1 block text-sm font-semibold">Application deadline</label>
        <select
          className="w-full max-w-xs rounded border p-2"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        >
          {deadlines.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
      <div className="mt-6 flex justify-between gap-4">
        <button className="w-full rounded-full border-2 border-dark_purple bg-purple-300 py-4 font-semibold text-dark_purple">
          DRAFT
        </button>
        <button className="w-full rounded-full bg-dark_purple py-4 font-semibold text-white">
          PUBLISH
        </button>
      </div>
    </div>
  );
}
