export function Contact() {
  const handleAlert = () => {
    alert("Your message has been sent successfully!");
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-4">
        At Easy Job, we believe that the best way to grow and improve is by
        listening to our users. Your feedback is not just welcomed; it’s
        essential. We are committed to continually refining our platform to meet
        your needs, and your input plays a key role in that process. By sharing
        your experiences, suggestions, and ideas, you help us create a better
        service for everyone. Your voice drives our innovation and ensures that
        Easy Job remains a platform that truly works for its users.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="border rounded-lg p-2 w-full"
            ></textarea>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              className="h-5 w-5"
            />
            <label htmlFor="newsletter" className="text-sm font-medium">
              I would like to receive notifications about updates and special
              offers.
            </label>
          </div>
          <button
            type="submit"
            className="bg-greenboton hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAlert}
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <p className="mb-2">
          <strong>Phone:</strong> (121) 322-1230
        </p>
        <p className="mb-2">
          <strong>Email:</strong> reportersaroundtheworld@gmail.com
        </p>
      </div>
    </div>
  );
}
