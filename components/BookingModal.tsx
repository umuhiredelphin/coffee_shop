
import React, { useState } from 'react';
import { ICONS } from '../constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white border-2 border-black w-full max-w-md p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <button onClick={onClose} className="absolute top-6 right-6">
          <ICONS.Close />
        </button>

        {step === 1 ? (
          <>
            <h2 className="text-3xl font-black uppercase mb-2 tracking-tighter">Table Booking</h2>
            <p className="text-xs opacity-50 mb-8 tracking-widest uppercase">Reserve your space in the monolith</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full border-b border-black py-2 focus:outline-none focus:border-b-2 text-sm"
                  placeholder="E.G. JOHN DOE"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest">Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full border-b border-black py-2 focus:outline-none text-sm"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest">Guests</label>
                  <select 
                    className="w-full border-b border-black py-2 focus:outline-none text-sm"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guests</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest">Preferred Time</label>
                <input 
                  required
                  type="time" 
                  className="w-full border-b border-black py-2 focus:outline-none text-sm"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white py-4 uppercase font-black text-sm tracking-[0.2em] hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Confirm Request
                <ICONS.ArrowRight />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-black uppercase mb-4">Confirmed</h2>
            <p className="text-sm opacity-60 mb-8">We have reserved a table for {formData.guests} on {formData.date} at {formData.time}. A confirmation was sent to your email.</p>
            <button 
              onClick={onClose}
              className="px-8 py-3 border border-black uppercase text-xs font-black hover:bg-black hover:text-white transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
