from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# --- DATABASE CONFIGURATION ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bookings.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- DATABASE MODEL ---
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    check_in = db.Column(db.String(20), nullable=False)
    check_out = db.Column(db.String(20), nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# --- ROUTES ---

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/book', methods=['POST'])
def book():
    try:
        data = request.form
        
        # Handle Guest Count safely (Convert string to int)
        guests_val = data.get('guests')
        if not guests_val:
            guests_val = 1
        else:
            guests_val = int(guests_val)

        # Create new booking
        new_booking = Booking(
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone'),
            room_type=data.get('room_type'),
            check_in=data.get('check_in'),
            check_out=data.get('check_out'),
            guests=guests_val,
            message=data.get('message')
        )
        
        # Add to database
        db.session.add(new_booking)
        db.session.commit()
        
        print("SUCCESS: Booking saved to database") # Check terminal for this message
        return jsonify({"success": True, "message": "Booking saved!"})

    except Exception as e:
        print(f"ERROR: {e}") # This will print the real error in your terminal
        return jsonify({"success": False, "message": str(e)}), 500

# --- ADMIN PANEL ---
@app.route('/admin')
def admin():
    bookings = Booking.query.all()
    return render_template('admin.html', bookings=bookings)

# --- CREATE DATABASE ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)