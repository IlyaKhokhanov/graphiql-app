const GraphiQLClient = ({ params }: { params: { url: string } }) => {
  return (
    <>
      <h1>GraphiQL Client</h1>
      <p>URL: {params.url}</p>
      <form>
        <textarea placeholder="GraphQL Query" />
        <button type="submit">Send Request</button>
      </form>
    </>
  );
};

export default GraphiQLClient;
