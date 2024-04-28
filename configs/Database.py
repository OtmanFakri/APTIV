from contextlib import asynccontextmanager

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from configs.Environment import get_environment_variables
# Runtime Environment Configuration
env = get_environment_variables()

# Generate Database URL
DATABASE_URL = f"{env.DATABASE_DIALECT}://{env.DATABASE_USERNAME}:{env.DATABASE_PASSWORD}@{env.DATABASE_HOSTNAME}:{env.DATABASE_PORT}/{env.DATABASE_NAME}"
DATABASE_URL2 = f"{env.DATABASE_DIALECT}+asyncpg://{env.DATABASE_USERNAME}:{env.DATABASE_PASSWORD}@{env.DATABASE_HOSTNAME}:{env.DATABASE_PORT}/{env.DATABASE_NAME}"

# Create Database Engine
Engine = create_engine(
    DATABASE_URL, echo=env.DEBUG_MODE, future=True
)

# Create Async Database Engine
async_engine = create_async_engine(
    DATABASE_URL2, echo=env.DEBUG_MODE, future=True
)

SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=Engine
)
# Async SessionLocal
AsyncSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=async_engine, class_=AsyncSession
)

def get_db_connection():
    db = scoped_session(SessionLocal)
    try:
        yield db
    finally:
        db.close()

async def get_db_connection_async():
    async with AsyncSessionLocal() as session:
        async with session.begin():
            yield session