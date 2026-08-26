import Button from "../../components/Button";
import logo from "../../assets/img/nubdexchange_logo.png";
import adidas2 from "../../assets/img/adidas2.jpg";
import bulldogPlush from "../../assets/img/bulldogplush.jpg";
import tshirt3 from "../../assets/img/tshirt3.jpg";

const AboutPage = () => {
  return (
    <div className="page">
      <section className="hero">
        <img
          src="https://goodnewspilipinas.com/wp-content/uploads/2024/07/NU-Laguna.webp"
          alt="NU Campus"
        />
        <div className="hero-overlay" />
        <div className="hero-copy left">
          <div className="hero-copy-inner">
            <p className="kicker">Our Story</p>
            <h1>Built for students, by students</h1>
            <p>
              BulldogEx Shop was created to make campus shopping easier, from
              uniforms to everyday essentials.
            </p>
            <div className="hero-actions">
              <Button to="/">Back Home</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="kicker">Purpose</p>
          <h2 className="section-title">What we stand for</h2>
          <div className="grid-3" style={{ marginTop: 28 }}>
            {[
              {
                title: "Our Mission",
                desc: "Accessible, affordable, and high-quality campus essentials.",
              },
              {
                title: "Our Vision",
                desc: "Become the go-to campus marketplace that simplifies student life.",
              },
              {
                title: "Our Values",
                desc: "Convenience, quality, and a student-first experience.",
              },
            ].map((item) => (
              <article key={item.title} className="card">
                <div className="card-body">
                  <img src={logo} alt="" style={{ width: 72, height: 42, objectFit: "contain" }} />
                  <h3>{item.title}</h3>
                  <p className="muted">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="kicker">Showcase</p>
          <h2 className="section-title">Inside BulldogEx Shop</h2>
          <div className="grid-3 gallery" style={{ marginTop: 28 }}>
            {[adidas2, bulldogPlush, tshirt3].map(
              (image, index) => (
                <img key={index} src={image} alt="Store gallery" />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
