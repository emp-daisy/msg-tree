import ExpressGraphQL  from "express-graphql";
import schema from "../schemas";
import resolver from "../resolver";

const routes = (app) => {
  app.use("/api/v1", ExpressGraphQL({
    schema,
    rootValue: resolver,
    graphiql: true,
    formatError: err => {
      return err.message
    }
  }))
};

export default routes;