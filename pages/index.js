import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAeMAlpFTiaIvijBjhktRCLGlX4X8GPqGU",
    authDomain: "midasibs.firebaseapp.com",
      databaseURL: "https://midasibs-default-rtdb.firebaseio.com",
        projectId: "midasibs",
          storageBucket: "midasibs.firebasestorage.app",
            messagingSenderId: "43705653127",
              appId: "1:43705653127:web:e84dbc5af1330e1fdea522",
                measurementId: "G-E4NR7F3HMJ"
                };

                const app = initializeApp(firebaseConfig);
                const db = getFirestore(app);

                export default function HomePage() {
                  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
                    const [newsletterEmail, setNewsletterEmail] = useState('');

                      const handleContactSubmit = async (e) => {
                          e.preventDefault();
                              try {
                                    await addDoc(collection(db, "contacts"), formData);
                                          alert("Message sent successfully!");
                                                setFormData({ name: '', email: '', message: '' });
                                                    } catch (error) {
                                                          console.error("Error sending message: ", error);
                                                              }
                                                                };

                                                                  const handleNewsletterSubmit = async (e) => {
                                                                      e.preventDefault();
                                                                          try {
                                                                                await addDoc(collection(db, "newsletter"), { email: newsletterEmail });
                                                                                      alert("Subscribed successfully!");
                                                                                            setNewsletterEmail('');
                                                                                                } catch (error) {
                                                                                                      console.error("Error subscribing: ", error);
                                                                                                          }
                                                                                                            };

                                                                                                              return (
                                                                                                                  <div className="p-8 text-center">
                                                                                                                        <h1 className="text-4xl mb-4">MIDAS Integrated Business Services</h1>
                                                                                                                              <form onSubmit={handleContactSubmit} className="mb-8">
                                                                                                                                      <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Name" className="block w-full p-2 mb-2" />
                                                                                                                                              <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email" className="block w-full p-2 mb-2" />
                                                                                                                                                      <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Message" className="block w-full p-2 mb-2"></textarea>
                                                                                                                                                              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send Message</button>
                                                                                                                                                                    </form>
                                                                                                                                                                          <form onSubmit={handleNewsletterSubmit}>
                                                                                                                                                                                  <input value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="Subscribe email" className="p-2" />
                                                                                                                                                                                          <button type="submit" className="ml-2 bg-green-500 text-white p-2 rounded">Subscribe</button>
                                                                                                                                                                                                </form>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                      );
                                                                                                                                                                                                      }