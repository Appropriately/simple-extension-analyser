function CodeBlock({ raw }: { raw: unknown }) {
  return (
    <pre className="bg-black p-2 rounded">
      <code>{String(raw)}</code>
    </pre>
  );
}

export default CodeBlock;
