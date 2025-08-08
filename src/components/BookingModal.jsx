import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 6; hour < 23.5; hour += 0.5) {
    const h = Math.floor(hour);
    const m = hour % 1 === 0 ? "00" : "30";
    slots.push(`${h.toString().padStart(2, "0")}:${m}`);
  }
  return slots;
};

function BookingForm({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (!date) return;
    const fetchBookings = async () => {
      const q = query(collection(db, "bookings"), where("date", "==", date));
      const snapshot = await getDocs(q);
      const booked = snapshot.docs.map((doc) => doc.data().time);
      setBookedSlots(booked);
    };
    fetchBookings();
  }, [date]);

  useEffect(() => {
    if (!date) return;

    const today = new Date();
    const selected = new Date(date);
    const all = generateTimeSlots();

    let valid = all;
    if (selected.toDateString() === today.toDateString()) {
      const nowH = today.getHours();
      const nowM = today.getMinutes();
      valid = all.filter((slot) => {
        const [h, m] = slot.split(":").map(Number);
        return h > nowH || (h === nowH && m > nowM);
      });
    }

    const final = valid.filter((slot) => !bookedSlots.includes(slot));
    setAvailableSlots(final);
  }, [date, bookedSlots]);

  const appendToGoogleSheet = async (formData) => {
  try {
    const response = await fetch(import.meta.env.VITE_SHEETS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.status === 'success') {
      console.log('Data added to sheet');
    } else {
      console.error('Error adding data to sheet', result.message);
    }
  } catch (error) {
    console.error('Failed to write to Google Sheet', error);
  }
};


  const handleBooking = async () => {
    if (!name || !phone || !date || !time) {
      alert("Please fill all fields.");
      return;
    }

    const q = query(
      collection(db, "bookings"),
      where("date", "==", date),
      where("time", "==", time)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      alert("This slot is already booked.");
      return;
    }

    await addDoc(collection(db, "bookings"), {
      name,
      phone,
      date,
      time,
      createdAt: serverTimestamp(),
    });

    await appendToGoogleSheet({ name, phone, date, time });

    alert("Tour booked successfully!");
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];
  const max = new Date();
  max.setDate(max.getDate() + 30);
  const maxDate = max.toISOString().split("T")[0];

  return (
    <div className="bg-black z-20 border border-white text-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
      <h2 className="text-xl font-bold mb-4">Book A Tour</h2>
      <input
        type="text"
        placeholder="Your Name"
        className="w-full p-2 border rounded mb-3 bg-black text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full p-2 border rounded mb-3 bg-black text-white"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="date"
        className="w-full p-2 border rounded mb-3 bg-black text-white [&::-webkit-calendar-picker-indicator]:invert"
        value={date}
        min={today}
        max={maxDate}
        onChange={(e) => setDate(e.target.value)}
      />
      <select
        className="w-full p-2 border rounded mb-3 s text-white"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="">Select Time Slot</option>
        {availableSlots.map((slot) => (
          <option key={slot} value={slot} className="text-black">
            {slot}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        onClick={handleBooking}
      >
        Confirm Booking
      </button>
      <button
        className="text-sm mt-2 text-red-500 underline w-full"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
}

export default function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
      <BookingForm onClose={onClose} />
    </div>
  );
}
