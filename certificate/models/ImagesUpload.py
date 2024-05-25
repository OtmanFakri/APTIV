from datetime import datetime

from sqlalchemy import Column, BigInteger, String, Date, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from configs.BaseModel import EntityMeta

class ImagesUpload(EntityMeta):
    __tablename__ = 'images_uploads'
    id = Column(BigInteger, primary_key=True, autoincrement=True, index=True)
    certificate_id = Column(Integer, ForeignKey('certificates.id'), nullable=False, index=True)
    image_url = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)

    certificate = relationship("Certificate", back_populates="images")
