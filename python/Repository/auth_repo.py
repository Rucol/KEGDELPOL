from Model.authorization import Authorization
from sqlalchemy.orm import scoped_session, sessionmaker

class AuthRepository:
    def __init__(self, db):
        self.db = db
        self.Session = scoped_session(sessionmaker(bind=db.engine))

    def get_user_by_username(self, username):
        with self.Session() as session:
            return session.query(Authorization).filter_by(login=username).first()

    def create_user(self, username, password, role):
        new_user = Authorization(login=username, password=password, role=role)
        with self.Session() as session:
            session.add(new_user)
            session.commit()
            return new_user

    def get_all_users(self):
        with self.Session() as session:
            users = session.query(Authorization.auth_id, Authorization.login, Authorization.role).all()
            return [dict(user._asdict()) for user in users]
        
    def get_user_by_id(self, user_id):
        with self.Session() as session:
            return session.query(Authorization).filter_by(auth_id=user_id).first()

    def update_user_role(self, user_id, new_role):
        with self.Session() as session:
            user = session.query(Authorization).filter_by(auth_id=user_id).first()
            if user:
                user.role = new_role
                session.commit()
            else:
                raise Exception("User not found")