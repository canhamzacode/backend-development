import { db } from '@/db';
import { users } from '@/db/schema';
import { User } from '@/types';
import { eq, or } from 'drizzle-orm';
import logger from '../logger';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  } catch (error) {
    logger.error('findUserByEmail error:', error);
    throw new Error(
      `Error finding user by email: ${error instanceof Error ? error.message : error}`
    );
  }
};

export const findUserByEmailOrName = async (email: string, name: string): Promise<User | null> => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.name, name)));
    return user || null;
  } catch (error) {
    logger.error(
      `Error finding user by email or name ${error instanceof Error ? error.message : error}`
    );
    throw new Error(
      `Error finding user by email or name ${error instanceof Error ? error.message : error}`
    );
  }
};

export const findUserById = async (id: string): Promise<User | null> => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  } catch (error) {
    logger.error(`Error finding user by id ${error instanceof Error ? error.message : error}`);
    throw new Error(`Error finding user by id ${error instanceof Error ? error.message : error}`);
  }
};

export const createUser = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password
      })
      .returning();
    return user;
  } catch (error) {
    logger.error(`Error creating user ${error instanceof Error ? error.message : error}`);
    throw new Error(`Error creating user ${error instanceof Error ? error.message : error}`);
  }
};
