export default {
  kafka: {
    host: "3.111.57.207:9092",
    clientId: "kafka-service",
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
