import TaskChecklist from "@/components/TaskChecklist";

const repoName = "agent-task-checklist";
const basePath = process.env.NODE_ENV === "production" ? `/${repoName}` : "";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6 sm:p-10"
      style={{
        backgroundImage: `linear-gradient(rgba(24, 24, 27, 0.45), rgba(24, 24, 27, 0.45)), url("${basePath}/minh-xu-2X6kBbtnK4I-unsplash.jpg")`,
      }}
    >
      <div className="mx-auto flex max-w-3xl justify-center rounded-3xl bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-8">
        <TaskChecklist />
      </div>
    </main>
  );
}
