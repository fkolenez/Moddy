import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

function MetricCard({ title, value, subtitle }: {
  title: string;
  value: string;
  subtitle?: string;
  description?: string
}) {
  return (
    <Card className="max-w flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-xl" >{value}</CardDescription>
      </CardHeader>
      {subtitle && (
        <CardFooter className="text-sm text-muted-foreground">
          {subtitle}
        </CardFooter>
      )}
    </Card>
  );
}

export default MetricCard;