from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Define the base
Base = declarative_base()

def init_db(app):
    engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    return Session()
