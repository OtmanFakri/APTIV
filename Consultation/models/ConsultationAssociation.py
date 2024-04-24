from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta


class ConsultationAssociation(EntityMeta):
    __tablename__ = 'consultation_association'
    employee_id = Column(Integer, ForeignKey('Employees.id'), primary_key=True)
    consultation_id = Column(Integer, ForeignKey('consultations.id'), primary_key=True)
    is_do = Column(Boolean, default=False)
    # Ensure correct bidirectional relationships
    employee = relationship("Employee", back_populates="consultations")
    consultation = relationship("Consultation", back_populates="employees")
