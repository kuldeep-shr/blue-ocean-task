import { Connection } from 'mongoose';

export async function runTransaction<T>(
  connection: Connection,
  handler: (session: any) => Promise<T>,
): Promise<T> {
  const session = await connection.startSession();
  session.startTransaction();

  try {
    const result = await handler(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
