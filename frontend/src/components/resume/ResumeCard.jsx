import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
function ResumeCard({
  id,
  title,
  updatedAt,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/resume/${id}`)}
      className="hover:shadow-md transition-shadow cursor-pointer"
    >
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>

        <p className="text-muted-foreground">
          Last updated {updatedAt}
        </p>
      </CardContent>
      <button
  onClick={(e) => {
    e.stopPropagation();

    onDelete();
  }}

  className="text-red-500 mt-4"
>
  Delete
</button>
    </Card>
  );
}

export default ResumeCard;