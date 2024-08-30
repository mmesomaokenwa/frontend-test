export const calculateDiscountPrice = (price: number, discountPercentage: number) => {
  return price - (price * discountPercentage) / 100;
};

export const parseSearchParams = (
  searchParams: { [key: string]: string } | string
) => {
  return new URLSearchParams(searchParams);
};

export const formUrlQuery = ({
  params,
  pairs
}: {
  params: string;
  pairs: { [key: string]: string | null }
}) => {
  const searchParams = parseSearchParams(params)

  Object.entries(pairs).forEach(([key, value]) => {
    if (!value) return searchParams.delete(key)
    searchParams.set(key, value)
  })

  return searchParams.toString()
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) => {
  const searchParams = parseSearchParams(params)

  keysToRemove.forEach((key) => {
    searchParams.delete(key)
  });

  return searchParams.toString()
};