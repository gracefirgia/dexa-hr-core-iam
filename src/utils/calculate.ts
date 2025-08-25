export const calculatePage = (limits, pages) => {
  const limit = limits ? Number(limits) : 10;
  const page = pages ? Number(pages) : 1;
  const offset = (page - 1) * limit;

  return {
    limit, offset
  }
}