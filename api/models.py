from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime, timezone
from database import Base


class Content(Base):
    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True)
    subcategory = Column(String, index=True, nullable=True)
    text_hindi = Column(Text, nullable=False)
    text_transliteration = Column(Text, nullable=False)
    author = Column(String, nullable=True)
    tags = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    is_featured = Column(Boolean, default=False)
    share_count = Column(Integer, default=0, nullable=False, server_default="0")
