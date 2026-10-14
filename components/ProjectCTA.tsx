import Link from "next/link";

export default function ProjectCTA({
  title="Your next product starts here.",
  description="Share your target market, product requirements, expected quantity and timeline. We will help you define the next step.",
  button="Get a Quote",
  href="/contact"
}:{
  title?:string;
  description?:string;
  button?:string;
  href?:string;
}) {

return (
<section className="section contact-band">
<div className="container section-head">

<div className="kicker">
Tell us what you are building
</div>

<h2>
{title}
</h2>

<p>
{description}
</p>

<div className="hero-actions">

<Link
href={href}
className="btn-primary"
>
{button}
</Link>

<Link
href="/contact?type=Sample%20Request"
className="btn-secondary"
>
Request a Sample
</Link>

</div>

</div>
</section>
);

}
