import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="page-container hero-content">
          <p className="eyebrow">VEHICLE MAINTENANCE MADE SIMPLE</p>

          <h1>Know what your vehicle needs next.</h1>

          <p className="hero-description">
            Save your vehicles, track service history, and monitor mileage from
            one simple dashboard.
          </p>

          <div className="button-row">
            <Link href="/vehicles/new" className="primary-button">
              Add Your Vehicle
            </Link>

            <Link href="/vehicles" className="secondary-button">
              View My Vehicles
            </Link>
          </div>
        </div>
      </section>

      <section className="page-container feature-section">
        <h2>Everything in one place</h2>

        <div className="feature-grid">
          <article className="feature-card">
            <h3>Vehicle Details</h3>
            <p>Store your vehicle year, make, model, and current mileage.</p>
          </article>

          <article className="feature-card">
            <h3>Service History</h3>
            <p>Record oil changes, tire rotations, inspections, and repairs.</p>
          </article>

          <article className="feature-card">
            <h3>Mileage Tracking</h3>
            <p>Keep your mileage current so future recommendations are useful.</p>
          </article>
        </div>
      </section>
    </>
  );
}