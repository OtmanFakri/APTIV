from sqlalchemy import Column, BigInteger, String

from configs.BaseModel import EntityMeta


class Doctor(EntityMeta):
    __tablename__ = 'Doctors'
    id = Column(BigInteger, primary_key=True , autoincrement=True ,index=True)
    name = Column(String(255), nullable=False, index=True)
    specialty = Column(String(255), nullable=False , index=True)
