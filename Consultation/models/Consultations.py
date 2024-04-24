from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta


class Consultation(EntityMeta):
    __tablename__ = 'consultations'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    # Make sure that this relationship is correctly reflecting the association table
    employees = relationship("ConsultationAssociation", back_populates="consultation")
