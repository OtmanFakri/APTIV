from datetime import datetime
from typing import List

from fastapi import Depends, HTTPException
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.ext.asyncio import AsyncSession

from certificate.models.ImagesUpload import ImagesUpload
from configs.Database import get_db_connection_async2


class ImageCertificateRepo:
    db: AsyncSession

    def __init__(
            self,
            db: AsyncSession = Depends(get_db_connection_async2),

    ) -> None:
        self.db = db

    async def save_image_certifications(self, certificate_id: int, image_urls: List[str]):
        new_images = [ImagesUpload(certificate_id=certificate_id, image_url=image_url) for image_url in image_urls]
        try:
            self.db.add_all(new_images)
            await self.db.commit()
            for image in new_images:
                await self.db.refresh(image)

            return new_images
        except Exception as e:
            await self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
