import { Card } from "@/components/ui";

interface Props {
  error: any;
}

function Error({ error }: Props) {
  let name = "Unknown Error";
  let message = "An unknown error occurred.";

  if (error && "name" in error && "message" in error) {
    name = error.name;
    message = error.message;
  }

  return (
    <div className="container mx-auto py-5">
      <div className="flex flex-col justify-center items-center">
        <h3 className="mb-2 text-3xl">Error</h3>

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
