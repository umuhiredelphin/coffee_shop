
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[2rem] w-full max-w-md p-8 md:p-10 shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ICONS.Close />
        </button>

        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-2">Book a Table</h2>
            <p className="text-sm text-gray-500 mb-8">Join us for the perfect coffee experience.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#7d5c4b] outline-none"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#7d5c4b] outline-none"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Guests</label>
                  <select 
                    className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#7d5c4b] outline-none"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guests</option>)}
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#7d5c4b] text-white py-4 rounded-2xl font-bold shadow-lg hover:brightness-110 transition-all active:scale-95"
              >
                Confirm Booking
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
            <h2 className="text-2xl font-bold mb-4">Confirmed!</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">We've saved a spot for {formData.guests} guests on {formData.date}. See you soon!</p>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
