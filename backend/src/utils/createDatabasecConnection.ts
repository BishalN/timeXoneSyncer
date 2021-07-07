import { createConnection } from "typeorm";

export const createTypeormConnection = async () => {
  const connection = await createConnection();
  return connection;
};
