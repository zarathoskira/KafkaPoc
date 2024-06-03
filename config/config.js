export default {
  kafka: {
    host: "3.110.136.199:9092",
    clientId: "shopping-service",
    topics: {
      order: "order",
      cart: "cart",
      wishlist: "wishlist",
    },
  },
  express: {
    port: 3000,
  },
};
