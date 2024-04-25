from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from Consultation.models.ConsultationAssociation import association_table
from configs.BaseModel import EntityMeta


class Consultation(EntityMeta):
    __tablename__ = 'consultations'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    # Make sure that this relationship is correctly reflecting the association table
    #employees = relationship("ConsultationAssociation", back_populates="consultation")
    employees = relationship("Employee", secondary=association_table, back_populates="consultations")
