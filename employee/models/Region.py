from sqlalchemy import Column, BigInteger, String
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta


class Region(EntityMeta):
    __tablename__ = 'region'
    id = Column(BigInteger, primary_key=True)
    name = Column(String(255), nullable=False)
    cities = relationship('City', back_populates='region')
