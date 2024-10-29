// api services
import { isEmpty } from "lodash";
import { nextApi } from "..";

export const DEFAULT_PAGE_SIZE = 24;
const path = "http://localhost:5005/products";
export const { useGetProductsQuery, useLazyGetProductsQuery } =
  nextApi.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query<
        any,
        {
          filters?: {
            [key: string]: any;
          };
          metadata?: {
            _page?: number;
            _limit?: number;
          };
        }
      >({
        query: ({ filters = {}, metadata = {} }) => {
          const { keyword, tier, theme, category, time, price, priceRange } =
            filters;
          const sortCriteria = [];
          if (time) {
            sortCriteria.push(`${time === "Latest" ? "-" : ""}createdAt`);
          }
          if (price) {
            sortCriteria.push(`${price === "High to Low" ? "-" : ""}price`);
          }
          const normalizedParams = {
            ...(!isEmpty(keyword) && { q: keyword }),
            ...(tier && { tier_like: tier }),
            ...(theme && { theme_like: theme }),
            ...(category && { category_like: category }),
            ...(priceRange?.length === 2 && {
              price_gte: priceRange[0],
              price_lte: priceRange[1],
            }),
            ...(sortCriteria?.length > 0 && { _sort: sortCriteria.join(",") }),
            _page: metadata._page ?? 1,
            _limit: metadata._limit ?? DEFAULT_PAGE_SIZE,
          };
          return {
            url: `${path}/?${new URLSearchParams(normalizedParams).toString()}`,
          };
        },
      }),
    }),
  });
