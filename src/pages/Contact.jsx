import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! (In a real application, this would submit data to a backend.)");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <section className="p-10 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" className="w-full border rounded p-2" required />
            <input type="email" placeholder="Email" className="w-full border rounded p-2" required />
            <textarea placeholder="Message" className="w-full border rounded p-2 h-32" required></textarea>
            <button 
              type="submit" 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Find Us</h2>
            <iframe
              title="Restaurant Location Map"
              className="w-full h-64 rounded"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d96751.87540526234!2d-74.01622801478945!3d40.72910793030944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sDave's%20Hot%20Chicken%20in%20nyc!5e0!3m2!1sen!2sus!4v1761368217634!5m2!1sen!2sus" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            >
            </iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;