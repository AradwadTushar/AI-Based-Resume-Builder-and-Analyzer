import { Button } from "@/components/ui/button";

function EmptyState() {
  return (
    <div
      className="
        border
        border-dashed
        rounded-xl
        p-12
        flex
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      <h2 className="text-2xl font-semibold mb-2">
        No resumes yet
      </h2>

      <p className="text-muted-foreground mb-6">
        Create your first AI-powered resume
      </p>

      <Button>
        Create Resume
      </Button>
    </div>
  );
}

export default EmptyState;