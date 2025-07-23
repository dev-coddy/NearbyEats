const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About FoodDelivery</h1>
        <p>Delivering smiles, one meal at a time!</p>
      </div>

      <div className="about-content">
        <section>
          <h2>Who We Are</h2>
          <p>
            At <strong>FoodDelivery</strong>, we believe that great food should
            be just a click away. We're a passionate team dedicated to
            connecting you with your favorite local restaurants and delivering
            fresh, delicious meals right to your door.
          </p>
        </section>

        <section>
          <h2>What We Do</h2>
          <p>
            From spicy street food to healthy wraps and international fast food
            chains, we bring a wide variety of cuisines to your fingertips. Our
            platform is designed to make ordering food fast, simple, and
            enjoyable.
          </p>
        </section>

        <section>
          <h2>Why Choose Us?</h2>
          <ul>
            <li>🍔 Curated restaurant options</li>
            <li>⚡ Fast and reliable delivery</li>
            <li>🔐 Secure and easy payments</li>
            <li>💬 24/7 customer support</li>
          </ul>
        </section>

        <section className="about-quote">
          <blockquote>
            “Food is our common ground, a universal experience.”
            <br />
            <span>– James Beard</span>
          </blockquote>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
