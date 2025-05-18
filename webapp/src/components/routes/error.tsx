import { Card } from "@/components/ui";

interface Props {
  error: unknown;
}

function Error({ error }: Props) {
  let name = "Unknown Error";
  let message = "An unknown error occurred.";

  if (typeof error === "object" && error !== null) {
    const err = error as { name?: string; message?: string };
    if (err.name) name = err.name;
    if (err.message) message = err.message;
  }

  return (
    <div className="container mx-auto py-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="mb-2">Error</h1>

        <Card className="min-w-128">
          <Card.Header>{name}</Card.Header>
          <Card.Body>
            <p>{message}</p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Error;
