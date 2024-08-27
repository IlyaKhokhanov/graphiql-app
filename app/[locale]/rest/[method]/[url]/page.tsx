const RestClient = ({ params }: { params: { method: string; url: string; body?: string } }) => {
  return (
    <>
      <h1>REST Client</h1>
      <p>Method: {params.method}</p>
      <p>Url: {params.url}</p>
      <form>
        <textarea placeholder="Request Body" />
        <button type="submit">Send Request</button>
      </form>
    </>
  );
};

export default RestClient;
