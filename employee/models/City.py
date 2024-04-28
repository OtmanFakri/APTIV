from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta


class City(EntityMeta):
    __tablename__ = 'city'
    id = Column(BigInteger, primary_key=True)
    name = Column(String(255), nullable=False)
    region_id = Column(BigInteger, ForeignKey('region.id'), nullable=False)

    region = relationship('Region', back_populates='cities')
    employees = relationship('Employee', back_populates='city')