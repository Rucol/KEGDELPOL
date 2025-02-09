from Model.vehicle import Vehicle

class VehicleRepository:
    def __init__(self, db):
        self.db = db

    def add_vehicle(self, new_vehicle):
        self.db.session.add(new_vehicle)
        self.db.session.commit()

    def get_all_vehicles(self):
        vehicles = self.db.session.query(
            Vehicle.vehicle_id, Vehicle.type, Vehicle.capacity, Vehicle.registration_info
        ).all()
        return [dict(vehicle._asdict()) for vehicle in vehicles]
        
        
