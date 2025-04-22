const page = async ({ params }) => {
  const { id } = await params;

  return <div>{id}</div>;
};

export default page;
